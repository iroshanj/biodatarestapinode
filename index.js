const fs = require("fs");
const http = require("http");
const cors = require("cors");
const express = require("express");
const multer = require("multer");
const path = require("path");
const usercontroller = require("./controller/usercontroller");
const server = express();
const mongoose = require("mongoose");
const axios = require("axios");
const crypto = require("crypto");
require("dotenv").config();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./upload/images"), // cb -> callback
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage: storage,
});

server.use("/photo", express.static("./upload/images"));
main().catch((err) => console.log(err));
async function main() {
  //await mongoose.connect("mongodb://127.0.0.1:27017/vivah"); //local db
  await mongoose.connect(
    "mongodb+srv://coderrj:Gz5FriJ2Iku5Uv5U@cluster0.kociyne.mongodb.net/?"
  ); //live db
  console.log("database connected");
}
server.use(express.json());
server.use(cors());

server.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

server.get("/user", usercontroller.getAllUsers);
server.get("/user/:id", usercontroller.getUserById);
server.post("/user", usercontroller.addNewUser);
server.post("/login", usercontroller.login);
server.post("/delete", usercontroller.delete);
server.post("/update", usercontroller.update);

server.post("/upload", upload.single("photo"), (req, res) => {
  console.log(req.file);
  res.json({
    success: 1,
    url: `https://biodatarestapinode-1.onrender.com//photo/${req.file.filename}`,
  });
});

server.listen(process.env.PORT || 5000);
