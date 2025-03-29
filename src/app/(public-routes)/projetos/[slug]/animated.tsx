'use client'

import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

interface SlugProjetoAnimatedProps {
  youtubeVideoId?: string
  project: {
    title: string
    description: string
    website_url?: string | null
    repository?: string | null
    technologies: {
      technology_id: number | null
      technology_title: string | null
      technology_url: string | null
    }[]
  }
}

export function SlugProjetoAnimated({
  project,
  youtubeVideoId,
}: SlugProjetoAnimatedProps) {
  const titleVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 1 } },
  }

  const contentVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  }

  return (
    <>
      <motion.h1
        className="mb-8 text-2xl font-medium tracking-tight"
        initial="hidden"
        animate="visible"
        variants={titleVariants}
      >
        {project.title}
      </motion.h1>
      <motion.div initial="hidden" animate="visible" variants={contentVariants}>
        <p className="prose prose-neutral dark:prose-invert pt-3">
          {project.description}
        </p>

        {youtubeVideoId && (
          <div className="pt-6">
            <div
              className="relative h-0 w-full"
              style={{ paddingTop: '56.25%' }}
            >
              <iframe
                className="absolute left-0 top-0 h-full w-full rounded-xl"
                src={`https://www.youtube.com/embed/${youtubeVideoId}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}

        <div className="mt-5 flex gap-2">
          {project.website_url?.includes('https://') && (
            <Link
              target="_blank"
              href={project.website_url}
              className={buttonVariants({ variant: 'secondary' })}
            >
              Conhecer o site
              <ArrowUpRight className="ml-2 h-5 w-5" />
            </Link>
          )}

          {project.repository && (
            <Link
              target="_blank"
              href={project.repository}
              className={buttonVariants({ variant: 'secondary' })}
            >
              Repositório
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                className="ml-2"
                viewBox="0 0 496 512"
                height="1.25em"
                width="1.25em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
              </svg>
            </Link>
          )}
        </div>

        {project.technologies.length > 0 && (
          <div className="pt-6">
            <h3 className="my-3 text-lg">Tecnologias utilizadas:</h3>
            <div className="flex flex-wrap gap-1">
              {project.technologies.map((tech) => (
                <Link
                  target="_blank"
                  key={tech.technology_id}
                  href={tech.technology_url || '#'}
                >
                  <Badge>{tech.technology_title}</Badge>
                </Link>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </>
  )
}
