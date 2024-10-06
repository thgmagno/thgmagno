'use client'

import { ArrowDownAz, ArrowUpAz } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export function SortSelector({ ordenacao }: { ordenacao?: string }) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleClick = (sort: 'asc' | 'desc') => {
    if (!sort || sort === 'asc') {
      return replace(pathname)
    }
    const params = new URLSearchParams(searchParams)
    params.set('ordenacao', 'decrescente')
    return replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div>
      {ordenacao === 'decrescente' ? (
        <ArrowUpAz
          onClick={() => handleClick('asc')}
          className="h-5 w-5 cursor-pointer"
        />
      ) : (
        <ArrowDownAz
          onClick={() => handleClick('desc')}
          className="h-5 w-5 cursor-pointer"
        />
      )}
    </div>
  )
}
