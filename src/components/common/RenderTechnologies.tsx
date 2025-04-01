import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

export function RenderTechnologies({ data }: { data: string }) {
  const packageJson = JSON.parse(data)
  const dependencies = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  }

  const techList = [
      { title: 'auth.js', url: 'https://authjs.dev/' },
      { title: 'axios', url: 'https://axios-http.com/docs/intro' },
      { title: 'bcrypt', url: 'https://www.npmjs.com/package/bcrypt' },
      { title: 'bun', url: 'https://bun.sh/' },
      { title: 'eslint', url: 'https://eslint.org/' },
      { title: 'expo', url: 'https://expo.dev/' },
      { title: 'express', url: 'https://expressjs.com/' },
      { title: 'firebase', url: 'https://firebase.google.com/' },
      { title: 'framer-motion', url: 'https://www.framer.com/motion/' },
      { title: 'jest', url: 'https://jestjs.io/' },
      { title: 'jose', url: 'https://github.com/panva/jose' },
      { title: 'jwt', url: 'https://jwt.io/' },
      { title: 'kysely', url: 'https://kysely.dev/' },
      { title: 'lucide-react', url: 'https://lucide.dev/' },
      { title: 'material-ui', url: 'https://mui.com/' },
      { title: 'mongodb', url: 'https://www.mongodb.com/' },
      { title: 'mongodb atlas', url: 'https://www.mongodb.com/cloud/atlas' },
      { title: 'nestjs', url: 'https://nestjs.com/' },
      { title: 'next-intl', url: 'https://next-intl.dev/' },
      { title: 'next.js', url: 'https://nextjs.org/' },
      { title: 'next-themes', url: 'https://github.com/pacocoursey/next-themes' },
      { title: 'nextauth.js', url: 'https://next-auth.js.org/' },
      { title: 'postgresql', url: 'https://www.postgresql.org/' },
      { title: 'prettier', url: 'https://prettier.io/' },
      { title: 'prisma', url: 'https://www.prisma.io/' },
      { title: 'radix-ui', url: 'https://www.radix-ui.com/' },
      { title: 'react', url: 'https://reactjs.org/' },
      { title: 'react native', url: 'https://reactnative.dev/' },
      { title: 'react-select', url: 'https://react-select.com/' },
      { title: 'recharts', url: 'https://recharts.org/en-US/' },
      { title: 'redis', url: 'https://redis.io/' },
      { title: 'shadcn/ui', url: 'https://ui.shadcn.com/' },
      { title: 'sonner', url: 'https://sonnerjs.com/' },
      { title: 'tailwindcss', url: 'https://tailwindcss.com/' },
      { title: 'tailwindui', url: 'https://tailwindui.com/' },
      { title: 'typescript', url: 'https://www.typescriptlang.org/' },
      { title: 'vercel', url: 'https://vercel.com/' },
      { title: 'zod', url: 'https://zod.dev/' },
      { title: 'zustand', url: 'https://zustand-demo.pmnd.rs/' }
  ]

  const matchedTechs = techList.filter((tech) =>
    Object.keys(dependencies).some((dep) =>
      dep.includes(tech.title.toLowerCase()),
    ),
  )

  return (
    <>
      <p className="font-semibold">Tecnologias utilizadas: </p>
      <div className="my-3 flex flex-wrap gap-1">
        {matchedTechs
          .sort((a, b) => a.title.localeCompare(b.title))
          .map((tech) => (
            <Link target="_blank" key={tech.url} href={tech.url}>
              <Badge>
                {tech.title.charAt(0).toUpperCase() + tech.title.slice(1)}
              </Badge>
            </Link>
          ))}
      </div>
    </>
  )
}
