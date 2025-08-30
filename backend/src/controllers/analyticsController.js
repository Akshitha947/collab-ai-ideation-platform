

const Project = require("../models/Project.js");
const Task = require("../models/Task.js");
const Idea = require("../models/Idea.js"); // if you have idea module

const getAnalytics = async (req, res) => {
  try {
    const userId = req.user._id;

    // Projects owned or member of
    const userProjects = await Project.find({
      $or: [{ owner: userId }, { members: userId }],
    }).populate("members");

    const projectIds = userProjects.map((p) => p._id);

    // Tasks in those projects
    const tasks = await Task.find({ project: { $in: projectIds } });

    const totalProjects = projectIds.length;
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((t) => t.status === "completed").length;
    const pendingTasks = tasks.filter((t) => t.status === "pending").length;
    const inProgressTasks = tasks.filter((t) => t.status === "in-progress").length;

    const completionRate =
      totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    // Optional: ideas (if Idea model exists)
    let totalIdeas = 0;
    try {
      totalIdeas = await Idea.countDocuments({ project: { $in: projectIds } });
    } catch (e) {
      totalIdeas = 0; // if no Idea model exists
    }

    // Unique team members across all projects
    const allMembers = new Set();
    userProjects.forEach((p) => {
      p.members.forEach((m) => allMembers.add(m._id.toString()));
    });

    // AI-driven insights (basic examples)
    const aiInsights = [];
    if (completionRate < 50) {
      aiInsights.push("Less than half of your tasks are completed. Consider focusing on high-priority tasks.");
    }
    if (pendingTasks > inProgressTasks) {
      aiInsights.push("You have more pending tasks than in-progress tasks. Try assigning work to balance load.");
    }
    if (completedTasks > pendingTasks) {
      aiInsights.push("Great progress! Completed tasks outnumber pending ones.");
    }

    // ✅ Flattened response
    res.json({
      totalProjects,
      totalTasks,
      tasksCompleted: completedTasks,
      tasksPending: pendingTasks,
      tasksInProgress: inProgressTasks,
      completionRate: parseFloat(completionRate.toFixed(2)),
      totalIdeas,
      teamMembers: allMembers.size,
      aiInsights,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

module.exports = getAnalytics;
