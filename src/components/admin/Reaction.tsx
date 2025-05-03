import Link from 'next/link'
import { Reaction as ReactionType } from '@prisma/client'

export function Reaction({
  reaction,
}: {
  reaction: ReactionType & { projectName: string }
}) {
  const truncateEmail = (email: string) =>
    email.length > 30 ? email.slice(0, 28) + '...' : email

  return (
    <div className="bg-card flex w-full items-center justify-between rounded-2xl border p-2">
      <div className="text-sm">
        <Link
          href={`/projeto/${reaction.projectName}`}
          className="group block text-blue-500 transition-opacity duration-200 hover:opacity-80"
        >
          {reaction.projectName}
        </Link>
        <p className="text-muted-foreground">
          {truncateEmail(reaction.authorEmail)}
        </p>
      </div>
      <span className="p-2 text-lg">{reaction.emoji}</span>
    </div>
  )
}
