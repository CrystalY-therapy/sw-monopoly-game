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
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("A player has connected: " + socket.id);

    socket.on("disconnect", () => {
        console.log("A player has disconnected: " + socket.id);
    });
});

server.listen(3001, () => {
    console.log("Server is running on port 3001");
});
