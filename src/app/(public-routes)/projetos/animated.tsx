'use client'

import { SortSelector } from '@/components/common/SortSelector'
// import { Pagination } from '@/components/ui/pagination'
import { Project } from '@/lib/types'
import { ptBR } from 'date-fns/locale'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import Link from 'next/link'

interface ProjetosAnimatedProps {
  searchParams: { ordenacao?: string; pagina?: string; limite?: string }
  pagination: {
    projects: Project[]
    totalPages: number
    currentPage: number
  }
}

export function ProjetosAnimated({
  pagination,
  searchParams,
}: ProjetosAnimatedProps) {
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
        <SortSelector ordenacao={searchParams.ordenacao} />
      </div>
      {pagination.projects.map((project, index) => (
        <motion.div
          key={`${project.id}`}
          initial="hidden"
          animate="visible"
          variants={contentVariants(0.25 * index)}
        >
          <Projeto project={project} />
        </motion.div>
      ))}
      {/* {pagination.totalPages > 1 && <Pagination pagination={pagination} />} */}
    </>
  )
}

const Projeto = ({ project }: { project: Project }) => {
  return (
    <article>
      <Link
        href={`/projetos/${project.slug}`}
        className="group block transition-opacity duration-200 hover:opacity-80"
      >
        <div className="flex flex-col">
          <div className="flex w-full items-baseline justify-between">
            <span className="font-semibold tracking-tight text-black dark:text-white">
              {project.title}
            </span>
            <span className="text-sm tabular-nums text-neutral-600 dark:text-neutral-400">
              {format(new Date(project.created_at), "MMM'. de 'yy", {
                locale: ptBR,
              })}
            </span>
          </div>
          <p className="prose prose-neutral dark:prose-invert pt-3">
            {project.description.slice(0, 180).concat('...')}
          </p>
        </div>
      </Link>
    </article>
  )
}
