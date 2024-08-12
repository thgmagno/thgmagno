import { fetchData } from '@/actions'
import { EducationFilters } from '@/components/education/EducationFilters'
import { EducationGrid } from '@/components/education/EducationGrid'
import { Wrapper } from '@/components/wrapper'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

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
      <div className="flex items-center justify-between">
        <EducationFilters education={education} />
        <Link
          target="_blank"
          href="https://me-green-tau.vercel.app/"
          className="flex items-center gap-1 border-neutral-600 text-sm hover:border-b"
        >
          Acessar CV <ArrowUpRight size={20} />
        </Link>
      </div>
      <EducationGrid education={dataSorted} />
    </Wrapper>
  )
}
