const express = require("express");
const router = express.Router();
const { addComment, getComments, deleteComment } = require("../controllers/comment.controller");

// remove `protect` for now if causing issues
// router.post("/", protect, addComment);
router.post("/", addComment);
router.get("/:taskId", getComments);
router.delete("/:id", deleteComment);

module.exports = router;
