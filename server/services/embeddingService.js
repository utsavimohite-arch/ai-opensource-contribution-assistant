
const MODEL_NAME = "onnx-community/all-MiniLM-L6-v2-ONNX";

let extractor = null;

// Load the embedding model only once
async function loadEmbeddingModel() {
  if (!extractor) {
    console.log("Loading embedding model...");

    // Dynamic import allows us to use this ESM library
    // inside our existing CommonJS backend.
    const { pipeline } = await import("@huggingface/transformers");

    extractor = await pipeline("feature-extraction", MODEL_NAME);

    console.log("Embedding model loaded successfully!");
  }

  return extractor;
}

// Convert text into a numerical embedding
async function generateEmbedding(text) {
  if (typeof text !== "string" || text.trim().length === 0) {
    throw new Error("Valid text is required to generate an embedding");
  }

  const model = await loadEmbeddingModel();

  const output = await model(text, {
    pooling: "mean",
    normalize: true,
  });

  // Convert the model output into a normal JavaScript array
  return Array.from(output.data);
}

module.exports = {
  generateEmbedding,
};
