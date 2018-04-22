
function Verify() {
  fs = require('fs');
  json_file = fs.readFileSync('dapp.json');
  dapp_info = JSON.parse(json_file);
  console.log("contractABI: " + dapp_info.contractABI);
  console.log("contractAddress: " + dapp_info.contractAddress);
  console.log("feeAccount: " + dapp_info.feeAccount);

  Web3 = require('web3');
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  coinContract = web3.eth.contract(dapp_info.contractABI);
  contractInstance = coinContract.at(dapp_info.contractAddress);

  initAmount = contractInstance.getInitialAmount.call().toString();
  if (initAmount != "142857") {
    console.log("Initial Amount: " + initAmount);
    throw new Error("Initial amount is incorrect.");
  }

  transferFee = contractInstance.getTransferFee.call().toString();
  if (transferFee != "1") {
    console.log("Transfer Fee: " + transferFee);
    throw new Error("Incorrect transfer fee.");
  }

  feeAccount = contractInstance.getFeeAccount.call();
  if (feeAccount != dapp_info.feeAccount) {
    console.log("Fee Account: " + feeAccount);
    throw new Error("Incorrect fee account.");
  }

  a0 = web3.eth.accounts[0];
  a1 = web3.eth.accounts[1];
  old_a0 = Number(contractInstance.getBalanceOf.call(a0));
  old_a1 = Number(contractInstance.getBalanceOf.call(a1));
  old_fee = Number(contractInstance.getBalanceOf.call(feeAccount));
  transferFee = Number(transferFee);

  contractInstance.transfer(a0, a1, 100, {from: a0});
  new_a0 = Number(contractInstance.getBalanceOf.call(a0));
  new_a1 = Number(contractInstance.getBalanceOf.call(a1));
  new_fee = Number(contractInstance.getBalanceOf.call(feeAccount));

  console.log(old_a0, old_a1, old_fee);
  console.log(new_a0, new_a1, new_fee);

  if ((old_a0 != new_a0 + 100 + transferFee) ||
      (old_a1 != new_a1 - 100) ||
      (old_fee != new_fee - transferFee)) {
    throw new Error("Incorrect balance after tranfer money.");
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

