import { findOneProject } from '@/server/actions'
import { Suspense } from 'react'
import { SlugProjetoAnimated } from './animated'

export default async function SlugProjeto({
  params,
}: {
  params: { slug: string }
}) {
  const project = await findOneProject(params.slug)

  const youtubeVideoUrl = project.presentation_video_url || ''
  const youtubeVideoId = youtubeVideoUrl.includes('https://')
    ? youtubeVideoUrl.split('/').pop()
    : ''

  return (
    <Suspense fallback={'Carregando...'}>
      <section className="space-y-6">
        <SlugProjetoAnimated
          project={project}
          youtubeVideoId={youtubeVideoId}
        />
      </section>
    </Suspense>
  )
}

// https://youtu.be/X1DSpg5_hvc
