const Comment = require("../models/Comment");

// ➕ Add Comment
const addComment = async (req, res) => {
  try {
    const { taskId, text } = req.body;
    const comment = await Comment.create({
      taskId,
      userId: req.user ? req.user._id : null,
      text,
    });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📥 Get Comments
const getComments = async (req, res) => {
  try {
    const { taskId } = req.params;
    const comments = await Comment.find({ taskId }).sort({ createdAt: 1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ❌ Delete Comment
const deleteComment = async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.json({ message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Proper export
module.exports = { addComment, getComments, deleteComment };
