import { WebSocketServer } from "ws";

const wss = new WebSocketServer({
  port: 8080,
  perMessageDeflate: {
    zlibDeflateOptions: { chunkSize: 1024, memLevel: 7, level: 3 },
    zlibInflateOptions: { chunkSize: 10 * 1024 },
  },
});

wss.on("listening", () => {
  console.log(`Listening on ${wss.options.host ? wss.options.host : "ws://127.0.0.1"}:${wss.options.port}`);
});

wss.on("connection", (ws, req) => {
  const ip = req.socket.remoteAddress;

  ws.on("error", console.error);

  ws.send("You have successfully connected to the server!");

  ws.on("message", (data) => {
    console.log(`[${ip}] Received: ${data}`);
    ws.send(`We got your message: ${data}`);
  });
});
