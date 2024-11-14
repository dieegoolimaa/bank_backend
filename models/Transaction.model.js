const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
  type: { type: String, enum: ["credit", "debit"], required: true },
  amount: { type: Number, required: true },
  currency: { type: String, enum: ["USD", "EUR", "BRL"], required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Transaction", transactionSchema);
