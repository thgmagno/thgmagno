import { actions } from '@/actions'
import { CustomCard } from './CustomCard'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { DeleteCommentButton } from '../common/DeleteCommentButton'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '../ui/scroll-area'
import Link from 'next/link'

export async function Comments() {
  const comments = await actions.social.findAllComments()

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-semibold sm:text-xl">Comentários dos projetos</h2>
      </div>
      <ScrollArea className="h-[36rem] pr-4">
        <div className="grid gap-4">
          {comments.map((comment) => (
            <CustomCard key={comment.id}>
              <div className="relative space-y-3 p-1">
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
                        href={`/projetos/${comment.projectName}`}
                        className="group block text-sm text-blue-500 transition-opacity duration-200 hover:opacity-80"
                      >
                        {comment.projectName}
                      </Link>
                      <p className="flex flex-col-reverse text-sm sm:flex-row sm:items-center">
                        <span>{comment.authorName}</span>
                        <span className="min-w-fit text-xs text-neutral-400 sm:ml-2">
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
          ))}
        </div>
      </ScrollArea>
    </>
  )
}
