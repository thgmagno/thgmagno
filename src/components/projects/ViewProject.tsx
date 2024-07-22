'use client'

import { CosmicResponse } from '@/lib/cosmic.types'
import { useLanguageStore } from '@/lib/store/languageStore'
import Image from 'next/image'
import { Badge } from '../ui/badge'
import Link from 'next/link'
import { StatusProject } from './StatusProject'
import { ArrowUpRight } from 'lucide-react'

type Props = {
  project: Partial<CosmicResponse['object']['metadata']['projects'][0]>
}

export function ViewProject({ project }: Props) {
  const { language } = useLanguageStore()
  const dateLocale = language === 'english' ? 'en-uk' : 'pt-br'

  const createdAt = new Date(
    project['created-at'] as string,
  ).toLocaleDateString(dateLocale, {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })

  const dicts = {
    publishedAt: {
      portuguese: 'Publicado em',
      english: 'Published at',
    },
    description: {
      portuguese: 'Descrição',
      english: 'Description',
    },
    objective: {
      portuguese: 'Objetivo',
      english: 'Objective',
    },
    features: {
      portuguese: 'Características',
      english: 'Features',
    },
    technologies: {
      portuguese: 'Tecnologias',
      english: 'Technologies',
    },
    website: {
      portuguese: 'Visitar o site',
      english: 'Visit the website',
    },
  }

  return (
    <>
      <section className="flex flex-wrap items-center justify-between">
        <div>
          <h1 className="text-lg">{project.data?.title}</h1>
          <span className="text-sm font-light">
            {dicts.publishedAt[language]} {createdAt}
          </span>
        </div>
        <StatusProject done={project.done as boolean} />
      </section>

      <p className="mt-3 font-light">
        {project.data?.description[language] as string}
      </p>

      <div className="relative mx-auto my-8 h-[400px] w-full opacity-90 sm:max-w-[90%] md:max-w-[60%]">
        <Image
          src={project.image?.url as string}
          alt={`Image of ${project.data?.title}`}
          layout="fill"
          objectFit="cover"
          className="w-full rounded-lg object-cover shadow ring-2 ring-neutral-500 dark:ring-zinc-600"
        />
        <div className="absolute -bottom-8 left-0 right-0 flex items-center justify-center">
          <div className="mr-3 flex-1 border-b border-neutral-500" />
          <Link
            target="_blank"
            href={project.data?.url as string}
            className="flex items-center justify-end gap-2.5 text-sm hover:underline active:scale-95"
          >
            {dicts.website[language]} <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>

      <div className="mt-5 flex flex-col space-y-5">
        <div className="flex flex-col space-y-3">
          <h2 className="font-medium">{dicts.objective[language]}:</h2>
          <p className="font-light">
            {project.data?.objective[language] as string}
          </p>
        </div>

        <div className="flex flex-col space-y-3">
          <h2 className="font-medium">{dicts.features[language]}:</h2>
          <ul className="list-inside list-disc space-y-3">
            {project.data?.features[language].map((item) => (
              <li key={item.title}>
                <b>{item.title}:</b>{' '}
                <span className="font-light">{item.description}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col space-y-3">
          <h2 className="font-medium">{dicts.technologies[language]}:</h2>
          <div className="flex flex-wrap gap-1">
            {project.data?.technologies
              .sort((a, b) => a.title.localeCompare(b.title))
              .map((item) => (
                <Link href={item.url} key={item.title}>
                  <Badge>{item.title}</Badge>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </>
  )
}
