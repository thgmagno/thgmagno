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
        <div className="prose prose-neutral dark:prose-invert space-y-3">
          <p>
            Sempre fui ligado em tecnologia, e a minha jornada começou em 2017,
            quando realizei um curso técnico profissionalizante.
          </p>
          <p>
            Desde então, venho aprimorando minhas habilidades e me aprofundando
            nas melhores práticas do desenvolvimento de software, sempre com um
            olhar atento às novas tendências e inovações do setor.
          </p>
          <p>
            Atuo como desenvolvedor, unindo lógica e criatividade para construir
            aplicações escaláveis, seguras e eficientes. Minha experiência
            inclui o desenvolvimento de sites, landing-pages, APIs, otimizações
            de interfaces e integração de sistemas.
          </p>
          <p>
            Acredito que a tecnologia tem um impacto transformador, tanto para
            empresas quanto para pessoas. Meu objetivo é desenvolver aplicações
            que otimizem processos, melhorem a experiência do usuário e que
            tragam valor aos projetos.
          </p>
        </div>
      </motion.div>
    </section>
  )
}
