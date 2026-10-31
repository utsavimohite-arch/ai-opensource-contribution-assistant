
const express = require("express");

const {
  answerRepositoryQuestion
} = require("../services/aiService");

const router = express.Router();

router.post("/ask", async (req, res) => {
  try {
    const { readme, question } = req.body;

    if (!readme || typeof readme !== "string") {
      return res.status(400).json({
        success: false,
        message: "Valid README content is required",
      });
    }

    if (!question || typeof question !== "string") {
      return res.status(400).json({
        success: false,
        message: "A valid question is required",
      });
    }

    const result = await answerRepositoryQuestion(readme, question);

    res.json({
      success: true,
      answer: result.answer,
      retrievedChunks: result.retrievedChunks,
      documentationLinks: result.documentationLinks || [],
    });

  } catch (error) {
    console.error("RAG Question Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to answer repository question",
    });
  }
});

module.exports = router;
