const express = require("express");

const {
  getRepository,
  getReadme,
  getIssues,
} = require("../services/githubService");

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

    const content = Buffer.from(readme.content, "base64").toString("utf-8");

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

    const filteredIssues = issues.filter((issue) => !issue.pull_request);

    res.json({
      success: true,
      count: filteredIssues.length,
      issues: filteredIssues.map((issue) => ({
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

module.exports = router;