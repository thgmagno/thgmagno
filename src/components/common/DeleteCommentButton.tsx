'use client'

import { useActionState, useEffect } from 'react'
import { Loader2, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { actions } from '@/actions'

export function DeleteCommentButton({
  commentId,
  projectId,
  comment,
}: {
  commentId: string
  projectId: number
  comment: string
}) {
  const [formState, action, isPending] = useActionState(
    actions.social.deleteComment,
    { errors: {} },
  )

  useEffect(() => {
    if (formState.errors?._form) {
      toast.error(Object.values(formState.errors._form))
    }
  }, [formState])

  return (
    <form action={action}>
      <input type="hidden" name="commentId" value={commentId} />
      <input type="hidden" name="projectId" value={projectId} />
      <input type="hidden" name="comment" value={comment} />

      {isPending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <button type="submit">
          <Trash2 className="text-muted-foreground h-4 w-4 hover:text-red-400" />
        </button>
      )}
    </form>
  )
}
