import { fetchData } from '@/actions'
import {
  Hero,
  AboutMe,
  Interests,
  AboutPortfolio,
  RecentProjects,
} from '@/components/sections'
import { TooltipComponent } from '@/components/tooltip'
import { Wrapper } from '@/components/wrapper'
import { Github, Instagram, Linkedin, Mail } from 'lucide-react'

export default async function Home() {
  const currentYear = new Date().getFullYear()
  const { home } = await fetchData().then((data) => data.object.metadata)

  return (
    <Wrapper>
      <Hero
        fullname={home.fullname}
        image-profile={home['image-profile']}
        occupation-area={home['occupation-area']}
        social={home.social}
      />
      <AboutMe about-me={home['about-me']} />
      <Interests interests={home.interests} />
      <AboutPortfolio about-portfolio={home['about-portfolio']} />
      <RecentProjects />

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
