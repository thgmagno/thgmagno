'use server'

import { CosmicResponse } from '@/lib/cosmic.types'
import { redirect } from 'next/navigation'

export async function fetchData(): Promise<CosmicResponse> {
  const apiURL = process.env.COSMIC_API_URL as string

  const response = await fetch(apiURL, { cache: 'no-cache' }).then((res) =>
    res.json(),
  )

  return response as CosmicResponse
}

export async function getProjectBySlug(
  slug: string,
): Promise<Partial<CosmicResponse['object']['metadata']['projects'][0]>> {
  const projects = await fetchData().then(
    (data) => data.object.metadata.projects,
  )

  const project = projects.find((project) => project.data.slug === slug)

  if (!project) redirect('/projetos')

  return project
}

export async function getRecentProjects() {
  const projects = await fetchData().then(
    (data) => data.object.metadata.projects,
  )

  const recentProjects = projects
    .sort(
      (a, b) =>
        new Date(b['created-at']).getTime() -
        new Date(a['created-at']).getTime(),
    )
    .slice(0, 3)

  return recentProjects
}

export async function getSecret() {
  return process.env.JWT_SECRET
}
