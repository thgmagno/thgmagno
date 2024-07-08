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
  const categories: string[] = Array.from(
    new Set(education.map((item) => item.category.value).sort()),
  )

  const filteredData = searchCategory
    ? education.filter((item) => searchCategory.includes(item.category.value))
    : education

  const dataSorted = filteredData?.sort((a, b) => b.duration - a.duration)

  return (
    <Wrapper>
      <EducationFilters categories={categories} />
      <EducationGrid education={dataSorted} />
    </Wrapper>
  )
}
