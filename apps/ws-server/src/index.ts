import { WebSocketServer } from "ws";
import { prisma } from "@repo/db/prisma";
const server = new WebSocketServer({ port: 8080 });

server.on("connection", (socket) => {
  prisma.user.create({
    data: {
      username: Math.floor(Math.random() * 100).toString(),
      password: Math.floor(Math.random() * 100).toString(),
    },
  });

  socket.send("hello");
});
