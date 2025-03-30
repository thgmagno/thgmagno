'use server'

import { prisma } from '@/lib/prisma'
import { FormationSchema } from '@/lib/schemas'
import { FormationFormState } from '@/lib/states'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function index() {
  return prisma.formation.findMany({
    include: { institution: true, category: true },
  })
}

export async function show(id: number) {
  return prisma.formation.findUnique({ where: { id } })
}

export async function create(
  formState: FormationFormState,
  formData: FormData,
): Promise<FormationFormState> {
  const parsed = FormationSchema.safeParse(Object.fromEntries(formData))

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
    }
  }

  try {
    await prisma.formation.create({ data: parsed.data })
  } catch {
    return { errors: { _form: 'Falha ao conectar-se ao banco de dados' } }
  }

  revalidatePath('/')
  redirect('/admin')
}

export async function update(
  formState: FormationFormState,
  formData: FormData,
): Promise<FormationFormState> {
  const parsed = FormationSchema.safeParse(Object.fromEntries(formData))

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
    }
  }

  if (!parsed.data?.id) {
    return { errors: { _form: 'Informe o ID da formação' } }
  }

  try {
    const formationExists = await prisma.formation.findUnique({
      where: { id: parsed.data.id },
    })

    if (!formationExists) {
      return { errors: { _form: 'Formação não encontrada' } }
    }

    await prisma.formation.update({
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
  const formationExists = await prisma.formation.findUnique({
    where: { id },
  })

  if (!formationExists) {
    return { errors: { _form: 'Formação não encontrada' } }
  }

  return prisma.formation.delete({ where: { id } })
}
