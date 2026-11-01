
const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    repositoryOwner: {
      type: String,
      required: true,
      trim: true,
    },

    repositoryName: {
      type: String,
      required: true,
      trim: true,
    },

    question: {
      type: String,
      required: true,
      trim: true,
    },

    answer: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
