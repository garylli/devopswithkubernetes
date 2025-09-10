import express from "express";
import http from "http";

const server = express();

if (!process.env.PORT) {
  throw Error('No environment variable "PORT" found.');
}

const PORT = process.env.PORT;
let count = 0;

server.use((req, res, next) => {
  const message = [];
  message.push(req.originalUrl);
  next();
  message.push(res.statusCode);

  console.log(message);
});

server.get("/pingpong", (_, res) => {
  res.send(`pong ${count}`).status(200);
  count += 1;
});

const serverInstance = http
  .createServer(server)
  .listen(PORT)
  .on("listening", () => {
    console.log(`Server listening on`, serverInstance.address());
  });
