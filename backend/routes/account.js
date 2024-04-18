// backend/routes/account.js
const express = require("express");
const Account = require("");
const { authMidlleware } = require("../middleware");
const router = express.Router();

router.get("/balance", authMidlleware, async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId,
  });
  res.json({
    balance: account.balance,
  });
});
module.exports = router;
