
const express = require('express');
const jwt = require("jsonwebtoken");
const config = require("./config.js");
const bodyParser = require("body-parser");
const moment = require("moment");

const app = express();
const router = express.Router();
const PORT = 8080;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.listen(PORT);
app.use("/api/", router);

console.log(`Running iota-wallet service on http://localhost:${PORT}`);

router.get('/', (req, res) => {

  let token = req.headers['x-access-token'];

  if (token) {

    jwt.verify(token, config.TOKEN_SECRET, (err, decoded) => {

      if (err) {
        return res.json(
          {
            success: false,
            message: "Failed to authenticate token."
          }
        );
      }

      req.decoded = decoded;

      return res.json(
        {
          success: true,
        }
      );


    });

  }
  else {
    return res.status(403).send({
      success: false,
      message: "No token provided."
    });
  }


});

router.post('/auth', (req, res) => {
  console.log("Validating User and Password");
  // TODO: validate User
  console.log(req.body);
  let token = genToken(req.body.idUser);
  res.json({
      success: true,
      token: token
  });
});

function genToken(idUser) {

  let payload = {
      sub: idUser,
      iat: moment().unix(),
      exp: moment().add(5, "minutes").unix(),
      role: "admin"
  }

  let token = jwt.sign(payload, config.TOKEN_SECRET);
  return token;
}