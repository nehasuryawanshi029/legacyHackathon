import { Waves } from 'lucide-react'
import PageShell from '../components/layout/PageShell'
import Hero from '../components/landing/Hero'
import HowItWorks from '../components/landing/HowItWorks'
import Card from '../components/ui/Card'

export default function Home() {
  return (
    <PageShell>
      <Hero />
      <HowItWorks />

      <Card className="mt-12 border-l-4 border-l-coral">
        <div className="flex items-start gap-3">
          <Waves className="mt-0.5 h-5 w-5 shrink-0 text-tide" />
          <div>
            <h2 className="font-display text-lg font-semibold text-deep">
              Why Atlantic Tide-Chart?
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-deep/80">
              <li>
                <strong className="text-abyss">Clarity over clutter</strong> — every session
                shows priority and the reason behind it, like reading a navigator&apos;s chart.
              </li>
              <li>
                <strong className="text-abyss">Deadline-aware currents</strong> — urgent topics
                rise like light through water when exams approach.
              </li>
              <li>
                <strong className="text-abyss">Weak-spot depth</strong> — topics you struggle
                with get more attention, like coral holding the reef together.
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </PageShell>
  )
}
