// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;
import "./Owned.sol";

/** 
 * @title IdentityStore
 * @dev Implements identity storage for the IDForAll project
 */
contract IdentityStore is Owned {
    struct Identity {
        bytes32 UID;
        bytes32 fullName;
        bytes32 dateOfBirth;
        bytes32 nationalID; // Example: National ID, Passport Number, etc.
        bytes32 additionalInfo; // Any additional information
        uint timestamp;
    }

    mapping(bytes32 => Identity) public identities;
    bytes32[] public identityList;
    event IdentityEvent(bytes32 indexed UID, bytes32 fullName, bytes32 dateOfBirth, bytes32 nationalID, bytes32 additionalInfo, uint indexed timestamp);

    /** 
     * @dev Create a new IdentityStore.
     */
    constructor() {
    }

    /** 
     * @dev Add a new identity
     * @param UID UID of the identity
     * @param fullName Full name of the person
     * @param dateOfBirth Date of birth of the person
     * @param nationalID National identifier (e.g., National ID, Passport Number)
     * @param additionalInfo Any additional information
     * @param timestamp Timestamp of when the identity was added
     */
    function addIdentityToChain(bytes32 UID, bytes32 fullName, bytes32 dateOfBirth, bytes32 nationalID, bytes32 additionalInfo, uint timestamp) isAuthorized public returns (bool) {
        identityList.push(UID);
        identities[UID] = Identity(UID, fullName, dateOfBirth, nationalID, additionalInfo, timestamp);
        emit IdentityEvent(UID, fullName, dateOfBirth, nationalID, additionalInfo, timestamp);
        return true;
    }

    /** 
     * @dev Retrieve an identity by UID
     * @param UID UID of the identity
     * @return UID, fullName, dateOfBirth, nationalID, additionalInfo, timestamp
     */
    function getIdentity(bytes32 UID) public view returns (bytes32, bytes32, bytes32, bytes32, bytes32, uint) {
        Identity memory identity = identities[UID];
        return (identity.UID, identity.fullName, identity.dateOfBirth, identity.nationalID, identity.additionalInfo, identity.timestamp);
    }
}
