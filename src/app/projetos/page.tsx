import { SortSelector } from '@/components/common/SortSelector'
import { Project } from '@/lib/types'
import { findManyProjects } from '@/server/actions'
import Link from 'next/link'

export default async function Projetos({
  searchParams,
}: {
  searchParams: { ordenacao?: string; pagina?: string; limite?: string }
}) {
  const pagina = Number(searchParams.pagina) || 1
  const limite = Number(searchParams.limite) || 10
  const projetos = await findManyProjects(
    pagina,
    limite,
    !!searchParams.ordenacao,
  )

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="mb-8 text-2xl font-medium tracking-tight">Projetos</h1>
        <SortSelector ordenacao={searchParams.ordenacao} />
      </div>
      {projetos.map((project) => (
        <Projeto key={project.id} project={project} />
      ))}
    </section>
  )
}

const Projeto = ({ project }: { project: Project }) => {
  return (
    <article>
      <Link
        target="_blank"
        href={project.website_url ?? '#'}
        className="group block transition-opacity duration-200 hover:opacity-80"
      >
        <div className="flex flex-col">
          <div className="flex w-full items-baseline justify-between">
            <span className="font-semibold tracking-tight text-black dark:text-white">
              {project.title}
            </span>
            <span className="text-sm tabular-nums text-neutral-600 dark:text-neutral-400">
              {project.created_at.toLocaleDateString('pt-br', {
                month: 'short',
                year: '2-digit',
              })}
            </span>
          </div>
          <p className="prose prose-neutral dark:prose-invert pt-3">
            {project.description}
          </p>
        </div>
      </Link>
    </article>
  )
}
