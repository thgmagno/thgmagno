import { EducationFilters } from '@/components/education/EducationFilters'
import { EducationGrid } from '@/components/education/EducationGrid'
import { Wrapper } from '@/components/wrapper'
import { nanoid } from 'nanoid'

export default function Formacao({
  searchParams,
}: {
  searchParams: { categoria: string }
}) {
  const data = {
    instituition: 'Senai',
    degree: 'Ténico em Informática',
    duration: 1420,
    category: 'full-stack',
    imageUrl: '/logo_senai.jpg',
    documentUrl: '#',
  }

  const dataMock = Array.from({ length: 10 }, () => ({ ...data }))

  const filteredData = searchParams.categoria
    ? dataMock.filter((item) => searchParams.categoria.includes(item.category))
    : dataMock

  const dataMockFormatted = filteredData
    .map((item) => ({ ...item, id: nanoid() }))
    .sort((a, b) => b.duration - a.duration)

  return (
    <Wrapper title="Formação">
      <EducationFilters />
      <EducationGrid education={dataMockFormatted} />
    </Wrapper>
  )
}
