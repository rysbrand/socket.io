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

const io = new Server (server, {
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

//helper functions
//takes the assigned value of the object intno an array, uses.reduce to iterate through
//the array to condense into a single value. 0 is the initial value
function getTotalVotes() {
    return Object.values(votes).reduce((sum,v) => sum + v,0);
}

function buildDeliverable() {
    return {question, options, votes, total: getTotalVotes() };
}

//event handling
io.on("connection", (socket) => {
    console.log(`client connected: ${socket.id}`);

    //send state to new client
    socket.emit("poll_state", buildDeliverable());

    //listen for vote from client
    socket.on("vote", (optionId) => {
        if(votes[optionId] !== undefined) {
            votes[optionId] == 1;
            console.log(`vote recieved from "${optionId}" - total:`, votes);

            io.emit("poll_update", buildDeliverable());
        }
    });

    //reset event listener
    socket.on("reset_poll", () => {
        votes = Object.fromEntries(options.map((o) => [o.id, 0]));
        console.log("Poll reset!");
        io.emit("poll_update", buildDeliverable());
    });
});

//start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);
})