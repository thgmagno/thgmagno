'use client'

import { useLanguageStore } from '@/lib/store/languageStore'
import { TooltipContent } from '../ui/tooltip'

type Props = {
  degree: {
    portuguese: string
    english: string
  }
}

export function TooltipComponent({ degree }: Props) {
  const { language } = useLanguageStore()
  const text = {
    portuguese: `Visualizar certificado de ${degree.portuguese}`,
    english: `View ${degree.english} certificate`,
  }
  return <TooltipContent>{text[language]}</TooltipContent>
}
