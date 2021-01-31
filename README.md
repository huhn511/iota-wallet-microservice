# iota-wallet-microservice

Node.js app with express to run a web/cloud IOTA Wallet.

- Support Docker.


## Routes

**GET** ` http://localhost:8080/api`
Requires `x-access-token` in header.


**POST** ` http://localhost:8080/api/auth`
Returns access-token

## Development
```bash
git clone https://github.com/huhn511/iota-wallet-microservice
cd iota-wallet-microservice
npm install
npm start
```


