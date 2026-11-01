
const express = require("express");

const {
  getRepository,
  getReadme,
  getIssues,
} = require("../services/githubService");

const {
  recommendBeginnerIssues,
} = require("../services/issueRecommendationService");

const router = express.Router();

// Get repository information
router.get("/repository/:owner/:repo", async (req, res) => {
  try {
    const { owner, repo } = req.params;

    const repository = await getRepository(owner, repo);

    res.json({
      success: true,
      repository: {
        name: repository.name,
        fullName: repository.full_name,
        description: repository.description,
        stars: repository.stargazers_count,
        forks: repository.forks_count,
        language: repository.language,
        url: repository.html_url,
      },
    });
  } catch (error) {
    console.error("GitHub API Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch repository information",
    });
  }
});

// Get repository README
router.get("/repository/:owner/:repo/readme", async (req, res) => {
  try {
    const { owner, repo } = req.params;

    const readme = await getReadme(owner, repo);

    const content = Buffer.from(
      readme.content,
      "base64"
    ).toString("utf-8");

    res.json({
      success: true,
      readme: {
        name: readme.name,
        path: readme.path,
        content: content,
      },
    });
  } catch (error) {
    console.error("GitHub README Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch repository README",
    });
  }
});

// Get repository issues
router.get("/repository/:owner/:repo/issues", async (req, res) => {
  try {
    const { owner, repo } = req.params;

    const issues = await getIssues(owner, repo);

    res.json({
      success: true,
      count: issues.length,
      issues: issues.map((issue) => ({
        number: issue.number,
        title: issue.title,
        body: issue.body,
        state: issue.state,
        labels: issue.labels.map((label) => label.name),
        comments: issue.comments,
        url: issue.html_url,
        createdAt: issue.created_at,
        updatedAt: issue.updated_at,
      })),
    });
  } catch (error) {
    console.error("GitHub Issues Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch repository issues",
    });
  }
});

// Get beginner-friendly repository issues
router.get(
  "/repository/:owner/:repo/beginner-issues",
  async (req, res) => {
    try {
      const { owner, repo } = req.params;

      // Fetch actual open issues from GitHub
      const issues = await getIssues(owner, repo);

      // Calculate scores and rank beginner-friendly issues
      const recommendedIssues = recommendBeginnerIssues(issues);

      res.json({
        success: true,
        count: recommendedIssues.length,
        issues: recommendedIssues.map((issue) => ({
          number: issue.number,
          title: issue.title,
          body: issue.body,
          state: issue.state,
          labels: issue.labels.map((label) =>
            typeof label === "string" ? label : label.name
          ),
          comments: issue.comments,
          url: issue.html_url,
          beginnerScore: issue.beginnerScore,
        })),
      });
    } catch (error) {
      console.error("Beginner Issues Error:", error);

      res.status(500).json({
        success: false,
        message: "Failed to recommend beginner-friendly issues",
      });
    }
  }
);

module.exports = router;
