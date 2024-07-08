import { GridProjects } from '@/components/projects/GridProjects'
import { Wrapper } from '@/components/wrapper'
import { FeaturesType, ProjectType, TechnologiesType } from '@/lib/types'

export default function Projetos() {
  const data: ProjectType = {
    title: 'Aluno Connect',
    slug: 'aluno-connect',
    description:
      'Ferramenta de gestão de frequências voltado para o ambiente acadêmico estudantil - foi uma iniciativa de integração ao curso Técnico em Informática ofertado pelo Serviço Nacional de Aprendizagem Industrial - Senai, como parte dos requisitos para obtenção do título de Técnico de Informática.',
    projectImgUrl:
      'https://cdn.cosmicjs.com/971c28a0-3350-11ef-bfb7-a598d323cbfc-student.webp',
    projectUrl: 'https://aluno-connect.vercel.app/',
    objective:
      'O projeto propõe uma forma inovadora de gerenciar a frequência dentro de uma instituição de ensino. Com a premissa de proporcionar uma experiência avançada e eficaz, a plataforma visa ir além do simples controle de presença, incorporando funcionalidade para otimizar a administração acadêmica, desde o acompanhamento em tempo real e até notificações automáticas via e-mail. O Aluno Connect se destaca como uma solução integral e inteligente para facilitar a jornada acadêmica, proporcionando uma gestão de frequência eficiente e contribuindo para o engajamento dos estudantes. Nesse contexto, a gestão de frequência fornecida pelo Aluno Connect torna-se uma ferramenta essencial para aprimorar o processo educacional. Ao incentivar uma participação ativa e construtiva dos estudantes, a plataforma se torna um elemento-chave para melhorar a qualidade de ensino.',
  }

  // const features: FeaturesType = {}

  const technologies: TechnologiesType = {
    slug: 'aluno-connect',
    metadata: {
      title: 'Next',
      url: 'https://nextjs.org/',
    },
  }

  const dataMock = Array.from({ length: 10 }, () => ({ ...data }))

  const techMock = Array.from({ length: 10 }, () => ({ ...technologies }))

  return (
    <Wrapper title="Projetos">
      <GridProjects projects={dataMock} technologies={techMock} />
    </Wrapper>
  )
}
