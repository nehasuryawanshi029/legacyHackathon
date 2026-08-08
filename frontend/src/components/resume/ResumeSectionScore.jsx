export default function ResumeSectionScore({ name, score, status, feedback }) {
  const color =
    score >= 85 ? 'bg-tide' : score >= 70 ? 'bg-gold' : 'bg-coral'

  return (
    <div className="rounded-xl border border-surface/30 bg-pearl/80 p-4">
      <div className="flex items-center justify-between gap-2">
        <h4 className="font-medium text-deep">{name}</h4>
        <span className="text-sm font-semibold text-deep">{score}%</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-foam">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${score}%` }} />
      </div>
      <p className="mt-2 text-xs font-medium text-tide">{status}</p>
      <p className="mt-1 text-xs text-deep/70">{feedback}</p>
    </div>
  )
}
