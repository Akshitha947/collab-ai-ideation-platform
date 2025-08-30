
const Task = require("../models/Task");

// ✅ Create Task
exports.createTask = async (req, res) => {
  try {
    const { projectId, title, description, status, priority, assignee, dueDate, tags } = req.body;
    if (!projectId || !title) {
      return res.status(400).json({ message: "ProjectId and Title are required" });
    }

    const newTask = new Task({
      projectId,
      title,
      description,
      status: status || "todo",
      priority,
      assignee,
      dueDate,
      tags,
      createdBy: req.user?.id || null,
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    console.error("Create Task error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get Tasks by Project
exports.getTasks = async (req, res) => {
  try {
    const { projectId } = req.params;
    const tasks = await Task.find({ projectId });
    res.json(tasks);
  } catch (err) {
    console.error("Get Tasks error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Update Task
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    console.error("Update Task error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Delete Task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (err) {
    console.error("Delete Task error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
