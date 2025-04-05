import { actions } from '@/actions'
import { Visitant } from '@/lib/types'
import { ptBR } from 'date-fns/locale'
import { format } from 'date-fns'

export async function Metrics() {
  const data = await actions.visit.index()

  return (
    <div className="flex flex-col space-y-6">
      <h2 className="text-xl font-semibold">Métricas:</h2>
      <VisitsByApp data={data} />
      <LastVisits data={data} />
    </div>
  )
}

function LastVisits({ data }: { data: Visitant[] }) {
  return (
    <section>
      <h2 className="text-muted-foreground mb-2 font-semibold">
        Visitas recentes
      </h2>
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
                  <span className="truncate">{visit.appName}</span>
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
                  <div className="overflow-hidden text-sm">
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
                {visit.userAgent && (
                  <div className="overflow-hidden text-sm break-all">
                    <span className="text-muted-foreground block text-xs font-semibold">
                      Dispositivo:
                    </span>
                    <span className="truncate">{visit.userAgent}</span>
                  </div>
                )}
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
  const grouped = data.reduce<Record<string, number>>((acc, visit) => {
    acc[visit.appName] = (acc[visit.appName] || 0) + 1
    return acc
  }, {})

  const apps = Object.entries(grouped)

  return (
    <section>
      <h2 className="text-muted-foreground mb-2 font-semibold">
        Total por aplicação
      </h2>
      {apps.length > 0 ? (
        <div className="bg-card flex flex-col gap-2 rounded-2xl border p-4 shadow-sm">
          {apps
            .sort((a, b) => b[1] - a[1])
            .map(([appName, total]) => (
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
    </section>
  )
}
