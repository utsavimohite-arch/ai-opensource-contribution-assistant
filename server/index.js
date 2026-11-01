
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

// Database connection
const connectDB = require("./config/db");

// Existing routes
const githubRoutes = require("./routes/githubRoutes");
const aiRoutes = require("./routes/aiRoutes");
const questionRoutes = require("./routes/questionRoutes");

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

// RAG-powered repository question routes
app.use("/api/questions", questionRoutes);

// Connect to MongoDB before starting the server
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error.message);
    process.exit(1);
  }
};

startServer();
