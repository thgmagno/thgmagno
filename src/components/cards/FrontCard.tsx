import { Pointer } from 'lucide-react'
import Image from 'next/image'

interface Props {
  occupationArea: string
  setSide: () => void
}

export const FrontCard = ({ occupationArea, setSide }: Props) => {
  return (
    <section className="mb-16 mt-6 rounded-xl border border-neutral-400 bg-gradient-to-r from-neutral-300 to-neutral-400/60 px-3 py-4 shadow-md dark:border-neutral-800 dark:from-zinc-800 dark:to-slate-800">
      <article className="flex items-center justify-between">
        <div className="relative">
          <h1 className="text-2xl font-extralight uppercase sm:text-4xl md:text-5xl">
            Thiago Magno
          </h1>
          <h2 className="relative top-3 text-sm font-light sm:text-base md:text-lg">
            {occupationArea}
          </h2>
        </div>
        <div className="relative h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24">
          <Image
            src="/thiago.jpg"
            alt="Foto de Thiago magno"
            layout="fill"
            objectFit="cover"
            className="w-full rounded-full object-cover shadow ring-2 ring-neutral-500 dark:ring-zinc-600"
          />
        </div>
      </article>
      <article className="mt-5 flex justify-end">
        <button>
          <Pointer
            size={20}
            onClick={setSide}
            className="text-zinc-500 active:scale-95"
          />
        </button>
      </article>
    </section>
  )
}
