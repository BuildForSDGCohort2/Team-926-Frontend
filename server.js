const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const {v4: uuidv4} = require("uuid");
const { Socket } = require("dgram");
app.set("view engine", "ejs");  
app.use(express.static("public"));

app.get("/", (req, res) => {
  /*res.status(200).send("Hello African Health Store");*/
  res.redirect(`/${uuidv4()}`); /*Using string literals*/
});

app.get('/:room', (req, res) => {
  res.render('room', { roomId: req.params.room })
})

io.on("connection", socket => {
  socket.on("join-room", (roomId) => {
    /*console.log("We've joined the room");*/
    socket.join(roomId);
    socket.to(roomId).broadcast.emit("user-connected");
  })
})




server.listen(2020);