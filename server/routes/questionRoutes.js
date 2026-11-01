
const express = require("express");

const {
  answerRepositoryQuestion,
} = require("../services/aiService");

const Chat = require("../models/Chat");

const router = express.Router();

// Ask a question and save the conversation
router.post("/ask", async (req, res) => {
  try {
    const { readme, question, owner, repo } = req.body;

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

    // Generate the answer using the existing RAG service
    const result = await answerRepositoryQuestion(readme, question);

    let historySaved = false;

    // Save the conversation when repository details are provided
    if (
      typeof owner === "string" &&
      owner.trim() &&
      typeof repo === "string" &&
      repo.trim()
    ) {
      try {
        await Chat.create({
          repositoryOwner: owner.trim(),
          repositoryName: repo.trim(),
          question: question.trim(),
          answer: result.answer,
        });

        historySaved = true;
      } catch (databaseError) {
        console.error("Chat History Save Error:", databaseError.message);
      }
    }

    res.json({
      success: true,
      answer: result.answer,
      retrievedChunks: result.retrievedChunks,
      documentationLinks: result.documentationLinks || [],
      historySaved,
    });
  } catch (error) {
    console.error("RAG Question Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to answer repository question",
    });
  }
});

// Retrieve previous conversations for a repository
router.get("/history/:owner/:repo", async (req, res) => {
  try {
    const { owner, repo } = req.params;

    const chats = await Chat.find({
      repositoryOwner: owner,
      repositoryName: repo,
    })
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({
      success: true,
      count: chats.length,
      history: chats,
    });
  } catch (error) {
    console.error("Chat History Retrieval Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve chat history",
    });
  }
});

module.exports = router;
