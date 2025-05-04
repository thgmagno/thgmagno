'use server'

import { auth } from '@/auth'
import { isValidComment } from '@/lib/filter'
import { prisma } from '@/lib/prisma'
import { CommentSchema, ReactionSchema } from '@/lib/schemas'
import { CommentFormState, ReactionFormState } from '@/lib/states'
import { revalidatePath } from 'next/cache'
import { actions } from '.'
import { GithubProject, Log } from '@/lib/types'
import { subDays } from 'date-fns'

export async function react(
  formState: ReactionFormState,
  formData: FormData,
): Promise<ReactionFormState> {
  const parsed = ReactionSchema.safeParse(Object.fromEntries(formData))

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
    }
  }

  try {
    const session = await auth()

    if (!session?.user?.email) {
      return { errors: { _form: 'Usuário não autenticado' } }
    }

    await prisma.reaction.upsert({
      where: {
        authorEmail_projectId: {
          authorEmail: session.user.email,
          projectId: parsed.data.projectId,
        },
        projectId: parsed.data.projectId,
      },
      create: {
        authorEmail: session.user.email,
        projectId: parsed.data.projectId,
        emoji: parsed.data.emoji,
      },
      update: { emoji: parsed.data.emoji, viewed: false },
    })
  } catch {
    return {
      errors: { _form: 'Falha ao conectar-se ao banco de dados' },
    }
  }

  revalidatePath('/')
  return { errors: {} }
}

export async function comment(
  formState: CommentFormState,
  formData: FormData,
): Promise<CommentFormState> {
  const parsed = CommentSchema.safeParse(Object.fromEntries(formData))

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
    }
  }

  if (!isValidComment(parsed.data.comment)) {
    return {
      errors: { comment: ['Sua mensagem foi rejeitada pelo moderador'] },
    }
  }

  try {
    const session = await auth()

    if (!session?.user?.email) {
      return { errors: { _form: 'Usuário não autenticado' } }
    }

    await prisma.comment.upsert({
      where: {
        id: parsed.data.commentId,
        authorEmail: session.user.email,
        projectId: parsed.data.projectId,
      },
      create: {
        projectId: parsed.data.projectId,
        comment: parsed.data.comment,
        authorEmail: session.user.email,
        authorName: session.user.name || null,
        avatarUrl: session.user.image || null,
        parentId: parsed.data.comentParentId || null,
      },
      update: { comment: parsed.data.comment },
    })
  } catch {
    return {
      errors: { _form: 'Falha ao conectar-se ao banco de dados' },
    }
  }

  revalidatePath('/')
  return { errors: {}, success: true }
}

export async function findReactions(projectId: number) {
  return prisma.reaction.groupBy({
    by: ['emoji'],
    where: { projectId },
    _count: true,
  })
}

export async function findComments(projectId: number) {
  return prisma.comment.findMany({
    where: { projectId, deletedAt: null },
    orderBy: { createdAt: 'asc' },
  })
}

export async function deleteComment(
  formState: CommentFormState,
  formData: FormData,
): Promise<CommentFormState> {
  const commentId = String(formData.get('commentId'))

  if (!commentId) {
    return {
      errors: { _form: 'Comentário não encontrado' },
    }
  }

  try {
    const session = await auth()

    if (!session?.user?.email || !session.user.isAdmin) {
      return { errors: { _form: 'Não autorizado' } }
    }

    const commentExists = await prisma.comment.findUnique({
      where: { id: commentId },
    })

    if (!commentExists) {
      return { errors: { _form: 'Comentário não encontrado' } }
    }

    await prisma.comment.delete({
      where: { id: commentId },
    })
  } catch {
    return {
      errors: { _form: 'Falha ao conectar-se ao banco de dados' },
    }
  }

  revalidatePath('/')
  return { success: true, errors: {} }
}

