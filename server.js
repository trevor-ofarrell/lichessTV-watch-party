const express = require("express");
const cors = require("cors");
const https = require("https");
const http = require("http");
const socketIO = require("socket.io");

const PORT = 3030;
const NEW_MESSAGE_EVENT = "new-message-event";

const app = express();
const server = https.createServer(app);
const io = socketIO(server, {
  cors: true,
  origins: ["localhost:3000", "https://lichess-tv-watch-party.vercel.app"],
});

app.use(cors({ credentials: true }));

const room = "general";
io.on("connection", (socket) => {
  socket.join(room);

  socket.on(NEW_MESSAGE_EVENT, (data) => {
    io.in(room).emit(NEW_MESSAGE_EVENT, data);
  });

  socket.on("disconnect", () => {
    socket.leave(room);
  });
});

app.get("/lichesstv", async function (req, res) {
  res.set({
    "Cache-Control": "no-cache",
    "Content-Type": "text/event-stream",
    "Access-Control-Allow-Origin": "*",
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
          res.write(`data: ${chunkStr}\n\n`);
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
