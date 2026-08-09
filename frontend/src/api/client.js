const API_BASE = 'http://localhost:8000/api'

export async function fetchApi(endpoint, options = {}) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })
    if (!res.ok) {
      throw new Error(`API error: ${res.statusText}`)
    }
    return await res.json()
  } catch (err) {
    console.warn(`API call failed for ${endpoint}, returning null fallback:`, err)
    return null
  }
}

export const api = {
  // Student Profile
  getProfile: () => fetchApi('/student/profile'),
  updateProfile: (data) => fetchApi('/student/profile', { method: 'PUT', body: JSON.stringify(data) }),

  // Syllabus & Topics
  getSubjects: () => fetchApi('/syllabus/subjects'),
  getTopics: () => fetchApi('/syllabus/topics'),
  addTopic: (subjectName, topicName, difficulty) =>
    fetchApi(`/syllabus/topics/add?subject_name=${encodeURIComponent(subjectName)}&topic_name=${encodeURIComponent(topicName)}&difficulty=${encodeURIComponent(difficulty)}`, { method: 'POST' }),

  // Tutor
  tutorChat: (topicName, query, mode) =>
    fetchApi('/tutor/chat', {
      method: 'POST',
      body: JSON.stringify({ topic_name: topicName, user_query: query, explanation_mode: mode }),
    }),

  // Quiz
  getQuizQuestions: (topicId) => fetchApi(`/quiz/questions/${topicId}`),
  submitQuiz: (subData) =>
    fetchApi('/quiz/submit', {
      method: 'POST',
      body: JSON.stringify(subData),
    }),

  // Planner / Tide-Chart
  getSessions: () => fetchApi('/planner/sessions'),
  toggleSessionComplete: (sessionId) => fetchApi(`/planner/toggle-complete/${sessionId}`, { method: 'POST' }),
  recalibrateTideChart: () => fetchApi('/planner/recalibrate', { method: 'POST' }),

  // Assignments
  getAssignments: () => fetchApi('/assignments'),
  createAssignment: (title, subject, dueDate, effortHours) =>
    fetchApi(`/assignments/add?title=${encodeURIComponent(title)}&subject=${encodeURIComponent(subject)}&due_date=${encodeURIComponent(dueDate)}&effort_hours=${effortHours}`, { method: 'POST' }),

  // Documents & Flashcards
  uploadDocumentText: async (filename, text) => {
    const formData = new FormData()
    const blob = new Blob([text], { type: 'text/plain' })
    formData.append('file', blob, filename)
    const res = await fetch(`${API_BASE}/documents/upload`, {
      method: 'POST',
      body: formData,
    })
    return res.json()
  },
  documentQA: (query, documentId = null) =>
    fetchApi('/documents/qa', {
      method: 'POST',
      body: JSON.stringify({ query, document_id: documentId }),
    }),
  getFlashcards: () => fetchApi('/documents/flashcards'),
  reviewFlashcard: (cardId, rating) => fetchApi(`/documents/flashcards/review/${cardId}?rating=${rating}`, { method: 'POST' }),

  // Progress & Readiness
  getReadinessScore: () => fetchApi('/progress/readiness'),
  getLearningGaps: () => fetchApi('/progress/gaps'),

  // Resume & Career
  getResumeAnalysis: () => fetchApi('/resume/analysis'),
  analyzeResumeText: (text) => {
    const formData = new FormData()
    formData.append('resume_text', text)
    return fetch(`${API_BASE}/resume/analyze`, { method: 'POST', body: formData }).then((r) => r.json())
  },
  getSkillGaps: () => fetchApi('/career/gaps'),
  getRoadmap: () => fetchApi('/career/roadmap'),
  getProjects: () => fetchApi('/career/projects'),
  getAcademicsBridge: () => fetchApi('/career/academics-bridge'),

  // Insights & Resources
  getInsights: () => fetchApi('/insights'),
  getResources: () => fetchApi('/resources'),
}
