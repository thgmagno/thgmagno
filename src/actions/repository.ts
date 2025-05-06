'use server'

import { prisma } from '@/lib/prisma'
import { CategoryProjectSchema } from '@/lib/schemas'
import { CategoryProjectFormState } from '@/lib/states'
import { GithubResponse } from '@/lib/types'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { env } from 'root/env'

export async function fetcherRepositories(
  category?: string | string[],
): Promise<GithubResponse> {
  const topics = ['topic:portfolio']

  if (category && category !== 'all-projects') {
    topics.push(`topic:${category}`)
  }

  const query = `user:${env.GITHUB_USER}+${topics.join('+')}+fork:true`

  const url = `https://api.github.com/search/repositories?q=${query}`

  return await fetch(url, {
    headers: {
      Authorization: `Bearer ${env.GITHUB_TOKEN}`,
    },
    next: {
      revalidate: 60,
    },
  }).then((res) => res.json())
}

export async function fetcherCategoriesProject() {
  return prisma.categoryProject.findMany({
    orderBy: { label: 'asc' },
  })
}

export async function upsertCategoryProject(
  formState: CategoryProjectFormState,
  formData: FormData,
): Promise<CategoryProjectFormState> {
  const parsed = CategoryProjectSchema.safeParse(Object.fromEntries(formData))

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
    }
  }

  try {
    await prisma.categoryProject.upsert({
      where: { value: parsed.data.value },
      create: { ...parsed.data, active: true },
      update: { ...parsed.data, active: true },
    })
  } catch {
    return { errors: { _form: 'Falha ao conectar-se ao banco de dados' } }
  }

  revalidatePath('/')
  redirect('/admin')
}

export async function destroyCategoryProject(value: string) {
  const categoryExists = await prisma.categoryProject.findUnique({
    where: { value },
  })

  if (!categoryExists) {
    return { errors: { _form: 'Categoria não encontrada' } }
  }

  await prisma.categoryProject.delete({ where: { value } })

  revalidatePath('/')
}
