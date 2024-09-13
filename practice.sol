// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity >=0.8.27;

contract SimpleStorage {
  constructor() {
    uint256 favouriteNumber;

    uint256[] listOfFavouriteNumbers;

    struct Person {
      uint256 favouriteNum;
      string name;
    }
    
    Person[] public listOfPeople;

    /* memory and callData variable types are types that store data temporarily in the memory. 
    * The difference between both is that "memory is mutable", while "callData is immutable"
    * Storage on the other hand is permanent variable that can be modified, whenever a contract is 
    * created inside a block, it is explicitly stored in "storage".
    * A string is an array of bytes, so the "memory" keyword can be used with it, but the "uint256" is
    * a literal variable type, hence the "memory" keyword can't be used with it.
    */

    function addPerson(string memory _name, uint256 _favouriteNmber) public {
      listOfPeople.push(Person({name: _name, favouriteNum: _favouriteNmber}));
    }

    function store(uint256 _favouriteNumber) public {
      favouriteNumber = _favouriteNumber;
    }

    function retrieve() view public returns(uint256) {
      return favouriteNumber;
    }
  }
}