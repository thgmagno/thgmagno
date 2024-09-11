export type EducationType = {
  instituition: string
  degree: string
  duration: number
  category: string
  imageUrl: string
  documentUrl: string
}

export type ProjectType = {
  title: string
  slug: string
  description: string
  objective: string
  projectImgUrl: string
  projectUrl: string
}

export type FeaturesType = {
  slug: string
  metadata: {
    title: string
    description: string
  }
}

export type TechnologiesType = {
  slug: string
  metadata: {
    title: string
    url: string
  }
}

export interface MultiLangContent {
  portuguese: string
  english: string
}

export interface Feature {
  title: string
  description: string
}

export interface Technology {
  title: string
  url: string
}

export interface ImageUrl {
  small: string
  medium: string
}

export interface FormData {
  featured: boolean
  title: MultiLangContent
  slug: string
  description: MultiLangContent
  objective: MultiLangContent
  deployUrl: string
  videoUrl: MultiLangContent
  features: {
    portuguese: Feature[]
    english: Feature[]
  }
  technologies: {
    portuguese: Technology[]
    english: Technology[]
  }
  imageUrl: ImageUrl
  createdAt: string
  done: boolean
  token: string
}
