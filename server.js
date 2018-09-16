const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const port = process.env.PORT || 8080;
const index = require("./routes/index");
const app = express();
const server = http.createServer(app);
const io = socketIo(server); // < Interesting!
let casual = require('casual');
let uuid = require('uuid');
let path = require('path');
app.use(index);

app.use(express.static(path.join(__dirname, "/client/build")));
let interval ;

io.on("connection", socket => {
    console.log("New client connected");
    if (interval) {
        clearInterval(interval);
    }
    interval = setInterval(() => getApiAndEmit(socket), 2000);
    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

let generateNotification = () => {
    const notificationTypes = ["notifications", "tasks", "reminders"];
    let currentDate = new Date();
    let key = notificationTypes[(Math.random() * notificationTypes.length) | 0];
    return {
        notificationAction: `View ${key}`,
        key: uuid(),
        notificationDate: (currentDate - casual.integer(1000, 259200000)),
        notificationText: casual.sentence,
        type: key
    };
};

const getApiAndEmit = socket => {
    try {
        const data = generateNotification();
        socket.emit("FromAPI", data); // Emitting a new message. It will be consumed by the client
    } catch (error) {
        console.error(`Error: ${error.code}`);
    }
};

server.listen(port, () => console.log(`Listening on port ${port}`));