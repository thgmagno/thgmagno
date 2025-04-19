import { ReactNode } from 'react'

export function CustomCard({ children }: { children: ReactNode }) {
  return (
    <div className="bg-card flex max-h-72 w-full flex-col gap-2 overflow-auto rounded-2xl border p-4 shadow-sm">
      {children}
    </div>
  )
}
