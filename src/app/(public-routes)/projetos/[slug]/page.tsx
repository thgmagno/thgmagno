import { findOneProject } from '@/server/actions'
import { Suspense } from 'react'

export default async function SlugProjeto({
  params,
}: {
  params: { slug: string }
}) {
  const project = await findOneProject(params.slug)
  const youtubeVideoUrl = project.presentation_video_url || ''
  const youtubeVideoId = youtubeVideoUrl.split('/').pop() || ''

  return (
    <Suspense fallback={'Carregando...'}>
      <section className="space-y-6">
        <h1 className="mb-8 text-2xl font-medium tracking-tight">
          {project.title}
        </h1>
        <p className="prose prose-neutral dark:prose-invert pt-3">
          {project.description}
        </p>
        {youtubeVideoId !== '' && (
          <div className="pt-6">
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${youtubeVideoId}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </section>
    </Suspense>
  )
}

// https://youtu.be/X1DSpg5_hvc
