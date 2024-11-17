require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const app = express();
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

app.use(express.json());
app.use(logger("dev"));
app.use(cookieParser());

app.use(
  cors({
    origin: FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", FRONTEND_URL);
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

// Handle preflight requests
app.options("*", cors());

// Routes
const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

// Error handling middleware
const errorHandler = require("./middlewares/error-handling");
app.use(errorHandler);

module.exports = app;
