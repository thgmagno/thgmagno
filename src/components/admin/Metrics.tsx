import { actions } from '@/actions'
import { Visitant } from '@/lib/types'
import { ptBR } from 'date-fns/locale'
import { format } from 'date-fns'

export async function Metrics() {
  const data = await actions.visit.index()

  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-lg font-semibold">Visitas recentes:</h2>
      <LastVisits data={data} />
      <h2 className="text-lg font-semibold">Totais:</h2>
      <VisitsByApp data={data} />
      <VisitsByCity data={data} />
    </div>
  )
}

function LastVisits({ data }: { data: Visitant[] }) {
  return (
    <section>
      {data.length > 0 ? (
        <div className="grid gap-4">
          {data.slice(0, 5).map((visit) => (
            <div
              key={visit.id}
              className="bg-card flex flex-col gap-2 rounded-2xl border p-4 shadow-sm"
            >
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className="overflow-hidden text-sm">
                  <span className="text-muted-foreground block text-xs font-semibold">
                    Aplicação:
                  </span>
                  <span className="truncate capitalize">{visit.appName}</span>
                </div>
                <div className="overflow-hidden text-sm">
                  <span className="text-muted-foreground block text-xs font-semibold">
                    Data/Hora:
                  </span>
                  <span className="truncate">
                    {format(new Date(visit.createdAt), 'dd/MM/yyyy HH:mm', {
                      locale: ptBR,
                    })}
                  </span>
                </div>
                {visit.city || visit.state || visit.country ? (
                  <div className="col-span-2 overflow-hidden text-sm">
                    <span className="text-muted-foreground block text-xs font-semibold">
                      Localização:
                    </span>
                    <span className="truncate">
                      {[visit.city, visit.state, visit.country]
                        .filter(Boolean)
                        .join(', ')}
                    </span>
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">Nenhum registro encontrado</p>
      )}
    </section>
  )
}

function VisitsByApp({ data }: { data: Visitant[] }) {
  const now = new Date()
  const oneWeekAgo = new Date(now)
  oneWeekAgo.setDate(now.getDate() - 7)

  const oneMonthAgo = new Date(now)
  oneMonthAgo.setMonth(now.getMonth() - 1)

  const groupedWeek = data
    .filter((v) => new Date(v.createdAt) >= oneWeekAgo)
    .reduce<Record<string, number>>((acc, visit) => {
      acc[visit.appName] = (acc[visit.appName] || 0) + 1
      return acc
    }, {})

  const groupedMonth = data
    .filter((v) => new Date(v.createdAt) >= oneMonthAgo)
    .reduce<Record<string, number>>((acc, visit) => {
      acc[visit.appName] = (acc[visit.appName] || 0) + 1
      return acc
    }, {})

  const groupedAllTime = data.reduce<Record<string, number>>((acc, visit) => {
    acc[visit.appName] = (acc[visit.appName] || 0) + 1
    return acc
  }, {})

  const visitsThisWeek = Object.entries(groupedWeek)
  const visitsThisMonth = Object.entries(groupedMonth)
  const visitsAllTime = Object.entries(groupedAllTime)

  return (
    <section className="flex flex-col space-y-4">
      <article>
        <h2 className="text-muted-foreground mb-2 font-semibold">
          Na última semana
        </h2>
        {visitsThisWeek.length > 0 ? (
          <div className="bg-card flex flex-col gap-2 rounded-2xl border p-4 shadow-sm">
            {visitsThisWeek.map(([appName, total]) => (
              <p key={appName} className="truncate text-sm font-medium">
                <span className="capitalize">{appName}</span>
                <span className="text-muted-foreground text-sm">
                  {' - '} {total} visita{total > 1 ? 's' : ''}
                </span>
              </p>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">Nenhum registro encontrado</p>
        )}
      </article>
      <article>
        <h2 className="text-muted-foreground mb-2 font-semibold">
          No último mês
        </h2>
        {visitsThisMonth.length > 0 ? (
          <div className="bg-card flex flex-col gap-2 rounded-2xl border p-4 shadow-sm">
            {visitsThisMonth.map(([appName, total]) => (
              <p key={appName} className="truncate text-sm font-medium">
                <span className="capitalize">{appName}</span>
                <span className="text-muted-foreground text-sm">
                  {' - '} {total} visita{total > 1 ? 's' : ''}
                </span>
              </p>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">Nenhum registro encontrado</p>
        )}
      </article>
      <article>
        <h2 className="text-muted-foreground mb-2 font-semibold">
          Todo o período
        </h2>
        {visitsAllTime.length > 0 ? (
          <div className="bg-card flex flex-col gap-2 rounded-2xl border p-4 shadow-sm">
            {visitsAllTime.map(([appName, total]) => (
              <p key={appName} className="truncate text-sm font-medium">
                <span className="capitalize">{appName}</span>
                <span className="text-muted-foreground text-sm">
                  {' - '} {total} visita{total > 1 ? 's' : ''}
                </span>
              </p>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">Nenhum registro encontrado</p>
        )}
      </article>
    </section>
  )
}

function VisitsByCity({ data }: { data: Visitant[] }) {
  const grouped = data.reduce<Record<string, number>>((acc, visit) => {
    acc[visit.city!] = (acc[visit.city!] || 0) + 1
    return acc
  }, {})

  const visitsByCity = Object.entries(grouped)

  return (
    <section>
      <h2 className="text-muted-foreground mb-2 font-semibold">Por cidade</h2>
      {visitsByCity.length > 0 ? (
        <div className="bg-card flex flex-col gap-2 rounded-2xl border p-4 shadow-sm">
          {visitsByCity.map(([city, total]) => (
            <p key={city} className="truncate text-sm font-medium">
              <span className="capitalize">{city}</span>
              <span className="text-muted-foreground text-sm">
                {' - '} {total} visita{total > 1 ? 's' : ''}
              </span>
            </p>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">Nenhum registro encontrado</p>
      )}
    </section>
  )
}
