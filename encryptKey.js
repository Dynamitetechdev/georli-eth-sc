const ethers = require("ethers");
const fs = require("fs-extra");
const colors = require("colors");
require("dotenv").config();

async function main() {
  //1. create a new wallet with the private key
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);
  //2. encrypt the newly created wallet with the private passwork and the private key
  const encryptedJsonKey = await wallet.encrypt(
    process.env.PRIVATE_KEY_PASSWORD,
    process.env.PRIVATE_KEY
  );
  // this function will create a new json file and insert our encryptedJsonkey in it
  fs.writeFileSync("./.encryptKey.json", encryptedJsonKey);
  console.log(`ENCRYPT KEY: ${encryptedJsonKey}`.bgYellow);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
