import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Categories } from './Categories'
import { Formations } from './Formations'
import { Institutions } from './Institutions'
import { Locations } from './Locations'
import { Feedbacks } from './Feedbacks'

const tabs = [
  { value: 'categories', label: 'Categorias', component: Categories },
  { value: 'feedbacks', label: 'Feedbacks', component: Feedbacks },
  { value: 'formations', label: 'Formações', component: Formations },
  { value: 'institutions', label: 'Instituições', component: Institutions },
  { value: 'localizations', label: 'Localizações', component: Locations },
].sort((a, b) => a.label.localeCompare(b.label))

export function AdminDashboard() {
  return (
    <Tabs defaultValue={tabs[1].value}>
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
