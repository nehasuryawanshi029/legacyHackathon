const labels = ['A', 'B', 'C', 'D']

export default function QuestionOption({ label, text, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-all ${
        selected
          ? 'border-gold bg-gold/15 ring-1 ring-gold/40'
          : 'border-surface/40 bg-pearl/80 hover:border-tide/50'
      }`}
    >
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold ${
          selected ? 'bg-gold text-abyss' : 'bg-foam text-deep'
        }`}
      >
        {label}
      </span>
      <span className="pt-1 text-sm font-medium text-deep">{text}</span>
    </button>
  )
}

export { labels }