export async function softDeleteComment(
  formState: CommentFormState,
  formData: FormData,
): Promise<CommentFormState> {
  const commentId = String(formData.get('commentId'))

  if (!commentId) {
    return {
      errors: { _form: 'Comentário não encontrado' },
    }
  }

  try {
    const session = await auth()

    if (!session?.user?.email) {
      return { errors: { _form: 'Usuário não autenticado' } }
    }

    const commentExists = await prisma.comment.findUnique({
      where: { id: commentId, authorEmail: session.user.email },
    })

    if (!commentExists) {
      return { errors: { _form: 'Comentário não encontrado' } }
    }

    await prisma.comment.update({
      where: { id: commentId, authorEmail: session.user.email },
      data: { deletedAt: new Date() },
    })
  } catch {
    return {
      errors: { _form: 'Falha ao conectar-se ao banco de dados' },
    }
  }

  revalidatePath('/')
  return { errors: {} }
}

export async function findFeedbacks() {
  try {
    const { items } = await actions.repository.fetcherRepositories()

    const parseGithubProject = (project: GithubProject): GithubProject => ({
      id: project.id,
      name: project.name,
      html_url: project.html_url,
      description: project.description,
      created_at: project.created_at,
      updated_at: project.updated_at,
      homepage: project.homepage,
      language: project.language,
      visibility: project.visibility,
    })

    const [comments, reactions, visits] = await Promise.all([
      prisma.comment.findMany({ orderBy: { createdAt: 'desc' } }),
      prisma.reaction.findMany({ orderBy: { updatedAt: 'desc' } }),
      prisma.visit.findMany({ orderBy: { createdAt: 'desc' } }),
    ])

    const projectFeedbacks = await Promise.all(
      items.map(async (project) => ({
        ...parseGithubProject(project),
        comments: comments.filter((c) => c.projectId === project.id),
        reactions: {
          emoji: reactions
            .filter((r) => r.projectId === project.id)
            .reduce<Record<string, number>>((acc, { emoji }) => {
              acc[emoji] = (acc[emoji] || 0) + 1
              return acc
            }, {}),
        },
        visits: await Promise.all(
          visits
            .filter((v) => v.appName === project.name)
            .map(async (visit) => ({
              ...visit,
              country: await actions.visit.getCountryName(visit.country),
            })),
        ),
      })),
    )

    return { success: true, data: projectFeedbacks }
  } catch {
    return { success: false, error: 'Falha ao conectar-se ao banco de dados' }
  }
}

export async function findNewestFeedbacks() {
  const lastMonth = subDays(new Date(), 30)

  const filters = {
    where: { createdAt: { gte: lastMonth } },
    orderBy: {
      createdAt: 'desc' as 'desc' | 'asc',
    },
    take: 10,
  }

  const [visits, reactions, comments] = await Promise.all([
    prisma.visit.findMany(filters),
    prisma.reaction.findMany(filters),
    prisma.comment.findMany(filters),
  ])

  const normalized = [
    ...visits.map((visit) => ({
      type: 'visit',
      createdAt: visit.createdAt,
      viewed: visit.viewed,
      appName: visit.appName,
      location: [visit.city, visit.state, visit.country]
        .filter(Boolean)
        .join(', '),
    })),
    ...reactions.map((reaction) => ({
      type: 'reaction',
      createdAt: reaction.createdAt,
      emoji: reaction.emoji,
      authorEmail: reaction.authorEmail,
      projectId: reaction.projectId,
      viewed: reaction.viewed,
    })),
    ...comments.map((comment) => ({
      type: 'comment',
      createdAt: comment.createdAt,
      authorName: comment.authorName,
      comment: comment.comment,
      projectId: comment.projectId,
      viewed: comment.viewed,
    })),
  ]

  const sorted = normalized.sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
  )

  const shouldUpdateVisits = sorted.some((i) => i.type === 'visit' && !i.viewed)
  const shouldUpdateReactions = sorted.some(
    (i) => i.type === 'reaction' && !i.viewed,
  )
  const shouldUpdateComments = sorted.some(
    (i) => i.type === 'comment' && !i.viewed,
  )

  if (shouldUpdateVisits || shouldUpdateReactions || shouldUpdateComments) {
    const where = { where: { viewed: false }, data: { viewed: true } }

    await Promise.all([
      shouldUpdateVisits && prisma.visit.updateMany(where),
      shouldUpdateReactions && prisma.reaction.updateMany(where),
      shouldUpdateComments && prisma.comment.updateMany(where),
    ])
  }

  return sorted as Log[]
}
