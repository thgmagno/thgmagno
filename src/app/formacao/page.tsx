import { fetchData } from '@/actions'
import { EducationFilters } from '@/components/education/EducationFilters'
import { EducationGrid } from '@/components/education/EducationGrid'
import { Wrapper } from '@/components/wrapper'

export default async function Formacao({
  searchParams,
}: {
  searchParams: { categoria: string | null }
}) {
  const { education } = await fetchData().then((data) => data.object.metadata)
  const searchCategory = searchParams.categoria

  const filteredData = searchCategory
    ? education.filter((item) => searchCategory.includes(item.category.value))
    : education

  const dataSorted = filteredData.sort((a, b) => b.duration - a.duration)

  return (
    <Wrapper>
      <EducationFilters education={education} />
      <EducationGrid education={dataSorted} />
    </Wrapper>
  )
}
