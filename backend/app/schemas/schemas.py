from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class StudentProfile(BaseModel):
    id: str = "std-001"
    name: str = "Alex Chen"
    student_type: str = "College"
    school_college: str = "Tech University of Science"
    course: str = "B.Tech Computer Science & Engineering"
    year_class: str = "3rd Year"
    academic_goals: List[str] = ["Maintain 3.8+ GPA", "Master Core CS Concepts", "Pass GATE/GRE Exam"]
    career_interests: List[str] = ["Machine Learning Engineer", "AI Researcher", "Backend Developer"]
    target_role: str = "Machine Learning Engineer"
    available_study_hours: float = 3.5
    preferred_study_time: str = "Evening (6 PM - 10 PM)"
    learning_preferences: List[str] = ["Visual Diagrams", "Hands-on Projects", "Interactive Quizzes"]

class Topic(BaseModel):
    id: str
    subject_id: str
    subject_name: str
    unit: str
    chapter: str
    name: str
    subtopics: List[str] = []
    difficulty: str = "Medium"
    importance: str = "High"
    completion_pct: float = 0.0
    mastery_pct: float = 0.0
    confidence_pct: float = 0.0
    risk_level: str = "LOW"
    is_weak: bool = False
    last_assessed: Optional[str] = None
    next_review: Optional[str] = None
    prerequisites: List[str] = []

class Subject(BaseModel):
    id: str
    name: str
    code: str
    topics_count: int = 0
    avg_mastery: float = 0.0
    completion: float = 0.0
    topics: List[Topic] = []

class StudySession(BaseModel):
    id: str
    subject_name: str
    topic_name: str
    duration_minutes: int = 45
    priority: int = 1
    priority_reason: str = "Weak topic with high risk"
    expected_outcome: str = "Master core concepts and pass practice quiz"
    completed: bool = False
    scheduled_date: str = ""
    time_slot: str = "18:00 - 18:45"

class Assignment(BaseModel):
    id: str
    title: str
    description: str
    subject: str
    due_date: str
    estimated_effort_hours: float
    progress_pct: float = 0.0
    priority: str = "High"
    status: str = "In Progress"
    risk_level: str = "MEDIUM"
    subtasks: List[Dict[str, Any]] = []
    required_concepts: List[str] = []

class QuizQuestion(BaseModel):
    id: str
    topic_id: str
    topic_name: str
    question_type: str = "MCQ"
    question: str
    options: Optional[List[str]] = None
    correct_answer: str
    explanation: str
    difficulty: str = "Medium"

class QuizSubmission(BaseModel):
    quiz_id: str
    topic_id: str
    topic_name: str
    answers: Dict[str, str]

class QuizAttemptResult(BaseModel):
    attempt_id: str
    topic_id: str
    topic_name: str
    score_pct: float
    total_questions: int
    correct_count: int
    mistake_patterns: List[str]
    new_mastery_pct: float
    new_risk_level: str
    mastery_change: float
    feedback: str
    timestamp: str

class TutorMessageRequest(BaseModel):
    topic_name: str
    user_query: str
    explanation_mode: str = "Detailed"

class TutorResponse(BaseModel):
    message_id: str
    tutor_reply: str
    detected_misconception: Optional[str] = None
    suggested_practice: Optional[str] = None
    updated_confidence_signal: str = "MODERATE"
    explanation_mode: str

class DocumentUploadResponse(BaseModel):
    document_id: str
    filename: str
    summary: str
    chunk_count: int
    extracted_concepts: List[str]
    flashcards_generated: int

class GroundedQARequest(BaseModel):
    document_id: Optional[str] = None
    query: str

class Flashcard(BaseModel):
    id: str
    topic_name: str
    front: str
    back: str
    status: str = "Learning"
    review_count: int = 0
    last_reviewed: Optional[str] = None

class FlashcardReviewRequest(BaseModel):
    flashcard_id: str
    rating: str

class ReadinessScore(BaseModel):
    overall_score: float = 75.0
    academic_mastery: float = 68.0
    consistency_score: float = 82.0
    deadline_health: float = 78.0
    career_skills_score: float = 64.0
    breakdown_reasons: List[str] = []

class SkillGap(BaseModel):
    skill_name: str
    current_proficiency: str
    target_proficiency: str = "STRONG"
    status: str = "MISSING"
    priority: str = "HIGH"
    reason: str = "Required for target role: Machine Learning Engineer"
    recommended_project: str = "Build FastAPI Inference Server with Docker"

class ResumeAnalysis(BaseModel):
    overall_score: float = 72.0
    ats_score: float = 68.0
    extracted_skills: List[str] = ["Python", "SQL", "Machine Learning", "Scikit-Learn", "Git"]
    strengths: List[str] = ["Solid Python foundation", "Good academic projects in ML", "Strong Database knowledge"]
    weaknesses: List[str] = ["Missing API framework (FastAPI/Flask)", "No containerization (Docker) evidence", "Missing MLOps/Deployment"]
    claimed_not_demonstrated: List[str] = ["Deep Learning (listed in skills, but no project evidence)"]
    missing_skills: List[str] = ["FastAPI", "Docker", "Cloud (AWS/GCP)", "MLOps"]

class RoadmapStep(BaseModel):
    step_number: int
    skill_name: str
    why_it_matters: str
    prerequisites: List[str]
    resources: List[str]
    project_application: str
    estimated_hours: int
    completed: bool = False

class ProjectRecommendation(BaseModel):
    id: str
    title: str
    description: str
    target_career: str
    skills_addressed: List[str]
    academic_subject_connection: str
    difficulty: str
    estimated_duration: str

class InsightItem(BaseModel):
    id: str
    category: str
    what: str
    why: str
    next_action: str
    priority_level: str

class ResourceItem(BaseModel):
    id: str
    title: str
    type: str
    link: str
    topic_name: str
    skill_tag: str
    saved: bool = False
    completed: bool = False
