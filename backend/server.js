
require("dotenv").config();
const http = require("http");
const app = require("./src/app");
const { Server } = require("socket.io");

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Client connected", socket.id);

 
  socket.on("joinProject", (projectId) => {
    socket.join(projectId);
    console.log(`Client ${socket.id} joined project ${projectId}`);
  });

  socket.on("disconnect", () => {
    console.log(" Client disconnected", socket.id);
  });
});


app.set("io", io);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});