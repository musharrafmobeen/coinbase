const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const cors = require("cors");
const morgan = require("morgan");

app.use(morgan("dev"));
app.use(cors());

app.use("/coinbase", require("./src/api/v1/routes/coinbase"));
app.use("/binance", require("./src/api/v1/routes/binance"));

app.listen(4000, () => {
  console.log("server running at port 4000");
});
