export default function QuizProgress({ current, total }) {
  const percent = total > 0 ? Math.round((current / total) * 100) : 0

  return (
    <div>
      <div className="flex justify-between text-sm">
        <span className="font-medium text-deep">
          Question {current} / {total}
        </span>
        <span className="text-tide">{percent}%</span>
      </div>
      <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-foam">
        <div className="atlantic-shimmer h-full rounded-full transition-all" style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}
