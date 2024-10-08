import { findOneProject } from '@/server/actions'
import { Suspense } from 'react'

export default async function SlugProjeto({
  params,
}: {
  params: { slug: string }
}) {
  const project = await findOneProject(params.slug)

  return (
    <Suspense fallback={'Carregando...'}>
      <section className="space-y-6">
        <h1 className="mb-8 text-2xl font-medium tracking-tight">
          {project.title}
        </h1>
        <p className="prose prose-neutral dark:prose-invert pt-3">
          {project.description}
        </p>
      </section>
    </Suspense>
  )
}
