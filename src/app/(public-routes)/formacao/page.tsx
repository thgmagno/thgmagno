import { unstable_cache as cache } from 'next/cache'
import { findManyFormations } from '@/server/actions'
import { FormacoesAnimated } from './animated'

export default async function Formacoes() {
  const getFormations = cache(
    async () => {
      return await findManyFormations()
    },
    ['formations'],
    { revalidate: 7 * 24 * 60 * 60, tags: ['formations'] },
  )

  const formations = await getFormations()

  return (
    <section className="space-y-6">
      <FormacoesAnimated formations={formations} />
    </section>
  )
}
