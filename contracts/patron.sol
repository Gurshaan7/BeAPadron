// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract BeAPatron{
    
    constructor(){
        owner=payable(msg.sender);
    }

    address payable owner; 
    Patron[] patrons;
    struct Patron{
        string name;
        string message;
        uint timestamp;
        address from;
    }

    function sendMoney(string memory name,string memory message) public payable{
        require(msg.value>0,"Please pay greater than 0 ether");
        owner.transfer(msg.value);
        patrons.push(Patron(name,message,block.timestamp,msg.sender));
    }

    function patronLogs() public view returns(Patron[] memory){
        return patrons;
    }

}