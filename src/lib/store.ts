import { create } from 'zustand'
import {
  Category,
  FormationWithCategory,
  Project,
  Technology,
} from '@/lib/types'
import { isDate } from 'date-fns'

interface BaseStore {
  id: string
  title: string
  setTitle: (value: string) => void
  onReset: () => void
}

interface CategoryStore extends BaseStore {
  onEdit: (category: Category) => void
}

interface TechnologyStore extends BaseStore {
  url: string
  setUrl: (value: string) => void
  onEdit: (technology: Technology) => void
}

interface ProjectStore extends BaseStore {
  description: string
  websiteUrl: string
  presentationVideoUrl: string
  createdAt: Date
  setDescription: (value: string) => void
  setWebsiteUrl: (value: string) => void
  setPresentationVideoUrl: (value: string) => void
  setCreatedAt: (date: Date | null) => void
  onEdit: (project: Project) => void
}

interface FormationStore extends BaseStore {
  institution: string
  duration_time: string
  certificate_url: string
  categoryId?: string
  setInstitution: (value: string) => void
  setDurationTime: (value: string) => void
  setCertificateUrl: (value: string) => void
  setCategoryId: (value: string) => void
  onEdit: (formation: FormationWithCategory) => void
}

export const useCategoryStore = create<CategoryStore>()((set) => ({
  id: '',
  title: '',

  setTitle: (value) => {
    if (value.trim() === '') return
    set({ title: value })
  },

  onEdit: (category) => set({ id: String(category.id), title: category.title }),

  onReset: () => set({ id: '', title: '' }),
}))

export const useTechnologyStore = create<TechnologyStore>()((set) => ({
  id: '',
  title: '',
  url: '',

  setTitle: (value) => {
    if (value.trim() === '') return
    set({ title: value })
  },

  setUrl: (value) => {
    if (value.trim() === '') return
    set({ url: value })
  },

  onEdit: (technology) =>
    set({
      id: String(technology.id),
      title: technology.title,
      url: technology.url,
    }),

  onReset: () => set({ id: '', title: '', url: '' }),
}))

export const useProjectStore = create<ProjectStore>()((set) => ({
  id: '',
  title: '',
  description: '',
  websiteUrl: '',
  presentationVideoUrl: '',
  createdAt: new Date(),

  setTitle: (value) => {
    if (value.trim() === '') return
    set({ title: value })
  },

  setDescription: (value) => {
    if (value.trim() === '') return
    set({ description: value })
  },

  setWebsiteUrl: (value) => {
    if (value.trim() === '') return
    set({ websiteUrl: value })
  },

  setPresentationVideoUrl: (value) => {
    if (value.trim() === '') return
    set({ presentationVideoUrl: value })
  },

  setCreatedAt: (date) => {
    if (!isDate(date)) return
    set({ createdAt: date || new Date() })
  },

  onEdit: (project) =>
    set({
      id: String(project.id),
      title: project.title,
      description: project.description,
      websiteUrl: project.website_url || '#',
      presentationVideoUrl: project.presentation_video_url || '#',
      createdAt: new Date(project.created_at),
    }),

  onReset: () =>
    set({
      id: '',
      title: '',
      description: '',
      websiteUrl: '',
      presentationVideoUrl: '',
      createdAt: new Date(),
    }),
}))

export const useFormationStore = create<FormationStore>()((set) => ({
  id: '',
  title: '',
  institution: '',
  duration_time: '',
  certificate_url: '',
  categoryId: '',

  setTitle: (value) => {
    if (value.trim() === '') return
    set({ title: value })
  },

  setInstitution: (value) => {
    if (value.trim() === '') return
    set({ institution: value })
  },

  setDurationTime: (value) => {
    if (value.trim() === '') return
    set({ duration_time: value })
  },

  setCertificateUrl: (value) => {
    if (value.trim() === '') return
    set({ certificate_url: value })
  },

  setCategoryId: (value) => set({ categoryId: value }),

  onEdit: (formation) =>
    set({
      id: String(formation.id),
      title: formation.title,
      institution: formation.institution,
      duration_time: String(formation.duration_time),
      certificate_url: formation.certificate_url || '',
      categoryId: String(formation.category_id),
    }),

  onReset: () =>
    set({
      id: '',
      title: '',
      institution: '',
      duration_time: '',
      certificate_url: '',
      categoryId: '',
    }),
}))
