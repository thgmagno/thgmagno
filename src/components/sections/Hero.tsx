'use client'

import { useLanguageStore } from '@/lib/store/languageStore'
import { Badge } from '../ui/badge'
import Link from 'next/link'
import Image from 'next/image'
import { CosmicResponse } from '@/lib/cosmic.types'

type Props = Pick<
  CosmicResponse['object']['metadata']['home'],
  'fullname' | 'image-profile' | 'occupation-area' | 'social'
>

export function Hero({
  fullname,
  'image-profile': imageProfile,
  'occupation-area': occupationArea,
  social,
}: Props) {
  const { language } = useLanguageStore()

  const SocialBadge = ({ href, label }: { href: string; label: string }) => (
    <Badge className="bg-neutral-600 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-900">
      <Link href={href}>{label}</Link>
    </Badge>
  )

  return (
    <section className="mb-16 mt-6 rounded-xl border border-neutral-400 bg-slate-200 px-3 py-4 shadow-md dark:border-neutral-800 dark:bg-neutral-900">
      <article className="flex items-center justify-between">
        <div className="max-w-[70%]">
          <h1 className="text-2xl font-extralight uppercase sm:text-4xl md:text-5xl">
            {fullname}
          </h1>
          <h2 className="mt-2 text-xs font-light sm:text-base md:text-lg">
            {occupationArea[language]}
          </h2>
          <div className="mt-3 flex origin-left scale-75 transform gap-2 md:scale-100">
            {social.map((item) => (
              <SocialBadge
                key={item.label}
                href={item.href}
                label={item.label}
              />
            ))}
          </div>
        </div>
        <div className="relative h-20 w-20 sm:h-28 sm:w-28 md:h-32 md:w-32">
          <Image
            src={imageProfile.url}
            alt={`Foto de ${fullname}`}
            layout="fill"
            objectFit="cover"
            className="w-full rounded-full object-cover shadow ring-2 ring-neutral-500 dark:ring-zinc-600"
          />
        </div>
      </article>
    </section>
  )
}
