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
  console.log(account);
  res.status(200).json({
    account: account.data,
  });
};

const getTrades = async (req, res, next) => {
  try {
    const apiKey = process.env.BINANCE_API_KEY;
    const apiSecret = process.env.BINANCE_API_SECRET;
    const client = new Spot(apiKey, apiSecret, {
      baseURL: "https://testnet.binance.vision/",
    });
    // Get account information
    const trades = await client.myTrades("BTCUSDT");
    res.status(200).json({
      trades: trades.data,
    });
  } catch (err) {
    console.log(err);
  }
};

const newTrade = async (req, res, next) => {
  try {
    const apiKey = process.env.BINANCE_API_KEY;
    const apiSecret = process.env.BINANCE_API_SECRET;
    const client = new Spot(apiKey, apiSecret, {
      baseURL: "https://testnet.binance.vision/",
    });
    // Get account information
    const order = await client.newOrder("BTCUSDT", "SELL", "MARKET", {
      quantity: 0.001,
    });
    res.status(200).json({
      order: order.data,
    });
  } catch (err) {
    console.log(err);
  }
};

const getAccountStatus = async (req, res, next) => {
  try {
    const apiKey = process.env.BINANCE_API_KEY;
    const apiSecret = process.env.BINANCE_API_SECRET;
    const client = new Spot(apiKey, apiSecret, {
      baseURL: "https://testnet.binance.vision/",
    });
    // Get account information
    const accountStatus = await client.withdrawHistory();
    res.status(200).json({
      accountStatus,
    });
  } catch (err) {
    console.log(err);
  }
};

const getTransactions = async (req, res, next) => {
  // try {
  const transactions = await binanceRequestMethod("get", "/myTrades");
  res.status(200).json({
    transactions,
  });
  // } catch (err) {
  //   console.log(err.message);
  // }
};

module.exports = {
  getAccount,
  getTransactions,
  getTrades,
  getAccountStatus,
  newTrade,
};
