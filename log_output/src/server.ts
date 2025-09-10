import Express from "express";
import http from "http";
import crypto from "crypto";

const app = Express();

function onStartup() {
  const randomNum = generateCryptoRandomString();
  const interval = outputAtInterval(randomNum, 5);
}

function generateCryptoRandomString() {
  const hexString = crypto.randomBytes(32).toString("hex");
  console.log(hexString);
  return hexString;
}

function outputAtInterval(output, intervalInSeconds) {
  const MILLISECONDS_IN_A_SECOND = 1000;
  const timestamp = new Date(Date.now());

  const MESSAGE = `${timestamp.toISOString()} ${output}`;

  const interval = setInterval(
    () => console.log(MESSAGE),
    intervalInSeconds * MILLISECONDS_IN_A_SECOND
  );
  return interval;
}

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
