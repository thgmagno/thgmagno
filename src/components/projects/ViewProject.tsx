'use client'

import { CosmicResponse } from '@/lib/cosmic.types'
import { useLanguageStore } from '@/lib/store/languageStore'
import Image from 'next/image'
import { ReactNode } from 'react'
import { Badge } from '../ui/badge'
import Link from 'next/link'
import { StatusProject } from './StatusProject'

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

  const Wrapper = ({
    title,
    children,
  }: {
    title: string
    children: ReactNode
  }) => (
    <section>
      <label className="underline">{title}</label>
      {children}
    </section>
  )

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

      <Wrapper title={dicts.description[language]}>
        <p className="font-light">
          {project.data?.description[language] as string}
        </p>
      </Wrapper>

      <div className="relative mx-auto my-8 h-[400px] w-full opacity-90 sm:max-w-[90%] md:max-w-[60%]">
        <Image
          src={project.image?.url as string}
          alt={''}
          layout="fill"
          objectFit="cover"
          className="w-full rounded-lg object-cover shadow ring-2 ring-neutral-500 dark:ring-zinc-600"
        />
      </div>

      <Wrapper title={dicts.objective[language]}>
        <p className="font-light">
          {project.data?.objective[language] as string}
        </p>
      </Wrapper>

      <Wrapper title={dicts.features[language]}>
        {project.data?.features[language].map((item) => (
          <p key={item.title}>
            <b>{item.title}:</b>{' '}
            <span className="font-light">{item.description}</span>
          </p>
        ))}
      </Wrapper>

      <Wrapper title={dicts.technologies[language]}>
        {project.data?.technologies.map((item) => (
          <Link href={item.url} key={item.title}>
            <Badge>{item.title}</Badge>
          </Link>
        ))}
      </Wrapper>
    </>
  )
}
