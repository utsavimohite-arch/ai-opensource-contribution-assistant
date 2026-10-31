
const { generateEmbedding } = require("./embeddingService");

// 1. Divide README content into smaller chunks
function splitIntoChunks(text, chunkSize = 1000, overlap = 200) {
  if (typeof text !== "string" || text.trim().length === 0) {
    return [];
  }

  if (
    !Number.isInteger(chunkSize) ||
    !Number.isInteger(overlap) ||
    chunkSize <= 0 ||
    overlap < 0 ||
    overlap >= chunkSize
  ) {
    throw new Error("Invalid chunk size or overlap");
  }

  const cleanedText = text.trim();
  const chunks = [];

  let start = 0;

  while (start < cleanedText.length) {
    const end = Math.min(start + chunkSize, cleanedText.length);

    const chunk = cleanedText.substring(start, end).trim();

    if (chunk.length > 0) {
      chunks.push(chunk);
    }

    if (end === cleanedText.length) {
      break;
    }

    start = end - overlap;
  }

  return chunks;
}

// 2. Calculate cosine similarity between two embeddings
function cosineSimilarity(vectorA, vectorB) {
  if (
    !Array.isArray(vectorA) ||
    !Array.isArray(vectorB) ||
    vectorA.length === 0 ||
    vectorA.length !== vectorB.length
  ) {
    throw new Error("Vectors must be non-empty arrays of equal length");
  }

  let dotProduct = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;

  for (let i = 0; i < vectorA.length; i++) {
    dotProduct += vectorA[i] * vectorB[i];
    magnitudeA += vectorA[i] * vectorA[i];
    magnitudeB += vectorB[i] * vectorB[i];
  }

  if (magnitudeA === 0 || magnitudeB === 0) {
    return 0;
  }

  return dotProduct / (Math.sqrt(magnitudeA) * Math.sqrt(magnitudeB));
}

// 3. Retrieve the most relevant chunks for a question
async function retrieveRelevantChunks(textChunks, question, topK = 3) {
  if (!Array.isArray(textChunks) || textChunks.length === 0) {
    return [];
  }

  if (typeof question !== "string" || question.trim().length === 0) {
    throw new Error("A valid question is required");
  }

  if (!Number.isInteger(topK) || topK <= 0) {
    throw new Error("topK must be a positive integer");
  }

  // Generate embedding for the user's question
  const questionEmbedding = await generateEmbedding(question);

  const results = [];

  // Generate embeddings and compare each chunk
  for (let i = 0; i < textChunks.length; i++) {
    const chunkEmbedding = await generateEmbedding(textChunks[i]);

    const score = cosineSimilarity(
      questionEmbedding,
      chunkEmbedding
    );

    results.push({
      chunk: textChunks[i],
      score: score,
      index: i
    });
  }

  // Sort chunks by similarity score (highest first)
  results.sort((a, b) => b.score - a.score);

  // Return only the top matching chunks
  return results.slice(0, topK);
}

// Export all functions
module.exports = {
  splitIntoChunks,
  cosineSimilarity,
  retrieveRelevantChunks
};
