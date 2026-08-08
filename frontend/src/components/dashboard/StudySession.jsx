import { CheckCircle2, Circle, Clock } from 'lucide-react'
import Card from '../ui/Card'
import PriorityBadge from './PriorityBadge'
import { getPriorityConfig } from '../../utils/priority'

export default function StudySession({ session, onToggleComplete }) {
  const { startTime, endTime, subject, topic, durationMinutes, priority, reason, completed } =
    session

  const accent = getPriorityConfig(priority).accent

  return (
    <Card
      className={`border-l-4 transition-all ${accent} ${completed ? 'opacity-65' : ''} ${completed ? 'bg-foam/50' : ''}`}
    >
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => onToggleComplete(session.id)}
          className="mt-0.5 shrink-0 text-tide hover:text-atlantic focus:outline-none focus:ring-2 focus:ring-seafoam/50 rounded-full"
          aria-label={completed ? 'Mark incomplete' : 'Mark complete'}
        >
          {completed ? (
            <CheckCircle2 className="h-6 w-6 text-priority-low" />
          ) : (
            <Circle className="h-6 w-6 text-seafoam" />
          )}
        </button>

        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <PriorityBadge priority={priority} />
            <span className="flex items-center gap-1 text-xs text-atlantic/70">
              <Clock className="h-3.5 w-3.5" />
              {startTime} – {endTime}
            </span>
          </div>

          <div>
            <h3
              className={`text-base font-semibold text-deep ${completed ? 'line-through decoration-atlantic/40' : ''}`}
            >
              {subject} — {topic}
            </h3>
            <p className="mt-1 text-sm italic text-atlantic/75">&ldquo;{reason}&rdquo;</p>
          </div>

          <p className="text-xs text-seafoam">{durationMinutes} min session</p>
        </div>
      </div>
    </Card>
  )
}
