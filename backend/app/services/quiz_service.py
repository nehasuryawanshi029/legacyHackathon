from typing import List, Dict, Any
from datetime import datetime
from app.db.store import store
from app.schemas.schemas import QuizSubmission, QuizAttemptResult, QuizQuestion
from app.services.mastery_service import mastery_service

class QuizService:
    @staticmethod
    def get_questions_for_topic(topic_id: str) -> List[QuizQuestion]:
        if topic_id in store.quiz_questions:
            return store.quiz_questions[topic_id]
        
        # Fallback dynamic generator if questions for topic not pre-seeded
        topic = store.topics.get(topic_id)
        topic_name = topic.name if topic else "General Subject"
        return [
            QuizQuestion(
                id=f"q-dyn-1", topic_id=topic_id, topic_name=topic_name,
                question_type="MCQ", difficulty="Medium",
                question=f"What is a fundamental property of {topic_name}?",
                options=[
                    f"Optimal solution structure for {topic_name}",
                    f"Constant time complexity O(1)",
                    f"Requires randomized seeds",
                    f"Only applies to primitive types"
                ],
                correct_answer=f"Optimal solution structure for {topic_name}",
                explanation=f"{topic_name} relies on optimal subproblems and structural properties."
            ),
            QuizQuestion(
                id=f"q-dyn-2", topic_id=topic_id, topic_name=topic_name,
                question_type="TrueFalse", difficulty="Easy",
                question=f"Mastering {topic_name} requires understanding its edge cases and time complexities.",
                options=["True", "False"],
                correct_answer="True",
                explanation="Edge cases and asymptotic analysis are crucial for algorithmic topics."
            )
        ]

    @staticmethod
    def submit_quiz(sub: QuizSubmission) -> QuizAttemptResult:
        questions = QuizService.get_questions_for_topic(sub.topic_id)
        total_questions = len(questions)
        correct_count = 0
        mistakes = []

        for q in questions:
            user_ans = sub.answers.get(q.id, "")
            if user_ans.strip().lower() == q.correct_answer.strip().lower():
                correct_count += 1
            else:
                mistakes.append(f"Missed: {q.question[:40]}... (Your choice: {user_ans or 'None'})")

        score_pct = round((correct_count / total_questions) * 100.0, 1) if total_questions > 0 else 0.0

        # Update topic mastery in real time
        topic = store.topics.get(sub.topic_id)
        old_mastery = topic.mastery_pct if topic else 50.0

        if topic:
            updated_topic = mastery_service.calculate_topic_mastery(topic, quiz_score=score_pct)
            new_mastery = updated_topic.mastery_pct
            new_risk = updated_topic.risk_level
        else:
            new_mastery = score_pct
            new_risk = "LOW" if score_pct >= 70 else "HIGH"

        mastery_change = round(new_mastery - old_mastery, 1)

        # Trigger dynamic recalibration of study plan!
        store.recalculate_tide_chart()

        # Generate feedback string
        if score_pct >= 80:
            feedback = f"Excellent performance! Mastery on {sub.topic_name} increased by {mastery_change:+.1f}%. Keep up the momentum!"
        elif score_pct >= 50:
            feedback = f"Good effort! Score: {score_pct:.0f}%. We recommend reviewing incorrect questions before attempting the next level."
        else:
            feedback = f"Score: {score_pct:.0f}%. High learning risk detected! Tide-Chart has automatically prioritized {sub.topic_name} in your study schedule."

        attempt_res = QuizAttemptResult(
            attempt_id=f"att-{len(store.quiz_attempts) + 1}",
            topic_id=sub.topic_id,
            topic_name=sub.topic_name,
            score_pct=score_pct,
            total_questions=total_questions,
            correct_count=correct_count,
            mistake_patterns=mistakes,
            new_mastery_pct=new_mastery,
            new_risk_level=new_risk,
            mastery_change=mastery_change,
            feedback=feedback,
            timestamp=datetime.now().strftime("%Y-%m-%d %H:%M")
        )

        store.quiz_attempts.append(attempt_res)
        return attempt_res

quiz_service = QuizService()
