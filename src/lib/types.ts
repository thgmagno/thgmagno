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
