const { Octokit } = require("octokit");

const octokit = new Octokit();

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

// Get repository issues
async function getIssues(owner, repo) {
  const response = await octokit.rest.issues.listForRepo({
    owner,
    repo,
    state: "open",
    per_page: 30,
  });

  return response.data;
}

module.exports = {
  getRepository,
  getReadme,
  getIssues,
};