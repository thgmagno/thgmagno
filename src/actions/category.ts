'use server'

import { prisma } from '@/lib/prisma'
import { CategorySchema } from '@/lib/schemas'
import { CategoryFormState } from '@/lib/states'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function index() {
  return prisma.category.findMany({
    orderBy: { title: 'asc' },
  })
}

export async function show(id: number) {
  return prisma.category.findUnique({ where: { id } })
}

export async function create(
  formState: CategoryFormState,
  formData: FormData,
): Promise<CategoryFormState> {
  const parsed = CategorySchema.safeParse(Object.fromEntries(formData))

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
    }
  }

  try {
    const slug = parsed.data.title.toLowerCase().replace(/\s+/g, '-')

    await prisma.category.create({ data: { ...parsed.data, slug } })
  } catch {
    return { errors: { _form: 'Falha ao conectar-se ao banco de dados' } }
  }

  revalidatePath('/')
  redirect('/admin')
}

export async function update(
  formState: CategoryFormState,
  formData: FormData,
): Promise<CategoryFormState> {
  const parsed = CategorySchema.safeParse({
    id: formData.get('id'),
    title: formData.get('title'),
    slug: formData.get('slug'),
    active: formData.get('active'),
  })

  console.log(formData)
  console.log(parsed)

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
    }
  }

  if (!parsed.data?.id) {
    return { errors: { _form: 'Informe o ID da categoria' } }
  }

  try {
    const categoryExists = await prisma.category.findUnique({
      where: { id: parsed.data.id },
    })

    if (!categoryExists) {
      return { errors: { _form: 'Categoria não encontrada' } }
    }

    await prisma.category.update({
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
  const categoryExists = await prisma.category.findUnique({
    where: { id },
  })

  if (!categoryExists) {
    return { errors: { _form: 'Categoria não encontrada' } }
  }

  await prisma.category.delete({ where: { id } })

  revalidatePath('/')
}
