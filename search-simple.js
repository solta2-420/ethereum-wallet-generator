const { ethers } = require("ethers");
const sqlite3 = require('sqlite3').verbose();

// Base de datos
const db = new sqlite3.Database('wallets.db');
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS wallets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      address TEXT UNIQUE,
      seed TEXT,
      private_key TEXT,
      path TEXT,
      balance TEXT DEFAULT '0',
      tx_count INTEGER DEFAULT 0,
      has_balance BOOLEAN DEFAULT 0
    )
  `);
});

// Direcciones objetivo
const targetAddresses = [
  "0x8dc25a4b4117915ca6f79aa0e608f0192cd652aa",
  "0x1cFDBd2dFf70C6e2e30df5012726F87731F38164",
  "0x22536030b9ce783b6ddfb9a39ac7f439f568e5e6",
].map(addr => addr.toLowerCase());

// Listado de RPCs
const rpcs = [
  'https://ethereum-mainnet.wallet.brave.com', // ETH
  'https://bsc-mainnet.wallet.brave.com', // BSC
];

// Límite de iteraciones
const limit = 10;
var continueNext = true;

async function main() {
  console.clear();
  const wallet = ethers.Wallet.createRandom();
  const mnemonic = wallet.mnemonic.phrase;
  const purpose = 44; // BIP32
  const coin_type = 60; // ETH
  const account = 0;
  const change = 0;

  for (let index = 0; index < limit; index++) {
    const path = `m/${purpose}'/${coin_type}'/${account}'/${change}/${index}`;
    const walletR = ethers.HDNodeWallet.fromPhrase(wallet.mnemonic.phrase, "", path);
    const address = walletR.address.toLowerCase();

    console.log(`Intento #${index}: ${address}`);

    try {
      let hasBalanceOrTxs = false;

      for (const rpc of rpcs) {
        const provider = new ethers.JsonRpcProvider(rpc);
        const balance = await provider.getBalance(address);
        const txCount = await provider.getTransactionCount(address);

        if (balance.toString() !== "0" || txCount > 0) {
          console.log(`Saldo encontrado en ${address} (${rpc})`);
          hasBalanceOrTxs = true;
          continueNext = false;
          break;
        }
      }

      // Guardar en la base de datos
      const stmt = db.prepare(`
        INSERT INTO wallets (address, seed, private_key, path, balance, tx_count, has_balance)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(address) DO UPDATE SET
          balance = excluded.balance,
          tx_count = excluded.tx_count,
          has_balance = excluded.has_balance
      `);

      stmt.run(
        address,
        mnemonic,
        walletR.privateKey,
        path,
        "0", // Balance inicial
        0,   // Tx count inicial
        hasBalanceOrTxs ? 1 : 0
      );

      stmt.finalize();

      if (hasBalanceOrTxs || targetAddresses.includes(address)) {
        console.log(`Dirección encontrada: ${address}`);
        continueNext = false;
        return;
      }
    } catch (error) {
      console.error(`Error al procesar la dirección ${address}:`, error.message);
    }
  }
  if (continueNext) main();
}

main();