'use server'

import { db } from '@/server/db'
import { redirect } from 'next/navigation'
import { env } from '../../env'

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
      'port_categories.id as category_id',
      'port_categories.title as category_title',
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

  const totalProjects = await db
    .selectFrom('port_projects')
    .select(db.fn.count('id').as('total'))
    .executeTakeFirst()
  const total = totalProjects?.total

  const totalPages = Math.ceil((total as number) / limit)

  const projects = await db
    .selectFrom('port_projects')
    .selectAll()
    .orderBy(orderBy)
    .offset((page - 1) * limit)
    .limit(limit)
    .execute()

  const getPageUrl = (pageNumber: number) =>
    `${env.BASE_URL}/projetos?pagina=${pageNumber}&limite=${limit}`

  const links = []

  for (let i = 1; i <= totalPages; i++) {
    links.push({
      url: getPageUrl(i),
      label: `${i}`,
      active: i === page,
    })
  }

  return {
    projects,
    currentPage: page,
    totalPages,
    firstPageUrl: getPageUrl(1),
    lastPageUrl: getPageUrl(totalPages),
    prevPageUrl: page > 1 ? getPageUrl(page - 1) : null,
    nextPageUrl: page < totalPages ? getPageUrl(page + 1) : null,
    links,
  }
}

export async function findOneProject(slug: string) {
  const project = await db
    .selectFrom('port_projects')
    .where('slug', '=', slug)
    .selectAll()
    .executeTakeFirst()

  if (!project) redirect('/projetos')

  const technologies = await db
    .selectFrom('port_project_technologies')
    .leftJoin(
      'port_technologies',
      'port_project_technologies.technology_id',
      'port_technologies.id',
    )
    .where('port_project_technologies.project_id', '=', project.id as number)
    .select([
      'port_technologies.id as technology_id',
      'port_technologies.title as technology_title',
      'port_technologies.url as technology_url',
    ])
    .orderBy('title')
    .execute()

  return {
    ...project,
    technologies,
  }
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
