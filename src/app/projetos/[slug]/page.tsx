import { getProjectBySlug } from '@/actions'
import { ViewProject } from '@/components/projects/ViewProject'
import { Wrapper } from '@/components/wrapper'

export default async function ProjetosSlug({
  params,
}: {
  params: { slug: string }
}) {
  const project = await getProjectBySlug(params.slug)

  return (
    <Wrapper>
      <ViewProject project={project} />
    </Wrapper>
  )
}
