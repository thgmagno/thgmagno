import { Hero } from '@/components/hero'
import { ProjectRecents } from '@/components/projects/ProjectRecents'
import { TooltipComponent } from '@/components/tooltip'
import { Wrapper } from '@/components/wrapper'
import { Github, Instagram, Linkedin, Mail } from 'lucide-react'
import { ReactNode } from 'react'

export default function Home() {
  const currentYear = new Date().getFullYear()
  const Section = ({
    title,
    children,
  }: {
    title: string
    children: ReactNode
  }) => (
    <section className="mb-14 flex flex-col space-y-5 text-justify">
      <Subtitle title={title} />
      {children}
    </section>
  )

  const Subtitle = ({ title }: { title: string }) => (
    <div className="flex items-center">
      <div className="mr-4 flex-1 border-b border-neutral-400 dark:border-neutral-700" />
      <h3 className="flex text-xl">{title}</h3>
      <div className="ml-4 flex-1 border-b border-neutral-400 dark:border-neutral-700" />
    </div>
  )

  return (
    <Wrapper>
      <Hero />

      <Section title="Sobre mim">
        <p>
          Sou um desenvolvedor web buscando criar soluções digitais inovadoras e
          eficientes. Sempre fui ligado em tecnologia, e a minha jornada começou
          em 2017, quando realizei um curso técnico profissionalizante.
        </p>

        <p>
          Desde então, venho me dedicando à programação, buscando aplicar as
          melhores práticas do mercado e mantendo a mente aberta para novas
          ideias e tecnologias.
        </p>

        <p>
          Eu acredito que a tecnologia pode transformar vidas e negócios, e o
          meu objetivo é proporcionar experiências de usuário excepcionais,
          combinando criatividade e tecnologia.
        </p>
      </Section>

      <Section title="Interesses">
        <p>
          Gosto de me manter atualizado com as tendências e avanços no
          desenvolvimento web. Estudando as principais ferramentas para manter a
          competitividade e relevância no mercado tecnológico.
        </p>

        <p>
          Tenho facilidade no estudo da área de front-end, gosto de aprender e
          aplicar conceitos que são exigidos no mercado, por exemplo a
          responsividade, devemos garantir que os sites funcionem perfeitamente
          em qualquer dispositivo.
        </p>

        <p>
          Outro exemplo seria buscar estratégias de renderizações no lado do
          servidor e otimizar o tempo de carregamento das páginas, com isso
          temos tempo de resposta menores e uma página que carrega quase que
          instantaneamente, melhorando a experiência do usuário.
        </p>

        <p>
          Também tenho me dedicado a estudar áreas do back-end, de forma a
          complementar as habilidades, e ter mais versatilidade no
          desenvolvimento. Python e Golang, são linguagens promissoras, e
          acredito que estarão em alta no futuro. Ter conhecimento nessas áreas
          poderá atender as necessidades tecnológicas de forma eficiente.
        </p>
      </Section>

      <Section title="Projetos recentes">
        <ProjectRecents />
      </Section>

      <Section title="Sobre o portfólio">
        <p>
          Este portfólio foi feito 100% por mim, e realizei do zero, desde
          imagens, logotipos, escolha de cores, fontes, estutura do layout e
          etc. Embora tenha me inspirado em alguns templates na internet, sempre
          procurei transmitir o meu estilo e minhas habilidades em cada detalhe.
        </p>
        <p>
          Durante a etapa do desenvolvimento mantive o foco na padronização do
          código, para que se tornasse um projeto fácil de manter no longo
          prazo.
        </p>
        <p>
          Este site é alimentado por uma API que é totalmente gerenciável, e
          basicamente qualquer alteração realizada na API irá refletir aqui.
          Essa flexibilidade facilita a atualização e manutenção do conteúdo,
          conforme necessário.
        </p>
      </Section>

      <footer className="relative my-28">
        <section className="flex justify-center space-x-5 md:justify-end">
          <TooltipComponent
            href="mailto:thgmgn@gmail.com"
            Icon={Mail}
            label="E-mail"
          />
          <TooltipComponent
            href="https://www.linkedin.com/in/thgmagno"
            Icon={Linkedin}
            label="Linkedin"
          />
          <TooltipComponent
            href="https://www.instagram.com/thgmagno/"
            Icon={Instagram}
            label="Instagram"
          />
          <TooltipComponent
            href="https://github.com/thgmagno"
            Icon={Github}
            label="Github"
          />
        </section>
        <span className="absolute -bottom-36 flex w-full items-center justify-center text-center">
          © {currentYear} Thiago Magno dos Santos CNPJ: 53.274.431/0001-02
        </span>
      </footer>
    </Wrapper>
  )
}
