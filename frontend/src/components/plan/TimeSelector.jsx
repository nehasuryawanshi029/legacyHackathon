import { Clock } from 'lucide-react'
import Card from '../ui/Card'

const HOUR_OPTIONS = [1, 2, 3, 4, 5, 6]

export default function TimeSelector({ value, onChange, label = 'Available study time per day' }) {
  return (
    <Card className="border-t-4 border-t-gold">
      <div className="flex items-center gap-2">
        <Clock className="h-5 w-5 text-coral" />
        <span className="font-display font-medium text-deep">{label}</span>
      </div>
      <p className="mt-1 text-sm text-deep/70">How many hours can you study each day?</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {HOUR_OPTIONS.map((h) => (
          <button
            key={h}
            type="button"
            onClick={() => onChange(h)}
            className={`min-h-[44px] rounded-xl border px-5 py-2 text-sm font-medium transition-all ${
              value === h ? 'pill-atlantis-active' : 'pill-atlantis'
            }`}
          >
            {h} hr{h !== 1 ? 's' : ''}/day
          </button>
        ))}
      </div>
    </Card>
  )
}
