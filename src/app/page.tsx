import {
  AboutMeSection,
  InterestsSection,
  RecentProjectsSection,
  AboutPortfolioSection,
  HeroSection,
} from '@/components/sections'
import { TooltipComponent } from '@/components/tooltip'
import { Wrapper } from '@/components/wrapper'
import { Github, Instagram, Linkedin, Mail } from 'lucide-react'

export default function Home() {
  const currentYear = new Date().getFullYear()

  return (
    <Wrapper>
      <HeroSection />
      <AboutMeSection />
      <InterestsSection />
      <RecentProjectsSection />
      <AboutPortfolioSection />

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
