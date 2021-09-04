//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract addNumbers {
  function addNum(uint256[3] memory x, uint256[3] memory y)
    public
    pure
    returns (uint256[3] memory z)
  {
    for (uint256 i; i < x.length; i++) {
      z[i] = x[i] + y[i];
    }
  }
}
