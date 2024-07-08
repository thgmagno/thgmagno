'use client'

import { ReactNode } from 'react'
export { Hero } from './Hero'
export { AboutMe } from './AboutMe'
export { Interests } from './Interests'
export { AboutPortfolio } from './AboutPortfolio'
export { RecentProjects } from './RecentProjects'

export const Section = ({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) => (
  <section className="mb-14 flex flex-col space-y-5 text-justify">
    <div className="flex items-center">
      <div className="mr-4 flex-1 border-b border-neutral-400 dark:border-neutral-700" />
      <h3 className="flex text-xl">{title}</h3>
      <div className="ml-4 flex-1 border-b border-neutral-400 dark:border-neutral-700" />
    </div>
    {children}
  </section>
)
