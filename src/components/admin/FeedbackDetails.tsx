'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import Link from 'next/link'
import { Button } from '../ui/button'
import { generateTitle } from '@/lib/utils'
import { ProjectFeedback } from '@/lib/types'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TabVisits } from './TabVisits'
import { TabComments } from './TabComments'

export function FeedbackDetails({ project }: { project: ProjectFeedback }) {
  const tabs = [
    { value: 'visits', label: 'Visitas', component: TabVisits },
    { value: 'comments', label: 'Comentários', component: TabComments },
  ]

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="link">
          Detalhes
        </Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-3xl">
        <DialogHeader>
          <DialogTitle asChild>
            <Link
              href={`/projeto/${project.name}`}
              className="text-muted-foreground hover:text-foreground w-fit hover:underline"
            >
              {generateTitle(project.name)}
            </Link>
          </DialogTitle>
          <DialogDescription>
            {project.visits.length} visitas -{' '}
            {Object.entries(project.reactions.emoji).length} reações -{' '}
            {project.comments.length} comentários
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue={tabs[0].value} className="mx-4">
          <div className="no-scrollbar overflow-x-scroll">
            <TabsList>
              {tabs.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              <tab.component
                visits={project.visits}
                comments={project.comments}
              />
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
