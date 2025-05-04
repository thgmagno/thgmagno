import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { buttonVariants } from '@/components/ui/button'
import { actions } from '@/actions'
import { formatDate } from '@/lib/utils'
import { Log } from '@/lib/types'
import Link from 'next/link'
import clsx from 'clsx'

export async function FeedbacksNewest() {
  const newest = await actions.social.findNewestFeedbacks()

  return (
    <Dialog>
      <DialogTrigger
        className={buttonVariants({ variant: 'secondary', size: 'sm' })}
      >
        Recentes
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Feedbacks recentes</DialogTitle>
          <DialogDescription>
            Veja os comentários e acessos mais recentes.
          </DialogDescription>
        </DialogHeader>
        <div className="mx-auto w-full max-w-[94%]">
          {newest.map((log, index) => (
            <FeedBackNewestItem
              key={log.createdAt.getTime() + index}
              log={log}
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

function FeedBackNewestItem({ log }: { log: Log }) {
  if (log.type === 'visit') {
    return (
      <div
        className={clsx(
          'bg-card mb-2 grid grid-cols-5 items-center gap-1.5 rounded-md px-4 py-2 text-sm',
          { 'border border-emerald-500/50': !log.viewed },
        )}
      >
        <div className="col-span-4 w-full space-y-1">
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
            <span className="text-muted-foreground text-xs">Nova visita</span>
          </div>
          <p className="truncate text-sm">{log.location}</p>
        </div>
        <p className="text-muted-foreground min-w-fit text-end text-xs">
          {formatDate(log.createdAt)}
        </p>
      </div>
    )
  }

  if (log.type === 'comment') {
    return (
      <div
        className={clsx(
          'bg-card mb-2 grid grid-cols-5 items-center gap-1.5 rounded-md px-4 py-2 text-sm',
          { 'border border-emerald-500/50': !log.viewed },
        )}
      >
        <div className="col-span-4 w-full space-y-1">
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-500" />
            <span className="text-muted-foreground truncate text-xs">
              Comentário de {log.authorName}
            </span>
          </div>
          <p className="truncate text-sm">{log.comment}</p>
        </div>
        <div className="text-muted-foreground min-w-fit text-end text-xs">
          <p>{formatDate(log.createdAt)}</p>
          <Link
            href={`/projeto/id/${log.projectId}`}
            className="text-blue-500 hover:underline"
          >
            Visualizar
          </Link>
        </div>
      </div>
    )
  }

  return null
}
