from typing import Dict, Any
from app.db.store import store
from app.schemas.schemas import ResumeAnalysis

class ResumeService:
    @staticmethod
    def analyze_resume(resume_text: str = "") -> ResumeAnalysis:
        # If user provides custom resume text, parse or update analysis
        text_lower = resume_text.lower()
        
        extracted = ["Python", "SQL", "Machine Learning", "Scikit-Learn", "Git"]
        if "react" in text_lower:
            extracted.append("React")
        if "java" in text_lower:
            extracted.append("Java")
            
        missing = ["FastAPI", "Docker", "Cloud (AWS/GCP)", "MLOps"]
        claimed_not_demo = ["Deep Learning (listed under skills, but missing project evidence)"]
        
        analysis = ResumeAnalysis(
            overall_score=74.0,
            ats_score=70.0,
            extracted_skills=extracted,
            strengths=[
                "Strong foundational programming skills in Python & SQL",
                "Demonstrated academic coursework in Data Structures & Machine Learning",
                "Clean structural formatting suitable for ATS scanners"
            ],
            weaknesses=[
                "Lacks industry standard backend framework (FastAPI/Flask)",
                "No containerization (Docker) or CI/CD deployment pipelines",
                "Missing cloud platform exposure (AWS/GCP)"
            ],
            claimed_not_demonstrated=claimed_not_demo,
            missing_skills=missing
        )

        store.resume_analysis = analysis
        return analysis

resume_service = ResumeService()
