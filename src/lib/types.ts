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
