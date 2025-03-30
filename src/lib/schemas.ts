import { z } from 'zod'

const capitalizeString = (value: string) => {
  const splitted = value.trim().split(' ')
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

export const FormationSchema = z.object({
  id: z.preprocess((val) => {
    if (typeof val === 'string') {
      const parsed = Number(val)
      return isNaN(parsed) ? undefined : parsed
    }
    return val
  }, z.number()),
  institution: z
    .string()
    .min(1, 'O campo é obrigatório')
    .max(100)
    .transform((val) => capitalizeString(val)),
  title: z
    .string()
    .min(1, 'O campo é obrigatório')
    .max(100)
    .transform((val) => capitalizeString(val)),
  duration_time: z.preprocess(
    (val) => {
      if (typeof val === 'string') {
        const parsed = Number(val)
        return isNaN(parsed) ? undefined : parsed
      }
      return val
    },
    z.number().positive({ message: 'Informe a duração do curso' }),
  ),
  certificate_url: z.string().url().optional(),
  category: z.preprocess(
    (val) => {
      if (typeof val === 'string') {
        const parsed = Number(val)
        return isNaN(parsed) ? undefined : parsed
      }
      return val ?? 0
    },
    z.number().positive({ message: 'Categoria inválida' }),
  ),
})

export const FormationCategoriesSchema = z.object({
  formation_id: z.number().positive(),
  category_id: z.number().positive(),
})
