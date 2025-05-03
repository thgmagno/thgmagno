'use client'

import React, { useState } from 'react'
import clsx from 'clsx'
import { Visit } from '@prisma/client'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '../ui/button'
import { formatDate } from '@/lib/utils'

export function TabVisits({ visits }: { visits: Visit[] }) {
  const [orderBy, setOrderBy] = useState<'date' | 'count'>('date')

  const grouped = visits
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .reduce<Record<string, Record<string, { visit: Visit; count: number }>>>(
      (acc, visit) => {
        const dateLabel = formatDate(new Date(visit.createdAt))
        const locationKey = `${visit.city},${visit.state},${visit.country}`

        if (!acc[dateLabel]) acc[dateLabel] = {}
        if (!acc[dateLabel][locationKey]) {
          acc[dateLabel][locationKey] = { visit, count: 1 }
        } else {
          acc[dateLabel][locationKey].count++
        }

        return acc
      },
      {},
    )

  const renderVisits = () => {
    if (orderBy === 'date') {
      return Object.entries(grouped).map(([date, locations]) => (
        <React.Fragment key={date}>
          {Object.values(locations).map(({ visit, count }) => (
            <div
              key={`${visit.city}-${visit.state}-${visit.country}-${date}`}
              className="bg-card mb-2 flex items-center justify-between rounded-md px-4 py-2"
            >
              <Avatar>
                <AvatarFallback
                  className={clsx('text-muted-foreground text-sm font-bold', {
                    'text-green-500': count > 2,
                    'text-blue-500': count > 4,
                    'text-purple-600': count > 8,
                  })}
                >
                  {count > 9 ? '+9' : count}x
                </AvatarFallback>
              </Avatar>
              <div className="ml-2.5 flex-1">
                <small>{visit.country}</small>
                <p className="text-sm font-semibold">
                  {visit.city},{' '}
                  <span className="text-muted-foreground">{visit.state}</span>
                </p>
              </div>
              <small className="text-muted-foreground">{date}</small>
            </div>
          ))}
        </React.Fragment>
      ))
    } else {
      const flatList = Object.entries(grouped).flatMap(([date, locations]) =>
        Object.values(locations).map(({ visit, count }) => ({
          visit,
          count,
          date,
        })),
      )

      return flatList
        .sort((a, b) => b.count - a.count)
        .map(({ visit, count, date }) => (
          <div
            key={`${visit.city}-${visit.state}-${visit.country}-${date}`}
            className="bg-card mb-2 flex items-center justify-between rounded-md px-4 py-2"
          >
            <Avatar>
              <AvatarFallback
                className={clsx('text-muted-foreground text-sm font-bold', {
                  'text-green-500': count > 2,
                  'text-blue-500': count > 4,
                  'text-purple-600': count > 8,
                })}
              >
                {count > 9 ? '+9' : count}x
              </AvatarFallback>
            </Avatar>
            <div className="ml-2.5 flex-1">
              <small>{visit.country}</small>
              <p className="text-sm font-semibold">
                {visit.city},{' '}
                <span className="text-muted-foreground">{visit.state}</span>
              </p>
            </div>
            <small className="text-muted-foreground">{date}</small>
          </div>
        ))
    }
  }

  return (
    <>
      {visits.length > 0 ? (
        <div className="m-0 flex justify-end pb-1.5">
          <Button
            size="sm"
            variant="link"
            className="p-0"
            onClick={() =>
              setOrderBy((prev) => (prev === 'date' ? 'count' : 'date'))
            }
          >
            {orderBy === 'date' ? 'Mais recentes' : 'Mais populares'}
          </Button>
        </div>
      ) : (
        <p className="text-muted-foreground p-3 pt-6 text-center">
          Nenhuma visita registrada
        </p>
      )}
      {renderVisits()}
    </>
  )
}
