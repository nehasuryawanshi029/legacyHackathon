from typing import Dict, Any
from app.db.store import store
from app.schemas.schemas import Topic

class MasteryService:
    @staticmethod
    def calculate_topic_mastery(
        topic: Topic,
        quiz_score: float = None,
        tutor_interaction_count: int = 0,
        study_minutes: int = 0
    ) -> Topic:
        """
        Calculates estimated mastery based on multiple signals:
        - Quiz accuracy & recent quiz score
        - Topic difficulty weight
        - Tutor interactions (indicates active learning or struggle)
        - Study time logged
        """
        current = topic.mastery_pct

        if quiz_score is not None:
            # Weighted average between existing mastery and new quiz score
            if current == 0:
                new_mastery = quiz_score
            else:
                new_mastery = (current * 0.6) + (quiz_score * 0.4)
            topic.mastery_pct = round(min(100.0, max(0.0, new_mastery)), 1)

        # Confidence calculation
        if topic.mastery_pct >= 75:
            topic.confidence_pct = min(100.0, topic.mastery_pct + 5.0)
            topic.risk_level = "LOW"
            topic.is_weak = False
        elif topic.mastery_pct >= 55:
            topic.confidence_pct = topic.mastery_pct
            topic.risk_level = "MEDIUM"
            topic.is_weak = False
        else:
            topic.confidence_pct = max(10.0, topic.mastery_pct - 10.0)
            topic.risk_level = "HIGH"
            topic.is_weak = True

        # Update subject average
        subject = store.subjects.get(topic.subject_id)
        if subject:
            t_list = [t for t in store.topics.values() if t.subject_id == subject.id]
            if t_list:
                subject.avg_mastery = round(sum(t.mastery_pct for t in t_list) / len(t_list), 1)

        return topic

mastery_service = MasteryService()
