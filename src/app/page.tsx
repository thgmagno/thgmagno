import { ProjectRecents } from '@/components/projects/ProjectRecents'
import { TooltipComponent } from '@/components/tooltip'
import { Wrapper } from '@/components/wrapper'
import { Github, Instagram, Linkedin, Mail } from 'lucide-react'

export default function Home() {
  const currentYear = new Date().getFullYear()

  return (
    <Wrapper>
      <div className="mx-auto flex max-w-3xl flex-col">
        <section className="my-8 justify-center md:my-14">
          <h1 className="text-4xl font-extralight uppercase text-neutral-700 md:text-5xl">
            Thiago Magno
          </h1>
          <h2 className="text-lg font-light text-neutral-600">
            Desenvolvedor Web
          </h2>
        </section>
        <section className="space-y-5 text-justify">
          <h3 className="text-lg">Sobre mim</h3>

          <p>
            Sou um desenvolvedor web dedicado a criar soluções digitais
            inovadoras e eficientes. Sempre fui ligado em tecnologia e minha
            jornada começou em 2017, quando realizei um curso técnico
            profissionalizante.
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

          <h4 className="text-lg">Interesses</h4>

          <p>
            Gosto de me manter atualizado com as tendências e avanços no
            desenvolvimento web.
          </p>

          <p>
            Além da programação web, também me interesso pelo estudo da área de
            UX/UI, visando sempre aprimorar a experiência do usuário em cada
            projeto.
          </p>

          <h4 className="text-lg">Projetos recentes</h4>
          <ProjectRecents />
        </section>

        <footer className="relative my-28">
          <section className="flex justify-center space-x-5 text-neutral-600 md:justify-end">
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
          <span className="absolute -bottom-36 flex w-full items-center justify-center text-neutral-700">
            © {currentYear} Thiago Magno dos Santos CNPJ: 53.274.431/0001-02
          </span>
        </footer>
      </div>
    </Wrapper>
  )
}
