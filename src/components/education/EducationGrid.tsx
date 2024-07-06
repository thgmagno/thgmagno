import { Award } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip'
import Link from 'next/link'
import Image from 'next/image'

interface Props {
  education: {
    id: string
    instituition: string
    degree: string
    duration: number
    category: string
    imageUrl: string
    documentUrl: string
  }[]
}

export function EducationGrid({ education }: Props) {
  if (!education) return null

  return (
    <section className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {education.map((item) => (
        <article
          key={item.id}
          className="relative min-h-24 cursor-default rounded-lg border-l-4 border-slate-600 bg-slate-400 py-3 pl-2 dark:bg-neutral-800"
        >
          <div className="flex max-w-[70%] items-center text-sm">
            <Image
              src={item.imageUrl}
              alt={`Foto de ${item.instituition}`}
              width={50}
              height={50}
              className="rounded-lg"
            />
            <div className="pl-2 text-sm">
              <p className="truncate font-medium">{item.degree}</p>
              <p className="truncate">{item.instituition}</p>
              <p className="truncate">{item.duration} h</p>
            </div>
          </div>
          <div className="absolute right-1 top-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Link href={item.documentUrl}>
                    <Award size={20} className="text-slate-600" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  Acessar o certificado de {item.degree}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </article>
      ))}
    </section>
  )
}
