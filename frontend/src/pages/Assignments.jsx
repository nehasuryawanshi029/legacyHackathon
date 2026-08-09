import { useState } from 'react'
import { CheckSquare, AlertTriangle, Clock, Plus, Sparkles, CheckCircle2 } from 'lucide-react'
import { useAtlantis } from '../context/AtlantisContext'
import { api } from '../api/client'

export default function Assignments() {
  const { assignments, refreshAllState } = useAtlantis()

  const [showAddModal, setShowAddModal] = useState(false)
  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState('Data Structures & Algorithms')
  const [dueDate, setDueDate] = useState('2026-08-10')
  const [effortHours, setEffortHours] = useState(4.0)
  const [creating, setCreating] = useState(false)

  const handleCreateAssignment = async (e) => {
    e.preventDefault()
    if (!title.trim()) return
    setCreating(true)
    await api.createAssignment(title, subject, dueDate, effortHours)
    await refreshAllState()
    setCreating(false)
    setTitle('')
    setShowAddModal(false)
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto text-slate-100">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 border border-teal-500/20 p-6 rounded-2xl">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-1">
            <CheckSquare className="h-4 w-4" />
            <span>Module 7 & 8 • Assignment & Deadline Intelligence</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-100">Academic Task & Deadline Risk Engine</h1>
          <p className="text-xs text-slate-400 mt-1">
            Calculates real-time Deadline Risk based on remaining effort vs due date. High risk tasks automatically override study schedules!
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Assignment</span>
        </button>
      </div>

      {/* Assignment List */}
      <div className="space-y-6">
        {assignments.map((asg) => (
          <div
            key={asg.id}
            className={`p-6 rounded-2xl border transition-all space-y-4 ${
              asg.risk_level === 'HIGH'
                ? 'bg-slate-900/90 border-rose-500/40 shadow-xl shadow-rose-950/20'
                : 'bg-slate-900/70 border-teal-500/20'
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-cyan-300 font-semibold bg-cyan-950 px-2.5 py-0.5 rounded border border-cyan-500/30">
                    {asg.subject}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded border uppercase font-mono ${
                      asg.risk_level === 'HIGH'
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                        : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    }`}
                  >
                    Deadline Risk: {asg.risk_level}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-100 mt-1">{asg.title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{asg.description}</p>
              </div>

              <div className="text-right shrink-0">
                <p className="text-xs text-slate-400 font-mono">Due Date</p>
                <p className="text-lg font-bold text-cyan-300">{asg.due_date}</p>
                <p className="text-xs text-slate-400">Estimated Effort: {asg.estimated_effort_hours}h</p>
              </div>
            </div>

            {/* AI Assistant Subtask Checklist */}
            {asg.subtasks && (
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
                  <Sparkles className="h-4 w-4" />
                  <span>AI Assignment Assistant Checklist & Required Concepts:</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {asg.subtasks.map((st) => (
                    <div
                      key={st.id}
                      className="flex items-center gap-2.5 text-xs text-slate-300 p-2 rounded-lg bg-slate-900 border border-slate-800"
                    >
                      <CheckCircle2 className={`h-4 w-4 ${st.done ? 'text-teal-400' : 'text-slate-600'}`} />
                      <span className={st.done ? 'line-through text-slate-500' : ''}>{st.title}</span>
                    </div>
                  ))}
                </div>

                {asg.required_concepts && (
                  <div className="pt-2 flex items-center gap-2 text-xs text-slate-400">
                    <span className="font-semibold text-slate-300">Required Concepts:</span>
                    {asg.required_concepts.map((c, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-slate-900 text-cyan-300 border border-slate-800 font-mono">
                        {c}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-cyan-500/30 p-6 rounded-2xl w-full max-w-md space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-100">Add New Assignment</h3>
            <form onSubmit={handleCreateAssignment} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. DBMS Normalization Lab"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-cyan-400"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Subject</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-cyan-400"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Due Date</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-cyan-400"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Estimated Effort (Hours)</label>
                <input
                  type="number"
                  step="0.5"
                  value={effortHours}
                  onChange={(e) => setEffortHours(parseFloat(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-cyan-400"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 text-xs font-bold shadow-md shadow-cyan-500/20"
                >
                  {creating ? 'Creating...' : 'Create Assignment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
