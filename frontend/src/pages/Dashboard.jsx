import { Link } from 'react-router-dom'
import { CalendarDays, Waves } from 'lucide-react'
import PageShell from '../components/layout/PageShell'
import ProgressBar from '../components/dashboard/ProgressBar'
import ReplanControls from '../components/dashboard/ReplanControls'
import StudyPlan from '../components/dashboard/StudyPlan'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import { useStudyPlan } from '../context/StudyPlanContext'

export default function Dashboard() {
  const {
    hasPlan,
    sessions,
    completedCount,
    totalCount,
    todayHours,
    setTodayHours,
    regenerateTodayPlan,
    toggleSessionComplete,
  } = useStudyPlan()

  if (!hasPlan || sessions.length === 0) {
    return (
      <PageShell>
        <Card className="border-dashed border-atlantic/30 px-6 py-16 text-center">
          <CalendarDays className="mx-auto h-12 w-12 text-seafoam" />
          <h1 className="mt-4 text-xl font-semibold text-deep">No study plan yet</h1>
          <p className="mt-2 text-atlantic/70">
            Create a plan to see your personalized daily tide-chart.
          </p>
          <Link to="/create" className="mt-6 inline-block">
            <Button>Create My Study Plan</Button>
          </Link>
        </Card>
      </PageShell>
    )
  }

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <PageShell>
      <div className="mb-6 rounded-2xl atlantic-surface px-6 py-5 shadow-xl">
        <div className="flex items-center gap-2 text-surface">
          <Waves className="h-4 w-4 text-gold" />
          <p className="text-sm font-medium tracking-wide">Today&apos;s Tide-Chart</p>
        </div>
        <h1 className="font-display mt-1 text-2xl font-bold text-pearl sm:text-3xl">
          Study Dashboard
        </h1>
        <p className="mt-1 text-sm text-foam/90">{today}</p>
      </div>

      <div className="mb-6">
        <ProgressBar completed={completedCount} total={totalCount} />
      </div>

      <div className="mb-6">
        <ReplanControls
          todayHours={todayHours}
          onHoursChange={setTodayHours}
          onRegenerate={regenerateTodayPlan}
        />
      </div>

      <div className="mb-4">
        <h2 className="font-display page-heading text-sm font-semibold uppercase tracking-wide">
          What to study next
        </h2>
        <p className="page-subtext mt-1 text-sm">
          Sessions flow by priority — start from the top of the tide.
        </p>
      </div>

      <StudyPlan sessions={sessions} onToggleComplete={toggleSessionComplete} />
    </PageShell>
  )
}
