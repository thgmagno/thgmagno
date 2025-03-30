'use server'

import { db } from '@/server/db'

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

export async function findManyCategories() {
  const categories = await db
    .selectFrom('port_categories')
    .selectAll()
    .orderBy('title')
    .execute()

  return categories
}
