'use client'

import { Comment } from '@prisma/client'
import { formatDate } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { actions } from '@/actions'
import { useActionState } from 'react'

export function TabComments({ comments }: { comments: Comment[] }) {
  const [formState, action, isPending] = useActionState(
    actions.social.deleteComment,
    { errors: {} },
  )

  return (
    <section className="mt-6 max-h-[60vh] overflow-y-scroll">
      {comments
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        .map((comment) => (
          <div
            key={`${comment.id}-${comment.createdAt.getTime()}`}
            className="bg-card mb-2 flex items-center justify-between rounded-md p-2"
          >
            <Avatar>
              <AvatarImage
                src={comment.avatarUrl || 'https://github.com/shadcn.png'}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="mr-2 ml-2.5 flex flex-1 flex-col text-sm font-medium">
              <small className="text-muted-foreground">
                {comment.authorName}
              </small>
              <p className="mt-1">{comment.comment}</p>
            </div>
            <div className="min-w-fit">
              <small className="text-muted-foreground">
                {formatDate(comment.createdAt)}
              </small>
              <div className="flex justify-end pr-1">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button className="text-xs text-red-500">Excluir</button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Tem certeza que deseja excluir?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta ação não pode ser desfeita.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <form action={action}>
                        <AlertDialogAction type="submit">
                          Confirmar
                        </AlertDialogAction>
                      </form>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        ))}
    </section>
  )
}
