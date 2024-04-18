const JWT_SECRET = require("../config");
const jwt = require("jsonwebtoken");

const authMidlleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(403).json({});
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decode.userId;
    next();
  } catch (err) {
    return res.status(403).json({});
  }
};
module.exports = {
  authMidlleware,
};
