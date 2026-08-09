import Card from '../ui/Card'
import QuizProgress from './QuizProgress'
import QuestionOption, { labels } from './QuestionOption'
import Button from '../ui/Button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function QuizQuestion({
  question,
  questionIndex,
  total,
  selectedIndex,
  onSelect,
  onPrevious,
  onNext,
  canPrevious,
  isLast,
}) {
  return (
    <Card className="border-t-4 border-t-surface">
      <QuizProgress current={questionIndex + 1} total={total} />

      <h2 className="mt-6 text-base font-semibold leading-relaxed text-deep sm:text-lg">
        {question.question}
      </h2>

      <div className="mt-5 space-y-3">
        {question.options.map((opt, i) => (
          <QuestionOption
            key={opt}
            label={labels[i]}
            text={opt}
            selected={selectedIndex === i}
            onSelect={() => onSelect(i)}
          />
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-between">
        <Button variant="secondary" onClick={onPrevious} disabled={!canPrevious} className="sm:w-auto">
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <Button onClick={onNext} disabled={selectedIndex === null} className="sm:w-auto">
          {isLast ? 'Submit Quiz' : 'Next'}
          {!isLast && <ChevronRight className="h-4 w-4" />}
        </Button>
      </div>
    </Card>
  )
}
