const JWT = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Bearer <token>

    // Check if the token exists
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Verify the token
    const decodedToken = JWT.verify(token, process.env.JWT_SECRET);

    // Check if the token is valid
    if (!decodedToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Set the user ID in the request object
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = { isAuthenticated };
