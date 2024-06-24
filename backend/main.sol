// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MultiElection {
    address public owner;
    uint public totalElections;

    mapping(uint => Election) public elections;

    struct Election {
        uint totalVoters;
        uint totalVotersFix;
        uint totalCandidatesRemain;
        uint totalCandidatesFix;
        uint maxVotesPerVoter;
        mapping(address => bool) voters;
        mapping(uint => Candidate) candidates;
        mapping(string => bool) isAddedCandidate;
        uint startTime;
        uint endTime;
    }

    struct Candidate {
        string name;
        uint voteCount;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function createElection (
        uint _totalVoters, 
        uint _totalCandidates, 
        uint _maxVotesPerVoter, 
        uint _startTime, 
        uint _endTime
    ) external onlyOwner returns(uint) {
        require(block.timestamp < _startTime, "Time is over start time");
        require(_startTime < _endTime, "Time is not valid!");
        require(_maxVotesPerVoter < _totalCandidates, "Max votes is smaller than total candidates!");

        uint electionId = totalElections++;

        elections[electionId].totalVoters = _totalVoters;
        elections[electionId].totalVotersFix = _totalVoters;
        elections[electionId].totalCandidatesRemain = _totalCandidates;
        elections[electionId].totalCandidatesFix = _totalCandidates;
        elections[electionId].maxVotesPerVoter = _maxVotesPerVoter;
        elections[electionId].startTime = _startTime;
        elections[electionId].endTime = _endTime;

        return electionId;
    }

    function addListVoters(uint electionId, address[] memory _voterAddresses) external onlyOwner {
        Election storage election = elections[electionId];
        // . Limit " + string(election.totalVoters) + " voters allowed"
        require(election.totalVoters >= _voterAddresses.length, "Not enough voters allowed");
        require(block.timestamp < election.startTime, "Time register is end!");

        for (uint i = 0; i < _voterAddresses.length; i++) {
            address voterAddress = _voterAddresses[i];
            require(!election.voters[voterAddress], "Voter already added");
        
            election.voters[voterAddress] = true;
        }

        election.totalVoters -= _voterAddresses.length;
    }

    function addListCandidates(uint electionId, string[] memory _listNewCandidates) external onlyOwner {
        Election storage election = elections[electionId];
        require(election.totalCandidatesRemain >= _listNewCandidates.length, "Not equal candidates allowed");
        require(block.timestamp < election.startTime, "Time register is end!");

        for (uint i = 0; i < _listNewCandidates.length; i++) {
            require(!election.isAddedCandidate[_listNewCandidates[i]], "Candidate is added");
            election.candidates[i].name = _listNewCandidates[i];
        }

        election.totalCandidatesRemain -= _listNewCandidates.length;
    }

    function vote(uint electionId, uint[] memory _listCandidateId) external {
        Election storage election = elections[electionId];
        require(election.voters[msg.sender], "Only registered voters can vote");
        require(_listCandidateId.length == election.maxVotesPerVoter, "Invalid number of votes");
        require(block.timestamp > election.startTime, "Voting hasn't started yet");
        require(block.timestamp < election.endTime, "Voting is ended");

        for (uint i = 0; i < _listCandidateId.length; i++) {
            uint candidateId = _listCandidateId[i];
            require(candidateId < election.totalCandidatesFix, "Invalid candidate ID");

            election.candidates[candidateId].voteCount++;
        }

        election.voters[msg.sender] = false; // Mark the voter as voted
    }

    function getTotalVote(uint electionId) external view returns (uint) {
        Election storage election = elections[electionId];
        require(block.timestamp > election.startTime, "Voting has not started yet");
        return election.totalVotersFix - election.totalVoters;
    }

    function getAllVoteCount(uint electionId) external view returns (uint[] memory) {
        Election storage election = elections[electionId];
        require(block.timestamp > election.endTime, "Voting has not ended yet");

        uint[] memory voteCounts = new uint[](election.totalCandidatesFix);

        for (uint i = 0; i < election.totalCandidatesFix; i++) {
            voteCounts[i] = election.candidates[i].voteCount;
        }

        return voteCounts;
    }

}
