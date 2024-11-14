const router = require("express").Router();

// Welcome route
router.get("/", (req, res) => {
  res.json({ message: "Welcome to the bank app API" });
});

// Import routes
const accountRoutes = require("./account.routes");
router.use("/account", accountRoutes);

const transactionRoutes = require("./transactions.routes");
router.use("/transactions", transactionRoutes);

// Export the router
module.exports = router;
