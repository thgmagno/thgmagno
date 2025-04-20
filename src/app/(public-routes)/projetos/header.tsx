'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CategoryProject } from '@prisma/client'
import { motion } from 'framer-motion'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export function Header({ categories }: { categories: CategoryProject[] }) {
  const titleVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 1 } },
  }

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams)

    if (value === 'mostrar-todos') {
      params.delete('categoria')
    } else {
      params.set('categoria', value)
    }

    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={titleVariants}
        className="mb-8 flex items-center justify-between"
      >
        <h1 className="text-2xl font-medium tracking-tight">Projetos</h1>

        <Select
          defaultValue={searchParams.get('categoria') || 'mostrar-todos'}
          onValueChange={handleChange}
        >
          <SelectTrigger className="bg-card w-fit border-none">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mostrar-todos">Mostrar todos</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </motion.div>
    </>
  )
}
