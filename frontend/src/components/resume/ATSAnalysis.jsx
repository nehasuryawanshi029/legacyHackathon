import { AlertTriangle } from 'lucide-react'
import Card from '../ui/Card'

export default function ATSAnalysis({ compatibility, issues }) {
  return (
    <Card className="border-t-4 border-t-tide">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold text-deep">ATS Compatibility</h3>
        <span className="font-display text-2xl font-bold text-tide">{compatibility}%</span>
      </div>
      <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-foam">
        <div
          className="atlantic-shimmer h-full rounded-full"
          style={{ width: `${compatibility}%` }}
        />
      </div>
      <ul className="mt-4 space-y-2">
        {issues.map((issue) => (
          <li key={issue} className="flex gap-2 text-sm text-deep/80">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
            {issue}
          </li>
        ))}
      </ul>
    </Card>
  )
}
