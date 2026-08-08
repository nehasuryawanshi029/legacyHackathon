import { Link } from 'react-router-dom'
import { BookOpen, BrainCircuit, FileSearch, AlertTriangle } from 'lucide-react'
import Card from '../ui/Card'
import { useStudyPlan } from '../../context/StudyPlanContext'

const cards = [
  {
    key: 'study',
    to: '/dashboard',
    icon: BookOpen,
    label: "Today's Study",
    accent: 'border-t-tide',
    iconColor: 'text-tide',
  },
  {
    key: 'quiz',
    to: '/quiz',
    icon: BrainCircuit,
    label: 'Quiz Performance',
    accent: 'border-t-gold',
    iconColor: 'text-gold',
  },
  {
    key: 'resume',
    to: '/resume',
    icon: FileSearch,
    label: 'Resume Score',
    accent: 'border-t-coral',
    iconColor: 'text-coral',
  },
  {
    key: 'weak',
    to: '/create',
    icon: AlertTriangle,
    label: 'Weak Topics',
    accent: 'border-t-coral',
    iconColor: 'text-coral',
  },
]

export default function PlatformOverview({ compact = false }) {
  const { completedCount, totalCount, quizStats, resumeScore, weakTopicCount, hasPlan } =
    useStudyPlan()

  const values = {
    study: totalCount > 0 ? `${completedCount} / ${totalCount} sessions completed` : 'No plan yet',
    quiz: `${quizStats.averagePercent}% average`,
    resume: `${resumeScore} / 100`,
    weak: `${weakTopicCount} topic${weakTopicCount !== 1 ? 's' : ''} need attention`,
  }

  const resolveLink = (key, defaultTo) => {
    if (key === 'weak') return hasPlan ? '/dashboard' : '/create'
    return defaultTo
  }

  return (
    <section className={compact ? '' : 'mt-10'}>
      {!compact && (
        <>
          <h2 className="font-display page-heading text-xl font-semibold sm:text-2xl">
            Your Platform Overview
          </h2>
          <p className="page-subtext mt-1 text-sm">
            Study, quiz, and resume — connected in one tide-chart ecosystem.
          </p>
        </>
      )}

      <div className={`grid gap-3 sm:grid-cols-2 lg:grid-cols-4 ${compact ? '' : 'mt-5'}`}>
        {cards.map(({ key, to, icon: Icon, label, accent, iconColor }) => (
          <Link key={key} to={resolveLink(key, to)}>
            <Card className={`h-full border-t-4 ${accent} transition-transform hover:scale-[1.02]`}>
              <Icon className={`h-5 w-5 ${iconColor}`} />
              <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-deep/60">
                {label}
              </p>
              <p className="mt-1 font-display text-lg font-bold text-deep">{values[key]}</p>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
