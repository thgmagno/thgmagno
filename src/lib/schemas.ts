import { z } from 'zod'

export const CategorySchema = z.object({
  id: z.number().optional(),
  slug: z.string().min(1).max(60),
  title: z.string().min(1).max(60),
})

export const TechnologySchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1).max(100),
  url: z.string().url(),
})

export const FormationSchema = z.object({
  id: z.number().optional(),
  institution: z.string().min(1).max(100),
  title: z.string().min(1).max(100),
  duration_time: z.number().positive(),
  certificate_url: z.string().url().nullable(),
})

export const ProjectSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1).max(100),
  description: z.string().min(1).max(500),
  slug: z.string().min(1).max(60),
  created_at: z.date(),
  website_url: z.string().url().nullable(),
  presentation_video_url: z.string().url().nullable(),
})

export const FormationCategoriesSchema = z.object({
  formation_id: z.number().positive(),
  category_id: z.number().positive(),
})

export const ProjectTechnologiesSchema = z.object({
  project_id: z.number().positive(),
  technology_id: z.number().positive(),
})
