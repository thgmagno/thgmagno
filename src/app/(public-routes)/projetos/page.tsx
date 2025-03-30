import { Suspense } from 'react'
import { ProjetosAnimated } from './animated'
import { GithubProject } from '@/lib/types'
import { env } from 'root/env'

const fetcherRepositories = async (): Promise<GithubProject[]> =>
  fetch(`https://api.github.com/user/repos`, {
    headers: {
      Authorization: `Bearer ${env.GITHUB_TOKEN}`,
    },
    next: {
      revalidate: 1800,
    },
  }).then((res) => res.json())

export default async function Projetos() {
  const projects = await fetcherRepositories()

  return (
    <Suspense fallback={'Carregando...'}>
      <section className="space-y-6">
        <ProjetosAnimated projects={projects} />
      </section>
    </Suspense>
  )
}
