'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useActionState, useEffect, useState } from 'react'
import { actions } from '@/actions'
import { Comment } from '@prisma/client'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { signIn, signOut, useSession } from 'next-auth/react'
import { Ellipsis } from 'lucide-react'
import clsx from 'clsx'
import { DeleteCommentButton } from '@/components/common/DeleteCommentButton'

export function CommentArea({
  projectId,
  comments,
}: {
  projectId: number
  comments: Comment[]
}) {
  const [formState, action, isPending] = useActionState(
    actions.social.comment,
    { errors: {}, success: false },
  )

  const { data: session } = useSession()
  const [comment, setCommet] = useState('')

  useEffect(() => {
    if (formState.success) {
      setCommet('')
    }
  }, [formState])

  return (
    <div className="bg-background space-y-4 rounded-xl border py-4 md:p-4">
      <section className="max-h-[600px] overflow-y-scroll">
        {comments.length ? (
          comments.map((comment) => (
            <div key={comment.id} className="relative space-y-3 border-b p-4">
              <div className="flex justify-between">
                <div className="flex space-x-2">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={comment.avatarUrl || ''} />
                    <AvatarFallback>
                      {comment.authorName?.slice(0, 2).toUpperCase() ||
                        comment.authorEmail?.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="flex flex-col-reverse text-sm sm:flex-row sm:items-center">
                      <span className="min-w-fit text-xs text-neutral-400 sm:ml-2">
                        {formatDistanceToNow(new Date(comment.createdAt), {
                          addSuffix: true,
                          locale: ptBR,
                        })}
                      </span>
                      <span>{comment.authorName}</span>
                    </p>
                  </div>
                </div>
                {session?.user.email === comment.authorEmail && (
                  <DeleteCommentButton
                    comment={comment.comment}
                    commentId={comment.id}
                    projectId={projectId}
                  />
                )}
              </div>

              <div className="text-sm">{comment.comment}</div>
            </div>
          ))
        ) : (
          <p className="text-muted-foreground mb-1.5 px-4 text-sm md:px-0">
            Seja o primeiro a comentar!
          </p>
        )}
      </section>

      <form action={action} className="px-4 md:p-0">
        <input type="hidden" name="projectId" value={projectId} />
        <input type="hidden" name="commentId" value="" />
        <input type="hidden" name="comentParentId" value="" />

        <Textarea
          name="comment"
          className={clsx('bg-accent border-none p-2 text-base')}
          placeholder="Escreva um comentário..."
          disabled={!session?.user.email}
          value={comment}
          onChange={(e) => setCommet(e.target.value)}
        />
        {formState.errors && renderFormErrors(formState.errors)}
        <div className="mb-4 space-y-2.5">
          {session?.user.email ? (
            <div className="flex gap-1.5">
              <Button
                type="submit"
                disabled={isPending || !session?.user.email}
                className="w-full cursor-pointer disabled:cursor-not-allowed"
                variant="secondary"
                size="sm"
              >
                {isPending ? 'Aguarde...' : 'Publicar'}
              </Button>
              {formState.errors && optionsDropdown()}
            </div>
          ) : (
            <Button
              onClick={() => signIn('github')}
              className="w-full"
              variant="secondary"
              type="button"
              size="sm"
            >
              Entrar com Github
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}

function renderFormErrors(errors: Record<string, string | string[]>) {
  return (
    <ul className="mt-1 mb-2.5 space-y-1 text-sm text-red-400">
      {Object.entries(errors).map(([field, msgs]) => {
        if (Array.isArray(msgs)) {
          return msgs.map((msg, i) => <li key={`${field}-${i}`}>{msg}</li>)
        }
        return <li key={field}>{msgs}</li>
      })}
    </ul>
  )
}

function optionsDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="secondary">
          <Ellipsis size="16" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => signOut()}>
          Encerrar sessão
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
