import { actions } from '@/actions'
import { LocationItem } from '@/components/admin/LocationItem'
import { LocationAdd } from '@/components/admin/LocationAdd'

export async function Locations() {
  const locations = await actions.location.index()

  return (
    <section className="grid gap-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold sm:text-xl">Localizações cadastradas</h2>
        <LocationAdd />
      </div>
      {locations.length > 0 ? (
        <>
          {locations.map((location) => (
            <LocationItem key={location.id} location={location} />
          ))}
        </>
      ) : (
        <p className="text-gray-500">Nenhuma localização cadastrada.</p>
      )}
    </section>
  )
}
