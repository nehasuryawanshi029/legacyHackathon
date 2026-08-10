from typing import Dict, Any, List
from app.db.store import store
from app.schemas.schemas import ReadinessScore, InsightItem

class AtlantisIntelligenceEngine:
    @staticmethod
    def calculate_readiness_score() -> ReadinessScore:
        # 1. Academic Mastery
        topics = list(store.topics.values())
        avg_mastery = sum(t.mastery_pct for t in topics) / len(topics) if topics else 70.0
        
        # 2. Consistency Score
        completed_sessions = sum(1 for s in store.study_sessions if s.completed)
        total_sessions = len(store.study_sessions)
        consistency = round((completed_sessions / total_sessions * 100.0) if total_sessions > 0 else 80.0, 1)

        # 3. Deadline Health
        high_risk_assignments = sum(1 for a in store.assignments if a.risk_level == "HIGH")
        deadline_health = round(100.0 - (high_risk_assignments * 15.0), 1)

        # 4. Career Skills Score
        demonstrated_skills = len(store.resume_analysis.extracted_skills)
        target_gaps = len(store.skill_gaps)
        career_skills = round(min(100.0, (demonstrated_skills / (demonstrated_skills + target_gaps)) * 100.0), 1)

        overall = round((avg_mastery * 0.35) + (consistency * 0.20) + (deadline_health * 0.20) + (career_skills * 0.25), 1)

        reasons = [
            f"Academic Mastery is {avg_mastery:.0f}%: Weakness identified in Graph Algorithms & Dynamic Programming.",
            f"Consistency Score is {consistency:.0f}%: {completed_sessions} of {total_sessions} study sessions completed.",
            f"Deadline Health is {deadline_health:.0f}%: 1 assignment marked HIGH risk due in 2 days.",
            f"Career Skill Score is {career_skills:.0f}%: Target role '{store.profile.target_role}' needs FastAPI & Docker skills."
        ]

        return ReadinessScore(
            overall_score=overall,
            academic_mastery=round(avg_mastery, 1),
            consistency_score=consistency,
            deadline_health=deadline_health,
            career_skills_score=career_skills,
            breakdown_reasons=reasons
        )

    @staticmethod
    def detect_root_learning_gaps() -> List[Dict[str, Any]]:
        """Prerequisite tree root cause analysis."""
        gaps = []
        dp_topic = store.topics.get("t-dsa-3") # Dynamic Programming
        rec_topic = store.topics.get("t-dsa-4") # Recursion
        
        if dp_topic and dp_topic.is_weak:
            root_concept = rec_topic.name if (rec_topic and rec_topic.is_weak) else "Memoization Fundamentals"
            gaps.append({
                "target_weakness": "Dynamic Programming",
                "prerequisite_chain": ["Recursion Fundamentals", "Call Stack Visualization", "Memoization Cache", "Tabulation", "Dynamic Programming"],
                "root_cause_concept": root_concept,
                "diagnosis": "Struggles in DP stem from recursion stack tracing misconceptions. Mastering state transitions in recursion resolves DP bottlenecks.",
                "recommended_action": "Complete 3 Recursion Call-Stack exercises before returning to DP tabulation."
            })
        return gaps

    @staticmethod
    def generate_top_insights() -> List[InsightItem]:
        """Returns top 3-5 prioritized recommendations (WHAT, WHY, NEXT ACTION)."""
        readiness = AtlantisIntelligenceEngine.calculate_readiness_score()
        insights = []
        
        # High Risk Topic Insight
        weak_topics = [t for t in store.topics.values() if t.is_weak or t.risk_level == "HIGH"]
        if weak_topics:
            top_weak = sorted(weak_topics, key=lambda t: t.mastery_pct)[0]
            insights.append(InsightItem(
                id="ins-auto-1",
                category="ACADEMIC",
                what=f"Priority Revision: {top_weak.name}",
                why=f"Mastery is at {top_weak.mastery_pct:.0f}% (HIGH Risk). Critical for upcoming assessments.",
                next_action=f"Ask AI Tutor about {top_weak.name} -> Take 3-question Quiz.",
                priority_level="HIGH"
            ))

        # Career Skill Insight
        missing_skills = [s for s in store.skill_gaps if s.status == "MISSING"]
        if missing_skills:
            top_skill = missing_skills[0]
            insights.append(InsightItem(
                id="ins-auto-2",
                category="CAREER",
                what=f"Bridge Academic Knowledge with {top_skill.skill_name}",
                why=f"Target role '{store.profile.target_role}' requires {top_skill.skill_name}. Connects DBMS & ML theory to practical APIs.",
                next_action=f"View recommended project '{top_skill.recommended_project}' in Career Roadmap.",
                priority_level="HIGH"
            ))

        # Deadline Insight
        urgent_asg = [a for a in store.assignments if a.risk_level == "HIGH"]
        if urgent_asg:
            asg = urgent_asg[0]
            insights.append(InsightItem(
                id="ins-auto-3",
                category="DEADLINE",
                what=f"Urgent Task: {asg.title}",
                why=f"Due in 2 days with {asg.estimated_effort_hours}h estimated effort remaining.",
                next_action=f"Use AI Assignment Assistant to break down remaining subtasks.",
                priority_level="HIGH"
            ))

        return insights

    @staticmethod
    def get_academics_to_career_bridge() -> List[Dict[str, Any]]:
        return [
            {
                "academic_subject": "Database Management Systems (CS302)",
                "academic_topic": "SQL & Relational Schema Design",
                "career_skill": "FastAPI & PostgreSQL Backend Systems",
                "practical_project": "Production ML Inference API with Async PostgreSQL Logging",
                "resume_impact": "Adds 'Backend API Development' & 'Database Integration' to Resume",
                "target_role": "Machine Learning Engineer"
            },
            {
                "academic_subject": "Data Structures & Algorithms (CS301)",
                "academic_topic": "Graph Algorithms & Shortest Paths",
                "career_skill": "High-Performance Systems & Algorithm Benchmarking",
                "practical_project": "Distributed Pathfinding Visualizer & Microservice",
                "resume_impact": "Demonstrates algorithmic efficiency & optimization in real applications",
                "target_role": "Backend Engineer / Systems Architect"
            }
        ]

intelligence_engine = AtlantisIntelligenceEngine()
