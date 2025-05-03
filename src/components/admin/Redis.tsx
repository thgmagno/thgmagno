import { actions } from '@/actions'
import { RedisDeleteKeyButton } from './RedisDeleteKeyButton'

export async function Redis() {
  const entries = await actions.redis.getEntries()

  return (
    <section className="grid gap-4">
      <h2 className="font-semibold sm:text-xl">Redis admin painel</h2>

      <div className="space-y-4">
        {entries.map(({ key, value, ttl }) => (
          <div
            key={key}
            className="bg-card flex items-start justify-between gap-4 rounded-2xl border p-4"
          >
            <div className="flex-1">
              <p className="font-mono text-sm break-all">
                Namespace: {key.split(':')[0]}
              </p>
              <pre className="text-muted-foreground mt-2 overflow-x-auto text-xs whitespace-pre-wrap">
                Chave: {key.split(':').slice(1).join(':')}
              </pre>
              <pre className="text-muted-foreground mt-2 overflow-x-auto text-xs whitespace-pre-wrap">
                Valor: {value}
              </pre>
            </div>

            <div>
              <RedisDeleteKeyButton redisKey={key} />
              <p className="text-muted-foreground mt-1 text-center text-xs">
                <strong>TTL:</strong>{' '}
                {ttl === -1
                  ? '∞ (sem expiração)'
                  : ttl === -2
                    ? 'expirada'
                    : (() => {
                        return `${Math.floor(ttl / 86400)} d`
                      })()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
