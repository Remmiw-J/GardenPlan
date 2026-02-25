import { useState } from 'react'
import type { Plan } from '../types'

interface HeaderProps {
  plans: Plan[]
  activePlanId: string
  onSelectPlan: (id: string) => void
  onNewPlan: () => void
}

export function Header({ plans, activePlanId, onSelectPlan, onNewPlan }: HeaderProps) {
  const [open, setOpen] = useState(false)

  return (
    <header
      className="relative flex items-center justify-between px-4 py-3 shadow-md shrink-0"
      style={{ backgroundColor: '#196133' }}
    >
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Toggle navigation menu"
        aria-expanded={open}
        className="flex flex-col justify-center gap-1.5 w-10 h-10 p-2 rounded hover:bg-white/10 transition-colors"
      >
        <span className={`block w-full h-0.5 bg-white origin-center transition-all duration-200 ${open ? 'rotate-45 translate-y-2' : ''}`} />
        <span className={`block w-full h-0.5 bg-white transition-all duration-200 ${open ? 'opacity-0 scale-x-0' : ''}`} />
        <span className={`block w-full h-0.5 bg-white origin-center transition-all duration-200 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
      </button>

      <span className="absolute left-1/2 -translate-x-1/2 text-white text-xl font-semibold tracking-wide pointer-events-none">
        Garden Plan
      </span>

      <div className="flex items-center gap-2 text-white text-sm font-medium">
        <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">
          R
        </div>
        <span>Remmiw-J</span>
      </div>

      {open && (
        <nav className="absolute top-full left-0 w-64 bg-white shadow-lg rounded-br-lg z-50 py-2">
          <p className="px-5 py-2 text-xs text-stone-400 font-semibold uppercase tracking-wider">
            My Plans
          </p>
          {plans.map(plan => (
            <button
              key={plan.id}
              onClick={() => { onSelectPlan(plan.id); setOpen(false) }}
              className={`w-full px-5 py-2.5 text-left text-sm transition-colors ${
                plan.id === activePlanId
                  ? 'text-green-700 bg-green-50 font-medium'
                  : 'text-stone-700 hover:bg-stone-50'
              }`}
            >
              {plan.name}
            </button>
          ))}
          <div className="h-px bg-stone-100 mx-4 my-1" />
          <button
            onClick={() => { onNewPlan(); setOpen(false) }}
            className="w-full px-5 py-2.5 text-left text-sm text-green-700 hover:bg-green-50 transition-colors font-medium"
          >
            + New Plan
          </button>
        </nav>
      )}
    </header>
  )
}
