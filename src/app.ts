import express from "express";
import cors from "cors";
import "dotenv/config";
import sidController from "./controllers/sid";
import analysisController from "./controllers/analysis";
import relationshipsController from "./controllers/relationships"
import attackController from "./controllers/attack"

import { connectToMongo } from "./config/db";

const PORT = process.env.PORT || 3000;

import http from "http";
import { Server } from "socket.io";

const app = express();
connectToMongo();

const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "*", 
    methods: "*",
  },
});
import "./socket/io";

app.use(express.json());
app.use(cors());

app.use("/api", sidController);
app.use("/api/analysis", analysisController);
app.use("/api/relationships", relationshipsController);
app.use("/api/attack", attackController);

server.listen(PORT, () => {
  console.log(`Server started, Visit "http://localhost:${PORT}"`);
});
