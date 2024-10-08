'use client'

import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'

interface Props {
  currentPage: number
  totalPages: number
  firstPageUrl: string
  lastPageUrl: string
  prevPageUrl: string | null
  nextPageUrl: string | null
  links: {
    url: string | null
    label: string
    active: boolean
  }[]
}

export function Pagination({ pagination }: { pagination: Props }) {
  const { replace } = useRouter()

  const prevPage = () => {
    if (pagination.prevPageUrl) {
      replace(String(pagination.prevPageUrl))
    }
  }

  const nextPage = () => {
    if (pagination.nextPageUrl) {
      replace(String(pagination.nextPageUrl))
    }
  }

  return (
    <PaginationComponent>
      <PaginationContent className="mt-5 flex space-x-3">
        <PaginationItem>
          <PaginationPrevious
            onClick={pagination.currentPage === 1 ? undefined : prevPage}
            className={clsx({
              'cursor-not-allowed p-0 opacity-30 hover:bg-transparent':
                pagination.currentPage === 1,
            })}
          />
        </PaginationItem>

        <div>
          {pagination.links.map((link) => (
            <PaginationItem key={link.label}>
              <PaginationLink
                href={link.url ? String(link.url) : '#'}
                isActive={link.active}
              >
                {link.label}
              </PaginationLink>
            </PaginationItem>
          ))}
        </div>

        <PaginationItem>
          <PaginationNext
            onClick={
              pagination.currentPage === pagination.totalPages
                ? undefined
                : nextPage
            }
            className={clsx({
              'cursor-not-allowed p-0 opacity-30 hover:bg-transparent':
                pagination.currentPage === pagination.totalPages,
            })}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationComponent>
  )
}
