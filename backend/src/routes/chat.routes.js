const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// Get all messages/comments for a project
router.get("/:projectId", async (req, res) => {
  const { projectId } = req.params;
  try {
    const posts = await Post.find({ projectId }).sort({ createdAt: 1 });
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Create a message/comment
router.post("/", async (req, res) => {
  const io = req.app.get("io");
  const { projectId, text, type = "message", parentId = null, user = {} } = req.body;

  try {
    const post = await Post.create({ projectId, text, type, parentId, user });

    // Emit only once to the project room
    io.to(projectId).emit("newMessage", post);

    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a message/comment
router.delete("/:id", async (req, res) => {
  const io = req.app.get("io");
  const { id } = req.params;

  try {
    const post = await Post.findByIdAndDelete(id);
    if (post) {
      io.to(post.projectId).emit("deleteMessage", id);
      res.status(200).json({ message: "Deleted successfully", id });
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
