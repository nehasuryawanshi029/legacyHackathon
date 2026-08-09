import { Lightbulb } from 'lucide-react'
import Card from '../ui/Card'

export default function ImprovementSuggestions({ suggestions, missingSkills = [], onAddSkill, addedSkills = [] }) {
  return (
    <Card className="border-l-4 border-l-gold">
      <div className="flex items-center gap-2">
        <Lightbulb className="h-5 w-5 text-gold" />
        <h3 className="font-display font-semibold text-deep">How to Improve Your Resume</h3>
      </div>
      <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-deep/80">
        {suggestions.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ol>
      {onAddSkill && missingSkills.length > 0 && (
        <div className="mt-5 border-t border-surface/30 pt-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-deep/60">
            Bridge gaps → Study Plan
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {missingSkills.map((skill) => (
              <button
                key={skill}
                type="button"
                disabled={addedSkills.includes(skill)}
                onClick={() => onAddSkill(skill)}
                className="rounded-lg border border-coral/30 bg-coral/10 px-3 py-1.5 text-xs font-medium text-deep hover:bg-coral/20 disabled:opacity-50"
              >
                {addedSkills.includes(skill) ? `✓ ${skill} added` : `+ Add ${skill} to Study Plan`}
              </button>
            ))}
          </div>
        </div>
      )}
    </Card>
  )
}
