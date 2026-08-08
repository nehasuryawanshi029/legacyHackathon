import { createContext, useContext, useState, useCallback } from 'react'
import { DEMO_SUBJECTS, DEMO_DAILY_HOURS } from '../data/demoData'
import { generateStudyPlan } from '../data/planGenerator'

const STORAGE_KEY = 'keepers-tide-chart-plan'

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
    // ignore storage errors
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

  const persist = useCallback((next) => {
    saveToStorage(next)
  }, [])

  const generatePlan = useCallback(
    (subjectList, hours) => {
      const plan = generateStudyPlan(subjectList, hours)
      const next = {
        subjects: subjectList,
        dailyHours: hours,
        todayHours: hours,
        sessions: plan,
        hasPlan: plan.length > 0,
      }
      setSubjects(subjectList)
      setDailyHours(hours)
      setTodayHours(hours)
      setSessions(plan)
      setHasPlan(plan.length > 0)
      persist(next)
      return plan
    },
    [persist],
  )

  const regenerateTodayPlan = useCallback(() => {
    if (subjects.length === 0) return
    const plan = generateStudyPlan(subjects, todayHours)
    const next = { subjects, dailyHours, todayHours, sessions: plan, hasPlan: plan.length > 0 }
    setSessions(plan)
    setHasPlan(plan.length > 0)
    persist(next)
  }, [subjects, dailyHours, todayHours, persist])

  const toggleSessionComplete = useCallback(
    (sessionId) => {
      setSessions((prev) => {
        const updated = prev.map((s) =>
          s.id === sessionId ? { ...s, completed: !s.completed } : s,
        )
        persist({ subjects, dailyHours, todayHours, sessions: updated, hasPlan })
        return updated
      })
    },
    [subjects, dailyHours, todayHours, hasPlan, persist],
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

  const completedCount = sessions.filter((s) => s.completed).length
  const totalCount = sessions.length

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
        generatePlan,
        regenerateTodayPlan,
        toggleSessionComplete,
        loadDemoData,
        resetPlan,
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
