'use client'

import { GithubProject } from '@/lib/types'
import { ptBR } from 'date-fns/locale'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import Link from 'next/link'
import { ArrowDownAz, ArrowUpAz } from 'lucide-react'
import { useState } from 'react'
import { generateTitle } from '@/lib/utils'

export function ProjetosAnimated({ projects }: { projects: GithubProject[] }) {
  const [order, setOrder] = useState<'asc' | 'desc'>('asc')

  const titleVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 1 } },
  }

  const contentVariants = (delay: number) => ({
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, delay },
    },
  })

  const projectsSorted =
    order === 'asc'
      ? projects.sort((a, b) => a.name.localeCompare(b.name))
      : projects.sort((a, b) => b.name.localeCompare(a.name))

  return (
    <>
      <div className="flex items-center justify-between">
        <motion.h1
          className="mb-8 text-2xl font-medium tracking-tight"
          initial="hidden"
          animate="visible"
          variants={titleVariants}
        >
          Projetos
        </motion.h1>
        <div>
          {order === 'asc' ? (
            <ArrowDownAz
              onClick={() => setOrder('desc')}
              className="h-5 w-5 cursor-pointer"
            />
          ) : (
            <ArrowUpAz
              onClick={() => setOrder('asc')}
              className="h-5 w-5 cursor-pointer"
            />
          )}
        </div>
      </div>
      {projectsSorted.map((project, index) => (
        <motion.div
          key={`${project.id}`}
          initial="hidden"
          animate="visible"
          variants={contentVariants(0.25 * index)}
        >
          <Projeto project={project} />
        </motion.div>
      ))}
    </>
  )
}

const Projeto = ({ project }: { project: GithubProject }) => {
  return (
    <article>
      <Link
        href={`/projetos/${project.name}`}
        className="group block transition-opacity duration-200 hover:opacity-80"
      >
        <div className="flex flex-col">
          <div className="flex w-full items-baseline justify-between">
            <span className="font-semibold tracking-tight text-black dark:text-white">
              {generateTitle(project.name)}
            </span>
            <span className="text-sm text-neutral-600 tabular-nums dark:text-neutral-400">
              {format(new Date(project.created_at), "MMM'. de 'yy", {
                locale: ptBR,
              })}
            </span>
          </div>
          <p className="prose prose-neutral dark:prose-invert pt-3 text-sm text-neutral-300">
            {project.description || 'Sem descrição'}
          </p>
        </div>
      </Link>
    </article>
  )
}
