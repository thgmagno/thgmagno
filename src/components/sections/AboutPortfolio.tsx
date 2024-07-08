'use client'

import { Section } from '.'
import { useLanguageStore } from '@/lib/store/languageStore'
import { CosmicResponse } from '@/lib/cosmic.types'

type Props = Pick<
  CosmicResponse['object']['metadata']['home'],
  'about-portfolio'
>

export function AboutPortfolio({ 'about-portfolio': aboutPortfolio }: Props) {
  const { language } = useLanguageStore()

  return (
    <Section title={aboutPortfolio[language].title}>
      {aboutPortfolio[language].data.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </Section>
  )
}
