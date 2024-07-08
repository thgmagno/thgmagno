'use client'

import { useLanguageStore } from '@/lib/store/languageStore'

type Props = {
  degree: {
    portuguese: string
    english: string
  }
}

export function Degree({ degree }: Props) {
  const { language } = useLanguageStore()
  return (
    <p title={degree[language]} className="truncate font-medium">
      {degree[language]}
    </p>
  )
}
