import { useState } from 'react'
import { Award, Map, FolderKanban, Sparkles, CheckCircle2, AlertTriangle, Layers, ArrowRight, Upload } from 'lucide-react'
import { useAtlantis } from '../context/AtlantisContext'
import { api } from '../api/client'

export default function ResumeCareer() {
  const { resumeAnalysis, skillGaps, roadmap, projects, academicsBridge, refreshAllState } = useAtlantis()

  const [resumeText, setResumeText] = useState('')
  const [analyzing, setAnalyzing] = useState(false)

  const handleAnalyzeResume = async (e) => {
    e.preventDefault()
    if (!resumeText.trim()) return
    setAnalyzing(true)
    await api.analyzeResumeText(resumeText)
    await refreshAllState()
    setAnalyzing(false)
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto text-slate-100">
      {/* Header */}
      <div className="bg-slate-900/80 border border-teal-500/20 p-6 rounded-2xl">
        <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-1">
          <Award className="h-4 w-4" />
          <span>Module 14, 15, 16 & 17 • Resume & Career Intelligence</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-100">Resume Parser, Skill Gap & Career Roadmap</h1>
        <p className="text-xs text-slate-400 mt-1">
          Extracts evidence, analyzes ATS alignment for target role (Machine Learning Engineer), and connects academic learning to career projects.
        </p>
      </div>

      {/* RESUME BREAKDOWN CARD */}
      {resumeAnalysis && (
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-teal-500/20 space-y-6 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-slate-100">Resume & ATS Alignment Profile</h3>
              <p className="text-xs text-slate-400">Target Role: <strong className="text-cyan-300">Machine Learning Engineer</strong></p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-[10px] text-slate-400 font-mono">Overall Score</p>
                <p className="text-2xl font-black text-cyan-300">{resumeAnalysis.overall_score}/100</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-400 font-mono">ATS Readiness</p>
                <p className="text-2xl font-black text-teal-300">{resumeAnalysis.ats_score}%</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Extracted Skills */}
            <div className="p-4 rounded-xl bg-slate-950 border border-teal-500/30 space-y-2">
              <span className="text-xs font-bold text-teal-300">Demonstrated Skills:</span>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {resumeAnalysis.extracted_skills.map((s, i) => (
                  <span key={i} className="px-2 py-1 rounded text-xs bg-teal-950 text-teal-200 border border-teal-500/40">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Missing Skills */}
            <div className="p-4 rounded-xl bg-slate-950 border border-rose-500/30 space-y-2">
              <span className="text-xs font-bold text-rose-300">Missing Target Skills:</span>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {resumeAnalysis.missing_skills.map((s, i) => (
                  <span key={i} className="px-2 py-1 rounded text-xs bg-rose-950 text-rose-200 border border-rose-500/40">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Claimed Not Demonstrated */}
            <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/30 space-y-2">
              <span className="text-xs font-bold text-amber-300">Claimed But Lacks Evidence:</span>
              <div className="space-y-1 pt-1 text-xs text-amber-200">
                {resumeAnalysis.claimed_not_demonstrated.map((c, i) => (
                  <p key={i}>• {c}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Resume Input Form */}
          <form onSubmit={handleAnalyzeResume} className="pt-2 flex items-center gap-3">
            <input
              type="text"
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste updated resume text to re-analyze ATS score & skills..."
              className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-cyan-400"
            />
            <button
              type="submit"
              disabled={analyzing}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 font-bold text-xs shrink-0 flex items-center gap-1.5"
            >
              <Upload className="h-4 w-4" />
              <span>{analyzing ? 'Analyzing...' : 'Re-Analyze Resume'}</span>
            </button>
          </form>
        </div>
      )}

      {/* CAREER ROADMAP & SKILL GAPS */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-teal-500/20 space-y-6 shadow-xl">
        <div className="flex items-center gap-2">
          <Map className="h-5 w-5 text-cyan-400" />
          <h2 className="text-lg font-bold text-slate-100">Personalized Career Roadmap (ML Engineer Track)</h2>
        </div>

        <div className="space-y-4">
          {roadmap.map((step) => (
            <div key={step.step_number} className="p-4 rounded-xl bg-slate-950 border border-cyan-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-6 w-6 rounded-full bg-cyan-500/20 border border-cyan-400 text-cyan-300 font-bold text-xs flex items-center justify-center">
                    {step.step_number}
                  </span>
                  <h4 className="text-sm font-bold text-slate-100">{step.skill_name}</h4>
                </div>
                <span className="text-xs font-mono text-cyan-300">{step.estimated_hours} Hours</span>
              </div>

              <p className="text-xs text-slate-300 bg-slate-900 p-2.5 rounded border border-slate-800">
                <span className="font-semibold text-cyan-300">Why it matters:</span> {step.why_it_matters}
              </p>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pt-1 text-xs text-slate-400">
                <span>Prerequisites: {step.prerequisites.join(', ')}</span>
                <span className="text-teal-300 font-semibold">Project Outcome: {step.project_application}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RECOMMENDED PROJECTS */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-teal-500/20 space-y-4 shadow-xl">
        <div className="flex items-center gap-2">
          <FolderKanban className="h-5 w-5 text-cyan-400" />
          <h2 className="text-lg font-bold text-slate-100">Recommended Resume-Boosting Projects</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((p) => (
            <div key={p.id} className="p-5 rounded-xl bg-slate-950 border border-teal-500/30 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
                    Difficulty: {p.difficulty}
                  </span>
                  <span className="text-xs font-mono text-slate-400">{p.estimated_duration}</span>
                </div>
                <h3 className="text-base font-bold text-slate-100 mt-2">{p.title}</h3>
                <p className="text-xs text-slate-400 mt-1">{p.description}</p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
                <p className="text-slate-300 italic bg-teal-950/40 p-2 rounded border border-teal-500/30">
                  &quot;{p.academic_subject_connection}&quot;
                </p>

                <div className="flex flex-wrap gap-1">
                  {p.skills_addressed.map((s, i) => (
                    <span key={i} className="px-2 py-0.5 rounded text-[10px] bg-slate-900 text-cyan-300 border border-slate-800 font-mono">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
