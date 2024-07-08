'use client'

import { Section } from '.'
import { useLanguageStore } from '@/lib/store/languageStore'
import { CosmicResponse } from '@/lib/cosmic.types'

type Props = Pick<CosmicResponse['object']['metadata']['home'], 'about-me'>

export function AboutMe({ 'about-me': aboutMe }: Props) {
  const { language } = useLanguageStore()

  return (
    <Section title={aboutMe[language].title}>
      {aboutMe[language].data.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </Section>
  )
}
