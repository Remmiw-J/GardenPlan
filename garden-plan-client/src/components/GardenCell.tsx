import { useState, useEffect } from 'react'
import type { Direction } from './GardenCanvas'

interface GardenCellProps {
  selected: boolean
  editing: boolean
  name?: string
  availableDirections: Set<Direction>
  onSelect: () => void
  onAdd: (direction: Direction) => void
  onContextMenu: (e: React.MouseEvent) => void
  onNameSubmit: (name: string) => void
}

const BUTTON_POSITIONS: Record<Direction, string> = {
  top:    'absolute -top-3 left-1/2 -translate-x-1/2',
  bottom: 'absolute -bottom-3 left-1/2 -translate-x-1/2',
  left:   'absolute top-1/2 -left-3 -translate-y-1/2',
  right:  'absolute top-1/2 -right-3 -translate-y-1/2',
}

export function GardenCell({ selected, editing, name, availableDirections, onSelect, onAdd, onContextMenu, onNameSubmit }: GardenCellProps) {
  const [inputValue, setInputValue] = useState(name ?? '')

  useEffect(() => {
    if (editing) setInputValue(name ?? '')
  }, [editing, name])

  return (
    <div className="relative w-16 h-16">
      <div
        onClick={e => { e.stopPropagation(); onSelect() }}
        onContextMenu={onContextMenu}
        className={`w-full h-full border-2 rounded cursor-pointer transition-colors flex items-center justify-center overflow-hidden ${
          selected
            ? 'bg-green-300 border-green-600 ring-2 ring-green-500 ring-offset-1'
            : 'bg-green-100 border-green-400 hover:bg-green-200'
        }`}
      >
        {editing ? (
          <input
            autoFocus
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onBlur={() => onNameSubmit(inputValue.trim())}
            onKeyDown={e => {
              if (e.key === 'Enter') onNameSubmit(inputValue.trim())
              if (e.key === 'Escape') onNameSubmit(name ?? '')
            }}
            onClick={e => e.stopPropagation()}
            onContextMenu={e => e.stopPropagation()}
            className="w-full text-center text-xs bg-transparent outline-none text-stone-800 px-1"
            maxLength={20}
          />
        ) : name ? (
          <span className="text-xs text-stone-700 font-medium text-center px-1 leading-tight line-clamp-3">{name}</span>
        ) : null}
      </div>

      {selected && (Object.keys(BUTTON_POSITIONS) as Direction[]).map(dir =>
        availableDirections.has(dir) && (
          <button
            key={dir}
            onClick={e => { e.stopPropagation(); onAdd(dir) }}
            aria-label={`Add square to ${dir}`}
            className={`${BUTTON_POSITIONS[dir]} w-6 h-6 rounded-full bg-green-700 text-white text-sm font-bold flex items-center justify-center hover:bg-green-800 active:scale-95 transition-all shadow z-20`}
          >
            +
          </button>
        )
      )}
    </div>
  )
}
