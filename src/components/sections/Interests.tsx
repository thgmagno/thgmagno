'use client'

import { Section } from '.'
import { useLanguageStore } from '@/lib/store/languageStore'
import { CosmicResponse } from '@/lib/cosmic.types'

type Props = Pick<CosmicResponse['object']['metadata']['home'], 'interests'>

export function Interests({ interests }: Props) {
  const { language } = useLanguageStore()

  return (
    <Section title={interests[language].title}>
      {interests[language].data.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </Section>
  )
}
