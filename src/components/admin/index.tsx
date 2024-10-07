import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { Categories } from './Categories'
import { Formations } from './Formations'
import { Projects } from './Projects'
import { Technologies } from './Technologies'

export function AdminDashboard() {
  return (
    <Tabs defaultValue="categories">
      <TabsList className="mb-5">
        <TabsTrigger value="categories">Categories</TabsTrigger>
        <TabsTrigger value="formations">Formations</TabsTrigger>
        <TabsTrigger value="technologies">Technologies</TabsTrigger>
        <TabsTrigger value="projects">Projects</TabsTrigger>
      </TabsList>
      <TabsContent value="categories">
        <Categories />
      </TabsContent>
      <TabsContent value="formations">
        <Formations />
      </TabsContent>
      <TabsContent value="technologies">
        <Technologies />
      </TabsContent>
      <TabsContent value="projects">
        <Projects />
      </TabsContent>
    </Tabs>
  )
}
