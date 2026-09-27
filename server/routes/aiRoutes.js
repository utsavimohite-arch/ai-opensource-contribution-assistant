const express = require("express");
const { analyzeReadme } = require("../services/aiService");

const router = express.Router();

// Analyze README using Gemini
router.post("/analyze-readme", async (req, res) => {
  try {
    const { readme } = req.body;

    if (!readme) {
      return res.status(400).json({
        success: false,
        message: "README content is required",
      });
    }

    const analysis = await analyzeReadme(readme);

    res.json({
      success: true,
      analysis,
    });
  } catch (error) {
    console.error("Gemini API Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to analyze README",
    });
  }
});

module.exports = router;