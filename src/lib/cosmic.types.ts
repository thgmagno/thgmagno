export type CosmicResponse = {
  object: {
    metadata: {
      home: {
        fullname: string
        'occupation-area': {
          portuguese: string
          english: string
        }
        'image-profile': {
          url: string
          imgix_url: string
        }
        social: {
          href: string
          label: string
        }[]
        'about-me': {
          portuguese: {
            title: string
            data: string[]
          }
          english: {
            title: string
            data: string[]
          }
        }
        interests: {
          portuguese: {
            title: string
            data: string[]
          }
          english: {
            title: string
            data: string[]
          }
        }
        'about-portfolio': {
          portuguese: {
            title: string
            data: string[]
          }
          english: {
            title: string
            data: string[]
          }
        }
      }
    }
  }
}
