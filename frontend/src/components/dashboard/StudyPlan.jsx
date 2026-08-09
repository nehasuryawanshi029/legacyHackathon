import StudySession from './StudySession'

export default function StudyPlan({ sessions, onToggleComplete }) {
  if (sessions.length === 0) {
    return (
      <div className="atlantic-card rounded-xl border-dashed border-atlantic/30 p-8 text-center">
        <p className="text-atlantic/80">No sessions scheduled for today.</p>
        <p className="mt-1 text-sm text-seafoam">
          Try increasing your available study time to catch more of the tide.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {sessions.map((session) => (
        <StudySession
          key={session.id}
          session={session}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </div>
  )
}
