import { useState } from 'react'
import { GardenCell } from './GardenCell'
import { ContextMenu } from './ContextMenu'

export type Direction = 'top' | 'bottom' | 'left' | 'right'
type Cell = { x: number; y: number; name?: string }
type ContextMenuState = { key: string; x: number; y: number }

const DIRECTION_OFFSETS: Record<Direction, Cell> = {
  top:    { x:  0, y: -1 },
  bottom: { x:  0, y:  1 },
  left:   { x: -1, y:  0 },
  right:  { x:  1, y:  0 },
}

export function GardenCanvas() {
  const [cells, setCells] = useState<Cell[]>([{ x: 0, y: 0 }])
  const [selectedKey, setSelectedKey] = useState<string | null>(null)
  const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null)
  const [editingKey, setEditingKey] = useState<string | null>(null)

  const xs = cells.map(c => c.x)
  const ys = cells.map(c => c.y)
  const minX = Math.min(...xs), maxX = Math.max(...xs)
  const minY = Math.min(...ys), maxY = Math.max(...ys)
  const gridCols = maxX - minX + 1
  const gridRows = maxY - minY + 1

  const cellMap = new Map(cells.map(c => [`${c.x},${c.y}`, c]))

  function addCell(fromX: number, fromY: number, direction: Direction) {
    const { x: dx, y: dy } = DIRECTION_OFFSETS[direction]
    const next = { x: fromX + dx, y: fromY + dy }
    const key = `${next.x},${next.y}`
    if (!cellMap.has(key)) {
      setCells(prev => [...prev, next])
      setSelectedKey(key)
    }
  }

  function deleteCell(key: string) {
    if (cells.length <= 1) return
    const [x, y] = key.split(',').map(Number)
    setCells(prev => prev.filter(c => !(c.x === x && c.y === y)))
    if (selectedKey === key) setSelectedKey(null)
  }

  function renameCell(key: string, name: string) {
    setCells(prev => prev.map(c =>
      `${c.x},${c.y}` === key ? { ...c, name: name || undefined } : c
    ))
    setEditingKey(null)
  }

  function openContextMenu(key: string, e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    setContextMenu({ key, x: e.clientX, y: e.clientY })
  }

  return (
    <div
      className="flex items-center justify-center w-full h-full bg-stone-100"
      onClick={() => { setSelectedKey(null); setContextMenu(null) }}
      onContextMenu={e => { e.preventDefault(); setContextMenu(null) }}
    >
      <div
        className="grid gap-1 p-2 bg-amber-50 border-2 border-stone-400 rounded shadow-inner"
        style={{ gridTemplateColumns: `repeat(${gridCols}, 4rem)` }}
        onClick={e => e.stopPropagation()}
      >
        {Array.from({ length: gridRows * gridCols }, (_, i) => {
          const x = minX + (i % gridCols)
          const y = minY + Math.floor(i / gridCols)
          const key = `${x},${y}`
          const cell = cellMap.get(key)

          if (!cell) return <div key={key} className="w-16 h-16" />

          const availableDirections = new Set<Direction>(
            (Object.keys(DIRECTION_OFFSETS) as Direction[]).filter(dir => {
              const { x: dx, y: dy } = DIRECTION_OFFSETS[dir]
              return !cellMap.has(`${x + dx},${y + dy}`)
            })
          )

          return (
            <GardenCell
              key={key}
              selected={selectedKey === key}
              editing={editingKey === key}
              name={cell.name}
              availableDirections={availableDirections}
              onSelect={() => setSelectedKey(prev => prev === key ? null : key)}
              onAdd={dir => addCell(x, y, dir)}
              onContextMenu={e => openContextMenu(key, e)}
              onNameSubmit={name => renameCell(key, name)}
            />
          )
        })}
      </div>

      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onName={() => setEditingKey(contextMenu.key)}
          onDelete={() => deleteCell(contextMenu.key)}
          onClose={() => setContextMenu(null)}
        />
      )}
    </div>
  )
}
