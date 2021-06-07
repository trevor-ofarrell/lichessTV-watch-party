const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const https = require("https");
const http = require("http");
const socketIO = require("socket.io");
const { addUser, removeUser, getUsersInRoom } = require("./users");
const { addMessage, getMessagesInRoom } = require("./server/messages");

const PORT = 3030;
const NEW_MESSAGE_EVENT = "new-message-event";
const USER_JOIN_CHAT_EVENT = "USER_JOIN_CHAT_EVENT";
const USER_LEAVE_CHAT_EVENT = "USER_LEAVE_CHAT_EVENT";
const NEW_CHAT_MESSAGE_EVENT = "NEW_CHAT_MESSAGE_EVENT";
const START_TYPING_MESSAGE_EVENT = "START_TYPING_MESSAGE_EVENT";
const STOP_TYPING_MESSAGE_EVENT = "STOP_TYPING_MESSAGE_EVENT";

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: true,
  origins: [
    "http://localhost:3000",
    "https://lichess-tv-watch-party.vercel.app",
    "http://lichess-tv-watch-party.vercel.app",
  ],
});

app.use(
  cors({
    origin: [
      "https://lichess-tv-watch-party.vercel.app",
      "http://localhost:3000",
    ],
    allowedHeaders: [
      "Accept-Version",
      "Authorization",
      "Credentials",
      "Content-Type",
    ],
    credentials: true,
  })
);

io.on("connection", (socket) => {
  console.log(`${socket.id} connected`);

  // Join a conversation
  const { roomId, name } = socket.handshake.query;
  socket.join(roomId);

  const user = addUser(`${socket.id}${name}`, roomId, name);
  io.in(roomId).emit(USER_JOIN_CHAT_EVENT, user);

  // Listen for new messages
  socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
    const message = addMessage(roomId, data);
    io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, message);
  });

  // Listen typing events
  socket.on(START_TYPING_MESSAGE_EVENT, (data) => {
    io.in(roomId).emit(START_TYPING_MESSAGE_EVENT, data);
  });
  socket.on(STOP_TYPING_MESSAGE_EVENT, (data) => {
    io.in(roomId).emit(STOP_TYPING_MESSAGE_EVENT, data);
  });

  // Leave the room if the user closes the socket
  socket.on("disconnect", () => {
    removeUser(socket.id);
    io.in(roomId).emit(USER_LEAVE_CHAT_EVENT, user);
    socket.leave(roomId);
  });
});

app.get("/rooms/:roomId/users", (req, res) => {
  const users = getUsersInRoom(req.params.roomId);
  return res.json({ users });
});

app.get("/rooms/:roomId/messages", (req, res) => {
  const messages = getMessagesInRoom(req.params.roomId);
  return res.json({ messages });
});

app.get("/lichesstv", async function (req, res) {
  res.set({
    "Cache-Control": "no-cache",
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
  });
  res.flushHeaders();

  res.write("retry: 10000\n\n");

  function streamEvents() {
    req = https.get(
      "https://lichess.org/api/tv/feed",
      {
        headers: { Authorization: `Bearer ${process.env.LICHESS_API_TOKEN}` },
      },
      (resp) => {
        resp.on("data", (chunk) => {
          const chunkStr = chunk.toString().trim();
          if (chunkStr.length) {
            res.write(`data: ${chunkStr}\n\n`);
            //console.log(chunkStr);
          }
        });
      }
    );
    req.on("error", (err) => {
      throw new Error(err);
    });
  }
  streamEvents();
});

app.get("/lichesstvcustom", async function (request, res) {
  res.set({
    "Cache-Control": "no-cache",
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
  });
  res.flushHeaders();

  res.write("retry: 10000\n\n");

  function streamEvents() {
    req = https.get(
      `https://lichess.org/api/stream/game/${request.query.id}`,
      {
        headers: { Authorization: `Bearer ${process.env.LICHESS_API_TOKEN}` },
      },
      (resp) => {
        resp.on("data", (chunk) => {
          const chunkStr = chunk.toString().trim();
          if (chunkStr.length) {
            res.write(`data: ${chunkStr}\n\n`);
            //console.log(chunkStr);
          }
        });
      }
    );
    req.on("error", (err) => {
      throw new Error(err);
    });
  }
  streamEvents();
});

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
