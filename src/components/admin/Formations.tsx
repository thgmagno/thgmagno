import { actions } from '@/actions'

export async function Formations() {
  const [formations] = await Promise.all([
    actions.formation.index(),
    actions.category.index(),
  ])

  return (
    <div>
      <h2 className="mt-6 text-xl font-semibold">Formações Cadastradas</h2>
      <div className="mt-4">
        {formations.length > 0 ? (
          <ul className="space-y-3">
            {formations.map((formation) => (
              <p>{formation.title}</p>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Nenhuma formação cadastrada.</p>
        )}
      </div>
    </div>
  )
}
