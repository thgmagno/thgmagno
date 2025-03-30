import { Suspense } from 'react'
import { SlugProjetoAnimated } from './animated'
import { env } from 'root/env'
import { redirect } from 'next/navigation'

const fetcher = async (url: string) => {
  const repository = await fetch(url, {
    headers: {
      Authorization: `Bearer ${env.GITHUB_TOKEN}`,
    },
  })
  return repository.json()
}

export default async function SlugProjeto({
  params,
}: {
  params: { slug: string }
}) {
  const [project, readme, packageJson] = await Promise.all([
    fetcher(`https://api.github.com/repos/thgmagno/${params.slug}`),
    fetcher(
      `https://api.github.com/repos/thgmagno/${params.slug}/contents/README.md`,
    ),
    fetcher(
      `https://api.github.com/repos/thgmagno/${params.slug}/contents/package.json`,
    ),
  ])

  if (!project) redirect('/projetos')

  return (
    <Suspense fallback={'Carregando...'}>
      <section className="space-y-6">
        <SlugProjetoAnimated
          project={project}
          readme={Buffer.from(readme.content, 'base64').toString('utf-8')}
          packageJson={Buffer.from(packageJson.content, 'base64').toString(
            'utf-8',
          )}
        />
      </section>
    </Suspense>
  )
}
