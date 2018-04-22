
function Verify() {
  fs = require('fs');
  json_file = fs.readFileSync('dapp.json');
  dapp_info = JSON.parse(json_file);
  console.log("contractABI: " + dapp_info.contractABI);
  console.log("contractAddress: " + dapp_info.contractAddress);

  Web3 = require('web3');
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  coinContract = web3.eth.contract(dapp_info.contractABI);
  contractInstance = coinContract.at(dapp_info.contractAddress);

  address = web3.eth.accounts[0];
  balance = contractInstance.getBalanceOf.call(address).toString();
  if (balance != "142857") {
    console.log("balance: " + balance);
    throw new Error("Balance is incorrect.");
  }

  initAmount = contractInstance.getInitialAmount.call().toString();
  if (initAmount != "142857") {
    console.log("Initial Amount: " + initAmount);
    throw new Error("Initial amount is incorrect.");
  }
}

try {
  Verify();
} catch(err) {
  console.log(err);
  process.exit(1);
}

console.log("Pass.");
process.exit(0);

