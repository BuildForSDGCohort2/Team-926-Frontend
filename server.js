const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const {v4: uuidv4} = require("uuid");
const { ExpressPeerServer } = require("peer");
const peerServer = ExpressPeerServer(server, {
  debug: true
});

app.use('/peerjs', peerServer);
app.set("view engine", "ejs");  
app.use(express.static("public"));


app.get("/", (req, res) => {
  /*res.status(200).send("Hello African Health Store");*/
  res.redirect(`/${uuidv4()}`); /*Using string literals*/
});

app.get("/:room", (req, res) => {
  res.render("room", { roomId: req.params.room });
});

io.on("connection", socket => {
  socket.on("join-room", (roomId, userId) => {
    socket.join(roomId);
    socket.to(roomId).broadcast.emit("user-connected", userId);
    // Recieve Messages
    socket.on("message", (message) => {
      //Sending message to the same room
      io.to(roomId).emit("createMessage", message);
  }); 

    
    socket.on("disconnect", () => {
      socket.to(roomId).broadcast.emit("user-disconnected", userId);
    })
  })
});
server.listen(process.env.PORT||2020);