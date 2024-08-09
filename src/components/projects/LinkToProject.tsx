import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  imageUrl: string
  title: string
  url: string
  language: 'portuguese' | 'english'
}

const dicts = {
  website: {
    portuguese: 'Visitar o site',
    english: 'Visit the website',
  },
}

export function LinkToProject({ imageUrl, title, url, language }: Props) {
  return (
    <div className="relative mx-auto my-8 h-[400px] w-full opacity-90 sm:max-w-[90%] md:max-w-[60%]">
      <Image
        src={imageUrl}
        alt={`Image of ${title}`}
        layout="fill"
        objectFit="cover"
        className="w-full rounded-lg object-cover shadow ring-2 ring-neutral-500 dark:ring-zinc-600"
      />
      <div className="absolute -bottom-8 left-0 right-0 flex items-center justify-center">
        <div className="mr-3 flex-1 border-b border-neutral-500" />
        <Link
          target="_blank"
          href={url}
          className="flex items-center justify-end gap-2.5 text-sm hover:underline active:scale-95"
        >
          {dicts.website[language]} <ArrowUpRight size={16} />
        </Link>
      </div>
    </div>
  )
}
