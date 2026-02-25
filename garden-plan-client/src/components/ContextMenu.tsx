import { useEffect } from 'react'

interface ContextMenuProps {
  x: number
  y: number
  onName: () => void
  onDelete: () => void
  onClose: () => void
}

export function ContextMenu({ x, y, onName, onDelete, onClose }: ContextMenuProps) {
  useEffect(() => {
    window.addEventListener('mousedown', onClose)
    window.addEventListener('contextmenu', onClose)
    return () => {
      window.removeEventListener('mousedown', onClose)
      window.removeEventListener('contextmenu', onClose)
    }
  }, [onClose])

  return (
    <div
      className="fixed z-50 bg-white rounded-lg shadow-xl border border-stone-200 py-1 min-w-36 overflow-hidden"
      style={{ left: x, top: y }}
      onMouseDown={e => e.stopPropagation()}
    >
      <button
        onClick={() => { onName(); onClose() }}
        className="w-full px-4 py-2.5 text-left text-sm text-stone-700 hover:bg-stone-50 transition-colors"
      >
        ✏️ Name
      </button>
      <div className="h-px bg-stone-100 mx-2" />
      <button
        onClick={() => { onDelete(); onClose() }}
        className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 transition-colors"
      >
        🗑️ Delete
      </button>
    </div>
  )
}
