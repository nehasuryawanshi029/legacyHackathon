import { useState, useRef } from 'react'
import { BrainCircuit } from 'lucide-react'
import PageShell from '../components/layout/PageShell'
import QuizSetup from '../components/quiz/QuizSetup'
import QuizQuestion from '../components/quiz/QuizQuestion'
import QuizResults from '../components/quiz/QuizResults'
import { getQuizQuestions, computeTopicPerformance, QUIZ_TOPICS } from '../data/quizData'
import { useStudyPlan } from '../context/StudyPlanContext'

function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return m > 0 ? `${m}m ${s}s` : `${s}s`
}

export default function Quiz() {
  const { saveQuizResult, addWeakTopicToPlan } = useStudyPlan()
  const startTime = useRef(null)
  const [phase, setPhase] = useState('setup')
  const [config, setConfig] = useState({
    subject: 'DBMS',
    topic: 'Normalization',
    difficulty: 'medium',
    count: 10,
  })
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [addedTopics, setAddedTopics] = useState([])
  const [results, setResults] = useState(null)

  const startQuiz = () => {
    const qs = getQuizQuestions(config)
    setQuestions(qs)
    setAnswers(Array(qs.length).fill(null))
    setCurrentIndex(0)
    setAddedTopics([])
    startTime.current = Date.now()
    setPhase('quiz')
  }

  const finishQuiz = (finalAnswers) => {
    const correct = questions.filter((q, i) => finalAnswers[i] === q.correctIndex).length
    const total = questions.length
    const percent = Math.round((correct / total) * 100)
    const elapsed = Math.round((Date.now() - startTime.current) / 1000)
    const topicPerformance = computeTopicPerformance(questions, finalAnswers)

    const weakTopics = topicPerformance
      .filter((t) => t.isWeak)
      .map((t) => ({
        topic: t.name,
        subject: config.subject,
        percent: t.percent,
      }))

    const result = {
      score: correct,
      total,
      percent,
      correct,
      incorrect: total - correct,
      timeTaken: formatTime(elapsed),
      topicPerformance,
      weakTopics,
      subject: config.subject,
      quizTopic: config.topic,
    }

    setResults(result)
    saveQuizResult({ percent, score: correct, total })
    setPhase('results')
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1)
    } else {
      finishQuiz(answers)
    }
  }

  const handleAddWeak = (subject, topic) => {
    addWeakTopicToPlan(subject, topic)
    setAddedTopics((prev) => [...prev, `${subject}-${topic}`])
  }

  return (
    <PageShell>
      <div className="mb-6 rounded-2xl atlantic-surface px-5 py-5 shadow-xl">
        <div className="flex items-center gap-2 text-surface">
          <BrainCircuit className="h-4 w-4 text-gold" />
          <p className="text-xs font-semibold uppercase tracking-[0.2em]">Quiz Engine</p>
        </div>
        <h1 className="font-display mt-1 text-2xl font-bold text-pearl sm:text-3xl">
          Test Your Knowledge
        </h1>
        <p className="mt-1 text-sm text-foam/90">
          Measure understanding — weak topics flow back into your Tide-Chart.
        </p>
      </div>

      {phase === 'setup' && (
        <QuizSetup config={config} onChange={setConfig} onStart={startQuiz} />
      )}

      {phase === 'quiz' && questions[currentIndex] && (
        <QuizQuestion
          question={questions[currentIndex]}
          questionIndex={currentIndex}
          total={questions.length}
          selectedIndex={answers[currentIndex]}
          onSelect={(idx) => {
            const next = [...answers]
            next[currentIndex] = idx
            setAnswers(next)
          }}
          onPrevious={() => setCurrentIndex((i) => Math.max(0, i - 1))}
          onNext={handleNext}
          canPrevious={currentIndex > 0}
          isLast={currentIndex === questions.length - 1}
        />
      )}

      {phase === 'results' && results && (
        <QuizResults
          {...results}
          onAddWeakTopic={handleAddWeak}
          addedTopics={addedTopics}
          onRetry={() => {
            setPhase('setup')
            setConfig((c) => ({ ...c, topic: QUIZ_TOPICS[c.subject]?.[0] || c.topic }))
          }}
        />
      )}
    </PageShell>
  )
}
