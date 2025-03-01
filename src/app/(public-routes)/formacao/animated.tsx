'use client'

import { motion } from 'framer-motion'
import { Formation } from '@/lib/types'
import Link from 'next/link'

export function FormacoesAnimated({ formations }: { formations: Formation[] }) {
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
        Formação
      </motion.h1>
      <motion.div initial="hidden" animate="visible" variants={contentVariants}>
        {formations.map((formation) => (
          <Formacao key={`${formation.id}`} formation={formation} />
        ))}
      </motion.div>
    </>
  )
}

function Formacao({ formation }: { formation: Formation }) {
  return (
    <Link
      target="_blank"
      href={formation.certificate_url || '#'}
      className="mb-4 flex flex-col space-y-1 transition-opacity duration-200 hover:opacity-80"
    >
      <div className="flex w-full flex-col items-start justify-between space-y-1 sm:flex-row sm:items-center sm:space-x-2 sm:space-y-0">
        <div className="flex flex-col">
          <p className="tracking-tight text-black dark:text-white">
            {formation.title}
          </p>
          <p className="text-sm text-muted-foreground">
            {formation.institution}
          </p>
        </div>
        <p className="text-sm tabular-nums text-neutral-600 dark:text-neutral-400">
          {formation.duration_time} horas
        </p>
      </div>
    </Link>
  )
}
