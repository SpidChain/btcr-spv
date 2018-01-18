// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process

const fs = require('fs')
console.log(fs)

const bcoin = require('bcoin').set('testnet')

// SPV chains only store the chain headers.
const chain = new bcoin.chain({
  db: 'leveldb',
  location: process.env.HOME + '/.spidchain',
  spv: true
})

const pool = new bcoin.pool({
  chain: chain,
  spv: true,
  maxPeers: 8
})

const walletdb = new bcoin.walletdb({ db: 'memory' })

pool.open().then(function () {
  return walletdb.open()
}).then(function () {
  return walletdb.create()
}).then(function (wallet) {
  console.log('Created wallet with address %s', wallet.getAddress('base58'))

  // Add our address to the spv filter.
  pool.watchAddress(wallet.getAddress())

  // Connect, start retrieving and relaying txs
  pool.connect().then(function () {
    // Start the blockchain sync.
    pool.startSync()

    pool.on('tx', function (tx) {
      walletdb.addTX(tx)
    })

    wallet.on('balance', function (balance) {
      console.log('Balance updated.')
      console.log(bcoin.amount.btc(balance.unconfirmed))
    })
  })
})
