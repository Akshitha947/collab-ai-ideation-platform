// src/routes/idea.routes.js
const express = require("express");
const router = express.Router();
const ideaController = require("../controllers/idea.controller");
const { auth } = require("../middleware/auth.middleware"); // ✅ import correct name

// Create new idea
router.post("/", auth, ideaController.createIdea);

// Get all ideas
router.get("/", auth, ideaController.getIdeas);

// Get single idea
router.get("/:id", auth, ideaController.getIdeaById);

// Update idea
router.put("/:id", auth, ideaController.updateIdea);

// Delete idea
router.delete("/:id", auth, ideaController.deleteIdea);

// AI-powered idea generation
router.post("/generate", auth, ideaController.generateIdea);

module.exports = router;
