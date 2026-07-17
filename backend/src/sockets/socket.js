import { Server } from "socket.io";

let io;

const onlineUsers = {};

const initSocket = (server) => {
io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
});

  io.on("connection", (socket) => {
    const userId = socket.handshake.auth.userId;
    onlineUsers[userId] = socket.id;
    io.emit("onlineUsers", Object.keys(onlineUsers));
    console.log("Online Users:", onlineUsers);

    console.log("✅ User Connected:", socket.id);

    socket.on("disconnect", () => {
      delete onlineUsers[userId];
      io.emit("onlineUsers", Object.keys(onlineUsers));
      console.log("Online Users:", onlineUsers);

      console.log("❌ User Disconnected:", socket.id);
    });
  });
};

const getIO = () => io;
const getOnlineUsers = () => onlineUsers;

export { initSocket, getIO, getOnlineUsers };
