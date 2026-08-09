import { Compass, RefreshCw, CheckCircle2, Clock, Flame, AlertCircle } from 'lucide-react'
import { useAtlantis } from '../context/AtlantisContext'

export default function TideChart() {
  const { sessions, recalibrateTideChart, toggleSessionComplete } = useAtlantis()

  const completedCount = sessions.filter((s) => s.completed).length
  const totalCount = sessions.length

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto text-slate-100">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 border border-teal-500/20 p-6 rounded-2xl">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-1">
            <Compass className="h-4 w-4" />
            <span>Module 6 • Keeper&apos;s Tide-Chart Engine</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-100">Dynamic Personalized Study Plan</h1>
          <p className="text-xs text-slate-400 mt-1">
            Prioritizes critical deadlines &gt; upcoming exams &gt; weak high-risk topics &gt; career skill gaps.
          </p>
        </div>

        <button
          onClick={recalibrateTideChart}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/25 flex items-center gap-2 transition-all"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Recalibrate Tide-Chart</span>
        </button>
      </div>

      {/* Progress Metric */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/80 border border-teal-500/20 space-y-1">
          <p className="text-xs text-slate-400">Total Planned Sessions</p>
          <p className="text-2xl font-bold text-slate-100">{totalCount}</p>
        </div>
        <div className="p-4 rounded-xl bg-slate-900/80 border border-teal-500/20 space-y-1">
          <p className="text-xs text-slate-400">Completed Sessions</p>
          <p className="text-2xl font-bold text-teal-300">{completedCount}</p>
        </div>
        <div className="p-4 rounded-xl bg-slate-900/80 border border-teal-500/20 space-y-1">
          <p className="text-xs text-slate-400">Remaining Hours</p>
          <p className="text-2xl font-bold text-cyan-300">
            {((totalCount - completedCount) * 45 / 60).toFixed(1)} hrs
          </p>
        </div>
      </div>

      {/* Sessions Flow */}
      <div className="space-y-4">
        {sessions.map((sess) => (
          <div
            key={sess.id}
            className={`p-6 rounded-2xl border transition-all space-y-3 ${
              sess.completed
                ? 'bg-slate-950/40 border-slate-800 opacity-60'
                : 'bg-slate-900/90 border-cyan-500/30 hover:border-cyan-400 shadow-xl'
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <button
                  onClick={() => toggleSessionComplete(sess.id)}
                  className={`mt-1 h-6 w-6 rounded-lg border flex items-center justify-center transition-colors ${
                    sess.completed
                      ? 'bg-teal-500 border-teal-400 text-slate-950'
                      : 'border-slate-600 hover:border-cyan-400'
                  }`}
                >
                  {sess.completed && <CheckCircle2 className="h-5 w-5" />}
                </button>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
                      Priority #{sess.priority}
                    </span>
                    <h3 className={`text-base font-bold ${sess.completed ? 'line-through text-slate-500' : 'text-slate-100'}`}>
                      {sess.topic_name}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Subject: <span className="text-slate-200">{sess.subject_name}</span> • Time: <span className="text-cyan-300 font-mono">{sess.time_slot}</span> ({sess.duration_minutes}m)
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[11px] font-mono text-cyan-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
                  {sess.scheduled_date}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="font-semibold text-cyan-300 block mb-0.5">Priority Reason:</span>
                <p className="text-slate-300">&quot;{sess.priority_reason}&quot;</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="font-semibold text-teal-300 block mb-0.5">Expected Outcome:</span>
                <p className="text-slate-300">{sess.expected_outcome}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
