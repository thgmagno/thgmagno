'use client'

import Link from 'next/link'
import { Section } from '.'
import { useLanguageStore } from '@/lib/store/languageStore'
import { CosmicResponse } from '@/lib/cosmic.types'

type Props = Pick<CosmicResponse['object']['metadata'], 'projects'>

const dicts = {
  portuguese: {
    title: 'Projetos recentes',
    labelButton: 'Ver todos',
  },
  english: {
    title: 'Recent projects',
    labelButton: 'See all',
  },
}

export function RecentProjects({ projects }: Props) {
  const { language } = useLanguageStore()

  return (
    <Section title={dicts[language].title}>
      <section className="grid gap-4 sm:grid-cols-3">
        {projects.map((item) => (
          <div
            key={item.data.slug}
            className="h-56 rounded-lg border p-2 shadow"
          >
            <h1>{item.data?.title}</h1>
          </div>
        ))}
      </section>
      <div className="flex items-start justify-center">
        <Link
          href="/projetos"
          className="rounded-full bg-neutral-500 px-4 py-1 text-neutral-100 hover:bg-neutral-600"
        >
          {dicts[language].labelButton}
        </Link>
      </div>
    </Section>
  )
}
