const Chat = require("../models/Chat");

// Send Message
exports.sendMessage = async (req, res) => {
  try {
    const { message, projectId } = req.body;

    if (!message || !projectId) {
      return res.status(400).json({ error: "Message and projectId required" });
    }

    const newMessage = await Chat.create({
      projectId,
      text: message,
      user: "Test User", // ✅ always test user for now
    });

    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Messages
exports.getMessages = async (req, res) => {
  try {
    const { projectId } = req.params;
    const messages = await Chat.find({ projectId }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Message
exports.deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    await Chat.findByIdAndDelete(id);
    res.json({ success: true, id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
