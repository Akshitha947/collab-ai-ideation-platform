
const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task.controller");
const { auth } = require("../middleware/auth.middleware");

// CRUD routes
router.post("/", auth, taskController.createTask);
router.get("/project/:projectId", auth, taskController.getTasks);
router.put("/:id", auth, taskController.updateTask);
router.delete("/:id", auth, taskController.deleteTask);

module.exports = router;
