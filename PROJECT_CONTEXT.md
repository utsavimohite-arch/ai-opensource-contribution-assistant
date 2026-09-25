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
- [ ] README/NLP analysis module (via LLM API)
- [ ] RAG / retrieval module
- [ ] Beginner-issue recommendation logic
- [ ] Chatbot UI
- [ ] Chatbot backend logic
- [ ] Contribution-workflow guidance feature
- [ ] Testing
- [ ] Deployment

_Last updated: 25 Sept 2026_

## 4. What Was Just Done (most recent session)
- Created GitHub repo `ai-opensource-contribution-assistant`
- Cloned locally, created `client/` and `server/` folders
- Created this PROJECT_CONTEXT.md file

## 5. What's Next (pick up here in the new chat)
- Milestone 2: Backend Express server running — run `npm init -y` and
  `npm install express dotenv cors` inside `server/`, then create a basic `index.js`
- Milestone 3: Frontend React app running (Vite)
- Milestone 4: GitHub API connected (fetch repo info, README, issues)
- Milestone 5: README/NLP analysis module using LLM API
- **Checkpoint deadline: Milestones 1-5 done by Sept 29, 2026**
- After Sept 29: continue with Milestone 6 (RAG), 7 (recommendation logic), and onward

## 6. Key Decisions & Notes
- Milestone 5 (README/NLP analysis) will use a pretrained LLM API (GPT/Gemini/Claude)
  for summarization instead of a custom-trained NLP model. This follows the RAG
  approach cited in the synopsis's Related Work — RAG is built on pretrained models +
  retrieval, not models trained from scratch.
- Target: Complete Milestones 1-5 by Sept 29th as a first checkpoint. Milestones 6-11
  (RAG retrieval, recommendation logic, chatbot, workflow guidance, testing,
  deployment) to follow after.
- Working in PowerShell on Windows — use `mkdir folder1, folder2` (comma-separated)
  instead of Unix-style `mkdir folder1 folder2`.

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