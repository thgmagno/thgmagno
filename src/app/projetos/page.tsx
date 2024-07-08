import { fetchData } from '@/actions'
import { GridProjects } from '@/components/projects/GridProjects'
import { Wrapper } from '@/components/wrapper'

export default async function Projetos() {
  const { projects } = await fetchData().then((data) => data.object.metadata)

  return (
    <Wrapper>
      <GridProjects projects={projects} />
    </Wrapper>
  )
}
