web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
contractABI = JSON.parse('[{"constant":false,"inputs":[],"name":"getSymbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"coinSymbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"getInitialAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"getBalanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_initialAmount","type":"uint256"},{"name":"symbol","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]');

contractAddress = '0x3337cc22477be9d821182dc28805d96f7e5d140f';

coinContract = web3.eth.contract(contractABI);
contractInstance = coinContract.at(contractAddress);


function RefreshValueTable(){
  accounts = web3.eth.accounts;
  for (var i = 0; i < accounts.length; i++){
    let address = accounts[i];
    let value = contractInstance.getBalanceOf.call(address).toString();
    $("#address-"+i.toString()).html(address);
    $("#value-"+i.toString()).html(value);
  }
}

function TransferCoin(from, to, value){
  from = $("#from").val();
  to = $("#to").val();
  value = $("#value").val();

  try{
    contractInstance.transfer(from, to, value, {from: web3.eth.accounts[0]});
    RefreshValueTable();
  } catch(err) {}
}

$(document).ready(RefreshValueTable());
