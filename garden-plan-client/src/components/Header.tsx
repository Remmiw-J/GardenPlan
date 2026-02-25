import { useState } from 'react'

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header
      className="relative flex items-center justify-between px-6 py-4 shadow-md shrink-0"
      style={{ backgroundColor: '#196133' }}
    >
      <span className="text-white text-xl font-semibold tracking-wide">Garden Plan</span>

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

      {open && (
        <nav className="absolute top-full right-0 w-56 bg-white shadow-lg rounded-bl-lg z-50 py-2">
          <a href="/" className="block px-5 py-3 text-stone-700 hover:bg-stone-100 transition-colors text-sm font-medium">
            My Garden
          </a>
        </nav>
      )}
    </header>
  )
}
