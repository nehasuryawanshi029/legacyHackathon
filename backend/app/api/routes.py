from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from typing import List, Dict, Any, Optional
from app.db.store import store
from app.schemas.schemas import (
    StudentProfile, Subject, Topic, StudySession, Assignment,
    QuizQuestion, QuizSubmission, QuizAttemptResult, TutorMessageRequest,
    TutorResponse, GroundedQARequest, ReadinessScore, ResumeAnalysis,
    RoadmapStep, ProjectRecommendation, InsightItem, ResourceItem, Flashcard
)
from app.services.mastery_service import mastery_service
from app.services.tutor_service import tutor_service
from app.services.quiz_service import quiz_service
from app.services.document_service import document_service
from app.services.resume_service import resume_service
from app.services.intelligence_engine import intelligence_engine

router = APIRouter(prefix="/api")

# 1. Student Profile
@router.get("/student/profile", response_model=StudentProfile)
def get_student_profile():
    return store.profile

@router.put("/student/profile", response_model=StudentProfile)
def update_student_profile(profile: StudentProfile):
    store.profile = profile
    return store.profile

# 2. Syllabus & Topics
@router.get("/syllabus/subjects", response_model=List[Subject])
def get_subjects():
    return list(store.subjects.values())

@router.get("/syllabus/topics", response_model=List[Topic])
def get_topics():
    return list(store.topics.values())

@router.post("/syllabus/topics/add", response_model=Topic)
def add_topic(subject_name: str, topic_name: str, difficulty: str = "Medium"):
    # Find or create subject
    subj = None
    for s in store.subjects.values():
        if s.name.lower() == subject_name.lower():
            subj = s
            break
            
    if not subj:
        subj_id = f"s-{len(store.subjects)+1}"
        subj = Subject(id=subj_id, name=subject_name, code=f"CS{300+len(store.subjects)}", topics_count=0)
        store.subjects[subj_id] = subj

    topic_id = f"t-{len(store.topics)+1}"
    new_topic = Topic(
        id=topic_id,
        subject_id=subj.id,
        subject_name=subj.name,
        unit="Custom Unit",
        chapter="Custom Chapter",
        name=topic_name,
        difficulty=difficulty,
        importance="High",
        completion_pct=0.0,
        mastery_pct=30.0,
        confidence_pct=30.0,
        risk_level="HIGH",
        is_weak=True
    )
    store.topics[topic_id] = new_topic
    subj.topics.append(new_topic)
    subj.topics_count = len(subj.topics)

    # Recalculate study plan
    store.recalculate_tide_chart()
    return new_topic

# 3. Topic Mastery Engine
@router.get("/mastery/topics", response_model=List[Topic])
def get_topic_mastery():
    return list(store.topics.values())

# 4. AI Tutor ("Whispering Library")
@router.post("/tutor/chat", response_model=TutorResponse)
def tutor_chat(req: TutorMessageRequest):
    return tutor_service.generate_explanation(req)

@router.get("/tutor/history")
def get_tutor_history():
    return store.tutor_history

# 5. AI Quiz Engine
@router.get("/quiz/questions/{topic_id}", response_model=List[QuizQuestion])
def get_quiz_questions(topic_id: str):
    return quiz_service.get_questions_for_topic(topic_id)

@router.post("/quiz/submit", response_model=QuizAttemptResult)
def submit_quiz(sub: QuizSubmission):
    return quiz_service.submit_quiz(sub)

@router.get("/quiz/history", response_model=List[QuizAttemptResult])
def get_quiz_history():
    return store.quiz_attempts

# 6. Keeper's Tide-Chart / Study Planner
@router.get("/planner/sessions", response_model=List[StudySession])
def get_study_sessions():
    return store.study_sessions

@router.post("/planner/toggle-complete/{session_id}")
def toggle_session_complete(session_id: str):
    for s in store.study_sessions:
        if s.id == session_id:
            s.completed = not s.completed
            return {"status": "success", "completed": s.completed}
    raise HTTPException(status_code=404, detail="Session not found")

@router.post("/planner/recalibrate", response_model=List[StudySession])
def recalibrate_tide_chart():
    store.recalculate_tide_chart()
    return store.study_sessions

# 7. Assignment & Deadline Intelligence
@router.get("/assignments", response_model=List[Assignment])
def get_assignments():
    return store.assignments

@router.post("/assignments/add", response_model=Assignment)
def create_assignment(title: str, subject: str, due_date: str, effort_hours: float):
    new_asg = Assignment(
        id=f"asg-{len(store.assignments)+1}",
        title=title,
        description=f"Assignment for {subject}",
        subject=subject,
        due_date=due_date,
        estimated_effort_hours=effort_hours,
        progress_pct=0.0,
        priority="High",
        status="Pending",
        risk_level="HIGH" if effort_hours > 3.0 else "MEDIUM",
        subtasks=[
            {"id": "st-new-1", "title": "Understand requirements & background", "done": False},
            {"id": "st-new-2", "title": "Execute implementation / writing", "done": False},
            {"id": "st-new-3", "title": "Review & submit", "done": False}
        ],
        required_concepts=[subject]
    )
    store.assignments.append(new_asg)
    store.recalculate_tide_chart()
    return new_asg

# 8. Atlantis Notebook & RAG
@router.post("/documents/upload")
async def upload_document(file: UploadFile = File(...)):
    contents = await file.read()
    text = contents.decode("utf-8", errors="ignore") or f"Sample notes for {file.filename}"
    res = document_service.process_uploaded_document(file.filename, text)
    return res

@router.post("/documents/qa")
def document_qa(req: GroundedQARequest):
    return document_service.answer_grounded_question(req)

@router.get("/documents/flashcards", response_model=List[Flashcard])
def get_flashcards():
    return store.flashcards

@router.post("/documents/flashcards/review/{card_id}")
def review_flashcard(card_id: str, rating: str):
    for fc in store.flashcards:
        if fc.id == card_id:
            fc.review_count += 1
            if rating == "Easy":
                fc.status = "Known"
            elif rating == "Again":
                fc.status = "Difficult"
            return {"status": "updated", "card": fc}
    raise HTTPException(status_code=404, detail="Flashcard not found")

# 9. Progress & Atlantis Readiness Score
@router.get("/progress/readiness", response_model=ReadinessScore)
def get_readiness_score():
    return intelligence_engine.calculate_readiness_score()

@router.get("/progress/gaps")
def get_root_learning_gaps():
    return intelligence_engine.detect_root_learning_gaps()

# 10. Resume Intelligence & Skill Gaps
@router.get("/resume/analysis", response_model=ResumeAnalysis)
def get_resume_analysis():
    return store.resume_analysis

@router.post("/resume/analyze", response_model=ResumeAnalysis)
def analyze_resume(resume_text: str = Form(...)):
    return resume_service.analyze_resume(resume_text)

@router.get("/career/gaps")
def get_skill_gaps():
    return store.skill_gaps

# 11. Career Roadmap & Projects
@router.get("/career/roadmap", response_model=List[RoadmapStep])
def get_roadmap():
    return store.roadmap

@router.get("/career/projects", response_model=List[ProjectRecommendation])
def get_projects():
    return store.projects

@router.get("/career/academics-bridge")
def get_academics_to_career_bridge():
    return intelligence_engine.get_academics_to_career_bridge()

# 12. Insights & Resources
@router.get("/insights", response_model=List[InsightItem])
def get_insights():
    return intelligence_engine.generate_top_insights()

@router.get("/resources", response_model=List[ResourceItem])
def get_resources():
    return store.resources
