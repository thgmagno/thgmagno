import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { Categories } from './Categories'
import { Formations } from './Formations'
import { Visitors } from './Visitors'

const tabs = [
  { value: 'categories', label: 'Categorias', component: Categories },
  { value: 'formations', label: 'Formações', component: Formations },
  { value: 'visitors', label: 'Visitantes', component: Visitors },
  { value: 'institutions', label: 'Instituições', component: Visitors },
  { value: 'localizations', label: 'Localizações', component: Visitors },
].sort((a, b) => a.label.localeCompare(b.label))

export function AdminDashboard() {
  return (
    <Tabs defaultValue={tabs[0].value}>
      <div className="no-scrollbar overflow-x-scroll">
        <TabsList className="mb-5">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          <tab.component />
        </TabsContent>
      ))}
    </Tabs>
  )
}
