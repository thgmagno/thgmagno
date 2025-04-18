'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ReactionWithCount, Reacts } from '@/lib/types'
import { useSession, signIn } from 'next-auth/react'
import { useActionState, useEffect } from 'react'
import { buttonVariants } from '../ui/button'
import { Loader2, Smile } from 'lucide-react'
import { actions } from '@/actions'
import { toast } from 'sonner'
import clsx from 'clsx'

export function Reactions({
  projectId,
  reactions,
}: {
  projectId: number
  reactions: ReactionWithCount
}) {
  const { data: session } = useSession()
  const [formState, action, isPending] = useActionState(actions.social.react, {
    errors: {},
  })

  useEffect(() => {
    if (formState.errors?._form) {
      toast.error(Object.values(formState.errors._form))
    }
  }, [formState])

  if (!projectId) return null

  const reactionsCountTotal = reactions.reduce(
    (acc, curr) => acc + curr._count,
    0,
  )

  return (
    <div className="mt-5 flex w-full flex-col space-y-4 p-10">
      <h1 className="flex-1 text-center text-lg font-bold">
        {reactionsCountTotal} {reactionsCountTotal > 1 ? 'reações' : 'reação'}
      </h1>
      <div className="flex items-center justify-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger>
            {isPending ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              <Smile className="h-6 w-6" />
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="p-3">
            <>
              <div className="flex gap-2.5">
                {Reacts.map((react, i) => (
                  <form
                    action={action}
                    key={`${react}-${i}`}
                    className={clsx({ 'opacity-30': !session })}
                  >
                    <input type="hidden" name="emoji" value={react} />
                    <input type="hidden" name="projectId" value={projectId} />
                    <button type="submit">{react}</button>
                  </form>
                ))}
              </div>
              {!session && (
                <DropdownMenuItem
                  onClick={() => signIn('github')}
                  className={clsx(
                    'mt-3 w-full',
                    buttonVariants({ variant: 'secondary' }),
                  )}
                >
                  Entrar com Github
                </DropdownMenuItem>
              )}
            </>
          </DropdownMenuContent>
        </DropdownMenu>

        {reactions.map((react) => (
          <div
            key={react.emoji}
            className="space-x-2 rounded-xl bg-neutral-800 px-2 py-1"
          >
            {react.emoji}{' '}
            <span className="text-sm font-medium">{react._count}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
