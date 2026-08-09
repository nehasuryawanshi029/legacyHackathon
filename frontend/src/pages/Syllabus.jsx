import { useState } from 'react'
import { BookOpen, Plus, Sparkles, AlertCircle, CheckCircle2, ChevronRight, BarChart2 } from 'lucide-react'
import { useAtlantis } from '../context/AtlantisContext'
import { api } from '../api/client'

export default function Syllabus() {
  const { subjects, topics, refreshAllState } = useAtlantis()

  const [selectedSubjectId, setSelectedSubjectId] = useState(subjects[0]?.id || 's-dsa')
  const [showAddModal, setShowAddModal] = useState(false)
  const [newSubjName, setNewSubjName] = useState('Data Structures & Algorithms')
  const [newTopicName, setNewTopicName] = useState('')
  const [newDifficulty, setNewDifficulty] = useState('Medium')
  const [adding, setAdding] = useState(false)

  const activeSubject = subjects.find((s) => s.id === selectedSubjectId) || subjects[0]
  const activeTopics = topics.filter((t) => t.subject_id === activeSubject?.id || t.subject_name === activeSubject?.name)

  const handleAddTopic = async (e) => {
    e.preventDefault()
    if (!newTopicName.trim()) return
    setAdding(true)
    await api.addTopic(newSubjName, newTopicName, newDifficulty)
    await refreshAllState()
    setAdding(false)
    setNewTopicName('')
    setShowAddModal(false)
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto text-slate-100">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 border border-teal-500/20 p-6 rounded-2xl">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-1">
            <BookOpen className="h-4 w-4" />
            <span>Module 2 • Syllabus Intelligence</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-100">Syllabus Knowledge Graph</h1>
          <p className="text-xs text-slate-400 mt-1">
            Hierarchical map: Subject &rarr; Unit &rarr; Chapter &rarr; Topic &rarr; Subtopic with Mastery & Risk Scores.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20"
        >
          <Plus className="h-4 w-4" />
          <span>Add Syllabus Topic</span>
        </button>
      </div>

      {/* Subject Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
        {subjects.map((subj) => {
          const active = subj.id === activeSubject?.id
          return (
            <button
              key={subj.id}
              onClick={() => setSelectedSubjectId(subj.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                active
                  ? 'bg-cyan-500/20 border border-cyan-400/50 text-cyan-200 shadow-md shadow-cyan-950'
                  : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>{subj.name}</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-950 font-mono text-teal-400 border border-slate-700">
                {subj.code}
              </span>
            </button>
          )
        })}
      </div>

      {/* Subject Overview Card */}
      {activeSubject && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-teal-500/20 space-y-1">
            <p className="text-xs text-slate-400">Total Topics</p>
            <p className="text-2xl font-bold text-slate-100">{activeTopics.length}</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/80 border border-teal-500/20 space-y-1">
            <p className="text-xs text-slate-400">Average Mastery</p>
            <p className="text-2xl font-bold text-cyan-300">{activeSubject.avg_mastery}%</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/80 border border-teal-500/20 space-y-1">
            <p className="text-xs text-slate-400">Syllabus Completion</p>
            <p className="text-2xl font-bold text-teal-300">{activeSubject.completion}%</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/80 border border-teal-500/20 space-y-1">
            <p className="text-xs text-slate-400">High Risk Topics</p>
            <p className="text-2xl font-bold text-rose-400">
              {activeTopics.filter((t) => t.risk_level === 'HIGH' || t.is_weak).length}
            </p>
          </div>
        </div>
      )}

      {/* Topic List Cards */}
      <div className="space-y-4">
        {activeTopics.map((topic) => (
          <div
            key={topic.id}
            className={`p-5 rounded-2xl border transition-all space-y-4 ${
              topic.risk_level === 'HIGH'
                ? 'bg-slate-900/90 border-rose-500/40 shadow-lg shadow-rose-950/20'
                : 'bg-slate-900/70 border-teal-500/20'
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
                    {topic.unit} • {topic.chapter}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase font-mono ${
                      topic.risk_level === 'HIGH'
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                        : topic.risk_level === 'MEDIUM'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        : 'bg-teal-500/20 text-teal-300 border-teal-500/40'
                    }`}
                  >
                    Risk: {topic.risk_level}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-100 mt-1">{topic.name}</h3>
              </div>

              {/* Mastery & Confidence Meters */}
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-[10px] text-slate-400 font-mono">Mastery</p>
                  <p className={`text-xl font-black ${topic.mastery_pct < 50 ? 'text-rose-400' : 'text-cyan-300'}`}>
                    {topic.mastery_pct}%
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-400 font-mono">Confidence</p>
                  <p className="text-xl font-black text-teal-300">{topic.confidence_pct}%</p>
                </div>
              </div>
            </div>

            {/* Subtopics Pills */}
            {topic.subtopics && topic.subtopics.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-slate-400 mb-1.5">Subtopics Breakdown:</p>
                <div className="flex flex-wrap gap-2">
                  {topic.subtopics.map((sub, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg text-xs bg-slate-950 text-slate-300 border border-slate-800"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Topic Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-cyan-500/30 p-6 rounded-2xl w-full max-w-md space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-100">Add Topic to Syllabus</h3>
            <form onSubmit={handleAddTopic} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Subject Name</label>
                <input
                  type="text"
                  value={newSubjName}
                  onChange={(e) => setNewSubjName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-cyan-400"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Topic Name</label>
                <input
                  type="text"
                  value={newTopicName}
                  onChange={(e) => setNewTopicName(e.target.value)}
                  placeholder="e.g. Graph Algorithms / Dijkstra"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-cyan-400"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Difficulty</label>
                <select
                  value={newDifficulty}
                  onChange={(e) => setNewDifficulty(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-cyan-400"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
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
                  disabled={adding}
                  className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 text-xs font-bold shadow-md shadow-cyan-500/20"
                >
                  {adding ? 'Adding...' : 'Add Topic'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
