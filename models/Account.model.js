// models/Account.js
const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  accountName: { type: String, required: true },
  // currency option
  currency: {
    type: String,
    enum: ["USD", "EUR", "BRL"],
    default: "USD",
  },

  balance: {
    Total: { type: Number, default: 0 },
  },

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Account", accountSchema);
