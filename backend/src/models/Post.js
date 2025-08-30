const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    projectId: { type: String, required: true },
    type: { type: String, enum: ["message", "comment"], required: true },
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", default: null },
    user: { id: { type: String, default: "anon" }, name: { type: String, default: "User" } },
    text: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
