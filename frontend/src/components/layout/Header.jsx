import { Link } from 'react-router-dom'
import { Bell, RefreshCw, User, Sparkles, Menu } from 'lucide-react'
import { useAtlantis } from '../../context/AtlantisContext'

export default function Header() {
  const { profile, recalibrateTideChart, lastSync, refreshAllState, mobileMenuOpen, setMobileMenuOpen } = useAtlantis()

  return (
    <header className="h-16 bg-slate-950/80 border-b border-teal-500/20 px-4 md:px-6 flex items-center justify-between sticky top-0 z-20 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-slate-100"
          aria-label="Toggle Navigation Drawer"
        >
          <Menu className="h-5 w-5" />
        </button>
        <span className="md:hidden text-cyan-400 font-bold text-lg tracking-wider">ATLANTIS</span>
        <div className="hidden md:flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-cyan-400" />
          <span className="text-xs text-slate-300 font-medium">
            {profile ? `${profile.name} • ${profile.course}` : 'College Computer Science'}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Recalibrate Tide-Chart Button */}
        <button
          onClick={recalibrateTideChart}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500/20 to-teal-500/20 hover:from-cyan-500/30 hover:to-teal-500/30 border border-cyan-400/40 text-cyan-300 text-xs font-semibold shadow-sm transition-all duration-200"
          title="Recalculate study priorities based on latest quiz scores and deadlines"
        >
          <RefreshCw className="h-3.5 w-3.5 text-cyan-400 animate-spin-slow" />
          <span>Recalibrate Tide-Chart</span>
        </button>

        {/* Sync status */}
        <button
          onClick={refreshAllState}
          className="text-slate-400 hover:text-cyan-300 p-2 rounded-lg hover:bg-slate-900 transition-colors"
          title="Refresh Backend Sync"
        >
          <Bell className="h-4 w-4 text-slate-400" />
        </button>

        {/* Profile Avatar */}
        <div className="flex items-center gap-2 border-l border-slate-800 pl-4">
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-cyan-500 to-teal-400 text-slate-950 flex items-center justify-center font-bold text-xs shadow-md">
            AC
          </div>
          <div className="hidden lg:block text-left">
            <p className="text-xs font-semibold text-slate-200">Alex Chen</p>
            <p className="text-[10px] text-cyan-400/80">ML Engineer Track</p>
          </div>
        </div>
      </div>
    </header>
  )
}
