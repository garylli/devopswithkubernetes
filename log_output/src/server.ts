import Express from "express";
import http from "http";
import crypto from "crypto";

const app = Express();

function timestampMessage(message) {
  const timestamp = new Date(Date.now());

  const timestampedMessage = `${timestamp.toISOString()} ${message}`;

  return timestampedMessage;
}

const randomNum = generateCryptoRandomString();

function onStartup() {
  const interval = outputTimestampedMessageAtInterval(randomNum, 5);
}

function generateCryptoRandomString() {
  const hexString = crypto.randomBytes(32).toString("hex");
  console.log(hexString);
  return hexString;
}

function outputTimestampedMessageAtInterval(message, intervalInSeconds) {
  const MILLISECONDS_IN_A_SECOND = 1000;
  const interval = setInterval(
    () => console.log(timestampMessage(message)),
    intervalInSeconds * MILLISECONDS_IN_A_SECOND
  );
  return interval;
}

app.get("/current", (req, res) => {
  const message = timestampMessage(randomNum);
  res.send(message);
});

app.get("/health-check", (req, res, next) => {
  res.send("Hello world!");
});

const DEVELOPMENT_PORT = 3005;

http
  .createServer(app)
  .listen(DEVELOPMENT_PORT)
  .on("listening", () => {
    onStartup();
    console.log(`Started listening on port ${DEVELOPMENT_PORT}`);
  });
