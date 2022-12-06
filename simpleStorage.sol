// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

contract simpleStorage {
    uint256 public currentNumber;

    function store(uint256 newCurrentnumber) public {
        currentNumber = newCurrentnumber;
    }

    function viewCurrentNumber() public view returns (uint256) {
        return currentNumber;
    }
}
