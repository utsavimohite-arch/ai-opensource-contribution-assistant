
const { Octokit } = require("octokit");

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

// Get repository information
async function getRepository(owner, repo) {
  const response = await octokit.rest.repos.get({
    owner,
    repo,
  });

  return response.data;
}

// Get repository README
async function getReadme(owner, repo) {
  const response = await octokit.rest.repos.getReadme({
    owner,
    repo,
  });

  return response.data;
}

// Get open issues from GitHub
async function getIssues(owner, repo) {
  try {
    // First, try GitHub Search API
    const response = await octokit.rest.search.issuesAndPullRequests({
      q: `repo:${owner}/${repo} is:issue is:open`,
      per_page: 100,
      sort: "created",
      order: "desc",
    });

    const issues = response.data.items;

    console.log("Repository:", owner, repo);
    console.log("Issues fetched using Search API:", issues.length);

    return issues;
  } catch (searchError) {
    console.warn(
      "GitHub Search API failed. Trying the regular Issues API instead."
    );
    console.warn("Search API error:", searchError.message);

    // Fallback: use the regular Issues API
    const issues = [];

    for (let page = 1; page <= 10; page++) {
      const response = await octokit.rest.issues.listForRepo({
        owner,
        repo,
        state: "open",
        per_page: 100,
        page,
        sort: "created",
        direction: "desc",
      });

      // GitHub's Issues API also returns pull requests.
      // Exclude pull requests so only actual issues remain.
      const actualIssues = response.data.filter(
        (issue) => !issue.pull_request
      );

      issues.push(...actualIssues);

      // Stop when we have enough issues or no more pages.
      if (issues.length >= 100 || response.data.length < 100) {
        break;
      }
    }

    console.log("Repository:", owner, repo);
    console.log("Issues fetched using fallback API:", issues.length);

    return issues.slice(0, 100);
  }
}

module.exports = {
  getRepository,
  getReadme,
  getIssues,
};
