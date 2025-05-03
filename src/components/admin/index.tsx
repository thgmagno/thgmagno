import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Categories } from '@/components/admin/Categories'
import { Formations } from '@/components/admin/Formations'
import { Institutions } from '@/components/admin/Institutions'
import { Locations } from '@/components/admin/Locations'
import { Feedbacks } from '@/components/admin/Feedbacks'
import { Redis } from '@/components/admin/Redis'

const tabs = [
  { value: 'categories', label: 'Categorias', component: Categories },
  { value: 'feedbacks', label: 'Feedbacks', component: Feedbacks },
  { value: 'formations', label: 'Formações', component: Formations },
  { value: 'institutions', label: 'Instituições', component: Institutions },
  { value: 'localizations', label: 'Localizações', component: Locations },
  { value: 'redis', label: 'Redis', component: Redis },
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
