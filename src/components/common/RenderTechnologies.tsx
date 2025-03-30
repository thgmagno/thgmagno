import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

export function RenderTechnologies({ data }: { data: string }) {
  const packageJson = JSON.parse(data)
  const dependencies = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  }

  const techList = [
    { title: 'next.js', url: 'https://nextjs.org/' },
    { title: 'react', url: 'https://reactjs.org/' },
    { title: 'typescript', url: 'https://www.typescriptlang.org/' },
    { title: 'tailwindcss', url: 'https://tailwindcss.com/' },
    { title: 'vite', url: 'https://vitejs.dev/' },
    { title: 'eslint', url: 'https://eslint.org/' },
    { title: 'prettier', url: 'https://prettier.io/' },
    { title: 'axios', url: 'https://axios-http.com/docs/intro' },
    { title: 'bcrypt', url: 'https://www.npmjs.com/package/bcrypt' },
    { title: 'expo', url: 'https://expo.dev/' },
    { title: 'jwt', url: 'https://jwt.io/' },
    { title: 'mongodb', url: 'https://www.mongodb.com/' },
    { title: 'nestjs', url: 'https://nestjs.com/' },
    { title: 'prisma', url: 'https://www.prisma.io/' },
    { title: 'postgresql', url: 'https://www.postgresql.org/' },
    { title: 'react native', url: 'https://reactnative.dev/' },
    { title: 'shadcn/ui', url: 'https://ui.shadcn.com/' },
    { title: 'vercel', url: 'https://vercel.com/' },
    { title: 'zod', url: 'https://zod.dev/' },
    { title: 'zustand', url: 'https://zustand-demo.pmnd.rs/' },
    { title: 'express', url: 'https://expressjs.com/' },
    { title: 'graphql', url: 'https://graphql.org/' },
    { title: 'apollo', url: 'https://www.apollographql.com/' },
    { title: 'docker', url: 'https://www.docker.com/' },
    { title: 'kubernetes', url: 'https://kubernetes.io/' },
    { title: 'redis', url: 'https://redis.io/' },
    { title: 'socket.io', url: 'https://socket.io/' },
    { title: 'firebase', url: 'https://firebase.google.com/' },
    { title: 'solidjs', url: 'https://solidjs.com/' },
    { title: 'vuejs', url: 'https://vuejs.org/' },
    { title: 'svelte', url: 'https://svelte.dev/' },
    { title: 'bun', url: 'https://bun.sh/' },
    { title: 'cypress', url: 'https://www.cypress.io/' },
    { title: 'jest', url: 'https://jestjs.io/' },
    { title: 'storybook', url: 'https://storybook.js.org/' },
    { title: 'tailwindui', url: 'https://tailwindui.com/' },
    { title: 'sanity.io', url: 'https://www.sanity.io/' },
    { title: 'nextauth.js', url: 'https://next-auth.js.org/' },
    {
      title: 'apollo client',
      url: 'https://www.apollographql.com/docs/react/',
    },
    { title: 'material-ui', url: 'https://mui.com/' },
    { title: 'chakra-ui', url: 'https://chakra-ui.com/' },
    { title: 'mongodb atlas', url: 'https://www.mongodb.com/cloud/atlas' },
    { title: 'webpack', url: 'https://webpack.js.org/' },
    { title: 'parcel', url: 'https://parceljs.org/' },
    { title: 'auth.js', url: 'https://authjs.dev/' },
    { title: 'radix-ui', url: 'https://www.radix-ui.com/' },
    { title: 'lucide-react', url: 'https://lucide.dev/' },
    { title: 'framer-motion', url: 'https://www.framer.com/motion/' },
    { title: 'jose', url: 'https://github.com/panva/jose' },
    { title: 'kysely', url: 'https://kysely.dev/' },
    { title: 'react-select', url: 'https://react-select.com/' },
    { title: 'recharts', url: 'https://recharts.org/en-US/' },
    { title: 'react-day-picker', url: 'https://react-day-picker.js.org/' },
    { title: 'next-themes', url: 'https://github.com/pacocoursey/next-themes' },
    { title: 'sonner', url: 'https://sonnerjs.com/' },
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
