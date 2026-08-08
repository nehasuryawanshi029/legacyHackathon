import { CheckCircle2, AlertTriangle } from 'lucide-react'
import Card from '../ui/Card'

export default function SkillAnalysis({ detected, missing }) {
  return (
    <Card>
      <h3 className="font-display font-semibold text-deep">Detected Skills</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {detected.map((skill) => (
          <span
            key={skill}
            className="inline-flex items-center gap-1 rounded-full bg-surface/25 px-3 py-1 text-xs font-medium text-deep"
          >
            <CheckCircle2 className="h-3 w-3 text-priority-low" />
            {skill}
          </span>
        ))}
      </div>

      <h3 className="font-display mt-5 font-semibold text-deep">Missing / Recommended</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {missing.map((skill) => (
          <span
            key={skill}
            className="inline-flex items-center gap-1 rounded-full bg-coral/15 px-3 py-1 text-xs font-medium text-coral"
          >
            <AlertTriangle className="h-3 w-3" />
            {skill}
          </span>
        ))}
      </div>
    </Card>
  )
}
