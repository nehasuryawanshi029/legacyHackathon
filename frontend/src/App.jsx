import { Routes, Route } from 'react-router-dom'
import { StudyPlanProvider } from './context/StudyPlanContext'
import AtlanticBackground from './components/layout/AtlanticBackground'
import Navbar from './components/layout/Navbar'
import Home from './pages/Home'
import CreatePlan from './pages/CreatePlan'
import Dashboard from './pages/Dashboard'
import Quiz from './pages/Quiz'
import ResumeAnalyzer from './pages/ResumeAnalyzer'

export default function App() {
  return (
    <StudyPlanProvider>
      <AtlanticBackground>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreatePlan />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/resume" element={<ResumeAnalyzer />} />
        </Routes>
      </AtlanticBackground>
    </StudyPlanProvider>
  )
}
