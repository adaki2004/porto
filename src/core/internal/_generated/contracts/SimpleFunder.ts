export const abi = [
  {
    "type": "constructor",
    "inputs": [
      {
        "name": "_funder",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "_owner",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "receive",
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "cancelOwnershipHandover",
    "inputs": [],
    "outputs": [],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "completeOwnershipHandover",
    "inputs": [
      {
        "name": "pendingOwner",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "eip712Domain",
    "inputs": [],
    "outputs": [
      {
        "name": "fields",
        "type": "bytes1",
        "internalType": "bytes1"
      },
      {
        "name": "name",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "version",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "chainId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "verifyingContract",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "salt",
        "type": "bytes32",
        "internalType": "bytes32"
      },
      {
        "name": "extensions",
        "type": "uint256[]",
        "internalType": "uint256[]"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "fund",
    "inputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "digest",
        "type": "bytes32",
        "internalType": "bytes32"
      },
      {
        "name": "transfers",
        "type": "tuple[]",
        "internalType": "struct ICommon.Transfer[]",
        "components": [
          {
            "name": "token",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "amount",
            "type": "uint256",
            "internalType": "uint256"
          }
        ]
      },
      {
        "name": "funderSignature",
        "type": "bytes",
        "internalType": "bytes"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "fund",
    "inputs": [
      {
        "name": "digest",
        "type": "bytes32",
        "internalType": "bytes32"
      },
      {
        "name": "transfers",
        "type": "tuple[]",
        "internalType": "struct ICommon.Transfer[]",
        "components": [
          {
            "name": "token",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "amount",
            "type": "uint256",
            "internalType": "uint256"
          }
        ]
      },
      {
        "name": "funderSignature",
        "type": "bytes",
        "internalType": "bytes"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "funder",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "gasWallets",
    "inputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "gwynethForwarder",
    "inputs": [],
    "outputs": [],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "nonces",
    "inputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "orchestrators",
    "inputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "owner",
    "inputs": [],
    "outputs": [
      {
        "name": "result",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "ownershipHandoverExpiresAt",
    "inputs": [
      {
        "name": "pendingOwner",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "result",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "pullGas",
    "inputs": [
      {
        "name": "amount",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "renounceOwnership",
    "inputs": [],
    "outputs": [],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "requestOwnershipHandover",
    "inputs": [],
    "outputs": [],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "setFunder",
    "inputs": [
      {
        "name": "newFunder",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "setGasWallet",
    "inputs": [
      {
        "name": "wallets",
        "type": "address[]",
        "internalType": "address[]"
      },
      {
        "name": "isGasWallet",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "setOrchestrators",
    "inputs": [
      {
        "name": "ocs",
        "type": "address[]",
        "internalType": "address[]"
      },
      {
        "name": "val",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "transferOwnership",
    "inputs": [
      {
        "name": "newOwner",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "usedDigests",
    "inputs": [
      {
        "name": "",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "withdrawTokens",
    "inputs": [
      {
        "name": "token",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "recipient",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "amount",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "withdrawTokensWithSignature",
    "inputs": [
      {
        "name": "token",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "recipient",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "amount",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "deadline",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "nonce",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "signature",
        "type": "bytes",
        "internalType": "bytes"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "event",
    "name": "OwnershipHandoverCanceled",
    "inputs": [
      {
        "name": "pendingOwner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "OwnershipHandoverRequested",
    "inputs": [
      {
        "name": "pendingOwner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "OwnershipTransferred",
    "inputs": [
      {
        "name": "oldOwner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "newOwner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "error",
    "name": "AlreadyInitialized",
    "inputs": []
  },
  {
    "type": "error",
    "name": "DeadlineExpired",
    "inputs": []
  },
  {
    "type": "error",
    "name": "DigestUsed",
    "inputs": []
  },
  {
    "type": "error",
    "name": "InvalidFunderSignature",
    "inputs": []
  },
  {
    "type": "error",
    "name": "InvalidNonce",
    "inputs": []
  },
  {
    "type": "error",
    "name": "InvalidWithdrawalSignature",
    "inputs": []
  },
  {
    "type": "error",
    "name": "NewOwnerIsZeroAddress",
    "inputs": []
  },
  {
    "type": "error",
    "name": "NoHandoverRequest",
    "inputs": []
  },
  {
    "type": "error",
    "name": "OnlyGasWallet",
    "inputs": []
  },
  {
    "type": "error",
    "name": "OnlyOrchestrator",
    "inputs": []
  },
  {
    "type": "error",
    "name": "Unauthorized",
    "inputs": []
  }
] as const;

export const code = "0x610120604052348015610010575f5ffd5b5060405161150438038061150483398101604081905261002f91610162565b306080524660a05260608061007f604080518082018252600c81526b29b4b6b83632a33ab73232b960a11b602080830191909152825180840190935260058352640605c625c760db1b9083015291565b815160209283012081519183019190912060c082905260e0819052604080517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f8152938401929092529082015246606082015230608082015260a090206101005250505f80546001600160a01b0319166001600160a01b0384161790556101058161010c565b5050610193565b6001600160a01b0316638b78c6d819819055805f7f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08180a350565b80516001600160a01b038116811461015d575f5ffd5b919050565b5f5f60408385031215610173575f5ffd5b61017c83610147565b915061018a60208401610147565b90509250929050565b60805160a05160c05160e051610100516113346101d05f395f610b1801525f610bd201525f610bac01525f610b5c01525f610b3901526113345ff3fe608060405260043610610134575f3560e01c806384b0196e116100a8578063d39c4de71161006d578063d39c4de714610320578063dd16ec871461034e578063f04e283e1461036d578063f2fde38b14610380578063fc361cb514610393578063fee81cf4146103c1575f5ffd5b806384b0196e1461028457806388a8251e146102ab5780638da5cb5b146102ca578063aa6a57c7146102e2578063bc83e85114610301575f5ffd5b806325692962116100f957806325692962146102005780633a0469591461020857806354d1f13d146102275780635e35359e1461022f578063715018a61461024e5780637f63602514610256575f5ffd5b8063041ae8801461013f5780630acc8cd11461017a5780631297bad61461019b57806313e0b99d146101ba578063141a468c146101c2575f5ffd5b3661013b57005b5f5ffd5b34801561014a575f5ffd5b505f5461015d906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b348015610185575f5ffd5b50610199610194366004610dec565b610400565b005b3480156101a6575f5ffd5b506101996101b5366004610e05565b610429565b61019961058e565b3480156101cd575f5ffd5b506101f06101dc366004610eb0565b60026020525f908152604090205460ff1681565b6040519015158152602001610171565b610199610655565b348015610213575f5ffd5b5061019961022236600461105a565b6106a2565b6101996106b3565b34801561023a575f5ffd5b506101996102493660046110d8565b6106ec565b6101996106ff565b348015610261575f5ffd5b506101f0610270366004610dec565b60036020525f908152604090205460ff1681565b34801561028f575f5ffd5b50610298610712565b6040516101719796959493929190611140565b3480156102b6575f5ffd5b506101996102c53660046111e5565b610775565b3480156102d5575f5ffd5b50638b78c6d8195461015d565b3480156102ed575f5ffd5b506101996102fc3660046111e5565b6107d7565b34801561030c575f5ffd5b5061019961031b366004610eb0565b610839565b34801561032b575f5ffd5b506101f061033a366004610eb0565b60046020525f908152604090205460ff1681565b348015610359575f5ffd5b5061019961036836600461128f565b610876565b61019961037b366004610dec565b610a9c565b61019961038e366004610dec565b610ad6565b34801561039e575f5ffd5b506101f06103ad366004610dec565b60016020525f908152604090205460ff1681565b3480156103cc575f5ffd5b506103f26103db366004610dec565b63389a75e1600c9081525f91909152602090205490565b604051908152602001610171565b610408610afc565b5f80546001600160a01b0319166001600160a01b0392909216919091179055565b5f8381526002602052604090205460ff161561045857604051633ab3447f60e11b815260040160405180910390fd5b8342111561047957604051631ab7da6b60e01b815260040160405180910390fd5b604080517fb8ad6c296cb3f339f49ca8ddb6cbd07a7e70787b9236d1e5917014ad241a097960208201526001600160a01b03808a169282019290925290871660608201526080810186905260a0810185905260c081018490525f906104f69060e00160405160208183030381529060405280519060200120610b16565b9050610544610508638b78c6d8195490565b8285858080601f0160208091040260200160405190810160405280939291908181526020018383808284375f92019190915250610c2c92505050565b61056157604051635f3b6d9360e01b815260040160405180910390fd5b5f848152600260205260409020805460ff19166001179055610584888888610d0a565b5050505050505050565b33731adb9959eb142be128e6dfecc8d571f07cd66dee1461061b5760405162461bcd60e51b815260206004820152603760248201527f53696d706c6546756e6465723a206777796e657468466f72776172646572206e60448201527f6f742066726f6d20457874656e73696f6e4f7261636c65000000000000000000606482015260840160405180910390fd5b36602319018060045f375f80828136601f1901356001600160a01b03165af490503d805f5f3e81801561064c57815ff35b815ffd5b505050565b5f6202a30067ffffffffffffffff164201905063389a75e1600c52335f52806020600c2055337fdbf36a107da19e49527a7176a1babf963b4b0ff8cde35ee35d6cd8f1f9ac7e1d5f5fa250565b6106ad838383610876565b50505050565b63389a75e1600c52335f525f6020600c2055337ffa7b8eab7da67f412cc9575ed43464468f9bfbae89d1675917346ca6d8fe3c925f5fa2565b6106f4610afc565b610650838383610d0a565b610707610afc565b6107105f610d2d565b565b600f60f81b6060805f808083610763604080518082018252600c81526b29b4b6b83632a33ab73232b960a11b602080830191909152825180840190935260058352640605c625c760db1b9083015291565b97989097965046955030945091925090565b61077d610afc565b5f5b8251811015610650578160035f85848151811061079e5761079e6112fc565b6020908102919091018101516001600160a01b031682528101919091526040015f20805460ff191691151591909117905560010161077f565b6107df610afc565b5f5b8251811015610650578160015f858481518110610800576108006112fc565b6020908102919091018101516001600160a01b031682528101919091526040015f20805460ff19169115159190911790556001016107e1565b335f9081526001602052604090205460ff166108685760405163022cc82d60e21b815260040160405180910390fd5b6108735f3383610d0a565b50565b335f9081526003602052604090205460ff166108a55760405163de23df5d60e01b815260040160405180910390fd5b5f8381526004602052604090205460ff16156108d457604051632b02a8ad60e11b815260040160405180910390fd5b5f838152600460205260408120805460ff191660011790558054610902906001600160a01b03168584610c2c565b90506001600160c01b03323110610917575060015b806109355760405163ee3af24f60e01b815260040160405180910390fd5b82515f9081908590829061094b5761094b6112fc565b60200260200101515f01516001600160a01b0316036109e3575f336001600160a01b0316855f81518110610981576109816112fc565b6020026020010151602001516040515f6040518083038185875af1925050503d805f81146109ca576040519150601f19603f3d011682016040523d82523d5f602084013e6109cf565b606091505b5050905081806109de90611310565b925050505b8351811015610a95575f8482815181106109ff576109ff6112fc565b60200260200101515f015190505f858381518110610a1f57610a1f6112fc565b602002602001015160200151905060405163dd62ed3e81523060208201523360408201525f5f5260205f6044601c84015f875af1505f5180831115610a865763095ea7b382523360208301526001600160a81b0360408301525f5f6044601c85015f885af1505b505050508060010190506109e3565b5050505050565b610aa4610afc565b63389a75e1600c52805f526020600c208054421115610aca57636f5e88185f526004601cfd5b5f905561087381610d2d565b610ade610afc565b8060601b610af357637448fbae5f526004601cfd5b61087381610d2d565b638b78c6d819543314610710576382b429005f526004601cfd5b7f00000000000000000000000000000000000000000000000000000000000000007f000000000000000000000000000000000000000000000000000000000000000030147f0000000000000000000000000000000000000000000000000000000000000000461416610c095750604080517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f81527f000000000000000000000000000000000000000000000000000000000000000060208201527f00000000000000000000000000000000000000000000000000000000000000009181019190915246606082015230608082015260a090205b6719010000000000005f5280601a5281603a52604260182090505f603a52919050565b5f6001600160a01b03841615610d0357604051843b610cc157825160408114610c5d5760418114610c7e5750610d01565b604084015160ff81901c601b016020526001600160ff1b0316606052610c91565b60608401515f1a60205260408401516060525b50835f5260208301516040526020600160805f60015afa5180861860601b3d119250505f60605280604052610d01565b631626ba7e60e01b808252846004830152602482016040815284516020018060448501828860045afa905060208260443d01868b5afa9151911691141691505b505b9392505050565b6001600160a01b038316610d22576106508282610d6a565b610650838383610d87565b638b78c6d81980546001600160a01b039092169182907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e05f80a355565b5f385f3884865af1610d835763b12d13eb5f526004601cfd5b5050565b816014528060345263a9059cbb60601b5f5260205f604460105f875af18060015f511416610dc757803d853b151710610dc7576390b8ec185f526004601cfd5b505f603452505050565b80356001600160a01b0381168114610de7575f5ffd5b919050565b5f60208284031215610dfc575f5ffd5b610d0382610dd1565b5f5f5f5f5f5f5f60c0888a031215610e1b575f5ffd5b610e2488610dd1565b9650610e3260208901610dd1565b955060408801359450606088013593506080880135925060a088013567ffffffffffffffff811115610e62575f5ffd5b8801601f81018a13610e72575f5ffd5b803567ffffffffffffffff811115610e88575f5ffd5b8a6020828401011115610e99575f5ffd5b602082019350809250505092959891949750929550565b5f60208284031215610ec0575f5ffd5b5035919050565b634e487b7160e01b5f52604160045260245ffd5b6040805190810167ffffffffffffffff81118282101715610efe57610efe610ec7565b60405290565b604051601f8201601f1916810167ffffffffffffffff81118282101715610f2d57610f2d610ec7565b604052919050565b5f67ffffffffffffffff821115610f4e57610f4e610ec7565b5060051b60200190565b5f82601f830112610f67575f5ffd5b8135610f7a610f7582610f35565b610f04565b8082825260208201915060208360061b860101925085831115610f9b575f5ffd5b602085015b83811015610fe45760408188031215610fb7575f5ffd5b610fbf610edb565b610fc882610dd1565b8152602082810135818301529084529290920191604001610fa0565b5095945050505050565b5f82601f830112610ffd575f5ffd5b813567ffffffffffffffff81111561101757611017610ec7565b61102a601f8201601f1916602001610f04565b81815284602083860101111561103e575f5ffd5b816020850160208301375f918101602001919091529392505050565b5f5f5f5f6080858703121561106d575f5ffd5b61107685610dd1565b935060208501359250604085013567ffffffffffffffff811115611098575f5ffd5b6110a487828801610f58565b925050606085013567ffffffffffffffff8111156110c0575f5ffd5b6110cc87828801610fee565b91505092959194509250565b5f5f5f606084860312156110ea575f5ffd5b6110f384610dd1565b925061110160208501610dd1565b929592945050506040919091013590565b5f81518084528060208401602086015e5f602082860101526020601f19601f83011685010191505092915050565b60ff60f81b8816815260e060208201525f61115e60e0830189611112565b82810360408401526111708189611112565b606084018890526001600160a01b038716608085015260a0840186905283810360c0850152845180825260208087019350909101905f5b818110156111c55783518352602093840193909201916001016111a7565b50909b9a5050505050505050505050565b80358015158114610de7575f5ffd5b5f5f604083850312156111f6575f5ffd5b823567ffffffffffffffff81111561120c575f5ffd5b8301601f8101851361121c575f5ffd5b803561122a610f7582610f35565b8082825260208201915060208360051b85010192508783111561124b575f5ffd5b6020840193505b828410156112745761126384610dd1565b825260209384019390910190611252565b945061128692505050602084016111d6565b90509250929050565b5f5f5f606084860312156112a1575f5ffd5b83359250602084013567ffffffffffffffff8111156112be575f5ffd5b6112ca86828701610f58565b925050604084013567ffffffffffffffff8111156112e6575f5ffd5b6112f286828701610fee565b9150509250925092565b634e487b7160e01b5f52603260045260245ffd5b5f6001820161132d57634e487b7160e01b5f52601160045260245ffd5b506001019056" as const;

