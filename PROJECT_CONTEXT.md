# PROJECT_CONTEXT.md
**AI-Powered Open Source Contribution Assistant**

> Instructions: Update this file at the END of every chat session before you stop.
> At the START of a new chat, upload/paste this file and say: "Continue building from this context."

---

## 1. Project Summary
A web app (React frontend + Node.js backend) that uses NLP + Retrieval-Augmented
Generation (RAG) and the GitHub API to:
- Recommend beginner-friendly repositories based on user skills
- Summarize README files and contribution guidelines
- Identify beginner-friendly issues
- Answer repo-related questions via an AI chatbot
- Guide users through GitHub workflow (Fork, Clone, Branch, Commit, Push, PR)

## 2. Architecture
- **Frontend:** React.js (Vite) — folder: `/client`
- **Backend:** Node.js + Express — folder: `/server`
- **External APIs:** GitHub REST API, LLM API (GPT/Gemini/Claude — TBD which one)
- **AI/NLP layer:** Pretrained LLM API for summarization/chat; embeddings + similarity
  search for retrieval (Milestone 6 onward)

## 3. Current Status (update every session)
- [x] Project skeleton created (client + server folders)
- [x] Backend Express server running
- [x] Frontend React app running
- [x] GitHub API connected (fetch repo info)
- [x] README/NLP analysis module (via LLM API)
- [x] RAG / retrieval module
- [x] Beginner-issue recommendation logic
- [x] Chatbot UI
- [x] Chatbot backend logic
- [x] Contribution-workflow guidance feature
- [x] Testing
- [x] Deployment

_Last updated: 25 Sept 2026_






## 7. Known Issues / Blockers
- (none yet)

## 8. File/Folder Map (update as it grows)
```
project-root/
├── client/        # React frontend
├── server/        # Node.js backend
├── PROJECT_CONTEXT.md
└── README.md
```
