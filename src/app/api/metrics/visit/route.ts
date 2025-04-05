import { actions } from '@/actions'
import { env } from 'root/env'

export async function POST(req: Request) {
  function validateString(value: unknown) {
    if (typeof value !== 'string') return 'Não informado'
    const str = value.trim()
    return str.length > 0 && str.length <= 30 ? str : 'Não informado'
  }

  try {
    const body = await req.json()

    const { appToken, appName, userAgent, ipHash, city, state, country } = body

    if (
      typeof appToken !== 'string' ||
      typeof appName !== 'string' ||
      typeof ipHash !== 'string'
    ) {
      return new Response(null, { status: 401 })
    }

    const isValidToken = appToken === env.APP_TOKEN
    if (!isValidToken) {
      return new Response(null, { status: 403 })
    }

    await actions.visit.count({
      data: {
        ipHash,
        appName,
        userAgent: validateString(userAgent),
        city: validateString(city),
        state: validateString(state),
        country: validateString(country),
      },
    })

    return new Response(null, { status: 200 })
  } catch (error) {
    console.error('debug api: ', error)
    return new Response(null, { status: 400 })
  }
}
