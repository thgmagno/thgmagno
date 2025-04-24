import { actions } from '@/actions'
import { CustomCard } from './CustomCard'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { DeleteCommentButton } from '../common/DeleteCommentButton'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '../ui/scroll-area'
import Link from 'next/link'

export async function Comments() {
  const [comments, totalReactions] = await Promise.all([
    actions.social.findAllComments(),
    actions.social.findAllReactions(),
  ])

  return (
    <>
      <div className="mb-4 flex flex-col space-y-1.5">
        <h2 className="font-semibold sm:text-xl">Feedbacks dos projetos</h2>
        <h3 className="text-muted-foreground text-sm font-semibold sm:text-base">
          Total de <span>{totalReactions} reações</span> registradas.
        </h3>
        <h3 className="text-muted-foreground text-sm font-semibold sm:text-base">
          {comments.length > 0 ? (
            <>
              Total de <span>{comments.length} comentários</span> registrados.
            </>
          ) : (
            'Nenhum comentário registrado até o momento.'
          )}
        </h3>
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
                        href={`/projeto/${comment.projectName}`}
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
