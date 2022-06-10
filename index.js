const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const routesUrls = require("./routes/routes");
const dataRouter = require("./routes/adminRoutes");
const generateUploadURL = require("./s3.js");

const http = require("http");
const server = http.createServer(app);

const io = require("socket.io")(5000, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST"],
  },
});

dotenv.config();
mongoose.connect(process.env.DATABASE_ACCESS, () =>
  console.log("Database Connected")
);

//add socketio
io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("on", (arg) => {
    io.emit("hello", "world");
    console.log(arg);
  });
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
