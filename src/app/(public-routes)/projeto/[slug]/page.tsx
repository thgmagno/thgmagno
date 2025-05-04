import { Suspense } from 'react'
import { SlugProjetoAnimated } from './animated'
import { env } from 'root/env'
import { redirect } from 'next/navigation'
import { Params } from '@/lib/types'
import { actions } from '@/actions'

const fetcher = async (url: string) => {
  const repository = await fetch(url, {
    headers: { Authorization: `Bearer ${env.GITHUB_TOKEN}` },
    next: { revalidate: 600 },
  })
  return repository.json()
}

export default async function SlugProjeto(props: { params: Params }) {
  const params = await props.params
  const slug = params.slug

  const [project, readme, packageJson] = await Promise.all([
    fetcher(`https://api.github.com/repos/thgmagno/${slug}`),
    fetcher(`https://api.github.com/repos/thgmagno/${slug}/contents/README.md`),
    fetcher(
      `https://api.github.com/repos/thgmagno/${slug}/contents/package.json`,
    ),
  ])

  if (!project.id) redirect('/projetos')

  const [reactions, comments] = await Promise.all([
    actions.social.findReactions(project.id),
    actions.social.findComments(project.id),
  ])

  return (
    <Suspense fallback={'Carregando...'}>
      <section className="space-y-6">
        <SlugProjetoAnimated
          project={project}
          readme={Buffer.from(readme.content, 'base64').toString('utf-8')}
          packageJson={Buffer.from(packageJson.content, 'base64').toString(
            'utf-8',
          )}
          reactions={reactions}
          comments={comments}
        />
      </section>
    </Suspense>
  )
}
