import { actions } from '@/actions'

export async function POST(req: Request) {
  function validarString(valor: unknown) {
    if (typeof valor !== 'string') return 'Não informado'
    const str = valor.trim()
    return str.length > 0 && str.length <= 30 ? str : 'Não informado'
  }

  try {
    const body = await req.json()

    const { token, appName, userAgent, ipHash, city, state, country } = body

    if (
      typeof token !== 'string' ||
      typeof appName !== 'string' ||
      typeof ipHash !== 'string'
    ) {
      console.log('debug: ', body)
      console.log(token, appName, userAgent, ipHash, city, state, country)
      return new Response(null, { status: 401 })
    }

    const isValidToken = token === process.env.NEXT_PUBLIC_APP_API_TOKEN
    if (!isValidToken) {
      return new Response(null, { status: 401 })
    }

    const data = await actions.visit.count({
      data: {
        ipHash,
        appName,
        userAgent: validarString(userAgent),
        city: validarString(city),
        state: validarString(state),
        country: validarString(country),
      },
    })

    return new Response(JSON.stringify(data), { status: 200 })
  } catch (error) {
    console.error('debug api: ', error)
    return new Response(null, { status: 400 })
  }
}
