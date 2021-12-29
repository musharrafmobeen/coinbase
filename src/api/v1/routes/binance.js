const express = require("express");
const router = express.Router();
const {
  getAccount,
  getTransactions,
  getTrades,
  getAccountStatus,
  newTrade,
} = require("../controllers/binance");

router.get("/account", getAccount);
router.get("/transactions", getTransactions);
router.get("/trades", getTrades);
router.get("/accountStatus", getAccountStatus);
router.post("/order", newTrade);

module.exports = router;
