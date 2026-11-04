# 🚀 AI-Powered Open Source Contribution Assistant

An intelligent web application that helps beginners discover,
understand, and contribute to open-source projects using Artificial
Intelligence and Retrieval-Augmented Generation (RAG).

## 🌐 Live Demo

**Live Application:** [Try the application](PASTE_YOUR_VERCEL_URL_HERE)

**GitHub Repository:**
https://github.com/utsavimohite-arch/ai-opensource-contribution-assistant

> Replace `PASTE_YOUR_VERCEL_URL_HERE` with your actual Vercel URL
> before publishing.

------------------------------------------------------------------------

## 1. Project Overview

Open-source software development gives developers opportunities to
collaborate, improve their programming skills, and contribute to
real-world projects. However, beginners may struggle with complex
repository structures, lengthy documentation, unfamiliar development
workflows, and finding suitable beginner-friendly issues.

The **AI-Powered Open Source Contribution Assistant** aims to simplify
this journey. It integrates the GitHub REST API with Google Gemini and
Retrieval-Augmented Generation to help users explore repositories,
understand documentation, discover potential contribution opportunities,
and ask repository-related questions.

The application also provides step-by-step guidance for forking,
cloning, creating branches, committing changes, pushing code, and
creating pull requests.

## 2. Project Objectives

-   Simplify the discovery of open-source repositories.
-   Help users understand repository documentation.
-   Identify potentially beginner-friendly issues.
-   Provide an AI chatbot for repository-related questions.
-   Use RAG to retrieve relevant documentation for contextual answers.
-   Guide beginners through the GitHub contribution workflow.
-   Make open-source contribution more accessible to students and
    beginner developers.

## 3. Key Features

### 3.1 Repository Search

-   Search GitHub repositories using the repository owner and name.
-   Retrieve repository information through the GitHub REST API.
-   Fetch README documentation and open issues.

### 3.2 AI-Powered README Analysis

Google Gemini analyzes repository README content and generates
information such as:

-   Project summary
-   Problem the project solves
-   Technologies used
-   Installation and setup instructions
-   Beginner-friendly explanation
-   Contribution tips

### 3.3 Beginner-Friendly Issue Recommendations

-   Fetch open issues from GitHub.
-   Process issue information.
-   Identify issues that may be suitable for beginners.
-   Help users find potential contribution opportunities.

### 3.4 AI-Powered Repository Chatbot

Users can ask questions about a selected repository, for example:

-   What is this project about?
-   How do I install this project?
-   Which technologies are used?
-   How can I contribute?
-   What is the purpose of this project?

The chatbot uses retrieved repository documentation as context when
generating answers with Gemini.

### 3.5 Retrieval-Augmented Generation (RAG)

The RAG workflow consists of:

1.  Retrieving repository README content.
2.  Splitting the documentation into smaller text chunks.
3.  Generating embeddings for text chunks.
4.  Comparing the user's question with the available chunks.
5.  Retrieving relevant information.
6.  Passing the retrieved context to Gemini.
7.  Generating a contextual answer.

This helps ground chatbot responses in relevant repository
documentation.

### 3.6 Chat History

-   Store questions and AI-generated answers in MongoDB Atlas.
-   Retrieve previous conversations for a repository.
-   Preserve conversation history across page refreshes.

### 3.7 GitHub Contribution Workflow Guide

The application explains six essential contribution steps:

1.  **Fork:** Create your own copy of the repository.
2.  **Clone:** Download your fork to your computer.
3.  **Branch:** Create a separate branch for your changes.
4.  **Commit:** Save changes with a meaningful commit message.
5.  **Push:** Upload your branch to GitHub.
6.  **Pull Request:** Submit your changes for review.

The application also provides Git commands that users can copy and
execute.

## 4. Technology Stack

  Category               Technology
  ---------------------- --------------------------------
  Frontend               React.js
  Frontend build tool    Vite
  Backend                Node.js
  Backend framework      Express.js
  Programming language   JavaScript
  AI model               Google Gemini
  AI integration         Google Gen AI SDK
  API integration        GitHub REST API
  GitHub library         Octokit
  AI approach            Retrieval-Augmented Generation
  Embeddings             Hugging Face Transformers
  Database               MongoDB Atlas
  Database ODM           Mongoose
  API communication      HTTP / Axios
  Version control        Git and GitHub
  Frontend hosting       Vercel
  Backend hosting        Render

