import { actions } from '@/actions'
import { Visitant } from '@/lib/types'
import { CustomCard } from './CustomCard'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'

export async function Metrics() {
  const data = await actions.visit.index()

  return (
    <div className="flex flex-col space-y-4">
      {data.length > 0 ? (
        <VisitsByAppWithLocation data={data} />
      ) : (
        <p className="text-muted-foreground">Nenhum registro encontrado</p>
      )}
    </div>
  )
}

async function VisitsByAppWithLocation({ data }: { data: Visitant[] }) {
  const groupedByApp = data.reduce<Record<string, Visitant[]>>((acc, visit) => {
    acc[visit.appName] = acc[visit.appName] || []
    acc[visit.appName].push(visit)
    return acc
  }, {})

  const appNames = Object.keys(groupedByApp)

  const appWithLocations = await Promise.all(
    appNames.map(async (appName) => {
      const groupedLocations = groupedByApp[appName].reduce<
        Record<string, { visits: number; sample: Visitant }>
      >((acc, visit) => {
        const key = `${visit.city}, ${visit.state}, ${visit.country}`
        if (!acc[key]) acc[key] = { visits: 0, sample: visit }
        acc[key].visits += 1
        return acc
      }, {})

      const locations = await Promise.all(
        Object.entries(groupedLocations).map(
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          async ([key, { visits, sample }]) => {
            const res = await actions.visit.getCountryName(sample.country)
            const locationPart = sample.state
              ? `${sample.city} - ${sample.state}`
              : sample.city

            return {
              locationPart,
              city: sample.city,
              state: sample.state,
              country: sample.country,
              visits,
              ...res,
            }
          },
        ),
      )

      return {
        appName,
        locations: locations.sort((a, b) => b.visits - a.visits),
        total: groupedByApp[appName].length,
      }
    }),
  )

  return (
    <section className="flex flex-col space-y-6">
      {appWithLocations
        .sort((a, b) => b.total - a.total)
        .map((app) => (
          <article key={app.appName}>
            <h2 className="text-muted-foreground mb-2 font-semibold capitalize">
              {app.appName} – {app.total} visita{app.total > 1 ? 's' : ''}
            </h2>
            <CustomCard>
              {app.locations.map((loc) => (
                <Dialog key={`${loc.locationPart}-${loc.countryName}`}>
                  <DialogTrigger asChild className="w-full">
                    <button className="text-start text-sm font-medium hover:underline">
                      {loc.locationPart}:{' '}
                      <span className="text-emerald-500">
                        {loc.visits} visita{loc.visits > 1 ? 's' : ''}
                      </span>
                    </button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="capitalize">
                        {app.appName}
                      </DialogTitle>
                      <DialogDescription>
                        {loc.subregion}
                        <br />
                        {loc.locationPart}
                        <br />
                        {loc.translation?.official ?? loc.countryName}{' '}
                        {loc.flag}
                      </DialogDescription>
                    </DialogHeader>
                    <ScrollArea className="h-72 w-full">
                      <div className="p-4">
                        {Object.entries(
                          data
                            .filter(
                              (v) =>
                                v.appName === app.appName &&
                                v.city === loc.city &&
                                v.state === loc.state &&
                                v.country === loc.country,
                            )
                            .reduce<Record<string, Visitant[]>>(
                              (acc, visit) => {
                                const date = new Intl.DateTimeFormat('pt-BR', {
                                  dateStyle: 'medium',
                                }).format(new Date(visit.createdAt))

                                if (!acc[date]) acc[date] = []
                                acc[date].push(visit)
                                return acc
                              },
                              {},
                            ),
                        ).map(([date, visits]) => (
                          <div
                            key={date}
                            className="mb-2 space-y-1 border-b pb-2"
                          >
                            <h4 className="text-muted-foreground mb-1.5 text-sm font-medium">
                              📅 {date} - {visits.length} visita
                              {visits.length > 1 ? 's' : ''}
                            </h4>
                            <p>
                              {visits
                                .map((v) =>
                                  new Intl.DateTimeFormat('pt-BR', {
                                    timeStyle: 'short',
                                  }).format(new Date(v.createdAt)),
                                )
                                .reverse()
                                .join(', ')}
                            </p>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                    <DialogFooter className="text-muted-foreground text-sm">
                      Os horários são aproximados!
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              ))}
            </CustomCard>
          </article>
        ))}
    </section>
  )
}
