'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Home() {
  const imageVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  }

  const contentVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  }

  return (
    <section className="px-2 py-6 md:px-0">
      <motion.div initial="hidden" animate="visible" variants={imageVariants}>
        <Image
          src="https://github.com/thgmagno.png"
          height={150}
          width={150}
          alt="Foto de Thiago Magno"
          className="mx-auto mt-0 mb-10 block rounded-full bg-gray-100 sm:float-right sm:mb-5 sm:ml-5 lg:mt-5 lg:mb-5"
        />
      </motion.div>
      <motion.div initial="hidden" animate="visible" variants={contentVariants}>
        <h1 className="mb-8 text-2xl font-medium tracking-tight">
          Desenvolvedor web full-stack
        </h1>
        <div className="prose prose-neutral dark:prose-invert">
          <p>
            Sempre fui ligado em tecnologia, e a minha jornada começou em 2017,
            quando realizei um curso técnico profissionalizante.
          </p>
          <p>
            Desde então, venho me dedicando à programação, buscando aplicar as
            melhores práticas do mercado e mantendo a mente aberta para novas
            ideias e tecnologias.
          </p>
          <p>
            Eu acredito que a tecnologia pode transformar vidas e negócios, e o
            meu objetivo é combinar criatividade e tecnologia.
          </p>
        </div>
      </motion.div>
    </section>
  )
}
