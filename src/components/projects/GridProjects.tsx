'use client'

import Link from 'next/link'
import { Badge } from '../ui/badge'
import { CosmicResponse } from '@/lib/cosmic.types'
import { useLanguageStore } from '@/lib/store/languageStore'
import { ImageProject } from './ImageProject'
import { StatusProject } from './StatusProject'

type Props = Pick<CosmicResponse['object']['metadata'], 'projects'>

export function GridProjects({ projects }: Props) {
  const { language } = useLanguageStore()

  const dict = {
    portuguese: {
      label: 'Saiba mais',
    },
    english: {
      label: 'Read more',
    },
  }

  return (
    <section className="mt-5 grid gap-6 md:grid-cols-2">
      {projects.map((item) => (
        <article
          key={item.data.title}
          className="cursor-default overflow-hidden rounded-lg border-l-4 border-slate-600 bg-neutral-100 pb-3 shadow-md dark:bg-neutral-800"
        >
          <ImageProject url={item.image.url} title={item.data.title} />
          <div className="relative z-10 mb-8 mt-5 max-h-20 pl-2">
            <div className="mb-2 flex justify-between">
              <b>{item.data.title}</b>
              <StatusProject done={item.done} />
            </div>
            <p className="pr-3 text-justify text-sm font-light">
              {item.data.description[language].slice(0, 130).concat('...')}
            </p>
          </div>
          <div className="relative z-10 mx-2 flex justify-between md:mt-6">
            <div className="no-scrollbar flex max-w-[60%] gap-1 overflow-x-scroll md:max-w-[70%]">
              {item.data.technologies
                .sort((a, b) => a.title.localeCompare(b.title))
                .map((tech) => (
                  <Badge className="bg-neutral-700 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-950">
                    <Link href={tech.url}>{tech.title}</Link>
                  </Badge>
                ))}
            </div>
            <Link
              href={`/projetos/${item.data.slug}`}
              className="flex items-center gap-1 rounded-md border bg-neutral-600 px-2 py-1 text-sm text-neutral-100 hover:bg-neutral-700 active:scale-95 dark:hover:bg-neutral-700"
            >
              {dict[language].label}
            </Link>
          </div>
        </article>
      ))}
    </section>
  )
}
