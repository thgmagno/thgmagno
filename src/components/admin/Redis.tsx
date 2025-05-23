import Link from 'next/link'
import { RedisFlushAllButton } from './RedisFlushAllButton'
import { actions } from '@/actions'

export async function Redis() {
  const res = await actions.redis.getRecords()

  const data = res.urls?.map((obj: string) => JSON.parse(obj))
  const hasData = data && data.length > 0

  return (
    <section className="grid gap-4">
      <h2 className="font-semibold sm:text-xl">Redis admin painel</h2>

      <div className="space-y-4">
        <div className="flex justify-between">
          <h3 className="text-muted-foreground">
            Total de registro encontrados:{' '}
            {res?.total ? String(res.total).padStart(2, '0') : 0}
          </h3>
          {hasData && <RedisFlushAllButton />}
        </div>

        {hasData ? (
          <ul className="space-y-3">
            {data.map((url, index) => (
              <li
                key={index}
                className="bg-card flex items-center justify-between rounded-md border p-2"
              >
                <div className="flex flex-col">
                  <Link
                    href={`https://${url.short}`}
                    className="text-blue-600 underline"
                    target="_blank"
                  >
                    {url.short}
                  </Link>
                  <span>{url.original}</span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <span>Nenhum registro encontrado.</span>
        )}
      </div>
    </section>
  )
}
