pragma solidity ^0.4.11;

contract YKCoin{
/* 从账户地址到货币余额的映射*/
  mapping (address => uint256) public balanceOf;
  string public coinSymbol;
  uint initialAmount;

  function YKCoin(uint _initialAmount, string symbol){
    /* 发行货币 */
    initialAmount = _initialAmount;
    balanceOf[msg.sender] = _initialAmount;

    coinSymbol = symbol;
  }
  
  function getBalanceOf(address addr) returns (uint256) {
    return balanceOf[addr];
  }

  function transfer(address _from, address _to, uint _value){
    require(balanceOf[_from] >= _value);
    require(balanceOf[_to] + _value >= balanceOf[_to]);

    balanceOf[_from] -= _value;
    balanceOf[_to] += _value;
  }

  function getInitialAmount() returns (uint256){
    return initialAmount;
  }

  function getSymbol() returns (string){
    return coinSymbol;
  }  
  
  function getTransferFee(){
  }
  
  function getFeeAccount(){}
}
