const ethers = require("ethers");
const fs = require("fs-extra");
const colors = require("colors");
require("dotenv").config();

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
  // const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const encryptedPrivateKeyJson = fs.readFileSync(
    "./.encryptKey.json",
    "utf-8"
  );
  let wallet = new ethers.Wallet.fromEncryptedJsonSync(
    encryptedPrivateKeyJson,
    process.env.PRIVATE_KEY_PASSWORD
  );
  wallet = await wallet.connect(provider);
  const abi = fs.readFileSync("./simpleStorage_sol_simpleStorage.abi", "utf-8");
  const binary = fs.readFileSync(
    "./simpleStorage_sol_simpleStorage.bin",
    "utf-8"
  );

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  const contract = await contractFactory.deploy();
  console.log(`Contract Address: ${contract.address}`.bgYellow.underline);

  // WORKING WITH OUR CONTRACT FUNCTIONS
  const currentNumber = await contract.viewCurrentNumber();
  console.log(`CurrentNumber: ${currentNumber}`.blue.bold);

  const storedNumberTXResonse = await contract.store("89");
  const storedNumberTXReceipt = await storedNumberTXResonse.wait(1);
  const newNumber = await contract.viewCurrentNumber();
  console.log(`newUpdatedNumber: ${newNumber}`.blue.bold);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
