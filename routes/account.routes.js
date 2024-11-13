// account currency routes
const router = require("express").Router();
const Account = require("../models/Account.model");

// get all accounts
router.get("/", async (req, res) => {
  try {
    const accounts = await Account.find();
    res.json(accounts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// create a new account
router.post("/", async (req, res) => {
  try {
    const account = new Account(req.body);
    await account.save();
    res.json(account);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// update an account
router.put("/:accountId", async (req, res) => {
  try {
    const account = await Account.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(account);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// delete an account
router.delete("/:accountId", async (req, res) => {
  try {
    const account = await Account.findByIdAndDelete(req.params.id);
    res.json(account);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
