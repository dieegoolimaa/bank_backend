// models/Account.js
const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  balance: {
    USD: { type: Number, default: 0 },
    EUR: { type: Number, default: 0 },
    BRL: { type: Number, default: 0 },
  },
});

module.exports = mongoose.model("Account", accountSchema);
