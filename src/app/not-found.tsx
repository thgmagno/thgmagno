'use client'

import Link from 'next/link'
import mapsWhite from '@/assets/svg/maps_white.svg'
import mapsBlack from '@/assets/svg/maps_black.svg'
import Image from 'next/image'
import { useLanguageStore } from '@/lib/store/languageStore'

export default function NotFound() {
  const { language } = useLanguageStore()

  const dicts = {
    portuguese: {
      title: 'Oops!',
      subtitle: 'Página não encontrada',
      action: 'Voltar para tela inicial',
    },
    english: {
      title: 'Oops!',
      subtitle: 'Could not find requested resource',
      action: 'Return Home',
    },
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="-translate-y-28">
        <div className="flex items-center gap-3">
          <Image
            src={mapsWhite}
            height={75}
            width={75}
            alt="icon"
            className="hidden dark:inline-flex"
          />
          <Image
            src={mapsBlack}
            height={75}
            width={75}
            alt="icon"
            className="inline-flex dark:hidden"
          />
          <h2 className="flex text-2xl">{dicts[language].title}</h2>
        </div>
        <p>{dicts[language].subtitle}</p>
        <Link href="/" className="underline">
          {dicts[language].action}
        </Link>
      </div>
    </div>
  )
}
