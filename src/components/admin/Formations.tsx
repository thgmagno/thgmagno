import { actions } from '@/actions'
import { FormationItem } from '@/components/admin/FormationItem'
import { FormationAdd } from '@/components/admin/FormationAdd'

export async function Formations() {
  const formations = await actions.formation.index()

  return (
    <section className="grid gap-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold sm:text-xl">Formações cadastradas</h2>
        <FormationAdd />
      </div>
      {formations.length > 0 ? (
        <>
          {formations.map((formation) => (
            <FormationItem key={formation.id} formation={formation} />
          ))}
        </>
      ) : (
        <p className="text-gray-500">Nenhuma categoria cadastrada.</p>
      )}
    </section>
  )
}
