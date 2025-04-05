'use server'

import { prisma } from '@/lib/prisma'
import { LocationSchema } from '@/lib/schemas'
import { LocationFormState } from '@/lib/states'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function index() {
  return prisma.location.findMany({
    orderBy: { title: 'asc' },
  })
}

export async function show(id: number) {
  return prisma.location.findUnique({ where: { id } })
}

export async function create(
  formState: LocationFormState,
  formData: FormData,
): Promise<LocationFormState> {
  const parsed = LocationSchema.safeParse(Object.fromEntries(formData))

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
    }
  }

  try {
    await prisma.location.create({ data: parsed.data })
  } catch {
    return { errors: { _form: 'Falha ao conectar-se ao banco de dados' } }
  }

  revalidatePath('/')
  redirect('/admin')
}

export async function update(
  formState: LocationFormState,
  formData: FormData,
): Promise<LocationFormState> {
  const parsed = LocationSchema.safeParse(Object.fromEntries(formData))

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
    }
  }

  if (!parsed.data?.id) {
    return { errors: { _form: 'Informe o ID da localização' } }
  }

  try {
    const locationExists = await prisma.location.findUnique({
      where: { id: parsed.data.id },
    })

    if (!locationExists) {
      return { errors: { _form: 'Localização não encontrada' } }
    }

    await prisma.location.update({
      where: { id: parsed.data.id },
      data: parsed.data,
    })
  } catch {
    return { errors: { _form: 'Falha ao conectar-se ao banco de dados' } }
  }

  revalidatePath('/')
  redirect('/admin')
}

export async function destroy(id: number) {
  const locationExists = await prisma.location.findUnique({
    where: { id },
  })

  if (!locationExists) {
    return { errors: { _form: 'Localização não encontrada' } }
  }

  await prisma.location.delete({ where: { id } })

  revalidatePath('/')
}
