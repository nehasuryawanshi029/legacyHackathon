import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Sparkles } from 'lucide-react'
import PageShell from '../components/layout/PageShell'
import SubjectForm from '../components/plan/SubjectForm'
import TimeSelector from '../components/plan/TimeSelector'
import Button from '../components/ui/Button'
import { useStudyPlan } from '../context/StudyPlanContext'
import { createEmptySubject } from '../data/demoData'

export default function CreatePlan() {
  const navigate = useNavigate()
  const { generatePlan, loadDemoData, dailyHours, setDailyHours } = useStudyPlan()

  const [subjects, setSubjects] = useState([createEmptySubject()])
  const [hours, setHours] = useState(dailyHours)
  const [error, setError] = useState('')

  const addSubject = () => {
    setSubjects([...subjects, createEmptySubject()])
  }

  const updateSubject = (index, updated) => {
    setSubjects(subjects.map((s, i) => (i === index ? updated : s)))
  }

  const removeSubject = (index) => {
    if (subjects.length <= 1) return
    setSubjects(subjects.filter((_, i) => i !== index))
  }

  const handleLoadDemo = () => {
    loadDemoData()
    setSubjects([
      {
        id: 'sub-dbms',
        name: 'DBMS',
        deadline: '2026-08-12',
        topics: [
          { id: 't-norm', name: 'Normalization', isWeak: true },
          { id: 't-trans', name: 'Transactions', isWeak: false },
          { id: 't-index', name: 'Indexing', isWeak: false },
        ],
      },
      {
        id: 'sub-dsa',
        name: 'DSA',
        deadline: '2026-08-15',
        topics: [
          { id: 't-graphs', name: 'Graphs', isWeak: true },
          { id: 't-trees', name: 'Trees', isWeak: false },
        ],
      },
    ])
    setHours(2)
    setDailyHours(2)
    setError('')
  }

  const validate = () => {
    const validSubjects = subjects.filter(
      (s) => s.name.trim() && s.deadline && s.topics.some((t) => t.name.trim()),
    )
    if (validSubjects.length === 0) {
      setError('Add at least one subject with a deadline and one topic.')
      return null
    }
    return validSubjects.map((s) => ({
      ...s,
      topics: s.topics.filter((t) => t.name.trim()),
    }))
  }

  const handleGenerate = () => {
    const valid = validate()
    if (!valid) return

    setError('')
    setDailyHours(hours)
    generatePlan(valid, hours)
    navigate('/dashboard')
  }

  return (
    <PageShell className="max-w-3xl">
      <div className="mb-8 rounded-2xl atlantic-surface px-5 py-6 shadow-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-surface">
          Chart your course
        </p>
        <h1 className="font-display mt-1 text-2xl font-bold text-pearl sm:text-3xl">
          Create Study Plan
        </h1>
        <p className="mt-2 text-foam/90">
          Add subjects, mark weak topics, and set deadlines — we&apos;ll map your Atlantic
          study tide.
        </p>
      </div>

      <div className="space-y-4">
        {subjects.map((subject, index) => (
          <SubjectForm
            key={subject.id}
            subject={subject}
            index={index}
            onChange={(updated) => updateSubject(index, updated)}
            onRemove={() => removeSubject(index)}
            canRemove={subjects.length > 1}
          />
        ))}

        <Button variant="secondary" onClick={addSubject} className="w-full sm:w-auto">
          <Plus className="h-4 w-4" />
          Add another subject
        </Button>

        <TimeSelector value={hours} onChange={setHours} />

        {error && (
          <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
        )}

        <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
          <Button size="lg" onClick={handleGenerate} className="w-full sm:w-auto">
            <Sparkles className="h-5 w-5" />
            Generate Plan
          </Button>
          <Button variant="ghost" onClick={handleLoadDemo} className="w-full sm:w-auto">
            Load demo data
          </Button>
        </div>
      </div>
    </PageShell>
  )
}
