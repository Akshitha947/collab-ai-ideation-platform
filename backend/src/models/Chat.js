const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    projectId: {
      type: String, // keep it simple string for now
      required: true,
    },
    user: {
      type: String,
      default: "Test User", // ✅ always sets test user for now
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", chatSchema);
