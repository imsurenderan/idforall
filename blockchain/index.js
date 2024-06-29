require("dotenv").config();
const http = require("http");
const worker = require("./worker");

// Health Checker
const requestListener = (req, res) => {
  res.writeHead(200);
  res.end();
};
const server = http.createServer(requestListener);
server.listen(8000, () => {
  console.log("Started: Blockchain Health Checker"); // eslint-disable-line no-console
});

worker();
