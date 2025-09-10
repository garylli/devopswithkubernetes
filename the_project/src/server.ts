import express from "express";
import http from "http";
import { config } from "dotenv";
config();

const app = express();

if (!process.env.PORT) {
  throw Error("No port found in .env");
}

const PORT = process.env.PORT;

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
