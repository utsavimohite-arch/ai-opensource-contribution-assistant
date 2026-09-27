const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function analyzeReadme(readmeContent) {
  const MAX_README_LENGTH = 30000;

  let readmeForAnalysis = readmeContent;
  let truncated = false;

  if (readmeContent.length > MAX_README_LENGTH) {
    readmeForAnalysis = readmeContent.substring(0, MAX_README_LENGTH);
    truncated = true;
  }

  const prompt = `
You are an AI assistant helping beginners contribute to open-source projects.

Analyze the following GitHub README and provide a beginner-friendly explanation.

Please give the answer in this structure:

1. Project Summary
2. What Problem Does It Solve?
3. Main Technologies Used
4. How to Set Up the Project
5. Important Things a Beginner Should Understand
6. Beginner Contribution Tips

Keep the explanation clear and easy to understand.

${
  truncated
    ? "IMPORTANT: The README was very long, so only the first portion is provided. Do not assume that information not present in the provided portion exists."
    : ""
}

README:
${readmeForAnalysis}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
}

module.exports = {
  analyzeReadme,
};