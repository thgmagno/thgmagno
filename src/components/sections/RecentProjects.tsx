'use client'

import { Section } from '.'
import { useLanguageStore } from '@/lib/store/languageStore'
import { ProjectRecents } from '../projects/ProjectRecents'

const dicts = {
  portuguese: {
    recentProjects: {
      title: 'Projetos recentes',
      labelButton: 'Ver todos',
    },
  },
  english: {
    recentProjects: {
      title: 'Recent projects',
      labelButton: 'See all',
    },
  },
}

export function RecentProjects() {
  const { language } = useLanguageStore()

  return (
    <Section title={dicts[language].recentProjects.title}>
      <ProjectRecents
        labelButton={dicts[language].recentProjects.labelButton}
      />
    </Section>
  )
}
