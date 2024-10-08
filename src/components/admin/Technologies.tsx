import { unstable_cache as cache } from 'next/cache'
import { TechnologyForm } from '../form/Technologies'
import { findManyTechnologies } from '@/server/actions'
import { TechnologyItem } from './TechnologyItem'

export async function Technologies() {
  const getTechnologies = cache(
    async () => {
      return await findManyTechnologies()
    },
    ['technologies'],
    { revalidate: 7 * 24 * 60 * 60, tags: ['technologies'] },
  )

  const technologies = await getTechnologies()

  return (
    <div>
      <TechnologyForm />
      <h2 className="mt-6 text-xl font-semibold">Tecnologias Cadastradas</h2>
      <div className="mt-4">
        {technologies.length > 0 ? (
          <ul className="space-y-3">
            {technologies.map((technology) => (
              <TechnologyItem technology={technology} key={technology.id} />
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Nenhuma tecnologia cadastrada.</p>
        )}
      </div>
    </div>
  )
}
