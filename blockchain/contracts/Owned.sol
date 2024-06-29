// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;
/**
 * @title Owned
 * @dev Set & change owner
 */
contract Owned {

    address private owner;

    mapping(address=>bool) secondaryOwners;
    address[] ownerList;
    uint8 secOwnerCount = 0; //Assumed a max of 255 secondry owners

    // event for EVM logging
    event OwnerSet(address indexed oldOwner, address indexed newOwner);
    event newSecondaryOwnerAdded(address indexed secondaryOwner);
    event newSecondaryOwnerRemoved(address indexed secondaryOwner);

        // modifier to check if caller is owner
    modifier isOwner() {
        // If the first argument of 'require' evaluates to 'false', execution terminates and all
        // changes to the state and to Ether balances are reverted.
        // This used to consume all gas in old EVM versions, but not anymore.
        // It is often a good idea to use 'require' to check if functions are called correctly.
        // As a second argument, you can also provide an explanation about what went wrong.
        require(msg.sender == owner, "Caller is not owner");
        _;
    }

    // modifier to check if caller is owner
    modifier isAuthorized() {
        // If the first argument of 'require' evaluates to 'false', execution terminates and all
        // changes to the state and to Ether balances are reverted.
        // This used to consume all gas in old EVM versions, but not anymore.
        // It is often a good idea to use 'require' to check if functions are called correctly.
        // As a second argument, you can also provide an explanation about what went wrong.
        require(msg.sender == owner||secondaryOwners[msg.sender]==true, "Caller is not owner");
        _;
    }

    /**
     * @dev Set contract deployer as owner
     */
    constructor() {
        owner = msg.sender; // 'msg.sender' is sender of current call, contract deployer for a constructor
        emit OwnerSet(address(0), owner);
    }

    /**
     * @dev Change owner
     * @param newOwner address of new owner
     */
    function changeOwner(address newOwner) public isOwner {
        emit OwnerSet(owner, newOwner);
        owner = newOwner;
    }

    /**
     * @dev Change owner
     * @param ownerArrIndex array location of secondary owner
     */
    function removeSecondaryOwner(uint8 ownerArrIndex) public isOwner returns(bool) {
        address secondaryOwnerAddress = ownerList[ownerArrIndex];
        require(secondaryOwners[secondaryOwnerAddress]==true);
        delete ownerList[ownerArrIndex];
        secondaryOwners[secondaryOwnerAddress]==false;
        secOwnerCount-=1;
        emit newSecondaryOwnerRemoved(secondaryOwnerAddress);
        return true;
    }

        /**
     * @dev Change owner
     * @param secondaryOwner address of new secondaryOwner
     */
    function addSecondaryOwner(address secondaryOwner) public isOwner returns(bool){
        require(secondaryOwners[secondaryOwner]==false);
        ownerList.push(secondaryOwner);
        secondaryOwners[secondaryOwner] = true;
        secOwnerCount+=1;
        emit newSecondaryOwnerAdded(secondaryOwner);
        return true;
    }

    /**
     * @dev Return owner address 
     * @return address of owner
     */
    function getOwner() external view returns (address) {
        return owner;
    }


} 