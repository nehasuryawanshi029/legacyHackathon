export const MOCK_RESUME_ANALYSIS = {
  overallScore: 82,
  sections: [
    { name: 'Education', score: 88, status: 'Strong', feedback: 'Clear degree details and relevant coursework listed.' },
    { name: 'Technical Skills', score: 92, status: 'Excellent', feedback: 'Strong stack coverage aligned with software roles.' },
    { name: 'Projects', score: 78, status: 'Good', feedback: 'Good variety but descriptions lack measurable impact.' },
    { name: 'Experience', score: 65, status: 'Needs Work', feedback: 'Internship bullets need stronger action verbs and metrics.' },
    { name: 'Certifications', score: 70, status: 'Fair', feedback: 'Add 1–2 industry certifications to boost credibility.' },
  ],
  ats: {
    compatibility: 82,
    detectedSkills: ['Java', 'Python', 'React', 'SQL', 'Spring Boot', 'Git'],
    missingSkills: ['Docker', 'AWS', 'System Design'],
    issues: [
      'Project descriptions could use measurable results',
      'Missing GitHub links for key projects',
      'Skills section could be better organized by category',
    ],
  },
  suggestions: [
    'Add measurable results to your project descriptions (e.g. "Reduced load time by 30%").',
    'Highlight relevant technical skills near the top of your resume.',
    'Add links to GitHub and live project demos.',
    'Reduce unnecessary text — aim for concise, scannable bullets.',
    'Use stronger action verbs: built, optimized, deployed, automated.',
  ],
}

export function buildMockAnalysis(fileName) {
  const base = { ...MOCK_RESUME_ANALYSIS, fileName }
  if (fileName?.toLowerCase().includes('resume')) {
    return base
  }
  return {
    ...base,
    overallScore: 76,
    ats: {
      ...base.ats,
      compatibility: 74,
    },
  }
}
