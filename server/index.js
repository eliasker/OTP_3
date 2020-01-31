const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const PORT = process.env.PORT || 6969;
server.listen(PORT, () => console.log(`Listening on *: ${PORT}`));

io.on("connection", socket => {
  const { id } = socket.client;
  console.log(`User connected: ${id}`);
  socket.on("message", msg => {
    console.log(`${id}: ${msg}`);
  });
});

