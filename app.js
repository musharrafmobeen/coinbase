const express = require("express");
const passport = require("passport");
const CoinbaseStrategy = require("passport-coinbase-oauth2").Strategy;
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const axios = require("axios");
const qs = require("querystring");

passport.use(
  new CoinbaseStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackUrl: "http://localhost:4000/auth/coinbase/callback",
      authorizationURL:
        "https://api-public.sandbox.pro.coinbase.com/oauth/authorize",
      tokenURL: "https://api.coinbase.com/v2/user",
      scope: ["user", "transaction"],
      account: "all",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("access token", accessToken);
      console.log("refresh token", refreshToken);
      console.log(profile);
    }
  )
);

app.get(
  "/auth/coinbase",
  passport.authenticate("coinbase", {
    scope: [
      "wallet:user:read",
      "wallet:user:email",
      "wallet:accounts:read",
      "wallet:transactions:read",
    ],
  })
);
// app.get(
//   "/auth/coinbase/callback",
//   //   passport.authenticate("coinbase", { failureRedirect: "/login" }),
//   function (req, res) {
//     // Successful authentication, redirect home.
//     console.log(req);
//     res.end(req.query.code);
//     // res.redirect("/");
//   }
// );
app.get("/auth/coinbase/callback", async (req, res) => {
  const { code } = req.query;
  const data = qs.stringify({
    grant_type: "authorization_code",
    code: code,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uri: process.env.REDIRECT_URI,
  });
  const config = {
    method: "post",
    url: "https://api.coinbase.com/oauth/token",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data,
  };

  try {
    const response = await axios(config);
    console.log(response);

    // saving tokens for other requests
    accessToken = response.data.access_token;
    refreshToken = response.data.refresh_token;

    res.send({ response: response?.data });
  } catch (e) {
    console.log("Could not trade code for tokens", e.response.data);
  }
});

app.get("/", async (req, res) => {
  const config = {
    method: "get",
    url: "https://api.coinbase.com/v2/accounts/535ba9fb-959d-58d1-be7c-e7e645552b0e/transactions",
    headers: {
      Authorization: `Bearer 87bce9830221f3b6796198ffa9e879473ae8693d9139cfaf337c55e2a955c3e0`,
    },
  };

  try {
    const response = await axios(config);
    res.send({ response: response?.data });
  } catch (e) {
    console.log("Could not get user", e.response.data);
  }
});

// app.get("/auth/coinbase", passport.authenticate("coinbase"), (req, res) => {
//   //   res.redirect(
//   //     `https://www.coinbase.com/oauth/authorize?response_type=code&client_id=${process.env.CLIENT_ID}&redirect_uri=http://192.168.18.42:4000/auth/coinbase/callback&state=SECURE_RANDOM&scope=wallet:accounts:read`
//   //   );

//   res.redirect(
//     "https://www.coinbase.com/oauth/authorize?client_id=8e0c12c29ff88c761ebc812137d5b66821f34ccb9e4cfd3b6f653bdaa12ddc64&redirect_uri=http%3A%2F%2F192.168.18.42%3A4000%2Fauth%2Fcoinbase%2Fcallback&response_type=code&scope=wallet%3Auser%3Aread"
//   );
// });

// app.get(
//   "/auth/coinbase/callback",
//   //   passport.authenticate("coinbase", { failureRedirect: "/login" }),
//   (req, res) => {
//     console.log(req.query.code);
//     res.end(req.query.code);
//   }
// );

app.post(
  "/auth/coinbase/token",
  //   passport.authenticate("coinbase", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect();
  }
);

app.listen(4000, () => {
  console.log("server running at port 4000");
});
