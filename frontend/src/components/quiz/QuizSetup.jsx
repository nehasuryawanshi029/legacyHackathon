import Card from '../ui/Card'
import { QUIZ_SUBJECTS, QUIZ_TOPICS, QUIZ_DIFFICULTIES, QUIZ_COUNTS } from '../../data/quizData'
import Button from '../ui/Button'
import { Play } from 'lucide-react'

const pill = (active) => (active ? 'pill-atlantis-active' : 'pill-atlantis')

export default function QuizSetup({ config, onChange, onStart }) {
  const topics = QUIZ_TOPICS[config.subject] || []

  return (
    <Card className="border-t-4 border-t-coral">
      <h2 className="font-display text-lg font-semibold text-deep">Quiz Setup</h2>
      <p className="mt-1 text-sm text-deep/70">Test your understanding of study topics.</p>

      <div className="mt-5 space-y-4">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-deep/60">Subject</p>
          <div className="flex flex-wrap gap-2">
            {QUIZ_SUBJECTS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => onChange({ ...config, subject: s, topic: QUIZ_TOPICS[s][0] })}
                className={`rounded-xl border px-4 py-2 text-sm font-medium ${pill(config.subject === s)}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-deep/60">Topic</p>
          <div className="flex flex-wrap gap-2">
            {topics.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => onChange({ ...config, topic: t })}
                className={`rounded-xl border px-4 py-2 text-sm font-medium ${pill(config.topic === t)}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-deep/60">Difficulty</p>
          <div className="flex flex-wrap gap-2">
            {QUIZ_DIFFICULTIES.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => onChange({ ...config, difficulty: d })}
                className={`rounded-xl border px-4 py-2 text-sm font-medium capitalize ${pill(config.difficulty === d)}`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-deep/60">Questions</p>
          <div className="flex flex-wrap gap-2">
            {QUIZ_COUNTS.map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => onChange({ ...config, count: n })}
                className={`min-w-[44px] rounded-xl border px-4 py-2 text-sm font-medium ${pill(config.count === n)}`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Button onClick={onStart} className="mt-6 w-full sm:w-auto">
        <Play className="h-4 w-4" />
        Start Quiz
      </Button>
    </Card>
  )
}
