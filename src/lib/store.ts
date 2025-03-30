import { create } from 'zustand'
import { Category, FormationWithCategory } from '@/server/database.types'

interface BaseStore {
  id: string
  title: string
  setTitle: (value: string) => void
  onReset: () => void
}

interface CategoryStore extends BaseStore {
  onEdit: (category: Category) => void
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
