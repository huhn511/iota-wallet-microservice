const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");

const moment = require("moment");
const config = require("../config.js");
const wallet = require("./wallet.js");


router.get('/balance', (req, res) => {

    wallet.get_balance().then((balance) => {
        return res.json(
            {
                success: true,
                balance: balance
            })
    }).catch(err => {
        return res.json(
            {
                success: false,
                error: err
            })
    })

})

router.get('/get_address', (req, res) => {

    wallet.get_address().then((address) => {
        console.log("address")
        console.log(address)
        return res.json(
            {
                success: true,
                address: address
            })
    }).catch(err => {
        return res.json(
            {
                success: false,
                error: err
            })
    })

})


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


module.exports = router;
