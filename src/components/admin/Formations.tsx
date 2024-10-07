import { FormationForm } from '../form/Formations'
import { findManyCategories, findManyFormations } from '@/server/actions'
import { FormationItem } from './FormationItem'

export async function Formations() {
  const [formations, categories] = await Promise.all([
    findManyFormations(),
    findManyCategories(),
  ])

  return (
    <div>
      <FormationForm categories={categories} />
      <h2 className="mt-6 text-xl font-semibold">Formações Cadastradas</h2>
      <div className="mt-4">
        {formations.length > 0 ? (
          <ul className="space-y-3">
            {formations.map((formation) => (
              <FormationItem key={formation.id} formation={formation} />
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Nenhuma formação cadastrada.</p>
        )}
      </div>
    </div>
  )
}
