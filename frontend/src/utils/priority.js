export const PRIORITY_CONFIG = {
  high: {
    label: 'HIGH',
    bg: 'bg-reef/30',
    text: 'text-priority-high',
    border: 'border-coral/40',
    dot: 'bg-coral',
    accent: 'border-l-coral',
  },
  medium: {
    label: 'MEDIUM',
    bg: 'bg-gold/25',
    text: 'text-priority-medium',
    border: 'border-gold/40',
    dot: 'bg-gold',
    accent: 'border-l-gold',
  },
  low: {
    label: 'LOW',
    bg: 'bg-surface/25',
    text: 'text-priority-low',
    border: 'border-tide/40',
    dot: 'bg-tide',
    accent: 'border-l-tide',
  },
}

export function getPriorityConfig(priority) {
  return PRIORITY_CONFIG[priority] ?? PRIORITY_CONFIG.medium
}
