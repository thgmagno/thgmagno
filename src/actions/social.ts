'use server'

import { auth } from '@/auth'
import { isValidComment } from '@/lib/filter'
import { prisma } from '@/lib/prisma'
import { CommentSchema, ReactionSchema } from '@/lib/schemas'
import { CommentFormState, ReactionFormState } from '@/lib/states'
import { revalidatePath } from 'next/cache'
import { actions } from '.'

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
    where: { projectId },
    orderBy: { createdAt: 'asc' },
  })
}

export async function findAllComments() {
  const { items } = await actions.repository.fetcherRepositories()

  const mapProjectNameId = items.map((i) => ({
    name: i.name,
    id: i.id,
  }))

  const comments = await prisma.comment.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return comments.map((comment) => ({
    ...comment,
    projectName:
      mapProjectNameId.find((i) => i.id === comment.projectId)?.name ||
      'Não encontrado',
  }))
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

    if (!session?.user?.email) {
      return { errors: { _form: 'Usuário não autenticado' } }
    }

    const where = session.user.isAdmin
      ? { id: parsed.data.commentId }
      : { id: parsed.data.commentId, authorEmail: session.user.email }

    const commentExists = await prisma.comment.findUnique({ where })

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
