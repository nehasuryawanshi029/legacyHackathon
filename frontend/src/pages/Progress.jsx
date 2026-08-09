import { TrendingUp, ShieldAlert, Award, Brain, Layers, CheckCircle2 } from 'lucide-react'
import { useAtlantis } from '../context/AtlantisContext'

export default function Progress() {
  const { readiness, subjects, topics, learningGaps } = useAtlantis()

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto text-slate-100">
      {/* Header */}
      <div className="bg-slate-900/80 border border-teal-500/20 p-6 rounded-2xl">
        <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-1">
          <TrendingUp className="h-4 w-4" />
          <span>Module 11, 12 & 13 • Progress Intelligence & Root Gap Detector</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-100">Student Readiness & Prerequisite Analysis</h1>
        <p className="text-xs text-slate-400 mt-1">
          Evaluates academic mastery, consistency, deadline health, and identifies root cause concept gaps.
        </p>
      </div>

      {/* READINESS SCORE BREAKDOWN */}
      {readiness && (
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-teal-500/20 space-y-6 shadow-xl">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="h-32 w-32 rounded-full bg-gradient-to-tr from-cyan-500/20 via-teal-500/10 to-blue-500/20 border-4 border-cyan-400 shadow-xl flex items-center justify-center shrink-0">
              <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-teal-300">
                {readiness.overall_score}
              </span>
            </div>

            <div className="space-y-2 flex-1">
              <h3 className="text-lg font-bold text-slate-100">ATLANTIS Readiness Breakdown</h3>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {readiness.breakdown_reasons.map((r, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-slate-800">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <p className="text-xs text-slate-400">Academic Mastery</p>
              <p className="text-2xl font-bold text-cyan-300">{readiness.academic_mastery}%</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <p className="text-xs text-slate-400">Consistency Score</p>
              <p className="text-2xl font-bold text-teal-300">{readiness.consistency_score}%</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <p className="text-xs text-slate-400">Deadline Health</p>
              <p className="text-2xl font-bold text-amber-300">{readiness.deadline_health}%</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <p className="text-xs text-slate-400">Career Skill Score</p>
              <p className="text-2xl font-bold text-blue-300">{readiness.career_skills_score}%</p>
            </div>
          </div>
        </div>
      )}

      {/* LEARNING GAP DETECTOR */}
      {learningGaps.length > 0 && (
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-rose-500/30 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
            <ShieldAlert className="h-5 w-5" />
            <span>Root Learning Gap Analysis (Prerequisite Diagnosis)</span>
          </div>

          {learningGaps.map((gap, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-rose-500/20 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-200">Weakness: {gap.target_weakness}</span>
                <span className="text-rose-400 font-mono font-bold">Root Cause Concept: {gap.root_cause_concept}</span>
              </div>

              {/* Prerequisite chain visualization */}
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-2 overflow-x-auto text-[11px] font-mono">
                {gap.prerequisite_chain.map((step, i) => (
                  <div key={i} className="flex items-center gap-2 shrink-0">
                    <span className={`px-2 py-1 rounded border ${i === 0 ? 'bg-rose-950 text-rose-300 border-rose-500/40' : 'bg-slate-950 text-slate-300 border-slate-700'}`}>
                      {step}
                    </span>
                    {i < gap.prerequisite_chain.length - 1 && <span className="text-slate-600">&rarr;</span>}
                  </div>
                ))}
              </div>

              <p className="text-slate-300 bg-rose-950/30 p-2.5 rounded border border-rose-500/20">
                <strong className="text-rose-300">Diagnosis:</strong> {gap.diagnosis}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* SUBJECT MASTERY OVERVIEW */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-teal-500/20 space-y-4 shadow-xl">
        <h3 className="text-lg font-bold text-slate-100">Subject Mastery & Heatmap</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {subjects.map((subj) => (
            <div key={subj.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-200">{subj.name}</span>
                <span className="text-cyan-300 font-mono">{subj.avg_mastery}% Mastery</span>
              </div>
              <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-teal-400 rounded-full"
                  style={{ width: `${subj.avg_mastery}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400">Syllabus Topics: {subj.topics_count}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
