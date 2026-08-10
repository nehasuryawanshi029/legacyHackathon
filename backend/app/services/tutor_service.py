from typing import Dict, Any, List, Optional
from app.db.store import store
from app.schemas.schemas import TutorResponse, TutorMessageRequest

class TutorService:
    @staticmethod
    def generate_explanation(req: TutorMessageRequest) -> TutorResponse:
        """
        Adaptive AI Tutor ("Whispering Library") logic considering:
        - Student academic level (e.g. 3rd Year College)
        - Selected topic & known weaknesses
        - Requested explanation mode (Beginner, Simple, Detailed, Exam-oriented, Technical, Analogy-based)
        """
        topic_name = req.topic_name
        query = req.user_query.lower()
        mode = req.explanation_mode

        # Find topic context from central store
        matched_topic = None
        for t in store.topics.values():
            if t.name.lower() in topic_name.lower() or topic_name.lower() in t.name.lower():
                matched_topic = t
                break

        weakness_ctx = ""
        if matched_topic and matched_topic.is_weak:
            weakness_ctx = f" (Note: I see your current mastery on {matched_topic.name} is {matched_topic.mastery_pct:.0f}%. Let's break this down step-by-step to solidify your foundation!)"

        misconception = None
        suggested_practice = None

        if "dijkstra" in query or "graph" in query or "recursion" in query:
            if mode == "Analogy-based":
                reply = (
                    f"Imagine you are navigating a city map where every intersection is a vertex and every road has a toll cost (edge weight). "
                    f"Dijkstra's algorithm is like exploring outwards from your starting point in concentric ripples: "
                    f"you ALWAYS visit the closest unvisited intersection first.{weakness_ctx}\n\n"
                    f"**Key Step:** Maintain a tentative distance table. Pick the minimum distance unvisited node, look at all its neighbors, and 'relax' their distances if `dist[u] + cost(u,v) < dist[v]`."
                )
            elif mode == "Exam-oriented":
                reply = (
                    f"**Exam Focus — Dijkstra's Algorithm (CS301):**\n"
                    f"1. **Pre-condition:** Edge weights MUST be non-negative (>= 0). If negative edges exist, use Bellman-Ford.\n"
                    f"2. **Data Structure:** Min-Priority Queue / Min-Heap.\n"
                    f"3. **Time Complexity:** O((V + E) log V).\n"
                    f"4. **Space Complexity:** O(V) for distance & priority queue.\n"
                    f"**Common Exam Trap:** Marking a node as finalized before popping it from the priority queue leads to incorrect shortest paths when duplicate entries exist.{weakness_ctx}"
                )
                misconception = "Assumed Dijkstra works with negative edge weights."
                suggested_practice = "Solve 2 Dijkstra trace problems and take the Graph Algorithms Mini-Quiz."
            elif mode == "Technical":
                reply = (
                    f"**Technical Formalism — Dijkstra's SSSP Algorithm:**\n"
                    f"Let $G = (V, E)$ be a directed weighted graph with weight function $w: E \\rightarrow \\mathbb{{R}}^+$ and source $s \\in V$.\n"
                    f"1. Initialize $d[s] = 0$ and $d[v] = \\infty$ for all $v \\neq s$.\n"
                    f"2. Maintain priority queue $Q$ containing $V$.\n"
                    f"3. While $Q \\neq \\emptyset$:\n"
                    f"   - Extract $u = \\text{{argmin}}_{{x \\in Q}} d[x]$.\n"
                    f"   - For each neighbor $v \\in \\text{{Adj}}[u]$:\n"
                    f"     - If $d[u] + w(u,v) < d[v]$, update $d[v] = d[u] + w(u,v)$ and decrease key in $Q$.{weakness_ctx}"
                )
            else: # Detailed or Simple
                reply = (
                    f"**Understanding {topic_name}:**\n\n"
                    f"Dijkstra's Algorithm finds the shortest path from a starting node to all other nodes in a weighted graph.{weakness_ctx}\n\n"
                    f"**How it works step by step:**\n"
                    f"1. Set distance to starting node = 0, all others = infinity.\n"
                    f"2. Use a Min-Heap (Priority Queue) to always pick the unvisited node with the smallest tentative distance.\n"
                    f"3. For the picked node, update (relax) all its neighbors' tentative distances.\n"
                    f"4. Mark the current node as visited.\n"
                    f"5. Repeat until all reachable nodes are visited."
                )
        else:
            reply = (
                f"Great question regarding **{topic_name}**!{weakness_ctx}\n\n"
                f"Mode: **{mode}**\n\n"
                f"To master {topic_name}, start by understanding the core definition, identifying common edge cases, and applying the concept through practice problems. Let me know if you would like an analogy or code example!"
            )

        # Store in tutor history
        store.tutor_history.append({
            "topic_name": topic_name,
            "query": req.user_query,
            "reply": reply,
            "mode": mode,
            "misconception": misconception
        })

        return TutorResponse(
            message_id=f"msg-{len(store.tutor_history)}",
            tutor_reply=reply,
            detected_misconception=misconception,
            suggested_practice=suggested_practice,
            updated_confidence_signal="HIGH" if not misconception else "NEEDS_REVISION",
            explanation_mode=mode
        )

tutor_service = TutorService()
