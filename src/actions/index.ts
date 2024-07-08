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
