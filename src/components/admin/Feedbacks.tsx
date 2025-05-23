import { actions } from '@/actions'
import { ProjectFeedback } from '@/lib/types'
import { generateTitle } from '@/lib/utils'
import { CustomCard } from '@/components/admin/CustomCard'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { FeedbackDetails } from '@/components/admin/FeedbackDetails'
import { FeedbacksNewest } from '@/components/admin/FeedbacksNewest'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'

export async function Feedbacks() {
  const projectsWithFeedback = await actions.social.findFeedbacks()

  if (!projectsWithFeedback.success || !projectsWithFeedback.data) {
    return (
      <div className="flex flex-col space-y-4">
        <h2 className="font-semibold sm:text-xl">
          {projectsWithFeedback.error}
        </h2>
        <Link href="/admin" className={buttonVariants({ size: 'sm' })}>
          Tentar novamente!
        </Link>
      </div>
    )
  }

  const projects = projectsWithFeedback.data

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold sm:text-xl">Feedbacks dos projetos</h2>
        <FeedbacksNewest />
      </div>

      {/* Projetos */}
      {projects
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
        <div className="flex items-center gap-2">
          <div className="flex w-full flex-col sm:flex-row sm:items-center sm:gap-2">
            <b>{generateTitle(project.name)}</b>
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
        <div className="mt-3 mr-1 flex justify-between">
          <div className="flex origin-left scale-90 items-center gap-1 text-xs md:scale-100">
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
          </div>
          <div
            className="bg-accent min-w-fit space-x-2 rounded-xl px-2"
            hidden={!project.visits.length}
          >
            <span className="text-xs font-medium">
              {project.visits.length}{' '}
              {project.visits.length === 1 ? 'visita' : 'visitas'}
            </span>
          </div>
        </div>
      </div>
    </CustomCard>
  )
}
