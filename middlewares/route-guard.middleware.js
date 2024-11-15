const JWT = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  const token = req.cookies.authToken;
  if (!token) return res.status(401).send("No token provided");

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    res.json({
      message: `Welcome, ${user.username}! You are logged in and authorized to access this route`,
    });
  } catch {
    res.status(403).send("Token not valid");
  }
};

module.exports = { isAuthenticated };
