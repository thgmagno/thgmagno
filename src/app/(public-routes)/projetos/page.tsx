import { findManyProjects } from '@/server/actions'
import { Suspense } from 'react'
import { ProjetosAnimated } from './animated'

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
        <ProjetosAnimated searchParams={searchParams} pagination={pagination} />
      </section>
    </Suspense>
  )
}
