const { default: axios } = require("axios");

const exchangeRate = async () => {
  const exchangeRates = await axios(
    "https://api.exchangerate.host/latest?base=USD"
  );
  return exchangeRates.data.rates;
};

module.exports = { exchangeRate };
