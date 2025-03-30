import { Generated, Selectable } from 'kysely'

interface CategoryTable {
  id: Generated<number>
  slug: string
  title: string
}

export type Category = Selectable<CategoryTable>

interface TechnologyTable {
  id: Generated<number>
  title: string
  url: string
}

export type Technology = Selectable<TechnologyTable>

interface FormationTable {
  id: Generated<number>
  institution: string
  title: string
  duration_time: number
  certificate_url: string | null
}

export type Formation = Selectable<FormationTable>

export interface FormationWithCategory extends Formation {
  category_id: number | null
  category_title: string | null
}

export interface ProjectTable {
  id: Generated<number>
  title: string
  description: string
  slug: string
  created_at: Date
  website_url: string | null
  presentation_video_url: string | null
  repository: string | null
}

export type Project = Selectable<ProjectTable>

export interface FormationCategoriesTable {
  formation_id: number
  category_id: number
}

export type FormationCategories = Selectable<FormationCategoriesTable>

export interface ProjectTechnologiesTable {
  project_id: number
  technology_id: number
}

export type ProjectTechnologies = Selectable<ProjectTechnologiesTable>

export interface VisitorsTable {
  id: Generated<number>
  visitor_id: string
  visit_date?: Date
}

export type Visitors = Selectable<VisitorsTable>

export interface Database {
  port_categories: CategoryTable
  port_technologies: TechnologyTable
  port_formations: FormationTable
  port_projects: ProjectTable
  port_visitors: VisitorsTable
  port_formation_categories: FormationCategoriesTable
  port_project_technologies: ProjectTechnologiesTable
}

export interface GithubProject {
  id: number
  name: string
  html_url: string
  description: string | null
  created_at: string
  updated_at: string
  homepage: string
  language: string
  visibility: string
}
