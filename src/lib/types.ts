import {
  Category,
  Comment,
  Formation,
  Institution,
  Location,
  Prisma,
  Visit,
} from '@prisma/client'

export type Params = Promise<{ slug: string }>
export type SearchParams = Promise<{
  [key: string]: string | string[] | undefined
}>

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

export interface GithubResponse {
  total_count: number
  incomplete_results: boolean
  items: GithubProject[]
}

export type FormationWithRelations = Formation & {
  institution: Institution & { location: Location | null }
  category: Category
}

export type InstitutionWithLocation = Institution & {
  location?: Location | null
}

export interface Visitant {
  id: string
  appName: string
  ipHash: string
  userAgent: string | null
  city: string | null
  state: string | null
  country: string | null
  createdAt: Date
}

export type React = '👍' | '👎' | '😄' | '🎉' | '❤️' | '🚀' | '🔥'

export const Reacts: React[] = ['👍', '👎', '😄', '🎉', '❤️', '🚀', '🔥']

export type ReactionWithCount = (Prisma.PickEnumerable<
  Prisma.ReactionGroupByOutputType,
  'emoji'[]
> & {
  _count: number
})[]

export interface ProjectFeedback extends GithubProject {
  comments: Comment[]
  reactions: {
    emoji: Record<string, number>
  }
  visits: Visit[]
}
