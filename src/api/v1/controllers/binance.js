const { Spot } = require("@binance/connector");
const { binanceRequestMethod } = require("../helpers/binanceHelper");

const getAccount = async (req, res, next) => {
  const apiKey = process.env.BINANCE_API_KEY;
  const apiSecret = process.env.BINANCE_API_SECRET;
  const client = new Spot(apiKey, apiSecret, {
    baseURL: "https://testnet.binance.vision",
  });

  // Get account information
  const account = await client.account();
  res.status(200).json({
    account: account.data,
  });
};

const getTransactions = async (req, res, next) => {
  const transactions = await binanceRequestMethod("get", "/transaction");
  res.status(200).json({
    transactions,
  });
};

module.exports = { getAccount, getTransactions };
