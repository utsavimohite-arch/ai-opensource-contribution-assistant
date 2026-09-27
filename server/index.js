const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const githubRoutes = require("./routes/githubRoutes");
const aiRoutes = require("./routes/aiRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "AI Open Source Contribution Assistant backend is running!",
  });
});

// GitHub API routes
app.use("/api/github", githubRoutes);

// AI / Gemini routes
app.use("/api/ai", aiRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});