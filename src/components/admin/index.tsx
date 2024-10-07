import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { Categories } from './Categories'
import { Formations } from './Formations'
import { Projects } from './Projects'
import { Technologies } from './Technologies'

export function AdminDashboard() {
  return (
    <Tabs defaultValue="categories">
      <TabsList className="mb-5">
        <TabsTrigger value="categories">Categorias</TabsTrigger>
        <TabsTrigger value="formations">Formações</TabsTrigger>
        <TabsTrigger value="technologies">Tecnologias</TabsTrigger>
        <TabsTrigger value="projects">Projetos</TabsTrigger>
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
