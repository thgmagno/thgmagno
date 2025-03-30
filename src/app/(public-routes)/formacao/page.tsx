import { FormacoesAnimated } from './animated'
import { actions } from '@/actions'

export default async function Formacoes() {
  const formations = await actions.formation.index()

  return (
    <section className="space-y-6">
      <FormacoesAnimated formations={formations} />
    </section>
  )
}
