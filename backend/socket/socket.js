let io;

module.exports = {
  init: (server) => {
    io = require("socket.io")(server, {
      cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
      }
    });

    io.on("connection", (socket) => {

      console.log("🟢 Connected:", socket.id);

      // ⭐ USER JOINS ORDER ROOM
      socket.on("join-order-room", (orderId) => {
        socket.join(orderId);
        console.log("User Joined Room:", orderId);
      });

      // ⭐ RIDER SENDS LOCATION
      socket.on("riderLocationUpdate", (data) => {

        // SEND ONLY TO THAT ORDER ROOM
        io.to(data.orderId).emit("riderLocationUpdate", data);

      });

      socket.on("disconnect", () => {
        console.log("🔴 Disconnected:", socket.id);
      });

    });

    return io;
  },

  getIO: () => {
    if (!io) throw new Error("Socket not initialized!");
    return io;
  }
};