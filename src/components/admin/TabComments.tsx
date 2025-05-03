'use client'

import { Comment } from '@prisma/client'
import { formatDate } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { actions } from '@/actions'
import { useActionState, useEffect } from 'react'
import { Button, buttonVariants } from '@/components/ui/button'
import { toast } from 'sonner'
import { AlertDialogDescription } from '@radix-ui/react-alert-dialog'

export function TabComments({ comments }: { comments: Comment[] }) {
  const [formState, action, isPending] = useActionState(
    actions.social.deleteComment,
    { errors: {} },
  )

  useEffect(() => {
    if (formState.success) toast.success('Comentário excluído com sucesso')
    if (formState.errors._form) toast.error(formState.errors._form)
  }, [formState])

  if (!comments.length) {
    return (
      <p className="text-muted-foreground p-3 pt-6 text-center">
        Nenhum comentário registrado
      </p>
    )
  }

  return (
    <>
      {comments
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        .map((comment) => (
          <div
            key={`${comment.id}-${comment.createdAt.getTime()}`}
            className="bg-card mb-2 flex items-center justify-between rounded-md p-2 first:mt-4"
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
              <p className="my-1">{comment.comment}</p>
              {comment.deletedAt && (
                <small className="text-red-400">
                  Excluído pelo autor {formatDate(comment.deletedAt)}
                </small>
              )}
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
                    <AlertDialogHeader className="text-start">
                      <AlertDialogTitle>
                        Tem certeza que deseja excluir?
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-muted-foreground text-sm font-medium">
                        Essa ação não pode ser desfeita.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="flex items-center justify-end gap-2">
                      <AlertDialogCancel
                        className={buttonVariants({
                          size: 'sm',
                          variant: 'outline',
                          className: 'm-0',
                        })}
                      >
                        Cancelar
                      </AlertDialogCancel>
                      <form action={action}>
                        <input
                          type="hidden"
                          name="commentId"
                          value={comment.id}
                        />

                        <Button
                          size="sm"
                          className="cursor-pointer"
                          disabled={isPending}
                        >
                          {isPending ? 'Aguarde...' : 'Confirmar'}
                        </Button>
                      </form>
                    </div>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        ))}
    </>
  )
}
