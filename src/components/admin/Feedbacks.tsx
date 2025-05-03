import { actions } from '@/actions'
import { ProjectFeedback } from '@/lib/types'
import { generateTitle } from '@/lib/utils'
import { CustomCard } from './CustomCard'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { FeedbackDetails } from './FeedbackDetails'

export async function Feedbacks() {
  const projectsWithFeedback = await actions.social.findFeedbacks()

  return (
    <div className="flex flex-col space-y-4">
      <h2 className="font-semibold sm:text-xl">Feedbacks dos projetos</h2>

      {/* Projetos */}
      {projectsWithFeedback
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((project) => (
          <Project key={project.id} project={project} />
        ))}
    </div>
  )
}

function Project({ project }: { project: ProjectFeedback }) {
  return (
    <CustomCard>
      <div className="space-y-1.5">
        <div className="flex items-start justify-between gap-2">
          <div className="flex w-full flex-col sm:flex-row sm:items-center sm:gap-2">
            <b className="flex-1">{generateTitle(project.name)}</b>
          </div>
          <FeedbackDetails project={project} />
        </div>
        <div className="max-h-32 overflow-y-scroll rounded-xl">
          {project.comments.map((comment, index) => (
            <div key={index} className="border-b p-2 text-sm last:border-none">
              <small className="text-muted-foreground">
                {comment.authorName} -{' '}
                {formatDistanceToNow(new Date(comment.createdAt), {
                  addSuffix: true,
                  locale: ptBR,
                }).replace('cerca de ', '')}
              </small>
              <p>{comment.comment}</p>
            </div>
          ))}
        </div>
        <div className="mt-2 flex origin-left scale-90 items-center gap-1 text-xs md:scale-100">
          {Object.entries(project.reactions.emoji).map(([emoji, count]) => (
            <div
              key={emoji}
              className="bg-accent min-w-fit space-x-2 rounded-xl px-2 py-1"
            >
              <span className="text-sm font-medium">
                {emoji} {count}
              </span>
            </div>
          ))}
          <div className="bg-accent min-w-fit space-x-2 rounded-xl px-2 py-1">
            <span className="text-sm font-medium">
              👣 {project.visits.length}
            </span>
          </div>
        </div>
      </div>
    </CustomCard>
  )
}
