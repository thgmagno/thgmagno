'use client'

import { CosmicResponse } from '@/lib/cosmic.types'
import { useLanguageStore } from '@/lib/store/languageStore'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

type Props = Pick<CosmicResponse['object']['metadata'], 'education'>

export function EducationFilters({ education }: Props) {
  const { language } = useLanguageStore()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const categoryEducation = education.map((item) => item.category.value)
  const categoryFilters = Array.from(new Set(categoryEducation))

  useEffect(() => {
    const searchString = searchParams.get('categoria') || ''
    const categories = searchString ? searchString.split(',') : []
    setSelectedCategories(categories)
  }, [searchParams])

  function handleFilters(value: string) {
    const params = new URLSearchParams(searchParams)
    const searchString = params.get('categoria') || ''
    const categories = searchString ? searchString.split(',') : []

    if (categories.includes(value)) {
      const updatedCategories = categories.filter(
        (category) => category !== value,
      )
      if (updatedCategories.length > 0) {
        params.set('categoria', updatedCategories.join(','))
      } else {
        params.delete('categoria')
      }
    } else {
      categories.push(value)
      params.set('categoria', categories.join(','))
    }

    replace(`${pathname}?${params.toString()}`)
  }

  const dict: {
    portuguese: {
      label: string
      categories: Record<string, string>
    }
    english: {
      label: string
    }
  } = {
    portuguese: {
      label: 'Filtros',
      categories: {
        Fundamentals: 'Fundamentos',
        Tools: 'Ferramentas',
      },
    },
    english: {
      label: 'Filters',
    },
  }

  return (
    <section className="my-3 flex flex-wrap items-center gap-2 text-sm md:justify-center">
      {dict[language].label}:
      {categoryFilters.map((item) => (
        <button
          key={item}
          onClick={() => handleFilters(item)}
          className={`px-2 py-1 ${selectedCategories.includes(item) ? 'rounded-full bg-neutral-600 text-neutral-100' : ''}`}
        >
          {language === 'portuguese'
            ? dict.portuguese.categories[item] ?? item
            : item}
        </button>
      ))}
    </section>
  )
}
