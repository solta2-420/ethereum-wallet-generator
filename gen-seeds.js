const { ethers } = require("ethers");

function generateWallet() {
  const wallet = ethers.Wallet.createRandom();
  const mnemonic = wallet.mnemonic.phrase;
  const privateKey = wallet.privateKey;
  const address = wallet.address;

  console.log(`Semilla mnemotécnica: ${mnemonic}`);
  console.log(`Dirección Ethereum: ${address}`);
  console.log(`Clave privada: ${privateKey}`);
}

generateWallet();