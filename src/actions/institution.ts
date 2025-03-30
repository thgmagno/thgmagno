'use server'

import { prisma } from '@/lib/prisma'
import { InstitutionSchema } from '@/lib/schemas'
import { InstitutionFormState } from '@/lib/states'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function index() {
  return prisma.institution.findMany()
}

export async function show(id: number) {
  return prisma.institution.findUnique({ where: { id } })
}

export async function create(
  formState: InstitutionFormState,
  formData: FormData,
): Promise<InstitutionFormState> {
  const parsed = InstitutionSchema.safeParse(Object.fromEntries(formData))

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
    }
  }

  try {
    await prisma.institution.create({ data: parsed.data })
  } catch {
    return { errors: { _form: 'Falha ao conectar-se ao banco de dados' } }
  }

  revalidatePath('/')
  redirect('/admin')
}

export async function update(
  formState: InstitutionFormState,
  formData: FormData,
): Promise<InstitutionFormState> {
  const parsed = InstitutionSchema.safeParse(Object.fromEntries(formData))

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
    }
  }

  if (!parsed.data?.id) {
    return { errors: { _form: 'Informe o ID da instituição' } }
  }

  try {
    const institutionExists = await prisma.institution.findUnique({
      where: { id: parsed.data.id },
    })

    if (!institutionExists) {
      return { errors: { _form: 'Instituição não encontrada' } }
    }

    await prisma.institution.update({
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
  const institutionExists = await prisma.institution.findUnique({
    where: { id },
  })

  if (!institutionExists) {
    return { errors: { _form: 'Instituição não encontrada' } }
  }

  return prisma.institution.delete({ where: { id } })
}
