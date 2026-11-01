
const dns = require("node:dns");
const mongoose = require("mongoose");

// Use Cloudflare DNS to resolve MongoDB Atlas SRV records
dns.setServers(["1.1.1.1"]);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "opensource_assistant",
    });

    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    throw error;
  }
};

module.exports = connectDB;
