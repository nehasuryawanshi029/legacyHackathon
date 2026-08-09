import { Trophy, Clock, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react'
import { Link } from 'react-router-dom'
import Card from '../ui/Card'
import Button from '../ui/Button'

export default function QuizResults({
  score,
  total,
  percent,
  correct,
  incorrect,
  timeTaken,
  topicPerformance,
  weakTopics,
  onAddWeakTopic,
  addedTopics,
  onRetry,
}) {
  return (
    <div className="space-y-4">
      <Card className="border-t-4 border-t-gold text-center">
        <Trophy className="mx-auto h-10 w-10 text-gold" />
        <h2 className="font-display mt-2 text-2xl font-bold text-deep">Quiz Complete!</h2>
        <p className="mt-1 text-3xl font-bold text-tide">
          {score} / {total}
        </p>
        <p className="text-lg font-semibold text-deep">{percent}%</p>
        <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm text-deep/70">
          <span className="inline-flex items-center gap-1">
            <CheckCircle2 className="h-4 w-4 text-priority-low" />
            {correct} correct
          </span>
          <span className="inline-flex items-center gap-1">
            <XCircle className="h-4 w-4 text-coral" />
            {incorrect} incorrect
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-4 w-4 text-tide" />
            {timeTaken}
          </span>
        </div>
      </Card>

      <Card>
        <h3 className="font-display font-semibold text-deep">Topic Performance</h3>
        <div className="mt-3 space-y-3">
          {topicPerformance.map(({ name, percent: p }) => (
            <div key={name}>
              <div className="flex justify-between text-sm">
                <span className="text-deep">{name}</span>
                <span className="font-medium text-tide">{p}%</span>
              </div>
              <div className="mt-1 h-2 overflow-hidden rounded-full bg-foam">
                <div className="h-full rounded-full bg-tide" style={{ width: `${p}%` }} />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {weakTopics.length > 0 && (
        <Card className="border-l-4 border-l-coral">
          <h3 className="flex items-center gap-2 font-display font-semibold text-deep">
            <AlertTriangle className="h-5 w-5 text-coral" />
            Weak Topic Detection
          </h3>
          <p className="mt-1 text-sm text-deep/70">
            These topics may need more practice — add them to your Tide-Chart study plan.
          </p>
          <ul className="mt-4 space-y-3">
            {weakTopics.map(({ topic, subject, percent: p }) => {
              const key = `${subject}-${topic}`
              const added = addedTopics.includes(key)
              return (
                <li
                  key={key}
                  className="flex flex-col gap-2 rounded-xl bg-coral/10 p-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-medium text-deep">{topic}</p>
                    <p className="text-xs text-deep/60">
                      {subject} · {p}% accuracy
                    </p>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    disabled={added}
                    onClick={() => onAddWeakTopic(subject, topic)}
                  >
                    {added ? 'Added to Study Plan' : 'Add to Study Plan'}
                  </Button>
                </li>
              )
            })}
          </ul>
        </Card>
      )}

      <div className="flex flex-wrap gap-3">
        <Button variant="secondary" onClick={onRetry}>
          Try Again
        </Button>
        <Link to="/dashboard">
          <Button>View Study Plan</Button>
        </Link>
      </div>
    </div>
  )
}
