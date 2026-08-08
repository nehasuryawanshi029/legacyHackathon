const START_HOUR = 18
const START_MINUTE = 0

const DURATION_BY_PRIORITY = {
  high: 50,
  medium: 40,
  low: 20,
}

const BREAK_LENGTH = 10

function daysUntil(deadlineStr) {
  if (!deadlineStr) return 999
  const deadline = new Date(deadlineStr)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  deadline.setHours(0, 0, 0, 0)
  return Math.ceil((deadline - today) / (1000 * 60 * 60 * 24))
}

function scoreTopic(topic, subject) {
  let score = 0
  const days = daysUntil(subject.deadline)

  if (topic.isWeak) score += 3
  if (days <= 3) score += 2
  else if (days <= 7) score += 1

  return score
}

export function getPriorityFromScore(score) {
  if (score >= 4) return 'high'
  if (score >= 2) return 'medium'
  return 'low'
}

export function getPriorityReason(topic, subject, priority) {
  const days = daysUntil(subject.deadline)
  const weak = topic.isWeak

  if (priority === 'high') {
    if (weak && days <= 7) return 'Deadline is close + marked as weak'
    if (weak) return 'Marked as weak — needs extra focus'
    if (days <= 3) return `Exam in ${days} day${days === 1 ? '' : 's'} — urgent review`
    return 'High priority based on upcoming deadline'
  }

  if (priority === 'medium') {
    if (days <= 7) return 'Upcoming deadline — reinforcement session'
    if (weak) return 'Weak topic — steady practice'
    return 'Scheduled for balanced coverage'
  }

  return 'Strong topic — maintenance review'
}

function formatTime(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60)
  const mins = totalMinutes % 60
  const period = hours >= 12 ? 'PM' : 'AM'
  const displayHour = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours
  return `${displayHour}:${mins.toString().padStart(2, '0')} ${period}`
}

export function generateStudyPlan(subjects, availableHours) {
  const availableMinutes = availableHours * 60
  const candidates = []

  subjects.forEach((subject) => {
    subject.topics
      .filter((t) => t.name.trim())
      .forEach((topic) => {
        const score = scoreTopic(topic, subject)
        const priority = getPriorityFromScore(score)
        candidates.push({
          subject: subject.name,
          topic: topic.name,
          score,
          priority,
          durationMinutes: DURATION_BY_PRIORITY[priority],
          reason: getPriorityReason(topic, subject, priority),
        })
      })
  })

  candidates.sort((a, b) => b.score - a.score)

  const sessions = []
  let usedStudyMinutes = 0
  let clockMinutes = START_HOUR * 60 + START_MINUTE

  for (let i = 0; i < candidates.length; i++) {
    const candidate = candidates[i]
    let duration = candidate.durationMinutes

    const breakNeeded = sessions.length > 0
    const breakCost = breakNeeded ? BREAK_LENGTH : 0

    if (usedStudyMinutes + duration > availableMinutes) {
      const remaining = availableMinutes - usedStudyMinutes
      if (remaining < 20) break
      duration = Math.min(duration, remaining)
    }

    if (usedStudyMinutes + duration > availableMinutes) break

    if (breakNeeded) {
      clockMinutes += BREAK_LENGTH
    }

    const startTime = formatTime(clockMinutes)
    clockMinutes += duration
    usedStudyMinutes += duration
    const endTime = formatTime(clockMinutes)

    sessions.push({
      id: `sess-${Date.now()}-${i}-${Math.random().toString(36).slice(2, 7)}`,
      startTime,
      endTime,
      subject: candidate.subject,
      topic: candidate.topic,
      durationMinutes: duration,
      priority: candidate.priority,
      reason: candidate.reason,
      completed: false,
    })
  }

  return sessions
}

export { START_HOUR }
