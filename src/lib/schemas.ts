import { z } from 'zod'

export const LocationSchema = z.object({
  // ID
  id: z
    .string()
    .optional()
    .refine(
      (val) => {
        return !val || (!isNaN(Number(val)) && Number(val) > 0)
      },
      { message: 'O id precisa ser numérico' },
    )
    .transform((val) => (val ? Number(val) : undefined)),

  // Title
  title: z
    .string()
    .min(1, { message: 'Título é obrigatório' })
    .max(32, 'Título ultrapassa o limite de 32 caracteres'),
})

export const CategorySchema = z.object({
  // ID
  id: z
    .string()
    .optional()
    .refine(
      (val) => {
        return !val || (!isNaN(Number(val)) && Number(val) > 0)
      },
      { message: 'O id precisa ser numérico' },
    )
    .transform((val) => (val ? Number(val) : undefined)),

  // Title
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

  // Ativo
  active: z
    .string()
    .nullable()
    .transform((val) => val === 'on'),
  slug: z.string().optional(),
})

export const FormationSchema = z.object({
  // ID
  id: z
    .string()
    .optional()
    .refine(
      (val) => {
        return !val || (!isNaN(Number(val)) && Number(val) > 0)
      },
      { message: 'O id precisa ser numérico' },
    )
    .transform((val) => (val ? Number(val) : undefined)),

  // Título
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

  // Início
  startedAt: z
    .string()
    .min(1, { message: 'Data de início é obrigatória' })
    .refine((val) => !isNaN(new Date(val).getTime()), {
      message: 'Data de início inválida',
    })
    .transform((val) => new Date(val)),

  // Fim
  endedAt: z
    .string()
    .optional()
    .nullable()
    .refine((val) => !val || !isNaN(new Date(val).getTime()), {
      message: 'Data de término inválida',
    })
    .transform((val) => (val ? new Date(val) : undefined)),

  // URL do certificado
  certificateUrl: z.string().optional().nullable(),

  // Ativo
  active: z
    .string()
    .nullable()
    .transform((val) => val === 'on'),

  // ID da instituição
  institutionId: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: 'Informe a instituição',
    })
    .transform((val) => Number(val)),

  // ID da categoria
  categoryId: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: 'Informe a categoria',
    })
    .transform((val) => Number(val)),
})

export const InstitutionSchema = z.object({
  // ID
  id: z
    .string()
    .optional()
    .refine(
      (val) => {
        return !val || (!isNaN(Number(val)) && Number(val) > 0)
      },
      { message: 'O id precisa ser numérico' },
    )
    .transform((val) => (val ? Number(val) : undefined)),

  // Nome
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

  // Modalidade
  modality: z.enum(['ONLINE', 'PRESENCIAL', 'HIBRIDO'], {
    message: 'Informe a modalidade',
  }),

  // ID da localização
  locationId: z
    .string()
    .optional()
    .nullable()
    .transform((val) => {
      if (!val || isNaN(Number(val))) return null
      return Number(val)
    }),
})

export const ReactionSchema = z.object({
  projectId: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: 'Informe o projeto',
    })
    .transform((val) => Number(val)),
  emoji: z.string(),
})

export const CommentSchema = z.object({
  projectId: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: 'Informe o projeto',
    })
    .transform((val) => Number(val)),
  commentId: z.string().optional(),
  comment: z.string().min(1, 'Por favor, escreva seu comentário'),
  comentParentId: z.string().optional(),
})
