// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ethers } from 'ethers';
// import { KEY_ADDRESS } from '../constant/key.constant';
//
//
// @NgModule({
//   declarations: [],
//   imports: [
//     CommonModule
//   ]
// })
// export class UtilModule {
//   public ethereum;
//   public currentAccount: string = sessionStorage.getItem(KEY_ADDRESS.CURRENT) || ""
//
//
//   accounts: string[] = ['0xe8b436e4a434f566afccaf95f2505a02c66ef4a9', '0xa401df1b85268648528e52e3817f2ccb148cb077', '0x4cfed4dd0b9e29c319036f1ecf117345f3b3ae72'];
//   selectedAccount: string;
//
//   private provider!: ethers.providers.Web3Provider
//   private signer!: ethers.Signer
//   private contract!: ethers.Contract
//   private contractABI = [
//     {
//       inputs: [
//         { internalType: "uint256", name: "electionId", type: "uint256" },
//         {
//           internalType: "string[]",
//           name: "_listNewCandidates",
//           type: "string[]",
//         },
//       ],
//       name: "addListCandidates",
//       outputs: [],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [
//         { internalType: "uint256", name: "electionId", type: "uint256" },
//         { internalType: "address[]", name: "_voterAddresses", type: "address[]" },
//       ],
//       name: "addListVoters",
//       outputs: [],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [
//         { internalType: "uint256", name: "_totalVoters", type: "uint256" },
//         { internalType: "uint256", name: "_totalCandidates", type: "uint256" },
//         { internalType: "uint256", name: "_maxVotesPerVoter", type: "uint256" },
//         { internalType: "uint256", name: "_startTime", type: "uint256" },
//         { internalType: "uint256", name: "_endTime", type: "uint256" },
//       ],
//       name: "createElection",
//       outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     { inputs: [], stateMutability: "nonpayable", type: "constructor" },
//     {
//       inputs: [
//         { internalType: "uint256", name: "electionId", type: "uint256" },
//         {
//           internalType: "uint256[]",
//           name: "_listCandidateId",
//           type: "uint256[]",
//         },
//       ],
//       name: "vote",
//       outputs: [],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
//       name: "elections",
//       outputs: [
//         { internalType: "uint256", name: "totalVoters", type: "uint256" },
//         { internalType: "uint256", name: "totalVotersFix", type: "uint256" },
//         {
//           internalType: "uint256",
//           name: "totalCandidatesRemain",
//           type: "uint256",
//         },
//         { internalType: "uint256", name: "totalCandidatesFix", type: "uint256" },
//         { internalType: "uint256", name: "maxVotesPerVoter", type: "uint256" },
//         { internalType: "uint256", name: "startTime", type: "uint256" },
//         { internalType: "uint256", name: "endTime", type: "uint256" },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [{ internalType: "uint256", name: "electionId", type: "uint256" }],
//       name: "getAllVoteCount",
//       outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [{ internalType: "uint256", name: "electionId", type: "uint256" }],
//       name: "getTotalVote",
//       outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "owner",
//       outputs: [{ internalType: "address", name: "", type: "address" }],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "totalElections",
//       outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
//       stateMutability: "view",
//       type: "function",
//     },
//   ]
//   private contractAddress = '0x9AFe10b99eF5e0Bd348f0dE6F6896F82f61CC734'
//
//
//   constructor() {
//     const {ethereum} = <any>window
//     this.ethereum = ethereum
//     if (this.ethereum) {
//       this.provider = new ethers.providers.Web3Provider(this.ethereum);
//       this.signer = this.provider.getSigner();
//     }
//     this.selectedAccount = "";
//
//   }
//
//   public connectWallet = async () => {
//     try{
//       if(!this.ethereum) return alert("Please install Metamask");
//       if(this.currentAccount !== "") {
//         const dialogText = "You are connected to the wallet by account: \n" + this.currentAccount + "\nDo you want to change account?";
//         if (confirm(dialogText)) {
//           this.currentAccount = "";
//           sessionStorage.setItem(KEY_ADDRESS.CURRENT, "")
//           return this.changeWallet();
//         } else {
//           return;
//         }
//       }
//       this.currentAccount = await this.ethereum.request({method: 'eth_requestAccounts'});
//       this.currentAccount = this.currentAccount[0]
//       console.log('Current account metamask: ', this.currentAccount);
//       if (!sessionStorage.getItem(KEY_ADDRESS.OWNER)) {
//         sessionStorage.setItem(KEY_ADDRESS.OWNER, this.currentAccount)
//         sessionStorage.setItem(KEY_ADDRESS.CURRENT, this.currentAccount)
//       }
//       this.initializeContract()
//     }
//     catch(e){
//        throw new Error("No thereum object found");
//     }
//   }
//
//   public checkWalletConnected = async () => {
//     try{
//       if(!this.ethereum) return alert("Please install Metamask ")
//       const accounts = await this.ethereum.request({method: 'eth_accounts'});
//       return accounts;
//     }
//     catch(e){
//       throw new Error("No ethereum object found");
//     }
//   }
//
//   public changeWallet = async () => {
//     console.log("aaa")
//     try{
//       if (!this.ethereum) {
//         throw new Error("Please install Metamask");
//       }
//       if (!this.ethereum || !this.ethereum.selectedAddress) {
//           throw new Error("Please connect Metamask");
//       }
//       this.currentAccount = await this.ethereum.request({ method: 'eth_requestAccounts' });
//       this.currentAccount = this.currentAccount[0]
//       console.log("current acc: ", this.currentAccount)
//       sessionStorage.setItem(KEY_ADDRESS.CURRENT, this.currentAccount)
//       this.initializeContract()
//     }
//     catch(e){
//       throw new Error("No ethereum object found");
//     }
//
//   }
//   public selectAccount(account: string) {
//     this.selectedAccount = account;
//     console.log('Selected account:', account);
//   }
//
//   private initializeContract() {
//     console.log("Signer", this.signer);
//     this.contract = new ethers.Contract(this.contractAddress, this.contractABI, this.signer);
//     console.log("Contract initialized", this.contract);
//   }
//
//   public async callContractMethod(methodName: string, ...args: any[]) {
//     if (!this.contract) {
//       // throw new Error("Contract is not initialized")
//       await this.connectWallet()
//     }
//     const result = await this.contract[methodName](...args);
//     console.log('Result from contract:', result);
//     return result;
//   }
//
//   public async sendContractMethod(methodName: string, ...args: any[]) {
//     if (!this.contract) {
//       // throw new Error("Contract is not initialized")
//       await this.connectWallet()
//     }
//     const transaction = await this.contract[methodName](...args)
//     await transaction.wait()
//     console.log('Transaction result:', transaction)
//
//     // Giá trị electionId trả về có thể được tìm thấy trong logs nếu nó được phát ra dưới dạng một sự kiện
//     // const event = transaction.events.find(event => event.event === "ElectionCreated");
//     // if (event) {
//     //     const electionId = event.args.electionId;
//     //     console.log('Election ID:', electionId);
//     //     return electionId;
//     // } else {
//     //     throw new Error("ElectionCreated event not found in transaction receipt");
//     // }
//   }
// }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contract, ethers } from 'ethers';
import { KEY_ADDRESS } from '../constant/key.constant';
import Web3 from 'web3'
// import {WebsocketProvider} from 'web3-core';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class UtilModule {

  // public INFURA_API_KEY = '0c318738860048e1973e16489dd40040';
  // public infuraUrl = `https://sepolia.infura.io/v3/0c318738860048e1973e16489dd40040`;
  // public web3pr = new Web3(new WebsocketProvider(this.infuraUrl));

  public ethereum;
  public currentAccount: string = sessionStorage.getItem(KEY_ADDRESS.CURRENT) || ""


  accounts: string[] = ['0xe8b436e4a434f566afccaf95f2505a02c66ef4a9', '0xa401df1b85268648528e52e3817f2ccb148cb077', '0x4cfed4dd0b9e29c319036f1ecf117345f3b3ae72'];
  selectedAccount: string;

  private provider!: ethers.providers.Web3Provider
  private signer!: ethers.Signer
  // private contract!: ethers.Contract

  private contractABI: any = [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "electionId",
          "type": "uint256"
        },
        {
          "internalType": "string[]",
          "name": "_listNewCandidates",
          "type": "string[]"
        }
      ],
      "name": "addListCandidates",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "electionId",
          "type": "uint256"
        },
        {
          "internalType": "address[]",
          "name": "_voterAddresses",
          "type": "address[]"
        }
      ],
      "name": "addListVoters",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "electionId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256[]",
          "name": "voteCounts",
          "type": "uint256[]"
        }
      ],
      "name": "AllVoteCount",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "electionId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string[]",
          "name": "listCandidateName",
          "type": "string[]"
        }
      ],
      "name": "CandidateAdded",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_totalVoters",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_totalCandidates",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_maxVotesPerVoter",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_startTime",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_endTime",
          "type": "uint256"
        }
      ],
      "name": "createElection",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "electionId",
          "type": "uint256"
        }
      ],
      "name": "ElectionCreated",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "electionId",
          "type": "uint256"
        }
      ],
      "name": "getAllVoteCount",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "electionId",
          "type": "uint256"
        }
      ],
      "name": "getTotalVote",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "electionId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "totalVotes",
          "type": "uint256"
        }
      ],
      "name": "TotalVoteCount",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "electionId",
          "type": "uint256"
        },
        {
          "internalType": "uint256[]",
          "name": "_listCandidateId",
          "type": "uint256[]"
        }
      ],
      "name": "vote",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "electionId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "voter",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256[]",
          "name": "candidateIds",
          "type": "uint256[]"
        }
      ],
      "name": "Voted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "electionId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address[]",
          "name": "listVoterAddress",
          "type": "address[]"
        }
      ],
      "name": "VoterAdded",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "elections",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "totalVoters",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "totalVotersFix",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "totalCandidatesRemain",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "totalCandidatesFix",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "maxVotesPerVoter",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "startTime",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "endTime",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalElections",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]
  // private contractAddress = '0x9AFe10b99eF5e0Bd348f0dE6F6896F82f61CC734'
  private contractAddress = '0x4Bf7E71B0991B2d653a2f4307e094C28F57d9Da5'

  private web3!: Web3
  private contract: any

  constructor() {
    const {ethereum} = <any>window
    this.ethereum = ethereum
    if (this.ethereum) {
      this.provider = new ethers.providers.Web3Provider(this.ethereum);
      this.signer = this.provider.getSigner();
    }
    this.selectedAccount = "";
    // this.contract.events.allEvents({
    //   filter: {},
    //   fromBlock: 'latest'
    // }, (err: any, event: any) => {
    //   if (err) {
    //     console.log('err', err)
    //   } else {
    //     console.log('event all', event)
    //   }
    // })
    this.web3 = new Web3(new Web3.providers.WebsocketProvider('wss://sepolia.infura.io/ws/v3/0c318738860048e1973e16489dd40040'));
    this.contract = new this.web3.eth.Contract(this.contractABI, this.contractAddress);
    console.log(this.web3, this.contract)
  }

  public connectWallet = async (notChange = false) => {
    try{
      if(!this.ethereum) return alert("Please install Metamask");
      if(this.currentAccount !== "" && !notChange) {
        const dialogText = "You are connected to the wallet by account: \n" + this.currentAccount + "\nDo you want to change account?";
        if (confirm(dialogText)) {
          this.currentAccount = "";
          sessionStorage.setItem(KEY_ADDRESS.CURRENT, "")
          return this.changeWallet();
        } else {
          return;
        }
      }
      this.currentAccount = await this.ethereum.request({method: 'eth_requestAccounts'});
      this.currentAccount = this.currentAccount[0]
      console.log('Current account metamask: ', this.currentAccount);
      if (!sessionStorage.getItem(KEY_ADDRESS.OWNER)) {
        sessionStorage.setItem(KEY_ADDRESS.OWNER, this.currentAccount)
        sessionStorage.setItem(KEY_ADDRESS.CURRENT, this.currentAccount)
      }
      // this.initializeContract()
    }
    catch(e){
      throw new Error("No thereum object found");
    }
  }

  public checkWalletConnected = async () => {
    try{
      if(!this.ethereum) return alert("Please install Metamask ")
      const accounts = await this.ethereum.request({method: 'eth_accounts'});
      return accounts;
    }
    catch(e){
      throw new Error("No ethereum object found");
    }
  }

  public changeWallet = async () => {
    console.log("aaa")
    try{
      if (!this.ethereum) {
        throw new Error("Please install Metamask");
      }
      if (!this.ethereum || !this.ethereum.selectedAddress) {
        throw new Error("Please connect Metamask");
      }
      this.currentAccount = await this.ethereum.request({ method: 'eth_requestAccounts' });
      this.currentAccount = this.currentAccount[0]
      this.web3.eth.accounts.wallet.add('0xb72def4f3a5a47455b8abf2b0f5436f4ca392122f4fa35b5991c450cede03529')
      console.log("current acc: ", this.currentAccount)
      sessionStorage.setItem(KEY_ADDRESS.CURRENT, this.currentAccount)
      // this.initializeContract()
    }
    catch(e){
      throw new Error("No ethereum object found");
    }

  }
  public selectAccount(account: string) {
    this.selectedAccount = account;
    console.log('Selected account:', account);
  }

  // private initializeContract() {
  //   console.log("Signer", this.signer);
  //   this.contract = new ethers.Contract(this.contractAddress, this.contractABI, this.signer);
  //   console.log("Contract initialized", this.contract);
  // }

  // public async callContractMethod(methodName: string, ...args: any[]) {
  //   if (!this.contract) {
  //     // throw new Error("Contract is not initialized")
  //     await this.connectWallet()
  //   }
  //   const result = await this.contract[methodName](...args);
  //   console.log('Result from contract:', result);
  //   return result;
  // }

  // public async sendContractMethod(methodName: string, ...args: any[]) {
  //   if (!this.contract) {
  //     // throw new Error("Contract is not initialized")
  //     await this.connectWallet(true)
  //   }
  //   // const transaction = await this.contract[methodName](...args)
  //   const transaction = await this.contract[methodName](...args)
  //   const receipt = await transaction.wait()
  //   console.log('Transaction result:', transaction)
  //   console.log('Receipt:', receipt)

  //   const eventName = this.getEventName(methodName); // Custom method to map method names to event names
  //   const eventSignature = this.contract.filters[eventName]();
  //   console.log('EventSignature', eventSignature);

  //   const logs = receipt.logs.filter((log: any) => log.topics.includes(eventSignature.topics![0]));

  //   if (logs.length > 0) {
  //     console.log('Logs', logs);
  //     const event = logs[0]; // Assuming you are interested in the first event log
  //     const parsedLog = this.contract.interface.parseLog(event);
  //     console.log('Event data:', parsedLog.args);
  //     // return parsedLog.args; // Return event data if needed
  //   } else {
  //     console.log('No event found');
  //   }
  // }

  async createVoting(arg: any[]): Promise<any> {
    try {
      console.log(arg)
      // const accounts = await this.web3.eth.getAccounts();
      // const account = accounts[0];
      
      this.contract.events.ElectionCreated({
        filter: {},
        fromBlock: 'latest'
      }, (err: any, event: any) => {
        if (err) {
          console.log('err', err)
        } else {
          console.log('event', event)
        }
      })

      const data = await this.contract.methods.createElection(...arg).encodeABI();
      const tx: any = {
        from: this.currentAccount,
        to: this.contractAddress,
        data: data
      }
      const estGas = await this.web3.eth.estimateGas(tx)
      tx.gas = estGas
  
      // const electionId = 
      await this.contract
        .methods.createElection(...arg)
        .send({
          from: this.currentAccount,
          gas: estGas
        }).then((receipt: any) => {
          console.log('receipt', receipt)
        })
      // console.log('Election created with ID:', electionId);

      // this.contract.events['ElectionCreated']((error: Error, event: any) => {
      //   if (error) {
      //     console.error('Error in ElectionCreated event:', error);
      //   } else {
      //     // console.log('ElectionCreated event:', event.returnValues);
      //     console.log('ElectionCreated event:', event);
      //   }
      // });

      

      // this.web3.eth.sendTransaction(tx).then(receipt => {
      //   console.log('receipt', receipt)
      // })



      // this.web3.eth.sendTransaction(tx)
      //   .on('transactionHash', (hash) => {
      //     console.log('Transaction hash:', hash);
      //   })
      //   .on('confirmation', (confirmationNumber, receipt) => {
      //     console.log('Confirmation:', confirmationNumber, receipt);
      //   })
      //   .on('error', (error) => {
      //     console.error('Error sending transaction:', error);
      //   });

      // this.contract.events.ElectionCreated({})
      //   .on('data', (event: any) => {
      //     console.log('ElectionCreated event:', event); // Access returned values here
      //   })
      //   .on('error', (error: any) => {
      //     console.error('Error in ElectionCreated event:', error);
      //   });
      // this.contract.events.ElectionCreated({})
      //   .on('data', (event: any) => {
      //     console.log('ElectionCreated event:', event); // Access returned values here
      //   })
      //   .on('error', (error: any) => {
      //     console.error('Error in ElectionCreated event:', error);
      //   });
      // console.log('contract event', this.contract.events.allEvents())
      
      // setTimeout(() => {
      //   console.log('contract event 20s', this.contract.events.allEvents())
      // }, 20000)
  
      // await contract.methods.addListCandidates(electionId, ['Alice', 'Bob', 'Charlie']).send({ from: account });
      // console.log('Candidates added to election');
  
      // await contract.methods.addListVoters(electionId, [account]).send({ from: account });
      // console.log('Voters added to election');
  
      // contract.events.CandidateAdded((error: Error, event: any) => {
      //   if (error) {
      //     console.error('Error in CandidateAdded event:', error);
      //   } else {
      //     console.log('CandidateAdded event:', event.returnValues);
      //   }
      // });
  
      // contract.events.VoterAdded((error: Error, event: any) => {
      //   if (error) {
      //     console.error('Error in VoterAdded event:', error);
      //   } else {
      //     console.log('VoterAdded event:', event.returnValues);
      //   }
      // });
  
      // contract.events.AllVoteCount((error: Error, event: any) => {
      //   if (error) {
      //     console.error('Error in AllVoteCount event:', error);
      //   } else {
      //     console.log('AllVoteCount event:', event.returnValues);
      //   }
      // });
  
      // contract.events.TotalVoteCount((error: Error, event: any) => {
      //   if (error) {
      //     console.error('Error in TotalVoteCount event:', error);
      //   } else {
      //     console.log('TotalVoteCount event:', event.returnValues);
      //   }
      // });
  
      // contract.events.Voted((error: Error, event: any) => {
      //   if (error) {
      //     console.error('Error in Voted event:', error);
      //   } else {
      //     console.log('Voted event:', event.returnValues);
      //   }
      // });
    } catch (error) {
      console.error('Error:', error);
    }
  }

  private async getGasPrice() {
    const blockGas = (await this.web3.eth.getBlock('latest')).gasLimit
    const gasPrice = parseInt(await this.web3.eth.getGasPrice())
    return blockGas < gasPrice ? blockGas : gasPrice
  }

  private getEventName(methodName: string): string {
    switch (methodName) {
        case 'addListCandidates':
            return 'CandidateAdded';
        case 'addListVoters':
            return 'VoterAdded';
        case 'createElection':
            return 'ElectionCreated';
        case 'vote':
            return 'Voted';
        // Add other cases as needed
        default:
            throw new Error('Event name mapping not found for method: ' + methodName);
    }
}
}

