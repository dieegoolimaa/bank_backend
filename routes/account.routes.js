// routes/accounts.js
const express = require("express");
const router = express.Router();
const Account = require("../models/Account.model");
const User = require("../models/User.model");
const { isAuthenticated } = require("../middlewares/route-guard.middleware");

// Route to create a new account
router.post("/", isAuthenticated, async (req, res) => {
  try {
    const { userId, accountName } = req.body;

    // Verify if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // It creates a new account and saves it to the database
    const newAccount = new Account({ userId, accountName });
    await newAccount.save();

    res.status(201).json(newAccount);
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

// Route to get a specific account
router.get("/:accountId", isAuthenticated, async (req, res) => {
  try {
    const { accountId } = req.params;
    const account = await Account.findById(accountId);

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    res.json(account);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
