import { Pointer } from 'lucide-react'
import gmailIcon from '@/assets/svg/gmail.svg'
import linkedinIcon from '@/assets/svg/linkedin.svg'
import instagramIcon from '@/assets/svg/instagram.svg'
import githubIcon from '@/assets/svg/github.svg'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  setSide: () => void
}

export const BackCard = ({ setSide }: Props) => {
  const Icon = ({
    path,
    title,
    href,
  }: {
    path: string
    title: string
    href: string
  }) => (
    <Link
      href={href}
      target="_blank"
      className="flex flex-col items-center justify-center space-y-2 text-sm text-neutral-500"
    >
      <Image src={path} height={60} width={60} alt={title} />
      <span>{title}</span>
    </Link>
  )

  return (
    <section className="mb-16 mt-6 rounded-xl border border-neutral-400 bg-gradient-to-r from-neutral-300 to-neutral-400/60 px-3 py-4 shadow-md [transform:rotateY(180deg)] dark:border-neutral-800 dark:from-[#111B21] dark:to-zinc-900">
      <article className="flex items-center justify-between">
        <div className="flex w-full justify-evenly">
          <Icon path={gmailIcon} title="Gmail" href="mailto:thgmgn@gmail.com" />
          <Icon
            path={linkedinIcon}
            title="Linkedin"
            href="https://www.linkedin.com/in/thgmagno"
          />
          <Icon
            path={instagramIcon}
            title="Instagram"
            href="https://www.instagram.com/thgmagno/"
          />
          <Icon
            path={githubIcon}
            title="Github"
            href="https://github.com/thgmagno"
          />
        </div>
      </article>
      <article className="mt-2 flex justify-end">
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
