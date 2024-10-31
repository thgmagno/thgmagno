import { Generated } from 'kysely'

export interface Category {
  id: Generated<number>
  slug: string
  title: string
}

export interface Technology {
  id: Generated<number>
  title: string
  url: string
}

export interface Formation {
  id: Generated<number>
  institution: string
  title: string
  duration_time: number
  certificate_url: string | null
}

export interface FormationWithCategory extends Formation {
  category_id: number | null
  category_title: string | null
}

export interface Project {
  id: Generated<number>
  title: string
  description: string
  slug: string
  created_at: Generated<Date>
  website_url: string | null
  presentation_video_url: string | null
  repository: string | null
}

export interface FormationCategories {
  formation_id: number
  category_id: number
}

export interface ProjectTechnologies {
  project_id: number
  technology_id: number
}

export interface Visitors {
  id: Generated<number>
  visitor_id: string
  visit_date?: Date
}

export interface Database {
  port_categories: Category
  port_technologies: Technology
  port_formations: Formation
  port_projects: Project
  port_visitors: Visitors
  port_formation_categories: FormationCategories
  port_project_technologies: ProjectTechnologies
}
