const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let players = {};

io.on("connection", (socket) => {
  console.log("A user connected: " + socket.id);

  socket.on("joinGame", ({ name, piece }) => {
    players[socket.id] = { name, piece };
    io.emit("updatePlayers", players);
  });

  socket.on("disconnect", () => {
    delete players[socket.id];
    io.emit("updatePlayers", players);
    console.log("User disconnected: " + socket.id);
  });
});

server.listen(3001, () => {
  console.log("Server running on port 3001");
});
