const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 1111;
let balance = 0;

let onlineUsers = 0;

// Отдаём клиентскую часть
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  onlineUsers ++;
  io.emit("onlineUsers", onlineUsers);

socket.on("addPoint", () =>{
  balance ++;
  socket.emit("balanceUpdate", balance)
})

socket.emit("balanceUpdate", balance);

  socket.on("disconnect", () => {
    console.log("Пользователь отключился");
    onlineUsers--; // -1 когда кто-то ушёл
    io.emit("onlineUsers", onlineUsers); // сообщаем всем
  });
  });


server.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
