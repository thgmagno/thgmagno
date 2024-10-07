import { z } from 'zod'

const capitalizeString = (value: string) => {
  const splitted = value.split(' ')
  const capitalized = splitted
    .map((word) => word.charAt(0).toUpperCase().concat(word.slice(1)))
    .join(' ')
  return capitalized
}

export const LoginSchema = z.object({
  user: z.string().min(1, 'O campo usuário é obrigatório'),
  password: z.string().min(1, 'O campo senha é obrigatório'),
})

export const CategorySchema = z.object({
  id: z.preprocess((val) => {
    if (typeof val === 'string') {
      const parsed = Number(val)
      return isNaN(parsed) ? undefined : parsed
    }
    return val
  }, z.number()),
  title: z
    .string()
    .min(1, 'O campo é obrigatório')
    .max(60)
    .transform((val) => capitalizeString(val)),
})

export const TechnologySchema = z.object({
  id: z.preprocess((val) => {
    if (typeof val === 'string') {
      const parsed = Number(val)
      return isNaN(parsed) ? undefined : parsed
    }
    return val
  }, z.number()),
  title: z
    .string()
    .min(1, 'O campo é obrigatório')
    .max(100)
    .transform((val) => capitalizeString(val)),
  url: z.string().url(),
})

export const FormationSchema = z.object({
  id: z.preprocess((val) => {
    if (typeof val === 'string') {
      const parsed = Number(val)
      return isNaN(parsed) ? undefined : parsed
    }
    return val
  }, z.number()),
  institution: z.string().min(1, 'O campo é obrigatório').max(100),
  title: z
    .string()
    .min(1, 'O campo é obrigatório')
    .max(100)
    .transform((val) => capitalizeString(val)),
  duration_time: z.number().positive(),
  certificate_url: z.string().url().nullable(),
})

export const ProjectSchema = z.object({
  id: z.preprocess((val) => {
    if (typeof val === 'string') {
      const parsed = Number(val)
      return isNaN(parsed) ? undefined : parsed
    }
    return val
  }, z.number()),
  title: z
    .string()
    .min(1, 'O campo é obrigatório')
    .max(100)
    .transform((val) => capitalizeString(val)),
  description: z.string().min(1, 'O campo é obrigatório').max(500),
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
