'use server'

import { auth } from '@/auth'
import { FlushAllFormState } from '@/lib/states'
import { revalidatePath } from 'next/cache'

export async function flushAll(
  formState: FlushAllFormState,
  formData: FormData,
): Promise<FlushAllFormState> {
  try {
    const session = await auth()
    if (!session?.user.isAdmin) {
      return { status: 'erro', message: 'Não autorizado' }
    }

    const res = await fetch(`${process.env.API_GO_URL}/flush-all`)

    if (!res.ok) {
      return { status: 'erro', message: 'Erro na requisição ao backend' }
    }

    const text = await res.text()

    if (!text) {
      return { status: 'erro', message: 'Resposta vazia do backend' }
    }

    const data = JSON.parse(text)

    revalidatePath('/')

    return {
      status: data.status,
      message: data.message,
    }
  } catch {
    return {
      status: 'erro',
      message: 'Falha ao conectar-se ao banco de dados.',
    }
  }
}

export async function getRecords(): Promise<{
  total?: number
  urls?: string[]
}> {
  return await fetch(`${process.env.API_GO_URL}/recently-shortened`, {
    next: { revalidate: 60 },
  }).then((res) => res.json())
}
