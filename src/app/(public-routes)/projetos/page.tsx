import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Pagination } from '@/components/common/Pagination'
import { SortSelector } from '@/components/common/SortSelector'
import { Project } from '@/lib/types'
import { findManyProjects } from '@/server/actions'
import Link from 'next/link'
import { Suspense } from 'react'

export default async function Projetos({
  searchParams,
}: {
  searchParams: { ordenacao?: string; pagina?: string; limite?: string }
}) {
  const page = Number(searchParams.pagina) || 1
  const limit = Number(searchParams.limite) || 10
  const pagination = await findManyProjects(
    page,
    limit,
    !!searchParams.ordenacao,
  )

  return (
    <Suspense fallback={'Carregando...'}>
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="mb-8 text-2xl font-medium tracking-tight">Projetos</h1>
          <SortSelector ordenacao={searchParams.ordenacao} />
        </div>
        {pagination.projects.map((project) => (
          <Projeto key={project.id} project={project} />
        ))}
        {pagination.totalPages > 1 && <Pagination pagination={pagination} />}
      </section>
    </Suspense>
  )
}

const Projeto = ({ project }: { project: Project }) => {
  return (
    <article>
      <Link
        href={`/projetos/${project.slug}`}
        className="group block transition-opacity duration-200 hover:opacity-80"
      >
        <div className="flex flex-col">
          <div className="flex w-full items-baseline justify-between">
            <span className="font-semibold tracking-tight text-black dark:text-white">
              {project.title}
            </span>
            <span className="text-sm tabular-nums text-neutral-600 dark:text-neutral-400">
              {format(new Date(project.created_at), "MMM'. de 'yy", {
                locale: ptBR,
              })}
            </span>
          </div>
          <p className="prose prose-neutral dark:prose-invert pt-3">
            {project.description.slice(0, 180).concat('...')}
          </p>
        </div>
      </Link>
    </article>
  )
}
