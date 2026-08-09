import { BookOpen, Calendar, Sparkles } from 'lucide-react'
import Card from '../ui/Card'

const steps = [
  {
    icon: BookOpen,
    title: 'Chart your subjects',
    description: 'List topics, mark weak areas, and set exam deadlines.',
    accent: 'border-t-coral',
    iconBg: 'from-reef/40 to-coral/20 text-coral',
  },
  {
    icon: Calendar,
    title: 'Set the tide',
    description: 'Tell us how many hours you can study each day.',
    accent: 'border-t-gold',
    iconBg: 'from-gold/35 to-sand/30 text-depth',
  },
  {
    icon: Sparkles,
    title: 'Sail your plan',
    description: 'Receive a prioritized daily tide-chart with clear reasons.',
    accent: 'border-t-surface',
    iconBg: 'from-surface/50 to-seafoam/30 text-deep',
  },
]

export default function HowItWorks() {
  return (
    <section className="mt-12">
      <h2 className="font-display page-heading text-xl font-semibold sm:text-2xl">
        How the tide-chart works
      </h2>
      <p className="page-subtext mt-2">Three currents to a smarter study routine.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {steps.map(({ icon: Icon, title, description, accent, iconBg }, i) => (
          <Card key={title} className={`relative border-t-4 ${accent}`}>
            <span
              className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${iconBg}`}
            >
              <Icon className="h-5 w-5" />
            </span>
            <span className="absolute right-4 top-4 font-display text-xs font-bold text-surface/80">
              0{i + 1}
            </span>
            <h3 className="font-display font-semibold text-deep">{title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-deep/75">{description}</p>
          </Card>
        ))}
      </div>
    </section>
  )
}
