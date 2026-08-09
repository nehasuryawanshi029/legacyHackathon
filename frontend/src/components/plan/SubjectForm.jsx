import { Calendar, Trash2 } from 'lucide-react'
import Card from '../ui/Card'
import TopicInput from './TopicInput'
import { createEmptyTopic } from '../../data/demoData'

export default function SubjectForm({ subject, index, onChange, onRemove, canRemove }) {
  const updateTopic = (topicId, updated) => {
    onChange({
      ...subject,
      topics: subject.topics.map((t) => (t.id === topicId ? updated : t)),
    })
  }

  const addTopic = () => {
    onChange({ ...subject, topics: [...subject.topics, createEmptyTopic()] })
  }

  const removeTopic = (topicId) => {
    if (subject.topics.length <= 1) return
    onChange({ ...subject, topics: subject.topics.filter((t) => t.id !== topicId) })
  }

  return (
    <Card className="border-t-4 border-t-surface/80">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex-1 space-y-3">
          <label className="block">
            <span className="text-xs font-medium uppercase tracking-wide text-atlantic/70">
              Subject {index + 1}
            </span>
            <input
              type="text"
              value={subject.name}
              onChange={(e) => onChange({ ...subject, name: e.target.value })}
              placeholder="e.g. DBMS"
              className="mt-1 w-full rounded-xl border border-atlantic/20 bg-pearl px-3 py-2 text-sm font-medium text-deep focus:border-tide focus:outline-none focus:ring-2 focus:ring-seafoam/40"
            />
          </label>

          <label className="block">
            <span className="flex items-center gap-1 text-xs font-medium uppercase tracking-wide text-atlantic/70">
              <Calendar className="h-3.5 w-3.5" />
              Deadline
            </span>
            <input
              type="date"
              value={subject.deadline}
              onChange={(e) => onChange({ ...subject, deadline: e.target.value })}
              className="mt-1 w-full rounded-xl border border-atlantic/20 bg-pearl px-3 py-2 text-sm text-deep focus:border-tide focus:outline-none focus:ring-2 focus:ring-seafoam/40 sm:max-w-xs"
            />
          </label>
        </div>

        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="rounded-lg p-2 text-seafoam hover:bg-red-50 hover:text-priority-high"
            aria-label="Remove subject"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="space-y-2">
        <span className="text-xs font-medium uppercase tracking-wide text-atlantic/70">
          Topics
        </span>        {subject.topics.map((topic) => (
          <TopicInput
            key={topic.id}
            topic={topic}
            onChange={(updated) => updateTopic(topic.id, updated)}
            onRemove={() => removeTopic(topic.id)}
            canRemove={subject.topics.length > 1}
          />
        ))}
        <button
          type="button"
          onClick={addTopic}
          className="text-sm font-medium text-tide hover:text-atlantic"
        >
          + Add topic
        </button>
      </div>
    </Card>
  )
}
