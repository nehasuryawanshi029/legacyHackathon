import { Link } from 'react-router-dom'
import { ArrowRight, Compass } from 'lucide-react'
import Button from '../ui/Button'
import WaveDivider from '../layout/WaveDivider'

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-surface/30 shadow-2xl shadow-abyss/50">
      <div
        className="absolute inset-0 bg-cover bg-[center_30%]"
        style={{ backgroundImage: "url('/images/atlantis-bg.png')" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-surface/25 via-abyss/50 to-abyss/85"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-abyss/80 via-transparent to-abyss/40"
        aria-hidden="true"
      />

      <div className="relative px-6 py-12 sm:px-10 sm:py-16">
        <div className="flex items-center gap-2 text-surface">
          <Compass className="h-4 w-4 text-gold" />
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-seafoam">
            Depths of Atlantis · Study Navigator
          </p>
        </div>
        <h1 className="font-display mt-4 text-3xl font-bold leading-tight text-pearl sm:text-4xl lg:text-[2.75rem]">
          The Keeper&apos;s Tide-Chart
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-foam sm:text-lg">
          Map subjects, weak currents, and deadlines into a daily chart — then test your
          knowledge with quizzes and sharpen your resume for the journey ahead.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/create">
            <Button size="lg">
              Create My Study Plan
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          <Link to="/quiz">
            <Button size="lg" variant="secondary">
              Take a Quiz
            </Button>
          </Link>
        </div>
      </div>

      <WaveDivider color="text-surface/30" />
    </section>
  )
}
