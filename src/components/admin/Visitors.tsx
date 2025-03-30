import { actions } from '@/actions'

export async function Visitors() {
  const data = await actions.visit.index()

  return (
    <div>
      <h2 className="mt-6 text-xl font-semibold">Visitantes:</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
