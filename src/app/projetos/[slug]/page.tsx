import { getProjectBySlug } from '@/actions'
import { Wrapper } from '@/components/wrapper'

export default async function ProjetosSlug({
  params,
}: {
  params: { slug: string }
}) {
  const project = await getProjectBySlug(params.slug)

  return (
    <Wrapper>
      <h1>{params.slug}</h1>
      <pre>{JSON.stringify(project, null, 2)}</pre>
    </Wrapper>
  )
}
