import { Badge } from '@/components/ui/badge'
import { findOneProject } from '@/server/actions'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
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
        {youtubeVideoId && (
          <div className="mx-auto w-[95%] max-w-2xl pt-6">
            <div
              className="relative h-0 w-full"
              style={{ paddingTop: '56.25%' }}
            >
              <iframe
                className="absolute left-0 top-0 h-full w-full rounded-xl"
                src={`https://www.youtube.com/embed/${youtubeVideoId}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
        {project.website_url && (
          <Link
            target="_blank"
            href={project.website_url}
            className="my-5 flex items-center justify-center hover:underline"
          >
            Conhecer o site
            <ArrowUpRight className="ml-2 h-5 w-5" />
          </Link>
        )}
        {project.technologies.length > 0 && (
          <div className="mx-auto w-[95%] max-w-2xl pt-6">
            <h3>Tecnologias utilizadas:</h3>
            <div className="flex flex-wrap gap-1">
              {project.technologies.map((tech) => (
                <Link
                  target="_blank"
                  key={tech.technology_id}
                  href={tech.technology_url || '#'}
                >
                  <Badge>{tech.technology_title}</Badge>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </Suspense>
  )
}

// https://youtu.be/X1DSpg5_hvc
