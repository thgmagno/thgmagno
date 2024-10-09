import { getVisits } from '@/server/visitors'
import { VisitChart } from './VisitChart'

export async function Visitors() {
  const { visits, totalVisits } = await getVisits()

  return (
    <div>
      <h2 className="mt-6 text-xl font-semibold">Visitantes: {totalVisits}</h2>
      <VisitChart chartData={visits} />
    </div>
  )
}
