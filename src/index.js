const app = require("./app");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const http = require("http");
const socket = require("socket.io");

dotenv.config({ path: "./src/config/config.env" }); //load env vars

//global vars
global.io; 
global.onlineUsers = [];

//server setup
const PORT = process.env.PORT || 8001;

var server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});

//socket.io
global.io = socket(server, {
  cors: {
    origin: "*",
  },
});

global.io.on("connection", (socket) => {
  console.log("connected to socket", socket.id);
  global.io.to(socket.id).emit("reconnect", socket.id);
  socket.on("join", (userId) => {
    addUser(userId, socket.id);
  });
  socket.on("logout", () => {
    removeUser(socket.id);
  });
  socket.on("disconnect", () => {
    removeUser(socket.id);
    console.log("user disconnected", socket.id);
  });
});