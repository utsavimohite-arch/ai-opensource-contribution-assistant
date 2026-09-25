const express = require("express");
const cors = require("cors");
require("dotenv").config();

const githubRoutes = require("./routes/githubRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "AI Open Source Contribution Assistant backend is running!",
  });
});

app.use("/api/github", githubRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});