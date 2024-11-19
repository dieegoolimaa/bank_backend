const JWT = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  try {
    const authenticated = req.headers.authorization;
    const token = authenticated && authenticated.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token not generated" });
    }

    JWT.verify(token, process.env.JWT_SECRET, (err, user) => {
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
