const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const routesUrls = require("./routes/routes");
const dataRouter = require("./routes/adminRoutes");
const generateUploadURL = require("./s3.js");

//add socketio
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    methods: ["GET", "POST"],
  },
});
//end socketio

dotenv.config();
mongoose.connect(process.env.DATABASE_ACCESS, () =>
  console.log("Database Connected")
);

//add socketio
io.on("connection", (socket) => {
  socket.emit("hello", "world");
  socket.on("on", (arg) => {
    socket.emit("hello", "world");
    console.log(arg);
  });
  console.log("a user connected");
});

//end socketio

app.use(express.json());
app.use(cors());
app.use("/app", routesUrls);
app.use("/result", dataRouter);
app.get("/s3url", async (req, res) => {
  const url = await generateUploadURL();
  res.send({ url });
});
server.listen(4000, () => console.log("server is running")); //changed app to server
app.get("/", (req, res) => {
  res.send("<h1>user</h1>");
});
