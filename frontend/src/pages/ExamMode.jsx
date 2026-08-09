import { useState } from 'react'
import { ShieldAlert, Zap, BookOpen, Brain, CheckCircle2, ArrowRight } from 'lucide-react'
import { useAtlantis } from '../context/AtlantisContext'
import { Link } from 'react-router-dom'

export default function ExamMode() {
  const { topics } = useAtlantis()

  const [activeTab, setActiveTab] = useState('schedule')

  const weakTopics = topics.filter((t) => t.is_weak || t.risk_level === 'HIGH')

  const crashSchedule = [
    { day: 'Day 1', title: 'Weak Topics Deep Dive', focus: weakTopics.map((t) => t.name).join(', ') || 'Graph Algorithms, Dynamic Programming', task: 'Ask AI Tutor for analogies & solve 5 foundational problems.' },
    { day: 'Day 2', title: 'High-Weight Syllabus Concepts', focus: 'SQL Normalization, CPU Scheduling Algorithms', task: 'Review key formulas, proofs, and theoretical traps.' },
    { day: 'Day 3', title: 'Targeted Problem Solving', focus: 'Time-Complexity Analysis & Algorithm Trace', task: 'Solve 10 exam-pattern questions across DSA & OS.' },
    { day: 'Day 4', title: 'Full Syllabus AI Mock Exam', focus: 'Simulated 60-Minute Assessment', task: 'Take comprehensive mock test under timed exam conditions.' },
    { day: 'Day 5', title: 'Final Flashcard & Formula Revision', focus: 'Definitions, Spaced-Repetition Deck', task: 'Quick review of high-yield flashcards.' }
  ]

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto text-slate-100">
      {/* EXAM ALERT BANNER */}
      <div className="rounded-2xl bg-gradient-to-r from-rose-950 via-slate-900 to-slate-950 border border-rose-500/50 p-6 shadow-2xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-rose-400 font-mono text-xs uppercase tracking-widest font-bold">
            <ShieldAlert className="h-5 w-5" />
            <span>EXAM MODE ACTIVATED • EXAM IN 5 DAYS</span>
          </div>
          <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/40">
            CRASH REVISION ACTIVE
          </span>
        </div>

        <h1 className="text-2xl font-bold text-slate-100">Data Structures & Core CS Mid-Term Exam</h1>
        <p className="text-xs text-slate-300">
          Targeting <strong className="text-rose-300">{weakTopics.length} weak topics</strong>. The system has automatically restructured your schedule for maximum retention.
        </p>
      </div>

      {/* 5-DAY SCHEDULE FLOW */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-teal-500/20 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-100">5-Day Emergency Revision Plan</h2>
          <Link to="/quizzes" className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 text-xs font-bold flex items-center gap-2">
            <Brain className="h-4 w-4" />
            <span>Launch Mock Exam</span>
          </Link>
        </div>

        <div className="space-y-3">
          {crashSchedule.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-400 font-mono bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
                  {item.day}: {item.title}
                </span>
                <span className="text-[10px] text-slate-400">Target Focus</span>
              </div>
              <p className="text-xs font-semibold text-slate-200">{item.focus}</p>
              <p className="text-xs text-slate-400 bg-slate-900 p-2 rounded border border-slate-800">
                Action: {item.task}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
