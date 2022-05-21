const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const routesUrls = require("./routes/routes");
const dataRouter = require("./routes/adminRoutes");
const generateUploadURL = require("./s3.js");

dotenv.config();
mongoose.connect(process.env.DATABASE_ACCESS, () =>
  console.log("Database Connected")
);

app.use(express.json());
app.use(cors());
app.use("/app", routesUrls);
app.use("/result", dataRouter);
app.get("/s3url", async (req, res) => {
  const url = await generateUploadURL();
  res.send({ url });
});
app.listen(4000, () => console.log("server is running"));
app.get("/", (req, res) => {
  res.send("<h1>user</h1>");
});
