import { z } from 'zod'

const schema = z.object({
  AUTH_GITHUB_ID: z.string(),
  POSTGRES_URL: z.string().url(),
  AUTH_SECRET: z.string(),
  GITHUB_TOKEN: z.string(),
  GITHUB_USER: z.string(),
  AUTH_GITHUB_SECRET: z.string(),
  ADMIN_EMAIL: z.string(),

  APP_API_SECRET: z.string(),
  APP_API_TOKEN: z.string(),
  APP_NAME: z.string(),
  APP_API_URL: z.string().url(),
  IPINFO_TOKEN: z.string(),
})

export const env = schema.parse(process.env)
