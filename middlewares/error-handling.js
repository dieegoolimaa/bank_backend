// middlewares/error-handling.js
module.exports = (req, res, next) => {
  res.status(404).json({ message: "Route not found" });
};
