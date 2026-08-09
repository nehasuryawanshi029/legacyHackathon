import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Anchor, Menu, X, Waves } from 'lucide-react'
import { useStudyPlan } from '../../context/StudyPlanContext'

const links = [
  { to: '/', label: 'Home' },
  { to: '/dashboard', label: 'Study Planner' },
  { to: '/quiz', label: 'Quiz' },
  { to: '/resume', label: 'Resume', title: 'Resume Analyzer' },
  { to: '/create', label: 'Create Plan', mobileOnly: true },
]

export default function Navbar() {
  const location = useLocation()
  const { hasPlan } = useStudyPlan()
  const [open, setOpen] = useState(false)

  const navLinks = links.filter((l) => !l.mobileOnly)

  const linkClass = (to) => {
    const active = location.pathname === to
    const isStudy = to === '/dashboard'
    return `block rounded-lg px-3 py-2 text-sm font-medium transition-all ${
      active
        ? 'bg-gold/20 text-pearl ring-1 ring-gold/40'
        : 'text-seafoam hover:bg-surface/10 hover:text-pearl'
    } ${isStudy && !hasPlan ? 'opacity-60' : ''}`
  }

  return (
    <header className="sticky top-0 z-50 atlantis-nav">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5 text-pearl">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface/15 ring-1 ring-surface/30">
            <Waves className="h-5 w-5 text-surface" strokeWidth={2} />
          </span>
          <span className="font-display hidden text-sm font-semibold tracking-wide sm:inline sm:text-base">
            Keeper&apos;s Tide-Chart
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map(({ to, label, title }) => (
            <li key={to}>
              <Link to={to} className={linkClass(to)} title={title}>
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="rounded-lg p-2 text-pearl md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-surface/15 px-4 py-3 md:hidden">
          <ul className="space-y-1">
            {links.map(({ to, label }) => (
              <li key={to}>
                <Link to={to} className={linkClass(to)} onClick={() => setOpen(false)}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="hidden items-center justify-center gap-1.5 border-t border-surface/15 py-1.5 text-[10px] uppercase tracking-[0.25em] text-surface/70 sm:flex sm:text-xs">
        <Anchor className="h-3 w-3 text-coral" />
        <span>Study · Quiz · Resume — one platform</span>
      </div>
    </header>
  )
}
