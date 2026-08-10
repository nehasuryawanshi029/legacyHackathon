import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, BookOpen, MessageSquare, Compass, CheckSquare,
  FileText, TrendingUp, Award, Map, FolderKanban, Library, Calendar,
  Zap, Brain, ShieldAlert, Sparkles, X
} from 'lucide-react'
import { useAtlantis } from '../../context/AtlantisContext'

export default function Sidebar() {
  const location = useLocation()
  const { readiness, topics, sessions, mobileMenuOpen, setMobileMenuOpen } = useAtlantis()

  const highRiskCount = topics.filter((t) => t.is_weak || t.risk_level === 'HIGH').length
  const pendingSessions = sessions.filter((s) => !s.completed).length

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Syllabus Intelligence', path: '/syllabus', icon: BookOpen },
    { name: 'AI Tutor', path: '/tutor', icon: MessageSquare, badge: highRiskCount > 0 ? `${highRiskCount} Weak` : null },
    { name: 'AI Quiz Engine', path: '/quizzes', icon: Brain },
    { name: "Keeper's Tide-Chart", path: '/tide-chart', icon: Compass, badge: pendingSessions > 0 ? `${pendingSessions} Due` : null },
    { name: 'Assignments & Risk', path: '/assignments', icon: CheckSquare },
    { name: 'Notebook & RAG', path: '/notebook', icon: FileText },
    { name: 'Progress & Readiness', path: '/progress', icon: TrendingUp, score: readiness?.overall_score },
    { name: 'Resume & Skill Gaps', path: '/resume', icon: Award },
    { name: 'Career Roadmap & Bridge', path: '/career', icon: Map },
    { name: 'Resources Hub', path: '/resources', icon: Library },
    { name: 'Integrated Calendar', path: '/calendar', icon: Calendar },
    { name: 'Exam Mode', path: '/exam-mode', icon: ShieldAlert },
  ]

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <aside className={`fixed inset-y-0 left-0 z-50 md:sticky md:top-0 md:z-30 w-64 bg-slate-950/90 border-r border-teal-500/20 text-slate-200 flex flex-col justify-between shrink-0 min-h-screen backdrop-blur-md transition-transform duration-300 ease-in-out md:translate-x-0 ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:flex hidden'
      }`}>
        <div>
          {/* Brand Header */}
          <div className="p-6 border-b border-teal-500/20 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3" onClick={() => setMobileMenuOpen(false)}>
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-400 via-teal-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                <Sparkles className="h-6 w-6 text-slate-950" />
              </div>
              <div>
                <h1 className="font-bold text-lg tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-200 to-blue-400">
                  ATLANTIS
                </h1>
                <p className="text-[10px] text-cyan-400/80 font-mono uppercase tracking-widest">
                  Student Intelligence
                </p>
              </div>
            </Link>

            {/* Mobile Close Button */}
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="md:hidden p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Readiness Score Quick Card */}
          {readiness && (
            <div className="mx-4 my-4 p-3 rounded-xl bg-slate-900/80 border border-teal-500/30 shadow-inner flex items-center justify-between">
              <div>
                <p className="text-[11px] text-slate-400 font-medium">Readiness Index</p>
                <p className="text-xl font-bold text-cyan-300">{readiness.overall_score} / 100</p>
              </div>
              <div className="h-9 w-9 rounded-full bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center font-bold text-xs text-cyan-300">
                {readiness.overall_score >= 75 ? 'Good' : 'Risk'}
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="px-3 py-2 space-y-1 max-h-[calc(100vh-220px)] overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon
              const active = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                    active
                      ? 'bg-gradient-to-r from-cyan-500/20 to-teal-500/10 border border-cyan-400/40 text-cyan-200 shadow-md shadow-cyan-950'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`h-4 w-4 ${active ? 'text-cyan-400' : 'text-slate-500'}`} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      {item.badge}
                    </span>
                  )}
                  {item.score !== undefined && (
                    <span className="text-[10px] font-mono text-teal-400 font-bold">
                      {item.score}
                    </span>
                  )}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-teal-500/20 bg-slate-950/60">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[11px]">System Synchronized</span>
          </div>
          <p className="mt-1 text-[10px] text-slate-500">FastAPI & Supabase Connected</p>
        </div>
      </aside>
    </>
  )
}
