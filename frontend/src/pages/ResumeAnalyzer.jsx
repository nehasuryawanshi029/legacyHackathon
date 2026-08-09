import { useState } from 'react'
import { FileSearch } from 'lucide-react'
import PageShell from '../components/layout/PageShell'
import ResumeUploader from '../components/resume/ResumeUploader'
import ResumeScore from '../components/resume/ResumeScore'
import ResumeSectionScore from '../components/resume/ResumeSectionScore'
import SkillAnalysis from '../components/resume/SkillAnalysis'
import ATSAnalysis from '../components/resume/ATSAnalysis'
import ImprovementSuggestions from '../components/resume/ImprovementSuggestions'
import { buildMockAnalysis } from '../data/resumeData'
import { useStudyPlan } from '../context/StudyPlanContext'

export default function ResumeAnalyzer() {
  const { saveResumeAnalysis, addSkillsToStudyPlan, resumeAnalysis } = useStudyPlan()
  const [file, setFile] = useState(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState(resumeAnalysis)
  const [addedSkills, setAddedSkills] = useState([])

  const handleAnalyze = () => {
    if (!file) return
    setAnalyzing(true)
    setTimeout(() => {
      const result = buildMockAnalysis(file.name)
      setAnalysis(result)
      saveResumeAnalysis(result)
      setAnalyzing(false)
    }, 1500)
  }

  const handleAddSkill = (skill) => {
    addSkillsToStudyPlan([skill])
    setAddedSkills((prev) => [...prev, skill])
  }

  return (
    <PageShell>
      <div className="mb-6 rounded-2xl atlantic-surface px-5 py-5 shadow-xl">
        <div className="flex items-center gap-2 text-surface">
          <FileSearch className="h-4 w-4 text-coral" />
          <p className="text-xs font-semibold uppercase tracking-[0.2em]">Resume Analyzer</p>
        </div>
        <h1 className="font-display mt-1 text-2xl font-bold text-pearl sm:text-3xl">
          ATS & Skill Analysis
        </h1>
        <p className="mt-1 text-sm text-foam/90">
          Upload your resume — identify gaps and bridge them to your study plan.
        </p>
      </div>

      {!analysis && (
        <ResumeUploader
          file={file}
          onFileSelect={setFile}
          onRemove={() => setFile(null)}
          onAnalyze={handleAnalyze}
          analyzing={analyzing}
        />
      )}

      {analysis && (
        <div className="space-y-4">
          <div className="atlantic-card rounded-2xl p-6">
            <ResumeScore score={analysis.overallScore} />
          </div>

          <div>
            <h2 className="font-display page-heading mb-3 text-lg font-semibold">Section Analysis</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {analysis.sections.map((s) => (
                <ResumeSectionScore key={s.name} {...s} />
              ))}
            </div>
          </div>

          <ATSAnalysis
            compatibility={analysis.ats.compatibility}
            issues={analysis.ats.issues}
          />

          <SkillAnalysis
            detected={analysis.ats.detectedSkills}
            missing={analysis.ats.missingSkills}
          />

          <ImprovementSuggestions
            suggestions={analysis.suggestions}
            missingSkills={analysis.ats.missingSkills}
            onAddSkill={handleAddSkill}
            addedSkills={addedSkills}
          />

          <button
            type="button"
            onClick={() => {
              setAnalysis(null)
              setFile(null)
            }}
            className="text-sm font-medium text-seafoam hover:text-pearl"
          >
            ← Analyze another resume
          </button>
        </div>
      )}
    </PageShell>
  )
}
