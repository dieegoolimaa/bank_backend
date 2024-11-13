require("dotenv").config();

const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const cookieParser = require("cookie-parser");

const app = express();
const FRONTEND_URL = process.env.FRONTEND_URL;

// Set up middleware
app.set("trust proxy", 1);
app.use(express.json());
app.use(cors({ origin: FRONTEND_URL }));
app.use(logger("dev"));
app.use(cookieParser());

// Routes
const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

// Error handling middleware in case there is no route found
const errorHandler = require("./middlewares/error-handling");
app.use(errorHandler);

// Export the app instance
module.exports = app;
