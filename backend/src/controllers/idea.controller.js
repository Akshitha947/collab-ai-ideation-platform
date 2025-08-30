const Idea = require("../models/Idea");
const { generateAIResponse } = require("../utils/aiHelper");


exports.createIdea = async (req, res) => {
  try {
    const { title, description, tags, projectId } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    const newIdea = new Idea({
      title,
      description,
      tags,
      projectId,
      createdBy: req.user.id,
    });

    await newIdea.save();
    return res.status(201).json(newIdea);
  } catch (err) {
    console.error("Create Idea error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


exports.getIdeas = async (req, res) => {
  try {
    const { projectId } = req.query;
    const filter = projectId ? { projectId } : {};

    const ideas = await Idea.find(filter).populate("createdBy", "name email");
    return res.json(ideas);
  } catch (err) {
    console.error("Get Ideas error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


exports.getIdeaById = async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id).populate("createdBy", "name email");
    if (!idea) return res.status(404).json({ message: "Idea not found" });

    return res.json(idea);
  } catch (err) {
    console.error("Get Idea error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


exports.updateIdea = async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    const idea = await Idea.findById(req.params.id);

    if (!idea) return res.status(404).json({ message: "Idea not found" });
    if (idea.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    idea.title = title || idea.title;
    idea.description = description || idea.description;
    idea.tags = tags || idea.tags;

    await idea.save();
    return res.json(idea);
  } catch (err) {
    console.error("Update Idea error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


exports.deleteIdea = async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    if (!idea) return res.status(404).json({ message: "Idea not found" });

    if (idea.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await idea.deleteOne();
    return res.json({ message: "Idea deleted" });
  } catch (err) {
    console.error("Delete Idea error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.generateIdea = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    const aiText = await generateAIResponse(prompt);
    return res.json({ generatedIdea: aiText });
  } catch (err) {
    console.error("AI Generate Idea error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
