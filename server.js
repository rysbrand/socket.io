const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
//look any file in the public folder, not just one file, __dirname appends the file path, so it launches
//no matter where you run node from
app.use(express.static(path.join(__dirname, "public")));

const server = http.createServer(app);

const io = newServer (server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

//setting vote info
const question = "What's your programming language? 🐻‍❄️";

const options = [
  { id: "js",     label: "JavaScript 🌸", emoji: "🌸" },
  { id: "python", label: "Python 🍓",     emoji: "🍓" },
  { id: "cpp",    label: "C++ 🎀",        emoji: "🎀" },
  { id: "csharp", label: "C# 💗",         emoji: "💗" },
];

//vote mapping
//sets them equal to zero
let votes = Object.fromEntries(options.map((o) => [o.id,  0]));

