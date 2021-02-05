# iota-wallet-microservice

Node.js app with express to run a web/cloud IOTA Wallet.

- Support Docker.


## Routes

**GET** ` http://localhost:8080/api`
Requires `x-access-token` in header.


**POST** ` http://localhost:8080/api/auth`
Returns access-token

## Development

Setup wallet.rs library
```
git clone https://github.com/iotaledger/wallet.rs
cd wallet.rs/bindings/nodejs
npm link
cd ../../..
```

```bash
git clone https://github.com/huhn511/iota-wallet-microservice
cd iota-wallet-microservice
npm install
npm link iota-wallet
npm start
```


### Devnet IOTA Faucet

https://faucet.testnet.chrysalis2.com/

If you see a `Out of service, please try again later`, please use the community faucet instead.


atoi1qykf7rrdjzhgynfkw6z7360avhaaywf5a4vtyvvk6a06gcv5y7sksu7n5cs
