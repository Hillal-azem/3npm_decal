const express = require("express");
const socketIo = require("socket.io");
const path = require("path");

const app = express();
const server = app.listen(5000, () => {
  console.log("Server started on http://localhost:5000");
});
const io = socketIo(server);

app.get("/monitoring-client", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "monitoring-client.html"));
});

app.get("/tata", (req, res) => {
  res.json({ message: "tata" });
});

io.on("connection", (socket) => {
  console.log("Un utilisateur s'est connecté");

  socket.on("message", (msg) => {
    console.log("Message reçu : " + msg);
    io.emit("message", msg);
  });

  setInterval(() => {
    socket.emit("message", "Message automatique");
  }, 5000);

  socket.on("disconnect", () => {
    console.log("Un utilisateur s'est déconnecté");
  });
});
