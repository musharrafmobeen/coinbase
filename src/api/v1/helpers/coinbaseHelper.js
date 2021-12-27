var crypto = require("crypto");
const axios = require("axios");

const methods = {
  get: "GET",
  post: "POST",
  delete: "DELETE",
  put: "PUT",
};

const createSignature = async (method, url, cb_access_timestamp) => {
  const secret = process.env.COINBASE_SECRET;
  const requestPath = url;
  const methodType = methods[method];
  const message = cb_access_timestamp + methodType + requestPath;
  const key = Buffer.from(secret, "base64");
  const hmac = crypto.createHmac("sha256", key);
  return hmac.update(message).digest("base64");
};

const coinbase_request_method = async (method, url, body = {}) => {
  const cb_access_timestamp = Date.now() / 1000;
  const cb_access_sign = await createSignature(
    method,
    url,
    cb_access_timestamp
  );
  const config = {
    method: method,
    url: `https://api-public.sandbox.exchange.coinbase.com${url}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "cb-access-key": process.env.ACCESS_KEY,
      "cb-access-passphrase": process.env.PASS_PHRASE,
      "cb-access-sign": cb_access_sign,
      "cb-access-timestamp": cb_access_timestamp,
    },
    body,
  };

  const response = await axios(config);
  return response.data;
};

module.exports = { coinbase_request_method };
