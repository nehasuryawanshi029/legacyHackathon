from typing import Dict, List, Any, Optional
import time
from datetime import datetime, timedelta
from app.schemas.schemas import (
    StudentProfile, Subject, Topic, StudySession, Assignment,
    QuizQuestion, QuizAttemptResult, TutorResponse, DocumentUploadResponse,
    Flashcard, ReadinessScore, ResumeAnalysis, SkillGap, RoadmapStep,
    ProjectRecommendation, InsightItem, ResourceItem
)

# Central Store representing Supabase/PostgreSQL database state
class AtlantisStore:
    def __init__(self):
        self.profile = StudentProfile()
        self.subjects: Dict[str, Subject] = {}
        self.topics: Dict[str, Topic] = {}
        self.study_sessions: List[StudySession] = []
        self.assignments: List[Assignment] = []
        self.quiz_questions: Dict[str, List[QuizQuestion]] = {} # topic_id -> questions
        self.quiz_attempts: List[QuizAttemptResult] = []
        self.tutor_history: List[Dict[str, Any]] = []
        self.documents: List[Dict[str, Any]] = []
        self.flashcards: List[Flashcard] = []
        self.resume_analysis = ResumeAnalysis()
        self.skill_gaps: List[SkillGap] = []
        self.roadmap: List[RoadmapStep] = []
        self.projects: List[ProjectRecommendation] = []
        self.resources: List[ResourceItem] = []
        self.insights: List[InsightItem] = []
        
        self._seed_demo_data()

    def _seed_demo_data(self):
        # 1. Subjects & Topics (Demo Student context: B.Tech Computer Science)
        dsa_topics = [
            Topic(
                id="t-dsa-1", subject_id="s-dsa", subject_name="Data Structures & Algorithms",
                unit="Unit 1", chapter="Basic Structures", name="Arrays & Linked Lists",
                subtopics=["Singly Linked List", "Doubly Linked List", "Array Rotations"],
                difficulty="Easy", importance="High", completion_pct=100.0, mastery_pct=85.0,
                confidence_pct=90.0, risk_level="LOW", is_weak=False, last_assessed="2026-08-01"
            ),
            Topic(
                id="t-dsa-2", subject_id="s-dsa", subject_name="Data Structures & Algorithms",
                unit="Unit 2", chapter="Trees & Graphs", name="Graph Algorithms",
                subtopics=["BFS", "DFS", "Dijkstra's Algorithm", "Bellman-Ford", "Minimum Spanning Tree"],
                difficulty="Hard", importance="High", completion_pct=80.0, mastery_pct=45.0,
                confidence_pct=40.0, risk_level="HIGH", is_weak=True, last_assessed="2026-08-05",
                prerequisites=["Trees", "Queue Data Structure"]
            ),
            Topic(
                id="t-dsa-3", subject_id="s-dsa", subject_name="Data Structures & Algorithms",
                unit="Unit 3", chapter="Algorithmic Paradigms", name="Dynamic Programming",
                subtopics=["Memoization", "Tabulation", "0/1 Knapsack", "LCS"],
                difficulty="Hard", importance="High", completion_pct=70.0, mastery_pct=42.0,
                confidence_pct=35.0, risk_level="HIGH", is_weak=True, last_assessed="2026-08-03",
                prerequisites=["Recursion", "Memoization"]
            ),
            Topic(
                id="t-dsa-4", subject_id="s-dsa", subject_name="Data Structures & Algorithms",
                unit="Unit 4", chapter="Algorithmic Paradigms", name="Recursion Fundamentals",
                subtopics=["Call Stack", "Base Cases", "Tree Recursion"],
                difficulty="Medium", importance="High", completion_pct=90.0, mastery_pct=58.0,
                confidence_pct=60.0, risk_level="MEDIUM", is_weak=True, last_assessed="2026-08-02"
            )
        ]
        
        dbms_topics = [
            Topic(
                id="t-dbms-1", subject_id="s-dbms", subject_name="Database Management Systems",
                unit="Unit 1", chapter="Relational Model", name="SQL & Relational Algebra",
                subtopics=["Joins", "Group By", "Subqueries", "Relational Calculus"],
                difficulty="Medium", importance="High", completion_pct=95.0, mastery_pct=88.0,
                confidence_pct=90.0, risk_level="LOW", is_weak=False, last_assessed="2026-08-04"
            ),
            Topic(
                id="t-dbms-2", subject_id="s-dbms", subject_name="Database Management Systems",
                unit="Unit 2", chapter="Transactions", name="ACID Properties & Concurrency",
                subtopics=["2PL", "Deadlocks", "Isolation Levels", "WAL Log"],
                difficulty="Hard", importance="High", completion_pct=75.0, mastery_pct=65.0,
                confidence_pct=70.0, risk_level="MEDIUM", is_weak=False, last_assessed="2026-08-02"
            ),
            Topic(
                id="t-dbms-3", subject_id="s-dbms", subject_name="Database Management Systems",
                unit="Unit 3", chapter="Normal Forms", name="Normalization (1NF - BCNF)",
                subtopics=["Functional Dependencies", "3NF", "BCNF Decomposition"],
                difficulty="Medium", importance="Medium", completion_pct=85.0, mastery_pct=78.0,
                confidence_pct=80.0, risk_level="LOW", is_weak=False
            )
        ]

        os_topics = [
            Topic(
                id="t-os-1", subject_id="s-os", subject_name="Operating Systems",
                unit="Unit 1", chapter="Process Management", name="CPU Scheduling Algorithms",
                subtopics=["Round Robin", "SJF", "Priority Scheduling", "Multilevel Queue"],
                difficulty="Medium", importance="High", completion_pct=60.0, mastery_pct=48.0,
                confidence_pct=50.0, risk_level="HIGH", is_weak=True, last_assessed="2026-07-28"
            ),
            Topic(
                id="t-os-2", subject_id="s-os", subject_name="Operating Systems",
                unit="Unit 2", chapter="Memory Management", name="Virtual Memory & Paging",
                subtopics=["Page Faults", "TLB", "LRU Page Replacement"],
                difficulty="Hard", importance="High", completion_pct=80.0, mastery_pct=72.0,
                confidence_pct=75.0, risk_level="LOW"
            )
        ]

        ml_topics = [
            Topic(
                id="t-ml-1", subject_id="s-ml", subject_name="Machine Learning",
                unit="Unit 1", chapter="Supervised Learning", name="Linear & Logistic Regression",
                subtopics=["Gradient Descent", "Cost Function", "Regularization L1/L2"],
                difficulty="Medium", importance="High", completion_pct=90.0, mastery_pct=82.0,
                confidence_pct=85.0, risk_level="LOW"
            ),
            Topic(
                id="t-ml-2", subject_id="s-ml", subject_name="Machine Learning",
                unit="Unit 2", chapter="Model Evaluation", name="Cross Validation & Metrics",
                subtopics=["Precision-Recall", "ROC-AUC", "Confusion Matrix", "F1 Score"],
                difficulty="Medium", importance="High", completion_pct=85.0, mastery_pct=80.0,
                confidence_pct=85.0, risk_level="LOW"
            )
        ]

        self.subjects["s-dsa"] = Subject(id="s-dsa", name="Data Structures & Algorithms", code="CS301", topics_count=4, avg_mastery=62.5, completion=85.0, topics=dsa_topics)
        self.subjects["s-dbms"] = Subject(id="s-dbms", name="Database Management Systems", code="CS302", topics_count=3, avg_mastery=77.0, completion=85.0, topics=dbms_topics)
        self.subjects["s-os"] = Subject(id="s-os", name="Operating Systems", code="CS303", topics_count=2, avg_mastery=60.0, completion=70.0, topics=os_topics)
        self.subjects["s-ml"] = Subject(id="s-ml", name="Machine Learning", code="CS304", topics_count=2, avg_mastery=81.0, completion=87.5, topics=ml_topics)

        for s in self.subjects.values():
            for t in s.topics:
                self.topics[t.id] = t

        # 2. Quiz Questions Setup
        self.quiz_questions["t-dsa-2"] = [
            QuizQuestion(
                id="q-g1", topic_id="t-dsa-2", topic_name="Graph Algorithms",
                question_type="MCQ", difficulty="Medium",
                question="What is the time complexity of Dijkstra's algorithm using a Min-Priority Queue?",
                options=["O(V^2)", "O((V + E) log V)", "O(V * E)", "O(E log E)"],
                correct_answer="O((V + E) log V)",
                explanation="Dijkstra's algorithm with a Fibonacci heap or binary min-heap runs in O((V + E) log V) time where V is vertices and E is edges."
            ),
            QuizQuestion(
                id="q-g2", topic_id="t-dsa-2", topic_name="Graph Algorithms",
                question_type="MCQ", difficulty="Hard",
                question="Which algorithm can find single-source shortest paths in graphs with negative edge weights?",
                options=["Dijkstra's Algorithm", "Bellman-Ford Algorithm", "Kruskal's Algorithm", "Floyd-Warshall Algorithm"],
                correct_answer="Bellman-Ford Algorithm",
                explanation="Bellman-Ford can handle negative weight edges and detect negative weight cycles in O(V * E) time."
            ),
            QuizQuestion(
                id="q-g3", topic_id="t-dsa-2", topic_name="Graph Algorithms",
                question_type="TrueFalse", difficulty="Easy",
                question="BFS (Breadth-First Search) finds the shortest path in an unweighted graph.",
                options=["True", "False"],
                correct_answer="True",
                explanation="In an unweighted graph, BFS explores level by level, guaranteeing shortest path in terms of number of edges."
            )
        ]

        self.quiz_questions["t-dsa-3"] = [
            QuizQuestion(
                id="q-dp1", topic_id="t-dsa-3", topic_name="Dynamic Programming",
                question_type="MCQ", difficulty="Medium",
                question="What are the two key properties required for a problem to be solvable by Dynamic Programming?",
                options=[
                    "Greedy Choice Property & Optimal Substructure",
                    "Overlapping Subproblems & Optimal Substructure",
                    "Divide and Conquer & Linear Scanning",
                    "Stack Overhead & Tail Recursion"
                ],
                correct_answer="Overlapping Subproblems & Optimal Substructure",
                explanation="DP requires overlapping subproblems so cached sub-results are reused, and optimal substructure so optimal local choices form optimal global solutions."
            )
        ]

        # 3. Assignments
        today_date = datetime.now()
        self.assignments = [
            Assignment(
                id="asg-1", title="Graph Shortest Path Implementation",
                description="Implement Dijkstra and Bellman-Ford algorithms in Python with performance benchmarking.",
                subject="Data Structures & Algorithms",
                due_date=(today_date + timedelta(days=2)).strftime("%Y-%m-%d"),
                estimated_effort_hours=4.0, progress_pct=25.0, priority="High",
                status="In Progress", risk_level="HIGH",
                subtasks=[
                    {"id": "st-1", "title": "Setup graph data structure", "done": True},
                    {"id": "st-2", "title": "Implement Min-Heap Priority Queue", "done": False},
                    {"id": "st-3", "title": "Implement Dijkstra logic & handle unreachable nodes", "done": False},
                    {"id": "st-4", "title": "Write unit tests & runtime comparisons", "done": False}
                ],
                required_concepts=["Graph Representations", "Min-Heap", "Dijkstra's Algorithm"]
            ),
            Assignment(
                id="asg-2", title="DBMS Normalization & SQL Queries Lab",
                description="Normalize given messy schema to 3NF/BCNF and write complex analytics SQL queries.",
                subject="Database Management Systems",
                due_date=(today_date + timedelta(days=6)).strftime("%Y-%m-%d"),
                estimated_effort_hours=3.0, progress_pct=50.0, priority="Medium",
                status="In Progress", risk_level="MEDIUM",
                subtasks=[
                    {"id": "st-21", "title": "Analyze 1NF/2NF violations", "done": True},
                    {"id": "st-22", "title": "Decompose tables into 3NF", "done": True},
                    {"id": "st-23", "title": "Execute analytical GROUP BY queries", "done": False}
                ],
                required_concepts=["Functional Dependencies", "BCNF", "SQL Window Functions"]
            )
        ]

        # 4. Skill Gaps for Career Goal: Machine Learning Engineer
        self.skill_gaps = [
            SkillGap(skill_name="FastAPI", current_proficiency="MISSING", status="MISSING", priority="HIGH", reason="Essential backend API framework for ML model deployment", recommended_project="Build FastAPI ML Inference Microservice"),
            SkillGap(skill_name="Docker", current_proficiency="MISSING", status="MISSING", priority="HIGH", reason="Industry standard for containerizing applications & ML pipelines", recommended_project="Containerize ML API with Docker multi-stage build"),
            SkillGap(skill_name="Cloud (AWS/GCP)", current_proficiency="MISSING", status="MISSING", priority="MEDIUM", reason="Production deployment and cloud storage/compute", recommended_project="Deploy API to AWS ECS / Cloud Run"),
            SkillGap(skill_name="MLOps & Tracking", current_proficiency="MISSING", status="MISSING", priority="MEDIUM", reason="Model versioning and experiment monitoring", recommended_project="Add MLflow experiment tracking to inference pipeline")
        ]

        # 5. Career Roadmap
        self.roadmap = [
            RoadmapStep(step_number=1, skill_name="FastAPI Fundamentals", why_it_matters="Build high performance asynchronous REST endpoints for models", prerequisites=["Python AsyncIO", "Pydantic"], resources=["FastAPI Official Docs", "RealPython API Guide"], project_application="Create dynamic web endpoints returning predictions", estimated_hours=8, completed=False),
            RoadmapStep(step_number=2, skill_name="Build Production ML Inference API", why_it_matters="Connect academic Machine Learning models with practical API services", prerequisites=["Python ML", "FastAPI"], resources=["ML API Best Practices", "Scikit-Learn Pickling"], project_application="Deploy trained sentiment model via POST /predict", estimated_hours=12, completed=False),
            RoadmapStep(step_number=3, skill_name="Docker Containerization", why_it_matters="Ensure consistent execution environment across dev and production", prerequisites=["Linux CLI", "FastAPI"], resources=["Docker Official Walkthrough", "Dockerfile Optimization"], project_application="Write Dockerfile and docker-compose.yml for backend & DB", estimated_hours=10, completed=False),
            RoadmapStep(step_number=4, skill_name="Cloud Deployment & Monitoring", why_it_matters="Expose live API URL to recruiters & monitor latency", prerequisites=["Docker"], resources=["AWS ECS Free Tier Guide"], project_application="Host container on AWS/Render with health checks", estimated_hours=14, completed=False)
        ]

        # 6. Projects Recommendation
        self.projects = [
            ProjectRecommendation(
                id="proj-1",
                title="Production ML Model API with FastAPI & Docker",
                description="Build and containerize a modern ML inference microservice complete with database logging in PostgreSQL and automated documentation.",
                target_career="Machine Learning Engineer",
                skills_addressed=["FastAPI", "Docker", "PostgreSQL", "REST APIs", "ML Deployment"],
                academic_subject_connection="Connects Machine Learning (CS304) and DBMS (CS302) to production backend engineering.",
                difficulty="Intermediate",
                estimated_duration="2 Weeks"
            ),
            ProjectRecommendation(
                id="proj-2",
                title="Distributed Graph Pathfinding Visualizer & Benchmarking Engine",
                description="Develop a high-performance web dashboard comparing graph search algorithms (Dijkstra, Bellman-Ford, A*) under high network loads.",
                target_career="Backend Engineer / Systems Architect",
                skills_addressed=["Graph Algorithms", "Data Structures", "WebSockets", "Performance Profiling"],
                academic_subject_connection="Direct application of Data Structures & Algorithms (CS301).",
                difficulty="Hard",
                estimated_duration="1.5 Weeks"
            )
        ]

        # 7. Initial Atlantis Insights
        self.insights = [
            InsightItem(
                id="ins-1", category="ACADEMIC",
                what="Urgent Revision: Graph Algorithms",
                why="Mastery is 45% (HIGH Risk) and Assignment 1 on Graph Paths is due in 2 days.",
                next_action="Ask AI Tutor about Dijkstra -> Take 3-question Quiz -> Update Tide-Chart.",
                priority_level="HIGH"
            ),
            InsightItem(
                id="ins-2", category="CAREER",
                what="Bridge DBMS + ML with FastAPI Project",
                why="Your target role 'Machine Learning Engineer' has a gap in FastAPI & Docker deployment.",
                next_action="Review recommended project 'Production ML Model API' in Career tab.",
                priority_level="HIGH"
            ),
            InsightItem(
                id="ins-3", category="DEADLINE",
                what="Assignment 1 Deadline Alert",
                why="Graph Shortest Path assignment is 25% complete with 4 hours of work remaining.",
                next_action="Complete subtasks 'Implement Min-Heap' and 'Dijkstra Logic' during tonight's study session.",
                priority_level="MEDIUM"
            )
        ]

        # 8. Flashcards
        self.flashcards = [
            Flashcard(id="fc-1", topic_name="Graph Algorithms", front="What condition must hold for Dijkstra's Algorithm to work correctly?", back="All edge weights must be non-negative (>= 0). If negative weights exist, Bellman-Ford should be used.", status="Difficult", review_count=2),
            Flashcard(id="fc-2", topic_name="Dynamic Programming", front="What is the difference between Memoization and Tabulation?", back="Memoization is top-down (recursion + cache), while Tabulation is bottom-up (iterative table filling).", status="Learning", review_count=3),
            Flashcard(id="fc-3", topic_name="DBMS", front="What is BCNF (Boyce-Codd Normal Form)?", back="A relation is in BCNF if for every non-trivial functional dependency X -> Y, X is a super key.", status="Known", review_count=5)
        ]

        # 9. Resources
        self.resources = [
            ResourceItem(id="res-1", title="FastAPI Official Interactive Tutorial", type="Documentation", link="https://fastapi.tiangolo.com/tutorial/", topic_name="API Frameworks", skill_tag="FastAPI", saved=True),
            ResourceItem(id="res-2", title="Visualizing Dijkstra & Bellman-Ford", type="Tool", link="https://visualgo.net/en/sssp", topic_name="Graph Algorithms", skill_tag="DSA", saved=True),
            ResourceItem(id="res-3", title="Docker for Python Developers Handbook", type="Book", link="https://docs.docker.com/get-started/", topic_name="Containerization", skill_tag="Docker", saved=False)
        ]

        # Initial study plan calculation
        self.recalculate_tide_chart()

    def recalculate_tide_chart(self):
        """Dynamic study plan prioritization calculation engine."""
        sessions: List[StudySession] = []
        
        # 1. High risk assignment topics / weak topics come first
        weak_topics = [t for t in self.topics.values() if t.is_weak or t.risk_level == "HIGH"]
        # Sort by lowest mastery first
        weak_topics.sort(key=lambda t: t.mastery_pct)

        slot_idx = 18 # 18:00
        priority_num = 1
        
        for t in weak_topics:
            start_str = f"{slot_idx:02d}:00"
            end_str = f"{slot_idx:02d}:45"
            sessions.append(
                StudySession(
                    id=f"sess-{priority_num}",
                    subject_name=t.subject_name,
                    topic_name=t.name,
                    duration_minutes=45,
                    priority=priority_num,
                    priority_reason=f"High Risk ({t.mastery_pct:.0f}% mastery). Critical for upcoming deadline/exam.",
                    expected_outcome=f"Increase {t.name} mastery above 70% and clear misconceptions.",
                    completed=False,
                    scheduled_date=datetime.now().strftime("%Y-%m-%d"),
                    time_slot=f"{start_str} - {end_str}"
                )
            )
            slot_idx += 1
            priority_num += 1

        # 2. Add career skill gap sessions
        missing_skills = [s for s in self.skill_gaps if s.status == "MISSING"]
        if missing_skills and slot_idx <= 21:
            skill = missing_skills[0]
            sessions.append(
                StudySession(
                    id=f"sess-{priority_num}",
                    subject_name="Career Skill Development",
                    topic_name=f"{skill.skill_name} Learning",
                    duration_minutes=45,
                    priority=priority_num,
                    priority_reason=f"Target Role ({self.profile.target_role}) Skill Gap: {skill.skill_name}",
                    expected_outcome=f"Build hands-on starter code using {skill.skill_name}",
                    completed=False,
                    scheduled_date=datetime.now().strftime("%Y-%m-%d"),
                    time_slot=f"{slot_idx:02d}:00 - {slot_idx:02d}:45"
                )
            )

        self.study_sessions = sessions

store = AtlantisStore()
