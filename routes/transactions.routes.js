// Routes transactions
const router = require("express").Router();
const Transaction = require("../models/Transaction.model");
const Account = require("../models/Account.model");
const { isAuthenticated } = require("../middlewares/route-guard.middleware");

// Route to create a new transaction
router.post("/", isAuthenticated, async (req, res) => {
  try {
    const { accountId, type, amount, currency } = req.body;

    // Verify if the currency is valid
    if (currency !== "EUR") {
      return res
        .status(400)
        .json({ message: "This account operates in EUR only" });
    }

    // Verify if the account exists
    const account = await Account.findById(accountId);
    if (!account) {
      return res.status(404).json({ message: "There is none open account" });
    }

    // Create a new transaction
    const transaction = new Transaction({ accountId, type, amount, currency });
    await transaction.save();

    // Update account balance
    const balanceUpdate = type === "credit" ? amount : -amount;
    account.balance += balanceUpdate;

    // Check for insufficient balance
    if (account.balance < 0) {
      return res.status(400).json({ message: "Insufficient funds" });
    }

    await account.save();
    res.status(201).json({ message: "Transaction successful", transaction });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to get all transactions for a specific account
router.get("/:userId", isAuthenticated, async (req, res) => {
  try {
    const { userId } = req.params;
    const { type } = req.query;

    console.log(
      "Fetching transactions for accountId:",
      userId,
      "with type:",
      type
    );

    // Verify if the account exists
    const account = await Account.findById(userId);
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    // Fetch transactions for the account
    const query = { userId };
    if (type) {
      if (!["credit", "debit"].includes(type)) {
        return res.status(400).json({ message: "Invalid transaction type" });
      }
      query.type = type;
    }

    const transactions = await Transaction.find(query).sort({ date: -1 });
    console.log("Transactions fetched:", transactions.length);

    res.status(200).json({ transactions });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
