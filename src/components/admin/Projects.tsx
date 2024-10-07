import { ProjectForm } from '../form/Projects'
import { findManyProjects } from '@/server/actions'
import { ProjectItem } from './ProjectItem'

export async function Projects() {
  const projects = await findManyProjects()

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
