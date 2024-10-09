import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { Categories } from './Categories'
import { Formations } from './Formations'
import { Projects } from './Projects'
import { Technologies } from './Technologies'
import { Visitors } from './Visitors'

export function AdminDashboard() {
  return (
    <Tabs defaultValue="visitors">
      <div className="no-scrollbar overflow-x-scroll">
        <TabsList className="mb-5">
          <TabsTrigger value="visitors">Visitantes</TabsTrigger>
          <TabsTrigger value="categories">Categorias</TabsTrigger>
          <TabsTrigger value="formations">Formações</TabsTrigger>
          <TabsTrigger value="technologies">Tecnologias</TabsTrigger>
          <TabsTrigger value="projects">Projetos</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="visitors">
        <Visitors />
      </TabsContent>
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
