const JWT = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  try {
    const token =
      req.cookies.accessToken ||
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    if (!token) {
      return res.status(401).json({ message: "No token available" });
    }

    JWT.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err && err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired" });
      }
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      }

      req.user = user;
      next();
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { isAuthenticated };
