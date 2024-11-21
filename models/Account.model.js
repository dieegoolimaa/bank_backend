// models/Account.js
const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  accountName: { type: String, required: true, default: "Main Account" },

  // currency option
  currency: {
    type: String,
    default: "EUR",
  },

  // balance
  balance: { type: Number, default: 0 },

  transactions: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Transaction" }], // transactions array of objects ids of transactions
    default: [],
  },

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Account", accountSchema);
