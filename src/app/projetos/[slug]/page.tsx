import { getProjectBySlug } from '@/server/actions'

export default async function SlugProjeto({
  params,
}: {
  params: { slug: string }
}) {
  const project = await getProjectBySlug(params.slug)

  return (
    <section className="space-y-6">
      <h1 className="mb-8 text-2xl font-medium tracking-tight">
        {project.title}
      </h1>
    </section>
  )
}
