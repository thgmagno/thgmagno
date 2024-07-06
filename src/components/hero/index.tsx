import Image from 'next/image'

export function Hero() {
  return (
    <section className="mb-16 mt-6 flex items-center justify-between">
      <div className="relative">
        <h1 className="text-lg font-extralight uppercase sm:text-4xl md:text-5xl">
          Thiago Magno
        </h1>
        <h2 className="text-sm font-light sm:text-base md:text-lg">
          Desenvolvedor Web - Full stack
        </h2>
      </div>
      <div className="relative h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24">
        <Image
          src="/thiago.jpg"
          alt="Foto de Thiago magno"
          layout="fill"
          objectFit="cover"
          className="w-full rounded-full object-cover shadow ring-2 ring-neutral-400 dark:ring-neutral-600"
        />
      </div>
    </section>
  )
}
