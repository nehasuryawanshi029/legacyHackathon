import { RefreshCw, Waves } from 'lucide-react'
import Button from '../ui/Button'
import Card from '../ui/Card'

const HOUR_OPTIONS = [1, 2, 3, 4]

export default function ReplanControls({ todayHours, onHoursChange, onRegenerate }) {
  return (
    <Card className="border-t-4 border-t-surface">
      <div className="flex items-center gap-2 text-tide">
        <Waves className="h-4 w-4 text-surface" />
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-deep/80">
          Adjust today&apos;s tide
        </p>
      </div>

      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-deep/70">Available today</p>
          <p className="font-display text-2xl font-semibold text-abyss">
            {todayHours} hour{todayHours !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {HOUR_OPTIONS.map((h) => (
            <button
              key={h}
              type="button"
              onClick={() => onHoursChange(h)}
              className={`min-h-[44px] min-w-[44px] rounded-xl border px-4 py-2 text-sm font-medium transition-all ${
                todayHours === h ? 'pill-atlantis-active' : 'pill-atlantis'
              }`}
            >
              {h} hr{h !== 1 ? 's' : ''}
            </button>
          ))}
        </div>
      </div>

      <Button variant="secondary" className="mt-4 w-full sm:w-auto" onClick={onRegenerate}>
        <RefreshCw className="h-4 w-4" />
        Regenerate Today&apos;s Plan
      </Button>
    </Card>
  )
}
