// routes/accounts.js
const express = require("express");
const router = express.Router();
const Account = require("../models/Account.model");
const User = require("../models/User.model");

// Route to create a new account
router.post("/", async (req, res) => {
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

// Route to get a specific account
router.get("/:accountId", async (req, res) => {
  try {
    const { accountId } = req.params;
    const account = await Account.findById(accountId);

    if (!account) {
      return res.status(404).json({ message: "Conta não encontrada." });
    }

    res.json(account);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Routes to get all accounts for a specific user
router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const accounts = await Account.find({ userId });

    if (!accounts || accounts.length === 0) {
      return res
        .status(404)
        .json({ message: "Nenhuma conta encontrada para este usuário." });
    }

    res.json(accounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
