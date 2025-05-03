import { CustomCard } from './CustomCard'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { DeleteCommentButton } from '../common/DeleteCommentButton'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
import { Comment as CommentType } from '@prisma/client'

export function Comment({
  comment,
}: {
  comment: CommentType & { projectName: string }
}) {
  return (
    <CustomCard>
      <div className="relative space-y-3 p-1">
        {comment.deletedAt && (
          <p className="border-b pb-3 text-center text-xs text-red-400">
            Deletado pelo autor{' '}
            {formatDistanceToNow(new Date(comment.deletedAt), {
              addSuffix: true,
              locale: ptBR,
            })}
          </p>
        )}
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
              <Link
                href={`/projeto/${comment.projectName}`}
                className="group block text-sm text-blue-500 transition-opacity duration-200 hover:opacity-80"
              >
                {comment.projectName}
              </Link>
              <p className="flex flex-col-reverse text-sm sm:flex-row sm:items-center">
                <span>{comment.authorName}</span>
                <span className="min-w-fit border-l-2 pl-2 text-xs text-neutral-400 sm:ml-2">
                  {formatDistanceToNow(new Date(comment.createdAt), {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </span>
              </p>
              <p className="text-muted-foreground text-xs font-light">
                {comment.authorEmail}
              </p>
            </div>
          </div>
          <DeleteCommentButton
            comment={comment.comment}
            commentId={comment.id}
            projectId={comment.projectId}
          />
        </div>
        <div className="text-sm">{comment.comment}</div>
      </div>
    </CustomCard>
  )
}
