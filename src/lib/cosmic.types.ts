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
      education: {
        instituition: string
        'instituition-logo': {
          url: string
        }
        degree: {
          portuguese: string
          english: string
        }
        duration: number
        'started-at': string
        'ended-at': string
        category: {
          value: string
        }
        'document-url': string
      }[]
    }
  }
}
