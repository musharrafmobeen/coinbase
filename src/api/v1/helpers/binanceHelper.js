var crypto = require("crypto");
const axios = require("axios");
const CryptoJS = require("crypto-js");

const methods = {
  get: "GET",
  post: "POST",
  delete: "DELETE",
  put: "PUT",
};

const createSignature = async (cb_access_timestamp) => {
  const secret = process.env.COINBASE_SECRET;
  //   const requestPath = url;
  //   const methodType = methods[method];
  const message = "timestamp=" + cb_access_timestamp;
  console.log(message);
  const key = Buffer.from(secret, "base64");
  const hmac = crypto.createHmac("sha256", key);
  console.log(hmac);

  //   const sig = hmac.update(message).digest("base64");
  const sig = CryptoJS.HmacSHA256(message, secret).toString(CryptoJS.enc.Hex);
  console.log(sig);
  return sig;
};

const binanceRequestMethod = async (method, url, body = {}) => {
  let cb_access_timestamp = Date.now();
  console.log(cb_access_timestamp);
  //   cb_access_timestamp = Math.floor(cb_access_timestamp);

  const cb_access_sign = await createSignature(cb_access_timestamp);
  const config = {
    method: method,
    url: `https://testnet.binance.vision/api/v3${url}?timestamp=${cb_access_timestamp}&signature=${cb_access_sign}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-MBX-APIKEY": process.env.BINANCE_API_KEY,
    },
  };
  const response = await axios(config);
  return response.data;

  //   return { a: 2 };
};

module.exports = { binanceRequestMethod };
