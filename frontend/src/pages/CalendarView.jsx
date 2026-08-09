import { Calendar as CalendarIcon, Clock, CheckSquare, ShieldAlert } from 'lucide-react'
import { useAtlantis } from '../context/AtlantisContext'

export default function CalendarView() {
  const { sessions, assignments } = useAtlantis()

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto text-slate-100">
      {/* Header */}
      <div className="bg-slate-900/80 border border-teal-500/20 p-6 rounded-2xl">
        <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-1">
          <CalendarIcon className="h-4 w-4" />
          <span>Module 21 • Integrated Master Calendar</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-100">Master Schedule & Deadlines</h1>
        <p className="text-xs text-slate-400 mt-1">{today}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Study Sessions Stream */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-teal-500/20 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-100">
            <Clock className="h-4 w-4 text-cyan-400" />
            <span>Scheduled Tide-Chart Study Sessions</span>
          </div>

          <div className="space-y-3">
            {sessions.map((s) => (
              <div key={s.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-slate-200">{s.topic_name}</h4>
                  <p className="text-slate-400">{s.subject_name} • {s.time_slot}</p>
                </div>
                <span className="font-mono text-cyan-300 font-bold">{s.duration_minutes}m</span>
              </div>
            ))}
          </div>
        </div>

        {/* Deadlines Stream */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-teal-500/20 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-100">
            <CheckSquare className="h-4 w-4 text-cyan-400" />
            <span>Academic Assignment & Exam Deadlines</span>
          </div>

          <div className="space-y-3">
            {assignments.map((a) => (
              <div key={a.id} className="p-3.5 rounded-xl bg-slate-950 border border-rose-500/30 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-slate-200">{a.title}</h4>
                  <p className="text-slate-400">{a.subject} • Due: <span className="text-cyan-300 font-bold">{a.due_date}</span></p>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] bg-rose-950 text-rose-300 font-mono border border-rose-500/30">
                  Risk: {a.risk_level}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
