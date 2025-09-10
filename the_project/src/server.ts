import express from "express";
import http from "http";

const app = express();

const RANDOM_AVAILABLE_PORT = 0;
const PORT = RANDOM_AVAILABLE_PORT;

app.get("/", (req, res) => {
  res.send("<div>Some basic HTML</div>");
});

const server = http
  .createServer(app)
  .listen(PORT)
  .on("listening", () => {
    const serverAddress = server.address();
    let port: number | undefined = undefined;
    if (!serverAddress) {
      throw Error("Expected server address to exist but got none");
    }
    if (typeof serverAddress == "string") {
      port = Number(serverAddress.split(":", 2)[1]);
    } else {
      port = serverAddress.port;
    }

    const OUTPUT_MESSAGE = `Server started in port ${port}`;

    console.log(OUTPUT_MESSAGE);
  });
