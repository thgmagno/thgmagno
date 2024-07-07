import { FlagBR, FlagUK } from '@/components/flags'
import { create } from 'zustand'

type Store = {
  language: 'portuguese' | 'english'
  Icon: JSX.Element
  setLanguage: (language: string) => void
}

export type ValidLanguage = 'portuguese' | 'english'

const initialState = {
  language: 'portuguese',
  Icon: <FlagBR />,
}

const storagedLanguage =
  localStorage?.getItem('thgmagno-language') ?? initialState.language

export const useLanguageStore = create<Store>()((set) => ({
  language: storagedLanguage as ValidLanguage,
  Icon: storagedLanguage === 'english' ? <FlagUK /> : <FlagBR />,
  setLanguage: (newLanguage: string) => {
    localStorage.setItem('thgmagno-language', newLanguage)
    set({
      language: newLanguage as ValidLanguage,
      Icon: newLanguage === 'english' ? <FlagUK /> : <FlagBR />,
    })
  },
}))
