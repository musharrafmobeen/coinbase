const express = require("express");
const router = express.Router();
const {
  getTransfers,
  getLedgers,
  getWallet,
  getFees,
} = require("../controllers/coinbase");

router.get("/transfers", getTransfers);
router.get("/ledgers", getLedgers);
router.get("/wallet", getWallet);
router.get("/fees", getFees);

module.exports = router;