## 5. System Architecture

The application follows a client-server architecture.

-   **Frontend:** React.js provides the user interface.
-   **Backend:** Node.js and Express.js handle API requests, GitHub
    integration, AI processing, document retrieval, and database
    operations.
-   **AI layer:** Gemini analyzes README files and generates chatbot
    responses. The RAG pipeline retrieves relevant documentation to
    provide context.
-   **Database:** MongoDB Atlas stores chatbot conversations.

### Architecture Flow

``` text
                  USER
                    |
                    v
             REACT FRONTEND
                (Vercel)
                    |
                    v
             NODE.JS + EXPRESS
                 (Render)
                    |
          +---------+----------+
          |         |          |
          v         v          v
        GitHub   Gemini AI   RAG System
         API                  |
                              v
                         Embeddings
                              |
                              v
                      Similarity Retrieval
                              |
          +-------------------+
          |
          v
      MongoDB Atlas
      Chat History
```

## 6. Project Structure

The following is a representative overview of the project folders.
Update it if your current repository structure differs.

``` text
ai-opensource-contribution-assistant/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   └── Chat.js
│   ├── routes/
│   │   ├── githubRoutes.js
│   │   ├── aiRoutes.js
│   │   └── questionRoutes.js
│   ├── services/
│   │   ├── githubService.js
│   │   ├── aiService.js
│   │   ├── ragService.js
│   │   ├── embeddingService.js
│   │   └── issueRecommendationService.js
│   ├── index.js
│   └── package.json
│
├── .gitignore
├── README.md
└── PROJECT_CONTEXT.md
```

## 7. Installation and Setup

### Prerequisites

-   Node.js (version 18 or later)
-   npm
-   Git
-   A GitHub account
-   A Google Gemini API key
-   A MongoDB Atlas account

### Step 1: Clone the Repository

``` bash
git clone https://github.com/utsavimohite-arch/ai-opensource-contribution-assistant.git
cd ai-opensource-contribution-assistant
```

### Step 2: Install Frontend Dependencies

``` bash
cd client
npm install
```

### Step 3: Install Backend Dependencies

Open a second terminal:

``` bash
cd server
npm install
```

### Step 4: Configure Environment Variables

Create a `.env` file inside the `server` folder:

``` env
PORT=5000
GEMINI_API_KEY=your_gemini_api_key
GITHUB_TOKEN=your_github_personal_access_token
MONGODB_URI=your_mongodb_connection_string
```

Replace the placeholder values with your own credentials.

**Security:** Never commit your `.env` file or expose API keys, database
credentials, or GitHub tokens publicly.

### Step 5: Start the Backend

From the `server` directory:

``` bash
node index.js
```

The backend should run at:

``` text
http://localhost:5000
```

### Step 6: Start the Frontend

From the `client` directory, in the other terminal:

``` bash
npm run dev
```

Vite normally makes the frontend available at:

``` text
http://localhost:5173
```

Open the displayed local development URL in your browser.

## 8. Environment Variables

  -----------------------------------------------------------------------
  Variable                            Description
  ----------------------------------- -----------------------------------
  `PORT`                              Port used by the backend server

  `GEMINI_API_KEY`                    API key for Google Gemini

  `GITHUB_TOKEN`                      GitHub Personal Access Token for
                                      authenticated API requests

  `MONGODB_URI`                       MongoDB Atlas connection string
  -----------------------------------------------------------------------

Keep these values private. Configure production values in the hosting
platform's environment settings rather than committing them to Git.

## 9. API Endpoints

The backend includes the following routes, based on the implemented
route structure. Verify the exact paths against your current route files
before publishing.

### GitHub Routes

  -------------------------------------------------------------------------------------------------------
  Method                  Endpoint                                                Description
  ----------------------- ------------------------------------------------------- -----------------------
  GET                     `/api/github/repository/:owner/:repo`                   Fetch repository
                                                                                  information

  GET                     `/api/github/repository/:owner/:repo/readme`            Retrieve repository
                                                                                  README

  GET                     `/api/github/repository/:owner/:repo/issues`            Fetch open issues

  GET                     `/api/github/repository/:owner/:repo/beginner-issues`   Retrieve
                                                                                  beginner-friendly issue
                                                                                  recommendations
  -------------------------------------------------------------------------------------------------------

