import { AlertCircle } from 'lucide-react'

export default function TopicInput({ topic, onChange, onRemove, canRemove }) {
  return (
    <div className="flex items-start gap-2">
      <input
        type="text"
        value={topic.name}
        onChange={(e) => onChange({ ...topic, name: e.target.value })}
        placeholder="Topic name (e.g. Normalization)"
        className="flex-1 rounded-xl border border-atlantic/20 bg-pearl px-3 py-2 text-sm text-deep focus:border-tide focus:outline-none focus:ring-2 focus:ring-seafoam/40"
      />
      <label className="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-xl border border-atlantic/20 bg-pearl px-3 py-2 text-xs font-medium text-atlantic hover:bg-foam">
        <input
          type="checkbox"
          checked={topic.isWeak}
          onChange={(e) => onChange({ ...topic, isWeak: e.target.checked })}
          className="rounded border-atlantic/30 text-tide focus:ring-seafoam"
        />
        <AlertCircle className="h-3.5 w-3.5 text-priority-high" />
        Weak
      </label>
      {canRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="rounded-lg px-2 py-2 text-sm text-seafoam hover:bg-red-50 hover:text-priority-high"
          aria-label="Remove topic"
        >
          ×
        </button>
      )}
    </div>
  )
}
