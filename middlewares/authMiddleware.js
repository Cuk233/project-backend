const path = require("path");
const jwt = require("jsonwebtoken");
dotenv = require("dotenv").config({ path: path.resolve("../.env") });
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Authorization token not found" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.signature);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
