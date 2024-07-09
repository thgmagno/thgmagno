'use client'

import { useLanguageStore } from '@/lib/store/languageStore'

export function StatusProject({ done }: { done: boolean }) {
  const { language } = useLanguageStore()
  const dict = {
    portuguese: ['Finalizado', 'Em desenvolvimento'],
    english: ['Done', 'In progress'],
  }

  return (
    <>
      {done ? (
        <span className="mr-3 flex items-center gap-2">
          <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
          {dict[language][0]}
        </span>
      ) : (
        <span className="mr-3 flex items-center gap-2">
          <div className="h-2 w-2 animate-pulse rounded-full bg-amber-300" />
          {dict[language][1]}
        </span>
      )}
    </>
  )
}
