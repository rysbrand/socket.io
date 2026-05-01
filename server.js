const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

const server = http.createServer(app);

const io = newServer (server, {
    cors: {
        origin: "*",
        metjhods: ["GET", "POST"],
    },
});