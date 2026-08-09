import { useState, useEffect } from 'react'
import { Brain, CheckCircle2, XCircle, Award, ArrowRight, RefreshCw, AlertCircle } from 'lucide-react'
import { useAtlantis } from '../context/AtlantisContext'
import { api } from '../api/client'

export default function QuizEngine() {
  const { topics, handleQuizSubmitted, refreshAllState } = useAtlantis()

  const [selectedTopicId, setSelectedTopicId] = useState(topics[0]?.id || 't-dsa-2')
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState(null)

  const activeTopic = topics.find((t) => t.id === selectedTopicId) || topics[0]

  useEffect(() => {
    async function loadQuestions() {
      if (!selectedTopicId) return
      setResult(null)
      setAnswers({})
      const qList = await api.getQuizQuestions(selectedTopicId)
      if (qList) setQuestions(qList)
    }
    loadQuestions()
  }, [selectedTopicId])

  const handleSelectAnswer = (qId, option) => {
    setAnswers((prev) => ({ ...prev, [qId]: option }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (submitting || !activeTopic) return
    setSubmitting(true)

    const subData = {
      quiz_id: `qz-${Date.now()}`,
      topic_id: activeTopic.id,
      topic_name: activeTopic.name,
      answers: answers,
    }

    const res = await api.submitQuiz(subData)
    if (res) {
      setResult(res)
      await handleQuizSubmitted(res)
    }
    setSubmitting(false)
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto text-slate-100">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 border border-teal-500/20 p-6 rounded-2xl">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-1">
            <Brain className="h-4 w-4" />
            <span>Module 5 • Syllabus AI Quiz Engine</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-100">Syllabus Assessment & Adaptive Quiz</h1>
          <p className="text-xs text-slate-400 mt-1">
            Submitting a quiz updates your Topic Mastery, Confidence, and automatically recalibrates your Tide-Chart!
          </p>
        </div>

        {/* Topic Selector */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 font-mono">Select Topic:</span>
          <select
            value={selectedTopicId}
            onChange={(e) => setSelectedTopicId(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-cyan-300 font-semibold focus:outline-none focus:border-cyan-400"
          >
            {topics.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name} (Mastery: {t.mastery_pct}%)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* QUIZ RESULT NOTIFICATION CARD */}
      {result && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-cyan-400/50 shadow-2xl space-y-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 font-black text-xl">
                {result.score_pct}%
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-100">Quiz Completed!</h3>
                <p className="text-xs text-slate-400">
                  Topic: {result.topic_name} • {result.correct_count}/{result.total_questions} Correct
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-mono text-slate-400">New Topic Mastery:</span>
              <p className="text-2xl font-black text-teal-300">{result.new_mastery_pct}%</p>
              <span className="text-xs font-semibold text-cyan-400 font-mono">
                Change: {result.mastery_change >= 0 ? `+${result.mastery_change}` : result.mastery_change}%
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-teal-500/30 text-xs text-cyan-200">
            <span className="font-bold text-cyan-300">ATLANTIS Feedback:</span> {result.feedback}
          </div>

          {result.mistake_patterns && result.mistake_patterns.length > 0 && (
            <div className="space-y-1 text-xs">
              <p className="font-semibold text-rose-300">Mistake Patterns Detected:</p>
              <ul className="list-disc list-inside text-rose-200/80 space-y-1">
                {result.mistake_patterns.map((m, idx) => (
                  <li key={idx}>{m}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex justify-end pt-2">
            <button
              onClick={() => {
                setResult(null)
                setAnswers({})
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-semibold"
            >
              Try Another Quiz
            </button>
          </div>
        </div>
      )}

      {/* QUIZ QUESTION CARDS */}
      {!result && (
        <form onSubmit={handleSubmit} className="space-y-6">
          {questions.map((q, idx) => (
            <div key={q.id} className="p-6 rounded-2xl bg-slate-900/80 border border-teal-500/20 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950 px-2.5 py-0.5 rounded border border-cyan-500/30">
                  Question #{idx + 1} ({q.question_type})
                </span>
                <span className="text-[11px] font-mono text-slate-400">Difficulty: {q.difficulty}</span>
              </div>

              <h3 className="text-base font-bold text-slate-100">{q.question}</h3>

              {/* Options */}
              {q.options && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  {q.options.map((opt, i) => {
                    const selected = answers[q.id] === opt
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleSelectAnswer(q.id, opt)}
                        className={`p-3.5 rounded-xl text-xs text-left font-medium transition-all flex items-center justify-between border ${
                          selected
                            ? 'bg-gradient-to-r from-cyan-500/20 to-teal-500/10 border-cyan-400 text-cyan-200 shadow-md'
                            : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <span>{opt}</span>
                        <div
                          className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                            selected ? 'border-cyan-400 bg-cyan-400' : 'border-slate-600'
                          }`}
                        >
                          {selected && <div className="h-1.5 w-1.5 rounded-full bg-slate-950" />}
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          ))}

          <div className="flex items-center justify-end gap-4 pt-4">
            <button
              type="submit"
              disabled={submitting || Object.keys(answers).length < questions.length}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 disabled:opacity-50 flex items-center gap-2"
            >
              {submitting ? 'Evaluating Assessment...' : 'Submit Quiz Answers'}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
