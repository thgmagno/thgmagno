import { z } from 'zod'

export const LocationSchema = z.object({
  id: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true
        return !isNaN(Number(val)) && Number(val) > 0
      },
      { message: 'O id precisa ser numérico' },
    )
    .transform((val) => (val ? Number(val) : undefined)),
  title: z
    .string()
    .min(1, { message: 'Título é obrigatório' })
    .max(32, 'Título ultrapassa o limite de 32 caracteres')
    .transform((value) =>
      value
        .split(' ')
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
        )
        .join(' '),
    ),
})

export const CategorySchema = z.object({
  id: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true
        return !isNaN(Number(val)) && Number(val) > 0
      },
      { message: 'O id precisa ser numérico' },
    )
    .transform((val) => (val ? Number(val) : undefined)),
  title: z
    .string()
    .min(1, { message: 'Título é obrigatório' })
    .max(32, 'Título ultrapassa o limite de 32 caracteres')
    .transform((value) =>
      value
        .split(' ')
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
        )
        .join(' '),
    ),
  active: z
    .string()
    .nullable()
    .transform((val) => val === 'on'),
  slug: z.string().optional(),
})

export const FormationSchema = z.object({
  id: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true
        return !isNaN(Number(val)) && Number(val) > 0
      },
      { message: 'O id precisa ser numérico' },
    )
    .transform((val) => (val ? Number(val) : undefined)),
  title: z
    .string()
    .min(1, { message: 'Título é obrigatório' })
    .max(32, 'Título ultrapassa o limite de 32 caracteres')
    .transform((value) =>
      value
        .split(' ')
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
        )
        .join(' '),
    ),
  startedAt: z.date({ message: 'Data de início é obrigatória' }),
  endedAt: z.date().optional().nullable(),
  certificateUrl: z.string().optional().nullable(),
  active: z
    .string()
    .nullable()
    .transform((val) => val === 'on'),
  institutionId: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: 'Informe a instituição',
    })
    .transform((val) => Number(val)),
  categoryId: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: 'Informe a categoria',
    })
    .transform((val) => Number(val)),
})

export const InstitutionSchema = z.object({
  id: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true
        return !isNaN(Number(val)) && Number(val) > 0
      },
      { message: 'O id precisa ser numérico' },
    )
    .transform((val) => (val ? Number(val) : undefined)),
  name: z
    .string()
    .min(1, { message: 'Título é obrigatório' })
    .max(32, 'Título ultrapassa o limite de 32 caracteres')
    .transform((value) =>
      value
        .split(' ')
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
        )
        .join(' '),
    ),
  modality: z.enum(['ONLINE', 'PRESENCIAL', 'HIBRIDO'], {
    message: 'Informe a modalidade',
  }),
  locationId: z.number().optional(),
})
