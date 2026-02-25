import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { GardenCanvas } from '../components/GardenCanvas'
import { Header } from '../components/Header'
import type { Cell, Plan } from '../types'

export const Route = createFileRoute('/')({ component: GardenPage })

function GardenPage() {
  const [plans, setPlans] = useState<Plan[]>(() => {
    const id = crypto.randomUUID()
    return [{ id, name: 'My Garden', cells: [{ x: 0, y: 0 }] }]
  })
  const [activePlanId, setActivePlanId] = useState(() => plans[0].id)

  const activePlan = plans.find(p => p.id === activePlanId) ?? plans[0]

  function handleCellsChange(cells: Cell[]) {
    setPlans(prev => prev.map(p => p.id === activePlanId ? { ...p, cells } : p))
  }

  function handleNewPlan() {
    const id = crypto.randomUUID()
    setPlans(prev => [...prev, { id, name: `Garden ${prev.length + 1}`, cells: [{ x: 0, y: 0 }] }])
    setActivePlanId(id)
  }

  return (
    <div className="h-full flex flex-col">
      <Header
        plans={plans}
        activePlanId={activePlanId}
        onSelectPlan={setActivePlanId}
        onNewPlan={handleNewPlan}
      />
      <main className="flex-1 overflow-auto">
        <GardenCanvas
          key={activePlanId}
          cells={activePlan.cells}
          onCellsChange={handleCellsChange}
        />
      </main>
    </div>
  )
}
