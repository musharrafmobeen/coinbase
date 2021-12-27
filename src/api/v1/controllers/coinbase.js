const { coinbase_request_method } = require("../helpers/coinbaseHelper");
const { exchangeRate } = require("../helpers/exhangeRate");

const getTransfers = async (req, res, next) => {
  let transfers = await coinbase_request_method("get", "/transfers");
  for (let i = 0; i < transfers.length; i++) {
    const account = await coinbase_request_method(
      "get",
      `/accounts/${transfers[i].account_id}`
    );

    transfers[i] = { ...transfers[i], currency: account.currency };
  }
  res.status(200).json({
    transfers,
  });
};

const getLedgers = async (req, res, next) => {
  const ledgers = await coinbase_request_method(
    "get",
    "/accounts/78e6166a-717c-5beb-b095-043601d66f30/ledger"
  );
  res.status(200).json({
    ledgers,
  });
};

const getWallet = async (req, res, next) => {
  let wallet = await coinbase_request_method("get", "/coinbase-accounts");
  const rates = await exchangeRate();
  for (let i = 0; i < wallet.length; i++) {
    const curr = wallet[i]["currency"];
    const bal = wallet[i]["balance"];
    let balance_calc = bal / rates[curr];
    let price = 1 / rates[curr];
    if (!balance_calc) {
      balance_calc = 0;
      price = 0;
    }
    wallet[i] = { ...wallet[i], balance_calc, price };
  }
  res.status(200).json({
    wallet,
  });
};

const getFees = async (req, res, next) => {
  const fees = await coinbase_request_method("get", "/fees");
  res.status(200).json({
    fees,
  });
};

module.exports = { getTransfers, getLedgers, getWallet, getFees };
