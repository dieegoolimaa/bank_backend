// Authentication routes
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require("../middlewares/route-guard.middleware");

// User model for bank app
const User = require("../models/User.model");

// Register a new user
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body || {};

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Login a user
router.post("/login", async (req, res) => {
  try {
    // Login with email or username and password
    const { email, password } = req.body || {};

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "This user does not exist in our database" });
    }

    // Generate a JWT token through cookies
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Set the token as a cookie and send a success response
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000, // 1 hora
    });
    res.status(200).send("Logged in successfully");
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Logout a user
router.post("/logout", (req, res) => {
  res.clearCookie("authToken");
  res.status(200).send("Logged out successfully");
});

// Verify if the user is authenticated
router.get("/protected", isAuthenticated, (req, res) => {
  res.status(200).json({ message: "User is authenticated" });
});

module.exports = router;
