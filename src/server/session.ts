'use server'

import { LoginSchema } from '@/lib/schemas'
import { LoginFormState } from '@/lib/states'
import { redirect } from 'next/navigation'
import * as jose from 'jose'
import { compare } from 'bcrypt'
import { env } from 'root/env'
import { cookies } from 'next/headers'

const secret = new TextEncoder().encode(env.AUTH_SECRET)

export async function login(
  formState: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  const parsed = LoginSchema.safeParse({
    user: formData.get('user'),
    password: formData.get('password'),
  })

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  try {
    const isValidUser = parsed.data.user === env.ADMIN_USER
    const isValidPassword = await compare(
      parsed.data.password,
      env.ADMIN_PASSWORD,
    )

    if (!isValidUser || !isValidPassword) {
      return { errors: { _form: 'Usuário ou senha inválidos' } }
    }

    await createSessionToken(parsed.data.user)
  } catch (error) {
    if (error instanceof Error) {
      return { errors: { _form: error.message } }
    } else {
      return { errors: { _form: 'Não foi possível conectar-se ao servidor.' } }
    }
  }

  redirect('/admin')
}

export async function openSessionToken(
  token: string,
): Promise<jose.JWTPayload> {
  const { payload } = await jose.jwtVerify(token, secret)
  return payload
}

export async function createSessionToken(username: string): Promise<string> {
  const payload = { sub: username }

  const session = await new jose.SignJWT(payload)
    .setProtectedHeader({
      alg: 'HS256',
    })
    .setIssuedAt(Math.floor(Date.now() / 1000))
    .setExpirationTime('1d')
    .sign(secret)

  const { exp } = await openSessionToken(session)

  cookies().set(String(env.COOKIE_NAME), session, {
    expires: new Date((exp as number) * 1000),
    path: '/',
    httpOnly: true,
  })

  return session
}
