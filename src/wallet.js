
const { AccountManager, SignerType } = require('iota-wallet');
require('dotenv').config()

let account;

async function init() {

    const manager = new AccountManager({
        storagePath: './storage'
    })
    manager.setStrongholdPassword(process.env.SH_PASSWORD)
    manager.storeMnemonic(SignerType.Stronghold, manager.generateMnemonic())
    account = manager.getAccount('Account1')

    if (account) {
        console.log('alias', account.alias())
    } else {
        console.log("Creating new account..")

        account = await manager.createAccount({
            alias: 'Account1',
            clientOptions: { node: 'http://api.lb-0.testnet.chrysalis2.com', localPow: false }
        })
        console.log("Account created.")
    }

    console.log('syncing...')
    await account.sync()
    console.log('synced!')

}

async function get_balance() {
    console.log('syncing...')
    const synced = await account.sync()
    console.log('synced!')
    let balance = account.balance().available
    console.log('available balance', balance)
    return balance;
}

async function get_address() {
    console.log('syncing...')
    const synced = await account.sync()
    console.log('synced!')


    const addresses = account.listAddresses(true) // true =  unspent addresses
    let unspent_addr = '';
    if(addresses.length == 0) {
        unspent_addr = account.generateAddress().address
    } else {
        unspent_addr = addresses[0].address
    }
    console.log('Need a refill? Send it this address:', unspent_addr)
    

    return unspent_addr;
}

module.exports = {
    init,
    get_balance,
    get_address
};