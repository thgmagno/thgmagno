'use server'

import { db } from '@/server/db'
import { redirect } from 'next/navigation'

export async function findManyFormations() {
  const formations = await db
    .selectFrom('port_formations')
    .leftJoin(
      'port_formation_categories',
      'port_formations.id',
      'port_formation_categories.formation_id',
    )
    .leftJoin(
      'port_categories',
      'port_formation_categories.category_id',
      'port_categories.id',
    )
    .select([
      'port_formations.id',
      'port_formations.institution',
      'port_formations.title',
      'port_formations.duration_time',
      'port_formations.certificate_url',
      'port_categories.title as category',
    ])
    .orderBy('port_formations.title')
    .execute()

  return formations
}

export async function findManyProjects(
  page: number = 1,
  limit: number = 10,
  reverse?: boolean,
) {
  const orderBy = reverse ? 'title desc' : 'title asc'

  const projects = await db
    .selectFrom('port_projects')
    .selectAll()
    .orderBy(orderBy)
    .offset((page - 1) * limit)
    .limit(limit)
    .execute()

  return projects
}

export async function findOneProject(slug: string) {
  const project = await db
    .selectFrom('port_projects')
    .where('slug', '=', slug)
    .selectAll()
    .executeTakeFirst()

  if (!project) redirect('/projetos')

  return project
}

export async function findManyCategories() {
  const categories = await db
    .selectFrom('port_categories')
    .selectAll()
    .orderBy('title')
    .execute()

  return categories
}

export async function findManyTechnologies() {
  const technologies = await db
    .selectFrom('port_technologies')
    .selectAll()
    .orderBy('title')
    .execute()

  return technologies
}
