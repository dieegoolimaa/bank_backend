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
    if (!["USD", "EUR", "BRL"].includes(currency)) {
      return res.status(400).json({ message: "Invalid currency" });
    }

    // Verify if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found to create account balance" });
    }

    // Create a new account
    const account = new Account({ userId, accountName, currency, balance });
    await account.save();

    // Create a initial balance transaction
    if (balance > 0) {
      const transaction = new Transaction({
        accountId,
        type: "credit",
        amount: balance,
        currency,
      });
      await transaction.save();
    }

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
