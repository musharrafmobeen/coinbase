const express = require("express");
const router = express.Router();
const { getAccount, getTransactions } = require("../controllers/binance");

router.get("/account", getAccount);
router.get("/transactions", getTransactions);

module.exports = router;
