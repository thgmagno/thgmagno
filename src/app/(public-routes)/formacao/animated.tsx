'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FormationWithRelations } from '@/lib/types'
import { Badge } from '@/components/ui/badge'

export function FormacoesAnimated({
  formations,
}: {
  formations: FormationWithRelations[]
}) {
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
          <FormationCard key={formation.id} formation={formation} />
        ))}
      </motion.div>
    </>
  )
}

function FormationCard({ formation }: { formation: FormationWithRelations }) {
  const formatDate = (date: Date | null) => {
    if (!date) return 'Present'
    return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' }).format(date)
  }

  const dateRange = formation.endedAt
    ? `${formatDate(formation.startedAt)} - ${formatDate(formation.endedAt)}`
    : `${formatDate(formation.startedAt)} - Atual`

  return (
    <div className="mb-4 flex flex-col space-y-1">
      <Link
        target="_blank"
        href={formation.certificateUrl || '#'}
        className="transition-opacity duration-200 hover:opacity-80"
      >
        <div className="flex justify-between border-b pb-5">
          <div>
            <p className="flex items-center gap-2 tracking-tight text-black dark:text-white">
              {formation.title}
            </p>
            <p className="text-muted-foreground text-sm">
              {formation.institution.name}
              {formation.institution.location && (
                <span className="text-muted-foreground ml-2 text-xs">
                  ({formation.institution.location.title})
                </span>
              )}
            </p>
            <p className="text-sm text-neutral-600 tabular-nums dark:text-neutral-400">
              {dateRange}
            </p>
          </div>
          <div className="flex min-w-fit flex-col-reverse items-end gap-1 md:flex-row md:items-start">
            {!formation.endedAt && (
              <Badge variant="outline" className="text-green-500">
                Em andamento{' '}
              </Badge>
            )}
            <Badge variant="outline" className="">
              {formation.category.title}
            </Badge>
          </div>
        </div>
      </Link>
    </div>
  )
}
