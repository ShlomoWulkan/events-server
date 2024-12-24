import express from "express";
import cors from "cors";
import "dotenv/config";
import sidRouter from "./controllers/sid";
import analysisRouter from "./routes/analysisRouter";
import relationshipsRouter from "./routes/relationshipsRouter"
import attackRouter from "./routes/attackRouter"

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

app.use("/api", sidRouter);
app.use("/api/analysis", analysisRouter);
app.use("/api/relationships", relationshipsRouter);
app.use("/api/attack", attackRouter);

server.listen(PORT, () => {
  console.log(`Server is running on "http://localhost:${PORT}"`);
});
