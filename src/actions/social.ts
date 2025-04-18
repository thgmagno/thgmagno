'use server'

import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { CommentSchema, ReactionSchema } from '@/lib/schemas'
import { CommentFormState, ReactionFormState } from '@/lib/states'
import { revalidatePath } from 'next/cache'

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
  return { errors: {} }
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

export async function deleteComment(projectId: number, commentId: string) {
  const session = await auth()
  // return prisma.comment.delete({
  //   where: { id: commentId, authorEmail: session?.user?.email, projectId },
  // })
}
