import { createContext, useContext, useState, useCallback } from 'react'
import { DEMO_SUBJECTS, DEMO_DAILY_HOURS } from '../data/demoData'
import { generateStudyPlan } from '../data/planGenerator'
import { MOCK_RESUME_ANALYSIS } from '../data/resumeData'

const STORAGE_KEY = 'keepers-tide-chart-plan'

function defaultDeadline() {
  const d = new Date()
  d.setDate(d.getDate() + 14)
  return d.toISOString().slice(0, 10)
}

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function saveToStorage(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // ignore
  }
}

const StudyPlanContext = createContext(null)

export function StudyPlanProvider({ children }) {
  const saved = loadFromStorage()

  const [subjects, setSubjects] = useState(saved?.subjects ?? [])
  const [dailyHours, setDailyHours] = useState(saved?.dailyHours ?? 2)
  const [todayHours, setTodayHours] = useState(saved?.todayHours ?? saved?.dailyHours ?? 2)
  const [sessions, setSessions] = useState(saved?.sessions ?? [])
  const [hasPlan, setHasPlan] = useState(saved?.hasPlan ?? false)
  const [resumeAnalysis, setResumeAnalysis] = useState(saved?.resumeAnalysis ?? null)
  const [quizStats, setQuizStats] = useState(
    saved?.quizStats ?? { averagePercent: 82, lastScore: null, totalQuizzes: 0 },
  )

  const snapshot = useCallback(
    (overrides = {}) => ({
      subjects,
      dailyHours,
      todayHours,
      sessions,
      hasPlan,
      resumeAnalysis,
      quizStats,
      ...overrides,
    }),
    [subjects, dailyHours, todayHours, sessions, hasPlan, resumeAnalysis, quizStats],
  )

  const persist = useCallback(
    (next) => {
      saveToStorage(next)
    },
    [],
  )

  const generatePlan = useCallback(
    (subjectList, hours) => {
      const plan = generateStudyPlan(subjectList, hours)
      const next = snapshot({
        subjects: subjectList,
        dailyHours: hours,
        todayHours: hours,
        sessions: plan,
        hasPlan: plan.length > 0,
      })
      setSubjects(subjectList)
      setDailyHours(hours)
      setTodayHours(hours)
      setSessions(plan)
      setHasPlan(plan.length > 0)
      persist(next)
      return plan
    },
    [snapshot, persist],
  )

  const regenerateTodayPlan = useCallback(() => {
    if (subjects.length === 0) return
    const plan = generateStudyPlan(subjects, todayHours)
    const next = snapshot({ sessions: plan, hasPlan: plan.length > 0 })
    setSessions(plan)
    setHasPlan(plan.length > 0)
    persist(next)
  }, [subjects, todayHours, snapshot, persist])

  const toggleSessionComplete = useCallback(
    (sessionId) => {
      setSessions((prev) => {
        const updated = prev.map((s) =>
          s.id === sessionId ? { ...s, completed: !s.completed } : s,
        )
        persist(snapshot({ sessions: updated }))
        return updated
      })
    },
    [snapshot, persist],
  )

  const loadDemoData = useCallback(() => {
    setSubjects(DEMO_SUBJECTS)
    setDailyHours(DEMO_DAILY_HOURS)
    setTodayHours(DEMO_DAILY_HOURS)
  }, [])

  const resetPlan = useCallback(() => {
    setSubjects([])
    setDailyHours(2)
    setTodayHours(2)
    setSessions([])
    setHasPlan(false)
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  const addWeakTopicToPlan = useCallback(
    (subjectName, topicName) => {
      setSubjects((prev) => {
        let updated = [...prev]
        const idx = updated.findIndex((s) => s.name.toLowerCase() === subjectName.toLowerCase())

        if (idx >= 0) {
          const subj = updated[idx]
          const topicIdx = subj.topics.findIndex(
            (t) => t.name.toLowerCase() === topicName.toLowerCase(),
          )
          if (topicIdx >= 0) {
            subj.topics = subj.topics.map((t, i) =>
              i === topicIdx ? { ...t, isWeak: true } : t,
            )
          } else {
            subj.topics = [
              ...subj.topics,
              { id: `t-${Date.now()}`, name: topicName, isWeak: true },
            ]
          }
          updated[idx] = { ...subj }
        } else {
          updated = [
            ...updated,
            {
              id: `sub-${Date.now()}`,
              name: subjectName,
              deadline: defaultDeadline(),
              topics: [{ id: `t-${Date.now()}`, name: topicName, isWeak: true }],
            },
          ]
        }

        if (hasPlan) {
          const plan = generateStudyPlan(updated, todayHours)
          setSessions(plan)
          persist(snapshot({ subjects: updated, sessions: plan, hasPlan: plan.length > 0 }))
        } else {
          persist(snapshot({ subjects: updated }))
        }
        return updated
      })
    },
    [hasPlan, todayHours, snapshot, persist],
  )

  const addSkillsToStudyPlan = useCallback(
    (skills) => {
      skills.forEach((skill) => addWeakTopicToPlan('Career Skills', skill))
    },
    [addWeakTopicToPlan],
  )

  const saveResumeAnalysis = useCallback(
    (analysis) => {
      setResumeAnalysis(analysis)
      persist(snapshot({ resumeAnalysis: analysis }))
    },
    [snapshot, persist],
  )

  const saveQuizResult = useCallback(
    (result) => {
      setQuizStats((prev) => {
        const totalQuizzes = prev.totalQuizzes + 1
        const averagePercent = Math.round(
          (prev.averagePercent * prev.totalQuizzes + result.percent) / totalQuizzes,
        )
        const next = {
          averagePercent,
          lastScore: result,
          totalQuizzes,
        }
        persist(snapshot({ quizStats: next }))
        return next
      })
    },
    [snapshot, persist],
  )

  const completedCount = sessions.filter((s) => s.completed).length
  const totalCount = sessions.length

  const weakTopicCount = subjects.reduce(
    (acc, s) => acc + s.topics.filter((t) => t.isWeak).length,
    0,
  )

  const resumeScore = resumeAnalysis?.overallScore ?? MOCK_RESUME_ANALYSIS.overallScore

  return (
    <StudyPlanContext.Provider
      value={{
        subjects,
        setSubjects,
        dailyHours,
        setDailyHours,
        todayHours,
        setTodayHours,
        sessions,
        hasPlan,
        completedCount,
        totalCount,
        weakTopicCount,
        resumeAnalysis,
        resumeScore,
        quizStats,
        generatePlan,
        regenerateTodayPlan,
        toggleSessionComplete,
        loadDemoData,
        resetPlan,
        addWeakTopicToPlan,
        addSkillsToStudyPlan,
        saveResumeAnalysis,
        saveQuizResult,
      }}
    >
      {children}
    </StudyPlanContext.Provider>
  )
}

export function useStudyPlan() {
  const ctx = useContext(StudyPlanContext)
  if (!ctx) throw new Error('useStudyPlan must be used within StudyPlanProvider')
  return ctx
}
