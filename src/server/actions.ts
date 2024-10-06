'use server'

import { db } from '@/server/db'
import { redirect } from 'next/navigation'

export async function getFormations() {
  const formations = await db
    .selectFrom('port_formations')
    .selectAll()
    .execute()

  return formations
}

export async function getProjects(reverse?: boolean) {
  const orderBy = reverse ? 'title desc' : 'title asc'

  const projects = await db
    .selectFrom('port_projects')
    .selectAll()
    .orderBy(orderBy)
    .execute()

  return projects
}

export async function getProjectBySlug(slug: string) {
  const project = await db
    .selectFrom('port_projects')
    .where('slug', '=', slug)
    .selectAll()
    .executeTakeFirst()

  if (!project) redirect('/projetos')

  return project
}
