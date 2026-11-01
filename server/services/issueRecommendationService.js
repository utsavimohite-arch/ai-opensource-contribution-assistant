
// Calculate how beginner-friendly an issue is
function calculateBeginnerScore(issue) {
  let score = 0;

  const labels = (issue.labels || []).map((label) =>
    (typeof label === "string" ? label : label.name || "").toLowerCase()
  );

  const title = (issue.title || "").toLowerCase();
  const body = (issue.body || "").toLowerCase();
  const text = `${title} ${body}`;

  // 1. Beginner-friendly labels
  if (labels.some((label) => label.includes("good first issue"))) {
    score += 50;
  }

  if (labels.some((label) => label.includes("beginner"))) {
    score += 40;
  }

  if (labels.some((label) => label.includes("first-timers-only"))) {
    score += 40;
  }

  if (labels.some((label) => label.includes("easy"))) {
    score += 30;
  }

  if (labels.some((label) => label.includes("help wanted"))) {
    score += 25;
  }

  // 2. Documentation-related tasks
  if (
    text.includes("documentation") ||
    text.includes("readme") ||
    text.includes("tutorial") ||
    text.includes("contribution instructions")
  ) {
    score += 20;
  }

  // 3. Small and approachable tasks
  if (
    text.includes("typo") ||
    text.includes("spelling mistake") ||
    text.includes("grammar")
  ) {
    score += 20;
  }

  if (
    text.includes("translation") ||
    text.includes("translate")
  ) {
    score += 15;
  }

  // 4. Clear instructions
  if (
    body.includes("steps to complete") ||
    body.includes("steps to reproduce") ||
    body.includes("proposed solution")
  ) {
    score += 10;
  }

  // 5. Penalise discussion and question-based issues
  if (labels.includes("discussion")) {
    score -= 25;
  }

  if (labels.includes("question")) {
    score -= 10;
  }

  if (labels.includes("work in progress")) {
    score -= 15;
  }

  // 6. Penalise vague issues without actionable tasks
  const vaguePhrases = [
    "no specific file",
    "no specific problem",
    "not been identified",
    "would need to inspect",
    "please let me know if this is okay",
  ];

  if (vaguePhrases.some((phrase) => body.includes(phrase))) {
    score -= 30;
  }

  // 7. Penalise complex technical tasks
  const complexKeywords = [
    "compiler",
    "memory leak",
    "race condition",
    "performance regression",
    "deadlock",
    "internal architecture",
    "refactor architecture",
  ];

  if (complexKeywords.some((word) => text.includes(word))) {
    score -= 30;
  }

  return Math.max(score, 0);
}

// Generate beginner-friendly issue recommendations
function recommendBeginnerIssues(issues) {
  return issues
    .map((issue) => ({
      ...issue,
      beginnerScore: calculateBeginnerScore(issue),
    }))
    .filter((issue) => issue.beginnerScore >= 20)
    .sort((a, b) => b.beginnerScore - a.beginnerScore)
    .slice(0, 10);
}

module.exports = {
  calculateBeginnerScore,
  recommendBeginnerIssues,
};
