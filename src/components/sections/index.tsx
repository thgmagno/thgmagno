'use client'

import { ReactNode, useState } from 'react'
import { useLanguageStore } from '@/lib/store/languageStore'
import { ProjectRecents } from '../projects/ProjectRecents'
import { FrontCard } from '../cards/FrontCard'
import { BackCard } from '../cards/BackCard'

const Section = ({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) => (
  <section className="mb-14 flex flex-col space-y-5 text-justify">
    <div className="flex items-center">
      <div className="mr-4 flex-1 border-b border-neutral-400 dark:border-neutral-700" />
      <h3 className="flex text-xl">{title}</h3>
      <div className="ml-4 flex-1 border-b border-neutral-400 dark:border-neutral-700" />
    </div>
    {children}
  </section>
)

const dicts = {
  portuguese: {
    hero: {
      occupationArea: 'Desenvolvedor Web - Full stack',
    },
    aboutMe: {
      title: 'Sobre mim',
      paragraphs: [
        'Sou um desenvolvedor web buscando criar soluções digitais inovadoras e eficientes. Sempre fui ligado em tecnologia, e a minha jornada começou em 2017, quando realizei um curso técnico profissionalizante.',
        'Desde então, venho me dedicando à programação, buscando aplicar as melhores práticas do mercado e mantendo a mente aberta para novas ideias e tecnologias.',
        'Eu acredito que a tecnologia pode transformar vidas e negócios, e o meu objetivo é proporcionar experiências de usuário excepcionais, combinando criatividade e tecnologia.',
      ],
    },
    interests: {
      title: 'Interesses',
      paragraphs: [
        'Gosto de me manter atualizado com as tendências e avanços no desenvolvimento web. Estudando as principais ferramentas para manter a competitividade e relevância no mercado tecnológico.',
        'Tenho facilidade no estudo da área de front-end, gosto de aprender e aplicar conceitos que são exigidos no mercado, por exemplo a responsividade, devemos garantir que os sites funcionem perfeitamente em qualquer dispositivo.',
        'Outro exemplo seria buscar estratégias de renderizações no lado do servidor e otimizar o tempo de carregamento das páginas, com isso temos tempo de resposta menores e uma página que carrega quase que instantaneamente, melhorando a experiência do usuário.',
        'Também tenho me dedicado a estudar áreas do back-end, de forma a complementar as habilidades, e ter mais versatilidade no desenvolvimento. Python e Golang, são linguagens promissoras, e acredito que estarão em alta no futuro. Ter conhecimento nessas áreas poderá atender as necessidades tecnológicas de forma eficiente.',
      ],
    },
    recentProjects: {
      title: 'Projetos recentes',
      labelButton: 'Ver todos',
    },
    aboutPortfolio: {
      title: 'Sobre o portfólio',
      paragraphs: [
        'Este portfólio foi feito 100% por mim, e realizei do zero, desde imagens, logotipos, cores, fontes, estutura do layout e etc. Embora tenha me inspirado em alguns templates na internet, sempre procurei transmitir o meu estilo e minhas habilidades em cada detalhe.',
        'Durante a etapa do desenvolvimento mantive o foco na padronização do código, para que se tornasse um projeto fácil de manter no longo prazo.',
        'Este site é alimentado por uma API que é totalmente gerenciável, e basicamente qualquer alteração realizada na API irá refletir aqui. Essa flexibilidade facilita a atualização e manutenção do conteúdo, conforme necessário.',
      ],
    },
  },
  english: {
    hero: {
      occupationArea: 'Web Developer - Full stack',
    },
    aboutMe: {
      title: 'About me',
      paragraphs: [
        `I'm a web developer looking to create innovative and efficient digital solutions. I've always been passionate about technology, and my journey started in 2017 when I took a technical professional course.`,
        `Since then, I've been dedicated to programming, striving to apply the best industry practices and staying open to new ideas and technologies.`,
        `I believe that technology can transform lives and businesses, and my goal is to provide exceptional user experiences by combining creativity and technology.`,
      ],
    },
    interests: {
      title: 'Interests',
      paragraphs: [
        `I like to stay updated with trends and advancements in web development, studying the main tools to remain competitive and relevant in the tech market.`,
        `I have an aptitude for studying front-end development, enjoying learning and applying market-required concepts such as responsiveness. We must ensure that websites work perfectly on any device.`,
        `Another example would be seeking server-side rendering strategies and optimizing page load times, which results in shorter response times and nearly instant page loading, enhancing the user experience.`,
        `I have also been dedicating myself to studying back-end areas to complement my skills and gain more versatility in development. Python and Golang are promising languages, and I believe they will be in high demand in the future. Having knowledge in these areas can efficiently meet technological needs.`,
      ],
    },
    recentProjects: {
      title: 'Recent projects',
      labelButton: 'See all',
    },
    aboutPortfolio: {
      title: 'About the portfolio',
      paragraphs: [
        `This portfolio was created entirely by me, from scratch. I did everything, images, logos, colors, fonts, and layout structure. While I was inspired by some templates on the internet, I always aimed to convey my style and skills in every detail.`,
        `During the development phase, I focused on code standardization to make it a project that is easy to maintain in the long run.`,
        `This site is powered by a fully manageable API, meaning any changes made to the API will be reflected here. This flexibility makes updating and maintaining the content much easier.`,
      ],
    },
  },
}

export const HeroSection = () => {
  const { language } = useLanguageStore()
  const [side, setSide] = useState<'front' | 'back'>('front')

  return (
    <div className="[perspective:1000px]">
      <div
        className={`transition-all duration-300 [transform-style:preserve-3d] ${side === 'front' ? '[transform:rotateY(0)]' : '[transform:rotateY(180deg)]'}`}
      >
        {side === 'front' ? (
          <div className="inset-0">
            <FrontCard
              occupationArea={dicts[language].hero.occupationArea}
              setSide={() => setSide('back')}
            />
          </div>
        ) : (
          <div className="inset-0">
            <BackCard setSide={() => setSide('front')} />
          </div>
        )}
      </div>
    </div>
  )
}

export const AboutMeSection = () => {
  const { language } = useLanguageStore()

  return (
    <Section title={dicts[language].aboutMe.title}>
      {dicts[language].aboutMe.paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </Section>
  )
}

export const InterestsSection = () => {
  const { language } = useLanguageStore()

  return (
    <Section title={dicts[language].interests.title}>
      {dicts[language].interests.paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </Section>
  )
}

export const RecentProjectsSection = () => {
  const { language } = useLanguageStore()

  return (
    <Section title={dicts[language].recentProjects.title}>
      <ProjectRecents
        labelButton={dicts[language].recentProjects.labelButton}
      />
    </Section>
  )
}

export const AboutPortfolioSection = () => {
  const { language } = useLanguageStore()

  return (
    <Section title={dicts[language].aboutPortfolio.title}>
      {dicts[language].aboutPortfolio.paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </Section>
  )
}