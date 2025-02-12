import { createServer } from "node:http";
import { handler } from "./.output/server/index.mjs";

const PORT = 3000;

const server = createServer(handler);
server.listen(PORT, () => {
  console.log(`Server listen on port: ${PORT}`);
});

server.on("request", (req) => {
  const { method, url } = req;
  console.log(`${method}: ${url}`);
});

server.keepAliveTimeout = process.env.KEEP_ALIVE_TIMEOUT ? Number(process.env.KEEP_ALIVE_TIMEOUT) : 61000;
server.headersTimeout = process.env.HEADERS_TIMEOUT ? Number(process.env.HEADERS_TIMEOUT) : 62000;
