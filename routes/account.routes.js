// routes/accounts.js
const express = require("express");
const router = express.Router();
const Account = require("../models/Account.model");
const User = require("../models/User.model");
const { isAuthenticated } = require("../middlewares/route-guard.middleware");

// Route to create a new account
router.post("/", isAuthenticated, async (req, res) => {
  try {
    const { userId, accountName, currency, balance = 0 } = req.body;

    // Verify if the currency is valid
    if (!"EUR".includes(currency)) {
      return res.status(400).json({ message: "This app only works in EUR" });
    }

    // Verify if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "You cannot create an account balance without a user",
      });
    }

    // Verify if there is an existing account
    const existingAccount = await Account.findOne({ userId });
    if (existingAccount) {
      return res
        .status(400)
        .json({ message: "There is already an open account" });
    }

    // Create a new account
    const account = new Account({ userId, accountName, currency, balance });
    await account.save();

    res.status(201).json({ message: "Account balance created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to get all accounts
router.get("/", isAuthenticated, async (req, res) => {
  try {
    const accounts = await Account.find();
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
