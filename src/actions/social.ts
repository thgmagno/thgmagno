'use server'

import { auth } from '@/auth'
import { isValidComment } from '@/lib/filter'
import { prisma } from '@/lib/prisma'
import { CommentSchema, ReactionSchema } from '@/lib/schemas'
import { CommentFormState, ReactionFormState } from '@/lib/states'
import { revalidatePath } from 'next/cache'
import { actions } from '.'
import { GithubProject } from '@/lib/types'

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

    const existingReaction = await prisma.reaction.findFirst({
      where: {
        authorEmail: session?.user?.email,
        projectId: parsed.data.projectId,
      },
    })

    if (existingReaction && existingReaction.emoji === parsed.data.emoji) {
      await prisma.reaction.delete({
        where: {
          authorEmail_projectId: {
            authorEmail: session.user.email!,
            projectId: parsed.data.projectId,
          },
        },
      })
      return { errors: {} }
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
      update: { emoji: parsed.data.emoji },
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
  const parsed = CommentSchema.safeParse(Object.fromEntries(formData))

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
    }
  }

  try {
    const session = await auth()

    if (!session?.user?.email || !session.user.isAdmin) {
      return { errors: { _form: 'Não autorizado' } }
    }

    const commentExists = await prisma.comment.findUnique({
      where: { id: parsed.data.commentId },
    })

    if (!commentExists) {
      return { errors: { _form: 'Comentário não encontrado' } }
    }

    await prisma.comment.delete({
      where: { id: parsed.data.commentId },
    })
  } catch {
    return {
      errors: { _form: 'Falha ao conectar-se ao banco de dados' },
    }
  }

  revalidatePath('/')
  return { errors: {} }
}

export async function softDeleteComment(
  formState: CommentFormState,
  formData: FormData,
): Promise<CommentFormState> {
  const parsed = CommentSchema.safeParse(Object.fromEntries(formData))

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

    const commentExists = await prisma.comment.findUnique({
      where: { id: parsed.data.commentId, authorEmail: session.user.email },
    })

    if (!commentExists) {
      return { errors: { _form: 'Comentário não encontrado' } }
    }

    await prisma.comment.update({
      where: { id: parsed.data.commentId, authorEmail: session.user.email },
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
    prisma.comment.findMany(),
    prisma.reaction.findMany(),
    prisma.visit.findMany(),
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
          .filter((v) => v.projectId === project.id)
          .map(async (visit) => ({
            ...visit,
            country: await actions.visit.getCountryName(visit.country),
          })),
      ),
    })),
  )

  return projectFeedbacks
}
