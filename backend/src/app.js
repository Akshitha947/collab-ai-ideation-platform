const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const authRoutes = require("./routes/auth.routes");
const ideaRoutes = require("./routes/idea.routes");
const analyticsRoutes = require("./routes/analyticsRoute");
const projectRoutes = require("./routes/project.routes");



require("./config/db"); // initialize DB

const chatRoutes = require("./routes/chat.routes");

const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

app.get("/", (_req, res) => res.json({ ok: true, name: "collab-ai-backend", status: "running" }));

app.use("/api/chats", chatRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/ideas", ideaRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/projects", projectRoutes);


module.exports = app;


