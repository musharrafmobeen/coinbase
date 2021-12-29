var crypto = require("crypto");
const axios = require("axios");
const CryptoJS = require("crypto-js");
const NodeRSA = require("node-rsa");

const methods = {
  get: "GET",
  post: "POST",
  delete: "DELETE",
  put: "PUT",
};

const createSignature = async (cb_access_timestamp) => {
  const secret = process.env.BINANCE_API_SECRET;
  //   const requestPath = url;
  //   const methodType = methods[method];
  const message = "timestamp=" + cb_access_timestamp;
  console.log(message);
  const key = Buffer.from(secret, "base64");
  const hmac = crypto.createHmac("sha256", key);
  console.log(hmac);

  // const apiSecret = pub.TESTNET_SECRETKEY; // Your secret key

  // const timestamp = await serverTimestamp().then((timestamp) => {
  //   return timestamp;
  // });

  // let signature = sha256(apiSecret, timestamp);

  // const sig = hmac.update(message).digest("hex");
  const sig = CryptoJS.HmacSHA256(message, secret).toString(CryptoJS.enc.Hex);
  // const sig = new NodeRSA({ b: 512 });
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
    url: `https://testnet.binance.vision/api/v3${url}?timestamp=${cb_access_timestamp}&signature=${cb_access_sign}&symbol=BTC`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-MBX-APIKEY": process.env.BINANCE_API_KEY,
    },
  };
  const response = await axios(config);
  return response.data;

  return { a: 2 };
};

module.exports = { binanceRequestMethod };
