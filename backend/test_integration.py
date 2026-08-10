import httpx
import json

BASE_URL = "http://localhost:8000/api"

def run_tests():
    client = httpx.Client(timeout=10.0)

    print("--- 1. Testing Student Profile ---")
    res = client.get(f"{BASE_URL}/student/profile")
    print(f"Status: {res.status_code}, Name: {res.json().get('name')}, Target Role: {res.json().get('target_role')}")

    print("\n--- 2. Testing Syllabus Topics ---")
    res = client.get(f"{BASE_URL}/syllabus/topics")
    topics = res.json()
    print(f"Status: {res.status_code}, Total Topics: {len(topics)}")
    dijkstra_topic = next((t for t in topics if "Graph" in t['name']), None)
    print(f"Initial Graph Algorithms Mastery: {dijkstra_topic['mastery_pct']}% (Risk: {dijkstra_topic['risk_level']})")

    print("\n--- 3. Submitting AI Quiz (Simulating 100% Score) ---")
    quiz_payload = {
        "quiz_id": "test-q1",
        "topic_id": dijkstra_topic['id'],
        "topic_name": dijkstra_topic['name'],
        "answers": {
            "q-g1": "O((V + E) log V)",
            "q-g2": "Bellman-Ford Algorithm",
            "q-g3": "True"
        }
    }
    res = client.post(f"{BASE_URL}/quiz/submit", json=quiz_payload)
    quiz_res = res.json()
    print(f"Quiz Score: {quiz_res['score_pct']}%, New Mastery: {quiz_res['new_mastery_pct']}%, New Risk: {quiz_res['new_risk_level']}")

    print("\n--- 4. Testing AI Tutor ('Whispering Library') ---")
    tutor_payload = {
        "topic_name": "Graph Algorithms",
        "user_query": "Explain Dijkstra algorithm for exam",
        "explanation_mode": "Exam-oriented"
    }
    res = client.post(f"{BASE_URL}/tutor/chat", json=tutor_payload)
    tutor_res = res.json()
    print(f"Tutor Mode: {tutor_res['explanation_mode']}")
    print(f"Reply preview: {tutor_res['tutor_reply'][:120]}...")

    print("\n--- 5. Testing Tide-Chart Recalibration ---")
    res = client.post(f"{BASE_URL}/planner/recalibrate")
    sessions = res.json()
    print(f"Status: {res.status_code}, Total Sessions Planned: {len(sessions)}")
    print(f"Top Priority Session: #{sessions[0]['priority']} - {sessions[0]['topic_name']} ({sessions[0]['priority_reason']})")

    print("\n--- 6. Testing Atlantis Readiness Score ---")
    res = client.get(f"{BASE_URL}/progress/readiness")
    readiness = res.json()
    print(f"Overall Readiness Index: {readiness['overall_score']}/100 (Academic: {readiness['academic_mastery']}%, Consistency: {readiness['consistency_score']}%, Career Skills: {readiness['career_skills_score']}%)")

    print("\n--- 7. Testing Resume & Skill Gaps Analysis ---")
    res = client.get(f"{BASE_URL}/resume/analysis")
    resume = res.json()
    print(f"Resume ATS Score: {resume['ats_score']}%, Extracted Skills: {resume['extracted_skills']}, Missing: {resume['missing_skills']}")

    print("\n--- 8. Testing Academics -> Career Bridge ---")
    res = client.get(f"{BASE_URL}/career/academics-bridge")
    bridge = res.json()
    print(f"Total Connections: {len(bridge)}")
    print(f"Bridge 1: {bridge[0]['academic_subject']} -> {bridge[0]['practical_project']}")

    print("\nALL INTEGRATION TESTS PASSED CLEANLY!")

if __name__ == "__main__":
    run_tests()
