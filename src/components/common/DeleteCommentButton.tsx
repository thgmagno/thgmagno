'use client'

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useActionState, useEffect } from 'react'
import { Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { actions } from '@/actions'
import { useSession } from 'next-auth/react'
import { buttonVariants, Button } from '@/components/ui/button'

export function DeleteCommentButton({ commentId }: { commentId: string }) {
  const isAdmin = useSession().data?.user.isAdmin || false

  const [formState, action, isPending] = useActionState(
    isAdmin ? actions.social.deleteComment : actions.social.softDeleteComment,
    { errors: {} },
  )

  useEffect(() => {
    if (formState.errors?._form) {
      toast.error(Object.values(formState.errors._form))
    }
  }, [formState])

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Trash2 className="text-muted-foreground h-4 w-4 hover:text-red-400" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="text-start">
          <AlertDialogTitle>Tem certeza que deseja excluir?</AlertDialogTitle>
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
            <input type="hidden" name="commentId" value={commentId} />

            <Button size="sm" className="cursor-pointer" disabled={isPending}>
              {isPending ? 'Aguarde...' : 'Confirmar'}
            </Button>
          </form>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}
