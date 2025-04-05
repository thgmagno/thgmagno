import { actions } from '@/actions'
import { InstitutionItem } from './InstitutionItem'
import { InstitutionAdd } from './InstitutionAdd'

export async function Institutions() {
  const institutions = await actions.institution.index()

  return (
    <section className="grid gap-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold sm:text-xl">Instituições cadastradas</h2>
        <InstitutionAdd />
      </div>
      {institutions.length > 0 ? (
        <>
          {institutions.map((institution) => (
            <InstitutionItem key={institution.id} institution={institution} />
          ))}
        </>
      ) : (
        <p className="text-gray-500">Nenhuma instituição cadastrada.</p>
      )}
    </section>
  )
}
