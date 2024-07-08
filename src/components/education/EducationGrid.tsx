import { Award } from 'lucide-react'
import { Tooltip, TooltipProvider, TooltipTrigger } from '../ui/tooltip'
import Link from 'next/link'
import Image from 'next/image'
import { CosmicResponse } from '@/lib/cosmic.types'
import { Degree } from './Degree'
import { TooltipComponent } from './TooltipComponent'

type Props = Pick<CosmicResponse['object']['metadata'], 'education'>

export function EducationGrid({ education }: Props) {
  if (!education) return null

  return (
    <section className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
      {education.map((item) => (
        <article
          key={`${item.degree}-${item['started-at']}`}
          className="relative min-h-24 cursor-default rounded-lg border-l-4 border-slate-600 bg-neutral-100 py-3 pl-2 dark:bg-neutral-800"
        >
          <div className="flex max-w-[70%] items-center text-sm">
            <Image
              src={item['instituition-logo'].url}
              alt={`Foto de ${item.instituition}`}
              width={50}
              height={50}
              className="rounded-lg"
            />
            <div className="max-w-[80%] pl-2 text-sm">
              <Degree degree={item.degree} />
              <p className="truncate">{item.instituition}</p>
              <p className="truncate">{item.duration} h</p>
            </div>
          </div>
          <div className="absolute right-1 top-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Link href={item['document-url']} target="_blank">
                    <Award size={20} className="text-slate-600" />
                  </Link>
                </TooltipTrigger>
                <TooltipComponent degree={item.degree} />
              </Tooltip>
            </TooltipProvider>
          </div>
        </article>
      ))}
    </section>
  )
}
