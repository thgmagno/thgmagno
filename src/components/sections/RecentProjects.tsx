'use client'

import Link from 'next/link'
import { Section } from '.'
import { useLanguageStore } from '@/lib/store/languageStore'
import { CosmicResponse } from '@/lib/cosmic.types'
import Image from 'next/image'

type Props = Pick<CosmicResponse['object']['metadata'], 'projects'>

const dicts = {
  portuguese: {
    title: 'Projetos recentes',
    viewProjects: 'Ver todos',
    readMore: 'Saiba mais',
  },
  english: {
    title: 'Recent projects',
    viewProjects: 'See all',
    readMore: 'Read more',
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
            className="relative z-0 h-56 overflow-hidden rounded-lg border shadow"
          >
            <Image
              src={item.image.url}
              alt=""
              layout="fill"
              objectFit="cover"
              className="w-full object-cover opacity-85 dark:opacity-35"
            />
            <div className="relative z-10 flex w-full justify-between border-b bg-neutral-600/80 p-2 text-white shadow dark:border-neutral-900/30 dark:bg-neutral-900/80">
              <h1>{item.data?.title}</h1>
              <Link
                href={`/projetos/${item.data.slug}`}
                className="flex items-center rounded border px-2 text-xs dark:bg-neutral-800"
              >
                {dicts[language].readMore}
              </Link>
            </div>
          </div>
        ))}
      </section>
      <div className="flex items-start justify-center">
        <Link
          href="/projetos"
          className="rounded-full bg-neutral-500 px-4 py-1 text-neutral-100 hover:bg-neutral-600"
        >
          {dicts[language].viewProjects}
        </Link>
      </div>
    </Section>
  )
}
