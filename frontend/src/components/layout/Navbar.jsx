import { Link, useLocation } from 'react-router-dom'
import { Anchor, Waves } from 'lucide-react'
import { useStudyPlan } from '../../context/StudyPlanContext'

const links = [
  { to: '/', label: 'Home' },
  { to: '/create', label: 'Create Plan' },
  { to: '/dashboard', label: 'Dashboard' },
]

export default function Navbar() {
  const location = useLocation()
  const { hasPlan } = useStudyPlan()

  return (
    <header className="sticky top-0 z-50 atlantis-nav">
      <nav className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5 text-pearl">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface/15 ring-1 ring-surface/30">
            <Waves className="h-5 w-5 text-surface" strokeWidth={2} />
          </span>
          <span className="font-display text-sm font-semibold tracking-wide sm:text-base">
            Keeper&apos;s Tide-Chart
          </span>
        </Link>

        <ul className="flex items-center gap-1 sm:gap-2">
          {links.map(({ to, label }) => {
            const active = location.pathname === to
            const isDashboard = to === '/dashboard'
            return (
              <li key={to}>
                <Link
                  to={to}
                  className={`rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all sm:px-3 sm:text-sm ${
                    active
                      ? 'bg-gold/20 text-pearl ring-1 ring-gold/40'
                      : 'text-seafoam hover:bg-surface/10 hover:text-pearl'
                  } ${isDashboard && !hasPlan ? 'opacity-60' : ''}`}
                >
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="flex items-center justify-center gap-1.5 border-t border-surface/15 py-1.5 text-[10px] uppercase tracking-[0.25em] text-surface/70 sm:text-xs">
        <Anchor className="h-3 w-3 text-coral" />
        <span>Chart the deep</span>
      </div>
    </header>
  )
}
