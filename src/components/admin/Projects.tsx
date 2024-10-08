import { unstable_cache as cache } from 'next/cache'
import { ProjectForm } from '../form/Projects'
import { findManyProjects } from '@/server/actions'
import { ProjectItem } from './ProjectItem'

export async function Projects() {
  const getProjects = cache(
    async () => {
      return await findManyProjects()
    },
    ['projects'],
    { revalidate: 7 * 24 * 60 * 60, tags: ['projects'] },
  )

  const { projects } = await getProjects()

  return (
    <div>
      <ProjectForm />
      <h2 className="mt-6 text-xl font-semibold">Projetos Cadastrados</h2>
      <div className="mt-4">
        {projects.length > 0 ? (
          <ul className="space-y-3">
            {projects.map((project) => (
              <ProjectItem project={project} key={project.id} />
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Nenhum projeto cadastrado.</p>
        )}
      </div>
    </div>
  )
}
