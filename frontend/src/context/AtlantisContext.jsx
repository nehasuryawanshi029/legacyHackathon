import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { api } from '../api/client'

const AtlantisContext = createContext(null)

export function AtlantisProvider({ children }) {
  const [profile, setProfile] = useState(null)
  const [subjects, setSubjects] = useState([])
  const [topics, setTopics] = useState([])
  const [sessions, setSessions] = useState([])
  const [assignments, setAssignments] = useState([])
  const [readiness, setReadiness] = useState(null)
  const [insights, setInsights] = useState([])
  const [flashcards, setFlashcards] = useState([])
  const [resumeAnalysis, setResumeAnalysis] = useState(null)
  const [skillGaps, setSkillGaps] = useState([])
  const [roadmap, setRoadmap] = useState([])
  const [projects, setProjects] = useState([])
  const [academicsBridge, setAcademicsBridge] = useState([])
  const [resources, setResources] = useState([])
  const [learningGaps, setLearningGaps] = useState([])

  const [loading, setLoading] = useState(true)
  const [lastSync, setLastSync] = useState(Date.now())
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const refreshAllState = useCallback(async () => {
    try {
      const [
        pData, sData, tData, sessData, asgData, rData, iData, fcData,
        resData, gapData, roadData, projData, bridgeData, resrcData, lgData
      ] = await Promise.all([
        api.getProfile(),
        api.getSubjects(),
        api.getTopics(),
        api.getSessions(),
        api.getAssignments(),
        api.getReadinessScore(),
        api.getInsights(),
        api.getFlashcards(),
        api.getResumeAnalysis(),
        api.getSkillGaps(),
        api.getRoadmap(),
        api.getProjects(),
        api.getAcademicsBridge(),
        api.getResources(),
        api.getLearningGaps(),
      ])

      if (pData) setProfile(pData)
      if (sData) setSubjects(sData)
      if (tData) setTopics(tData)
      if (sessData) setSessions(sessData)
      if (asgData) setAssignments(asgData)
      if (rData) setReadiness(rData)
      if (iData) setInsights(iData)
      if (fcData) setFlashcards(fcData)
      if (resData) setResumeAnalysis(resData)
      if (gapData) setSkillGaps(gapData)
      if (roadData) setRoadmap(roadData)
      if (projData) setProjects(projData)
      if (bridgeData) setAcademicsBridge(bridgeData)
      if (resrcData) setResources(resrcData)
      if (lgData) setLearningGaps(lgData)

      setLastSync(Date.now())
    } catch (err) {
      console.error('Failed to sync Atlantis state:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refreshAllState()
  }, [refreshAllState])

  const recalibrateTideChart = async () => {
    const newSessions = await api.recalibrateTideChart()
    if (newSessions) {
      setSessions(newSessions)
      refreshAllState()
    }
  }

  const toggleSessionComplete = async (sessionId) => {
    await api.toggleSessionComplete(sessionId)
    setSessions((prev) =>
      prev.map((s) => (s.id === sessionId ? { ...s, completed: !s.completed } : s))
    )
    refreshAllState()
  }

  const handleQuizSubmitted = async (result) => {
    // Immediate refresh across all state when a quiz is submitted
    await refreshAllState()
  }

  return (
    <AtlantisContext.Provider
      value={{
        profile,
        subjects,
        topics,
        sessions,
        assignments,
        readiness,
        insights,
        flashcards,
        resumeAnalysis,
        skillGaps,
        roadmap,
        projects,
        academicsBridge,
        resources,
        learningGaps,
        loading,
        lastSync,
        mobileMenuOpen,
        setMobileMenuOpen,
        refreshAllState,
        recalibrateTideChart,
        toggleSessionComplete,
        handleQuizSubmitted,
      }}
    >
      {children}
    </AtlantisContext.Provider>
  )
}

export function useAtlantis() {
  const ctx = useContext(AtlantisContext)
  if (!ctx) throw new Error('useAtlantis must be used within AtlantisProvider')
  return ctx
}
