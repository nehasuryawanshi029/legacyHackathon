export default function ProgressBar({ completed, total }) {
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0

  return (
    <div className="atlantic-card rounded-xl p-4">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-deep">
          {completed} / {total} sessions completed
        </span>
        <span className="font-semibold text-tide">{percent}%</span>
      </div>
      <div className="mt-2 h-3 overflow-hidden rounded-full bg-foam">
        <div
          className="atlantic-shimmer h-full rounded-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}
