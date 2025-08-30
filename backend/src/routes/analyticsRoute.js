

const express = require("express");
const { auth } = require("../middleware/auth.middleware.js");
const getAnalytics = require("../controllers/analyticsController.js");

const router = express.Router();

router.get("/", auth, getAnalytics);

module.exports = router;
