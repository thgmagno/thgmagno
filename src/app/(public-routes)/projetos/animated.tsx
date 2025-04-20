'use client'

import { generateTitle } from '@/lib/utils'
import { GithubProject } from '@/lib/types'
import { ptBR } from 'date-fns/locale'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import Link from 'next/link'

export function ProjetosAnimated({ projects }: { projects: GithubProject[] }) {
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
      {projects.map((project, index) => (
        <motion.div
          key={`${project.id}`}
          initial="hidden"
          animate="visible"
          variants={contentVariants(0.25 * index)}
        >
          <article>
            <Link
              href={`/projeto/${project.name}`}
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
                <p className="prose prose-neutral dark:prose-invert text-muted-foreground pt-3 text-sm">
                  {project.description || 'Sem descrição'}
                </p>
              </div>
            </Link>
          </article>
        </motion.div>
      ))}
    </>
  )
}
