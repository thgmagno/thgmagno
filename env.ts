import { z } from 'zod'

const schema = z.object({
  POSTGRES_URL: z.string().url(),
  ADMIN_USER: z.string(),
  ADMIN_PASSWORD: z.string(),
  AUTH_SECRET: z.string(),
  COOKIE_NAME: z.string(),
  BASE_URL: z.string().url(),
})

export const env = schema.parse(process.env)
