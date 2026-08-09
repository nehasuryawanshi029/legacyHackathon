import { Routes, Route, Navigate } from 'react-router-dom'
import { AtlantisProvider } from './context/AtlantisContext'
import Sidebar from './components/layout/Sidebar'
import Header from './components/layout/Header'

import Dashboard from './pages/Dashboard'
import Syllabus from './pages/Syllabus'
import AITutor from './pages/AITutor'
import QuizEngine from './pages/QuizEngine'
import TideChart from './pages/TideChart'
import Assignments from './pages/Assignments'
import Notebook from './pages/Notebook'
import Progress from './pages/Progress'
import ResumeCareer from './pages/ResumeCareer'
import Resources from './pages/Resources'
import CalendarView from './pages/CalendarView'
import ExamMode from './pages/ExamMode'

export default function App() {
  return (
    <AtlantisProvider>
      <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Header />
          <main className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/syllabus" element={<Syllabus />} />
              <Route path="/tutor" element={<AITutor />} />
              <Route path="/quizzes" element={<QuizEngine />} />
              <Route path="/tide-chart" element={<TideChart />} />
              <Route path="/assignments" element={<Assignments />} />
              <Route path="/notebook" element={<Notebook />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="/resume" element={<ResumeCareer />} />
              <Route path="/career" element={<ResumeCareer />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/calendar" element={<CalendarView />} />
              <Route path="/exam-mode" element={<ExamMode />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </AtlantisProvider>
  )
}
