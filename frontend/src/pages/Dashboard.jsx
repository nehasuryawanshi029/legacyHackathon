import { Link } from 'react-router-dom'
import {
  Compass, AlertTriangle, ArrowRight, CheckCircle2, Flame,
  Brain, Award, Sparkles, TrendingUp, RefreshCw, Layers
} from 'lucide-react'
import { useAtlantis } from '../context/AtlantisContext'

export default function Dashboard() {
  const {
    profile, topics, sessions, assignments, readiness,
    insights, academicsBridge, recalibrateTideChart, toggleSessionComplete
  } = useAtlantis()

  const weakTopics = topics.filter((t) => t.is_weak || t.risk_level === 'HIGH')
  const topWeakTopic = weakTopics.sort((a, b) => a.mastery_pct - b.mastery_pct)[0]
  const urgentAssignment = assignments.find((a) => a.risk_level === 'HIGH') || assignments[0]
  const pendingSessions = sessions.filter((s) => !s.completed)

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto text-slate-100">
      {/* Top Banner Header */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-teal-500/30 p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -z-0" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-1">
              <Sparkles className="h-4 w-4" />
              <span>Central Intelligence Active</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-teal-100 to-blue-300">
              Welcome back, {profile?.name || 'Alex'}!
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Target Career: <span className="text-cyan-300 font-semibold">{profile?.target_role || 'Machine Learning Engineer'}</span> • {profile?.course}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={recalibrateTideChart}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/25 flex items-center gap-2 transition-all"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Recalibrate Tide-Chart</span>
            </button>
          </div>
        </div>
      </div>

      {/* TODAY'S MISSION & READINESS SCORE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* TODAY'S MISSION CARD (2 cols) */}
        <div className="lg:col-span-2 rounded-2xl bg-slate-900/80 border border-teal-500/20 p-6 shadow-xl relative flex flex-col justify-between hover-card-trigger">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs uppercase tracking-wider">
                <Flame className="h-4 w-4 text-cyan-400" />
                <span>Today&apos;s Mission</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-[11px] font-bold">
                HIGH PRIORITY
              </span>
            </div>

            {topWeakTopic ? (
              <div className="p-4 rounded-xl bg-slate-950/70 border border-rose-500/30 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-100">{topWeakTopic.name}</h3>
                    <p className="text-xs text-slate-400">
                      Subject: {topWeakTopic.subject_name} • Unit: {topWeakTopic.unit}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-rose-400">{topWeakTopic.mastery_pct}%</span>
                    <p className="text-[10px] text-slate-500 font-mono">Current Mastery</p>
                  </div>
                </div>

                <p className="text-xs text-slate-300 bg-rose-950/30 p-2.5 rounded-lg border border-rose-500/20">
                  <span className="font-semibold text-rose-300">Intelligence Note:</span> Your shortest path assignment is due in 2 days and this topic has high learning risk.
                </p>

                <div className="flex items-center gap-3 pt-1">
                  <Link
                    to="/tutor"
                    className="px-3.5 py-1.5 rounded-lg bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 hover:bg-cyan-500/30 text-xs font-semibold flex items-center gap-1.5"
                  >
                    <Brain className="h-3.5 w-3.5" />
                    <span>Ask AI Tutor</span>
                  </Link>
                  <Link
                    to="/quizzes"
                    className="px-3.5 py-1.5 rounded-lg bg-teal-500/20 border border-teal-400/40 text-teal-300 hover:bg-teal-500/30 text-xs font-semibold flex items-center gap-1.5"
                  >
                    <span>Take Mini-Quiz</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ) : (
              <p className="text-sm text-slate-400">All topic masteries are on track!</p>
            )}
          </div>

          {/* Quick Upcoming Deadline */}
          {urgentAssignment && (
            <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-300">
                  <AlertTriangle className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-200">{urgentAssignment.title}</p>
                  <p className="text-[11px] text-slate-400">Due: {urgentAssignment.due_date} • Effort: {urgentAssignment.estimated_effort_hours}h</p>
                </div>
              </div>
              <Link to="/assignments" className="text-xs text-cyan-400 hover:underline">
                View Checklist &rarr;
              </Link>
            </div>
          )}
        </div>

        {/* ATLANTIS READINESS SCORE CARD (1 col) */}
        <div className="rounded-2xl bg-slate-900/80 border border-teal-500/20 p-6 shadow-xl space-y-4 flex flex-col justify-between hover-card-trigger">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs uppercase tracking-wider">
                <TrendingUp className="h-4 w-4" />
                <span>Readiness Score</span>
              </div>
              <Link to="/progress" className="text-xs text-cyan-400 hover:underline">
                Details &rarr;
              </Link>
            </div>

            <div className="mt-4 text-center">
              <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-gradient-to-tr from-cyan-500/20 via-teal-500/10 to-blue-500/20 border-2 border-cyan-400 shadow-lg shadow-cyan-500/20">
                <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-teal-300">
                  {readiness?.overall_score || 75}
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-300 mt-2">Overall Student Index</p>
            </div>

            <div className="mt-4 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Academic Mastery</span>
                <span className="font-mono text-cyan-300">{readiness?.academic_mastery || 68}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${readiness?.academic_mastery || 68}%` }} />
              </div>

              <div className="flex justify-between text-slate-400 pt-1">
                <span>Consistency Score</span>
                <span className="font-mono text-teal-300">{readiness?.consistency_score || 82}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-teal-400 rounded-full" style={{ width: `${readiness?.consistency_score || 82}%` }} />
              </div>

              <div className="flex justify-between text-slate-400 pt-1">
                <span>Career Skill Readiness</span>
                <span className="font-mono text-blue-300">{readiness?.career_skills_score || 64}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-400 rounded-full" style={{ width: `${readiness?.career_skills_score || 64}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TIDE-CHART STUDY PLAN & INSIGHTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* TIDE-CHART (2 cols) */}
        <div className="lg:col-span-2 rounded-2xl bg-slate-900/80 border border-teal-500/20 p-6 shadow-xl space-y-4 hover-card-trigger">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Compass className="h-5 w-5 text-cyan-400" />
              <h2 className="text-lg font-bold text-slate-100">Today&apos;s Tide-Chart Schedule</h2>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              {sessions.filter((s) => s.completed).length} / {sessions.length} Completed
            </span>
          </div>

          <div className="space-y-3">
            {sessions.map((sess) => (
              <div
                key={sess.id}
                className={`p-4 rounded-xl border transition-all flex items-start justify-between gap-4 ${
                  sess.completed
                    ? 'bg-slate-950/40 border-slate-800 opacity-60'
                    : 'bg-slate-950/80 border-cyan-500/30 hover:border-cyan-400/50 shadow-md'
                }`}
              >
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => toggleSessionComplete(sess.id)}
                    className={`mt-0.5 h-5 w-5 rounded-md border flex items-center justify-center transition-colors ${
                      sess.completed
                        ? 'bg-teal-500 border-teal-400 text-slate-950'
                        : 'border-slate-600 hover:border-cyan-400'
                    }`}
                  >
                    {sess.completed && <CheckCircle2 className="h-4 w-4" />}
                  </button>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className={`text-sm font-bold ${sess.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                        {sess.topic_name}
                      </h4>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                        Priority #{sess.priority}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{sess.subject_name} • {sess.time_slot} ({sess.duration_minutes}m)</p>
                    <p className="text-xs text-cyan-300/80 mt-1 italic">&quot;{sess.priority_reason}&quot;</p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <Link
                    to="/tutor"
                    className="text-xs text-cyan-400 hover:underline flex items-center gap-1"
                  >
                    <span>Start Session</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ATLANTIS INSIGHTS FEED (1 col) */}
        <div className="rounded-2xl bg-slate-900/80 border border-teal-500/20 p-6 shadow-xl space-y-4 hover-card-trigger">
          <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs uppercase tracking-wider">
            <Sparkles className="h-4 w-4" />
            <span>Atlantis Intelligence Insights</span>
          </div>

          <div className="space-y-3">
            {insights.map((ins) => (
              <div key={ins.id} className="p-3.5 rounded-xl bg-slate-950/80 border border-teal-500/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                    {ins.category}
                  </span>
                  <span className="text-[10px] font-bold text-rose-400">{ins.priority_level}</span>
                </div>
                <h4 className="text-xs font-bold text-slate-200">{ins.what}</h4>
                <p className="text-[11px] text-slate-400">{ins.why}</p>
                <div className="pt-1 text-[11px] text-cyan-300 font-semibold flex items-center gap-1">
                  <span>Next Action:</span>
                  <span className="text-slate-300 font-normal">{ins.next_action}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ACADEMICS TO CAREER BRIDGE SECTION */}
      {academicsBridge.length > 0 && (
        <div className="rounded-2xl bg-slate-900/80 border border-teal-500/20 p-6 shadow-xl space-y-4 hover-card-trigger">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-cyan-400" />
              <h2 className="text-lg font-bold text-slate-100">Academics &rarr; Career Connection Bridge</h2>
            </div>
            <Link to="/career" className="text-xs text-cyan-400 hover:underline">
              Full Career Roadmap &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {academicsBridge.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-950/80 border border-cyan-500/30 space-y-2 hover-card-trigger">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300">{item.academic_subject}</span>
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
                    Target Role: {item.target_role}
                  </span>
                </div>
                <div className="text-xs text-slate-400">
                  <span className="text-slate-200 font-semibold">Academic Topic:</span> {item.academic_topic}
                </div>
                <div className="p-2.5 rounded-lg bg-teal-950/40 border border-teal-500/30 text-xs text-teal-200">
                  <span className="font-bold text-cyan-300">Recommended Project:</span> {item.practical_project}
                </div>
                <p className="text-[11px] text-slate-400">
                  <span className="font-semibold text-cyan-400">Resume Impact:</span> {item.resume_impact}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
