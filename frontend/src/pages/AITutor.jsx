import { useState } from 'react'
import { MessageSquare, Send, Sparkles, AlertTriangle, BookOpen, CheckCircle, ArrowRight } from 'lucide-react'
import { useAtlantis } from '../context/AtlantisContext'
import { api } from '../api/client'

export default function AITutor() {
  const { topics, refreshAllState } = useAtlantis()

  const [selectedTopic, setSelectedTopic] = useState(topics[0]?.name || 'Graph Algorithms')
  const [explanationMode, setExplanationMode] = useState('Detailed')
  const [query, setQuery] = useState('')
  const [messages, setMessages] = useState([
    {
      id: 'm-0',
      sender: 'tutor',
      text: "Greetings Alex! I am your ATLANTIS AI Tutor ('Whispering Library'). I see you're working on Graph Algorithms (current mastery: 45%). How can I help you master Dijkstra or BFS today?",
      mode: 'Detailed',
      misconception: null,
      suggested_practice: null
    }
  ])
  const [loading, setLoading] = useState(false)

  const modes = ['Beginner', 'Simple', 'Detailed', 'Exam-oriented', 'Technical', 'Analogy-based']

  const handleSend = async (e) => {
    e.preventDefault()
    if (!query.trim() || loading) return

    const userMsg = { id: `u-${Date.now()}`, sender: 'user', text: query }
    setMessages((prev) => [...prev, userMsg])
    const currentQuery = query
    setQuery('')
    setLoading(true)

    const res = await api.tutorChat(selectedTopic, currentQuery, explanationMode)

    if (res) {
      const tutorMsg = {
        id: res.message_id || `t-${Date.now()}`,
        sender: 'tutor',
        text: res.tutor_reply,
        mode: res.explanation_mode,
        misconception: res.detected_misconception,
        suggested_practice: res.suggested_practice
      }
      setMessages((prev) => [...prev, tutorMsg])
      await refreshAllState()
    }
    setLoading(false)
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto text-slate-100 flex flex-col h-[calc(100vh-80px)]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 border border-teal-500/20 p-5 rounded-2xl shrink-0">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-1">
            <Sparkles className="h-4 w-4" />
            <span>Module 4 • Whispering Library AI Tutor</span>
          </div>
          <h1 className="text-xl font-bold text-slate-100">Adaptive AI Tutoring Engine</h1>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Topic selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-mono">Topic:</span>
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-cyan-300 font-semibold focus:outline-none focus:border-cyan-400"
            >
              {topics.map((t) => (
                <option key={t.id} value={t.name}>
                  {t.name} ({t.mastery_pct}%)
                </option>
              ))}
            </select>
          </div>

          {/* Mode Selector */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 overflow-x-auto">
            {modes.map((m) => (
              <button
                key={m}
                onClick={() => setExplanationMode(m)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                  explanationMode === m
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Messages Body */}
      <div className="flex-1 bg-slate-900/80 border border-teal-500/20 rounded-2xl p-6 overflow-y-auto space-y-4 shadow-inner">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-3xl p-4 rounded-2xl space-y-2 text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-slate-950 font-semibold rounded-tr-none shadow-md'
                  : 'bg-slate-950/90 border border-cyan-500/30 text-slate-200 rounded-tl-none shadow-xl'
              }`}
            >
              {msg.sender === 'tutor' && (
                <div className="flex items-center justify-between border-b border-slate-800 pb-1 text-[10px] text-cyan-400 font-mono">
                  <span>ATLANTIS Tutor • Mode: {msg.mode}</span>
                  <Sparkles className="h-3 w-3 text-cyan-400" />
                </div>
              )}

              <div className="whitespace-pre-wrap">{msg.text}</div>

              {/* Misconception alert badge */}
              {msg.misconception && (
                <div className="p-2.5 rounded-lg bg-rose-950/60 border border-rose-500/40 text-rose-200 text-[11px] flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-rose-300">Misconception Detected:</span> {msg.misconception}
                  </div>
                </div>
              )}

              {/* Practice recommendation */}
              {msg.suggested_practice && (
                <div className="p-2.5 rounded-lg bg-teal-950/60 border border-teal-500/40 text-teal-200 text-[11px] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-teal-400" />
                    <span><strong>Suggested Practice:</strong> {msg.suggested_practice}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono animate-pulse">
            <Sparkles className="h-4 w-4" />
            <span>AI Tutor is reasoning & tailoring explanation...</span>
          </div>
        )}
      </div>

      {/* Input bar */}
      <form onSubmit={handleSend} className="flex items-center gap-3 shrink-0">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Ask about ${selectedTopic} (e.g. "I don't understand Dijkstra" or "Explain time complexity")...`}
          className="flex-1 px-4 py-3.5 rounded-xl bg-slate-950 border border-teal-500/30 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 shadow-xl"
        />
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="px-5 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 disabled:opacity-50"
        >
          <span>Send Query</span>
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  )
}
