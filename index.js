
const express = require('express');
const config = require("./config.js");
const bodyParser = require("body-parser");

const app = express();
const router = require("./src/router.js");
const wallet = require("./src/wallet.js");
const PORT = 8080;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use("/api/", router);


(async function main() {
  await wallet.init()
  app.listen(PORT);

  console.log(`Running iota-wallet service on http://localhost:${PORT}`);

})();