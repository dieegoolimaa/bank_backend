// Routes transactions
const router = require("express").Router();
const express = require("express");
const Transaction = require("../models/Transaction.model");
const Account = require("../models/Account.model");

// Route to create a new transaction
router.post("/", async (req, res) => {
  try {
    const { accountId, type, amount, currency } = req.body;

    // Verify if the currency is valid
    if (!["USD", "EUR", "BRL"].includes(currency)) {
      return res.status(400).json({ message: "Invalid currency" });
    }

    // Verify if the account exists
    const account = await Account.findById(accountId);
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    // Create a new transaction
    const transaction = new Transaction({ accountId, type, amount, currency });
    await transaction.save();

    // Update the account balance
    const balanceUpdate = type === "credit" ? amount : -amount;
    account.balance[currency] =
      (account.balance[currency] || 0) + balanceUpdate;
    await account.save();
    res.status(201).json(transaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to get the balance of an account
router.get("/:accountId/balance", async (req, res) => {
  try {
    const { accountId } = req.params;
    const account = await Account.findById(accountId);
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    // Return the balance of all currencies
    res.json({ balance: account.balance });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
