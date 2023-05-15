const path = require("path");
dotenv = require("dotenv").config({ path: path.resolve("./.env") });
const express = require("express");
const port = process.env.port;
const cors = require("cors");
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: process.env.cors_origin,
  })
);
//db
const db = require("./models");
db.sequelize.sync({ alter: true });

//routes
const { authRoutes } = require("./routes");
const { profileRoutes } = require("./routes");
//middleware
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

app.listen(port, function () {
  console.log(`server is running on localhost ${port}`);
});
