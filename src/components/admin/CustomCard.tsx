import { ReactNode } from 'react'

export function CustomCard({ children }: { children: ReactNode }) {
  return (
    <div className="bg-card flex flex-col gap-2 rounded-2xl border p-4 shadow-sm">
      {children}
    </div>
  )
}