### AI Route

  --------------------------------------------------------------------------
  Method                  Endpoint                   Description
  ----------------------- -------------------------- -----------------------
  POST                    `/api/ai/analyze-readme`   Analyze README content
                                                     using Gemini

  --------------------------------------------------------------------------

### Chatbot Routes

  ---------------------------------------------------------------------------------------
  Method                  Endpoint                                Description
  ----------------------- --------------------------------------- -----------------------
  POST                    `/api/questions/ask`                    Ask repository-related
                                                                  questions

  GET                     `/api/questions/history/:owner/:repo`   Retrieve previous
                                                                  chatbot conversations
  ---------------------------------------------------------------------------------------

## 10. Working Methodology

1.  **Repository selection:** The user enters a GitHub repository owner
    and repository name.
2.  **GitHub API integration:** The backend retrieves repository
    information, README documentation, and open issues.
3.  **README analysis:** Gemini processes the README and generates an
    understandable project summary.
4.  **Issue recommendations:** The backend processes open issues and
    identifies potentially beginner-friendly opportunities.
5.  **RAG processing:** The README is divided into chunks, embeddings
    are generated, and relevant chunks are retrieved for a question.
6.  **AI response generation:** Gemini uses the retrieved context to
    generate an answer.
7.  **Conversation storage:** Questions and generated answers are stored
    in MongoDB Atlas.
8.  **Contribution guidance:** The application explains the steps and
    Git commands used in a typical contribution workflow.

## 11. Testing and Validation

The following areas were tested during development:

-   Backend health endpoint.
-   GitHub repository retrieval.
-   README retrieval.
-   Open issue retrieval.
-   Beginner-friendly issue recommendations.
-   Gemini README analysis.
-   RAG-based chatbot question answering.
-   MongoDB chat history storage and retrieval.
-   Contribution workflow guidance.
-   Invalid repository handling.
-   Empty input validation.
-   Empty chatbot question validation.
-   Production deployment and frontend-backend communication.

## 12. Deployment

The application is deployed using cloud hosting platforms.

  Component   Platform
  ----------- ---------------
  Frontend    Vercel
  Backend     Render
  Database    MongoDB Atlas

### Deployment Overview

-   The React frontend is hosted on Vercel.
-   The Node.js backend is deployed as a Render Web Service.
-   MongoDB Atlas provides cloud database storage.
-   The frontend communicates with the deployed backend through HTTP API
    requests.
-   Production credentials are configured using environment variables.

**Note:** Render's free web service may sleep after inactivity, so the
first request after a period of inactivity can take additional time.
Free-plan limits and platform policies may change.

## 13. Future Scope

Possible future enhancements include:

-   User authentication and personalized profiles.
-   More advanced repository recommendations based on programming
    skills.
-   Support for additional documentation formats.
-   Improved issue classification using machine learning.
-   GitHub account integration to track user contributions.
-   Personalized learning paths for beginner contributors.
-   Code explanation and code review assistance.
-   Semantic search across more repository files.
-   Contribution progress tracking and dashboards.
-   Support for additional source-code hosting platforms.

## 14. Applications

This project can be useful for:

-   Students learning software development.
-   Beginners interested in open-source contributions.
-   Developers searching for beginner-friendly repositories.
-   Individuals participating in open-source programs.
-   Educational institutions teaching collaborative software
    development.

## 15. Project Information

**Project Title:** AI-Powered Open Source Contribution Assistant Using
Natural Language Processing and Retrieval-Augmented Generation

**Project Type:** Academic Mini Project

**Domain:** Artificial Intelligence, Natural Language Processing, Web
Development, and Open Source Software

**GitHub Repository:**
https://github.com/utsavimohite-arch/ai-opensource-contribution-assistant

## 16. Contributing

Contributions and suggestions are welcome.

1.  Fork the repository.
2.  Clone your fork.
3.  Create a new branch.
4.  Make your changes.
5.  Commit and push your changes.
6.  Open a Pull Request.

## 17. License

This project is developed for academic and educational purposes.

A specific open-source license has not been declared in this README. Add
a license file if you intend to grant others explicit permission to
reuse, modify, and distribute the code.

## Acknowledgement

This project demonstrates how Artificial Intelligence,
Retrieval-Augmented Generation, and GitHub API integration can be
combined to simplify the open-source contribution journey for beginners.

**If you find this project interesting, consider giving the repository a
⭐ on GitHub!**
