'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '../ui/badge'
import { CosmicResponse } from '@/lib/cosmic.types'
import { useLanguageStore } from '@/lib/store/languageStore'

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
          className="cursor-default overflow-hidden rounded-lg border-l-4 border-slate-600 bg-neutral-800 pb-3 text-white"
        >
          <div className="relative min-h-32 w-full">
            <Image
              src={item.image.url}
              fill
              alt={`Image of ${item.data.title}`}
              className="absolute left-0 top-0 object-cover opacity-20 dark:opacity-80"
            />
          </div>
          <div className="relative z-10 mb-8 mt-5 max-h-20 pl-2">
            <b>{item.data.title}</b>
            <p className="text-sm font-light">
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
              className="flex items-center gap-1 rounded-md border px-2 py-1 text-sm hover:bg-neutral-700 active:scale-95"
            >
              {dict[language].label}
            </Link>
          </div>
        </article>
      ))}
    </section>
  )
}
