import { create } from 'zustand'

type Feature = { title: string; description: string }
type Technology = { title: string; url: string }
type ImageUrl = { small: string; medium: string }
type MultiLangContent = { portuguese: string; english: string }

type FormData = {
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
  featured: boolean
  token: string
}

type ProjectStore = {
  formData: FormData
  setFormData: (data: Partial<FormData>) => void
  addFeature: (lang: keyof MultiLangContent) => void
  removeFeature: (lang: keyof MultiLangContent, index: number) => void
  addTechnology: (lang: keyof MultiLangContent) => void
  removeTechnology: (lang: keyof MultiLangContent, index: number) => void
}

const useProjectStore = create<ProjectStore>((set) => ({
  formData: {
    title: { portuguese: '', english: '' },
    slug: '',
    description: { portuguese: '', english: '' },
    objective: { portuguese: '', english: '' },
    deployUrl: '',
    videoUrl: { portuguese: '', english: '' },
    features: { portuguese: [], english: [] },
    technologies: { portuguese: [], english: [] },
    imageUrl: { small: '', medium: '' },
    createdAt: '',
    done: false,
    featured: false,
    token: '',
  },
  setFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),
  addFeature: (lang) =>
    set((state) => ({
      formData: {
        ...state.formData,
        features: {
          ...state.formData.features,
          [lang]: [
            ...state.formData.features[lang],
            { title: '', description: '' },
          ],
        },
      },
    })),
  removeFeature: (lang, index) =>
    set((state) => ({
      formData: {
        ...state.formData,
        features: {
          ...state.formData.features,
          [lang]: state.formData.features[lang].filter((_, i) => i !== index),
        },
      },
    })),
  addTechnology: (lang) =>
    set((state) => ({
      formData: {
        ...state.formData,
        technologies: {
          ...state.formData.technologies,
          [lang]: [
            ...state.formData.technologies[lang],
            { title: '', url: '' },
          ],
        },
      },
    })),
  removeTechnology: (lang, index) =>
    set((state) => ({
      formData: {
        ...state.formData,
        technologies: {
          ...state.formData.technologies,
          [lang]: state.formData.technologies[lang].filter(
            (_, i) => i !== index,
          ),
        },
      },
    })),
}))

export default useProjectStore
