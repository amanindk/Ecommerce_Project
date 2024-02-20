// const express = require("express");
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import router from "./routes/authRoute.js";
import bodyParser from "body-parser";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

//rest api
const app = express();
// const path = require("path");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(bodyParser.json({ limit: '50mb' }));

// app.get("/", (req, res) => {
//   app.use(express.static(path.resolve(__dirname, "frontend", "dev")));
//   res.sendFile(path.resolve(__dirname, "frontend", "dev", "index.html"));
// });

//configure env
dotenv.config();

//database config
connectDB();

//esmodule fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//routes
app.use("/api", router);
app.use("/api", categoryRoute);
app.use("/api", productRoute);

//middlewars
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "./frontend/build")));

// app.get("/", (req, res) => {
//   res.send({
//     message: "Welcome to Dial2shop",
//   });
// });

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./frontend/build/index.html"));
});

//Port
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(`Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`);
});
