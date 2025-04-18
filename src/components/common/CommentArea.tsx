'use client'

import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { useActionState } from 'react'
import { actions } from '@/actions'
import { Comment } from '@prisma/client'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useSession } from 'next-auth/react'

export function CommentArea({
  projectId,
  comments,
}: {
  projectId: number
  comments: Comment[]
}) {
  const [formState, action, isPending] = useActionState(
    actions.social.comment,
    { errors: {} },
  )

  const { data: session } = useSession()

  return (
    <div className="space-y-4 rounded-xl border bg-neutral-900 md:p-4">
      <ScrollArea className="max-h-[600px]">
        {comments.length ? (
          comments.map((comment) => (
            <div key={comment.id} className="relative space-y-3 border-b p-4">
              <div className="flex justify-between">
                <div className="flex space-x-2">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={session?.user?.image || ''} />
                    <AvatarFallback>
                      {session?.user?.name?.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm">{comment.authorName}</p>
                    <p className="text-muted-foreground text-xs font-light">
                      {comment.authorEmail}
                    </p>
                  </div>
                </div>
                <span className="min-w-fit text-xs text-neutral-400">
                  {format(new Date(comment.createdAt), "d 'de' MMM. HH:mm", {
                    locale: ptBR,
                  })}
                </span>
              </div>

              <div className="text-sm">{comment.comment}</div>
            </div>
          ))
        ) : (
          <p className="text-muted-foreground mb-1.5 text-sm">
            Seja o primeiro a comentar!
          </p>
        )}
      </ScrollArea>

      <form action={action} className="space-y-4 px-4 pb-4 md:p-0">
        <input type="hidden" name="projectId" value={projectId} />
        <input type="hidden" name="commentId" value="" />
        <input type="hidden" name="comentParentId" value="" />

        <div>
          <Textarea
            name="comment"
            className="border-none bg-neutral-800 p-2"
            placeholder="Escreva um comentário..."
          />
          {formState.errors && renderFormErrors(formState.errors)}
          <Button
            type="submit"
            disabled={isPending}
            className="w-full"
            variant="secondary"
            size="sm"
          >
            {isPending ? 'Aguarde...' : 'Publicar'}
          </Button>
        </div>
      </form>
    </div>
  )
}

function renderFormErrors(errors: Record<string, string | string[]>) {
  return (
    <ul className="m-2 space-y-1 text-sm text-red-400">
      {Object.entries(errors).map(([field, msgs]) => {
        if (Array.isArray(msgs)) {
          return msgs.map((msg, i) => <li key={`${field}-${i}`}>{msg}</li>)
        }
        return <li key={field}>{msgs}</li>
      })}
    </ul>
  )
}
