import { Formation } from '@/lib/types'
import { findManyFormations } from '@/server/actions'
import Link from 'next/link'

export default async function Formacoes() {
  const formations = await findManyFormations()

  return (
    <section className="space-y-6">
      <h1 className="mb-8 text-2xl font-medium tracking-tight">Formação</h1>
      {formations.map((formation) => (
        <Formacao key={formation.id} formation={formation} />
      ))}
    </section>
  )
}

function Formacao({ formation }: { formation: Formation }) {
  return (
    <Link
      href="/blog/getting-started"
      className="mb-4 flex flex-col space-y-1 transition-opacity duration-200 hover:opacity-80"
    >
      <div className="flex w-full flex-col items-start justify-between space-y-1 sm:flex-row sm:items-center sm:space-x-2 sm:space-y-0">
        <div className="flex flex-col">
          <p className="tracking-tight text-black dark:text-white">
            {formation.title}
          </p>
          <p className="text-sm text-muted-foreground">
            {formation.institution}
          </p>
        </div>
        <p className="text-sm tabular-nums text-neutral-600 dark:text-neutral-400">
          {formation.duration_time} horas
        </p>
      </div>
    </Link>
  )
}
