import Image from 'next/image'

export default function Home() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-medium tracking-tight">
        Desenvolvedor web full-stack
      </h1>
      <Image
        src="/toggle.svg"
        height={160}
        width={160}
        alt="Foto de Thiago Magno"
        className="mx-auto mb-10 mt-0 block rounded-full bg-gray-100 grayscale hover:grayscale-0 sm:float-right sm:mb-5 sm:ml-5 lg:mb-5 lg:mt-5"
      />
      <p>
        Sempre fui ligado em tecnologia, e a minha jornada começou em 2017,
        quando realizei um curso técnico profissionalizante.{' '}
      </p>
      <p>
        Desde então, venho me dedicando à programação, buscando aplicar as
        melhores práticas do mercado e mantendo a mente aberta para novas ideias
        e tecnologias.
      </p>
      <p>
        Eu acredito que a tecnologia pode transformar vidas e negócios, e o meu
        objetivo é combinar criatividade e tecnologia.
      </p>
    </section>
  )
}
