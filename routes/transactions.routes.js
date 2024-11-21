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
    if (!"EUR".includes(currency)) {
      return res.status(400).json({ message: "This account operates in EUR" });
    }

    // Verify if the account exists
    const account = await Account.findById(accountId);
    if (!account) {
      return res.status(404).json({ message: "There is none open account" });
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
router.get("/:accountId", isAuthenticated, async (req, res) => {
  try {
    const { accountId } = req.params;
    const transaction = await Account.findById(accountId);
    if (!transaction) {
      return res
        .status(404)
        .json({ message: "This account do not have any transaction" });
    }

    // Return the balance of all currencies
    res.json({ balance: account.balance });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
