export const abi = [
  {
    "type": "constructor",
    "inputs": [
      {
        "name": "name_",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "symbol_",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "scalar_",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "fallback",
    "stateMutability": "payable"
  },
  {
    "type": "receive",
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "DOMAIN_SEPARATOR",
    "inputs": [],
    "outputs": [
      {
        "name": "result",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "allowance",
    "inputs": [
      {
        "name": "owner",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "spender",
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
    "name": "approve",
    "inputs": [
      {
        "name": "spender",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "amount",
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
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "balanceOf",
    "inputs": [
      {
        "name": "owner",
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
    "name": "decimals",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint8",
        "internalType": "uint8"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "mint",
    "inputs": [
      {
        "name": "recipient",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "value",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "name",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "string",
        "internalType": "string"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "nonces",
    "inputs": [
      {
        "name": "owner",
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
    "name": "permit",
    "inputs": [
      {
        "name": "owner",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "spender",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "value",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "deadline",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "v",
        "type": "uint8",
        "internalType": "uint8"
      },
      {
        "name": "r",
        "type": "bytes32",
        "internalType": "bytes32"
      },
      {
        "name": "s",
        "type": "bytes32",
        "internalType": "bytes32"
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
    "name": "setMintCap",
    "inputs": [
      {
        "name": "mintCap",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "swap",
    "inputs": [
      {
        "name": "target",
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
    "name": "symbol",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "string",
        "internalType": "string"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "totalSupply",
    "inputs": [],
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
    "name": "transfer",
    "inputs": [
      {
        "name": "to",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "amount",
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
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "transferFrom",
    "inputs": [
      {
        "name": "from",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "to",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "amount",
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
    "type": "event",
    "name": "Approval",
    "inputs": [
      {
        "name": "owner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "spender",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "amount",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
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
    "type": "event",
    "name": "Transfer",
    "inputs": [
      {
        "name": "from",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "to",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "amount",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "error",
    "name": "AllowanceOverflow",
    "inputs": []
  },
  {
    "type": "error",
    "name": "AllowanceUnderflow",
    "inputs": []
  },
  {
    "type": "error",
    "name": "AlreadyInitialized",
    "inputs": []
  },
  {
    "type": "error",
    "name": "InsufficientAllowance",
    "inputs": []
  },
  {
    "type": "error",
    "name": "InsufficientBalance",
    "inputs": []
  },
  {
    "type": "error",
    "name": "InvalidPermit",
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
    "name": "Permit2AllowanceIsFixedAtInfinity",
    "inputs": []
  },
  {
    "type": "error",
    "name": "PermitExpired",
    "inputs": []
  },
  {
    "type": "error",
    "name": "TotalSupplyOverflow",
    "inputs": []
  },
  {
    "type": "error",
    "name": "Unauthorized",
    "inputs": []
  }
] as const;

export const code = "0x608060405234801561001057600080fd5b5060405161119938038061119983398101604081905261002f9161015f565b600061003b848261025a565b506001610048838261025a565b5060028190556001600160801b036003556100623361006a565b505050610318565b6001600160a01b0316638b78c6d8198190558060007f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08180a350565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126100cd57600080fd5b81516001600160401b038111156100e6576100e66100a6565b604051601f8201601f19908116603f011681016001600160401b0381118282101715610114576101146100a6565b60405281815283820160200185101561012c57600080fd5b60005b8281101561014b5760208186018101518383018201520161012f565b506000918101602001919091529392505050565b60008060006060848603121561017457600080fd5b83516001600160401b0381111561018a57600080fd5b610196868287016100bc565b602086015190945090506001600160401b038111156101b457600080fd5b6101c0868287016100bc565b925050604084015190509250925092565b600181811c908216806101e557607f821691505b60208210810361020557634e487b7160e01b600052602260045260246000fd5b50919050565b601f82111561025557806000526020600020601f840160051c810160208510156102325750805b601f840160051c820191505b81811015610252576000815560010161023e565b50505b505050565b81516001600160401b03811115610273576102736100a6565b6102878161028184546101d1565b8461020b565b6020601f8211600181146102bb57600083156102a35750848201515b600019600385901b1c1916600184901b178455610252565b600084815260208120601f198516915b828110156102eb57878501518255602094850194600190920191016102cb565b50848210156103095786840151600019600387901b60f8161c191681555b50505050600190811b01905550565b610e72806103276000396000f3fe60806040526004361061012c5760003560e01c8063715018a6116100a5578063d505accf1161006c578063d505accf14610320578063dd62ed3e14610340578063df791e5014610360578063f04e283e14610380578063f2fde38b14610393578063fee81cf4146103a657005b8063715018a6146102845780637ecebe001461028c5780638da5cb5b146102bf57806395d89b41146102eb578063a9059cbb1461030057005b8063313ce567116100f4578063313ce567146101d85780633644e515146101f45780634070a0c91461020957806340c10f191461022957806354d1f13d1461024957806370a082311461025157005b806306fdde031461012e578063095ea7b31461015957806318160ddd1461018957806323b872dd146101b057806325692962146101d0575b005b34801561013a57600080fd5b506101436103d9565b6040516101509190610bf0565b60405180910390f35b34801561016557600080fd5b50610179610174366004610c5a565b61046b565b6040519015158152602001610150565b34801561019557600080fd5b506805345cdf77eb68f44c545b604051908152602001610150565b3480156101bc57600080fd5b506101796101cb366004610c84565b6104f0565b61012c6105b1565b3480156101e457600080fd5b5060405160128152602001610150565b34801561020057600080fd5b506101a2610601565b34801561021557600080fd5b5061012c610224366004610cc1565b61067e565b34801561023557600080fd5b5061012c610244366004610c5a565b61068b565b61012c6106e2565b34801561025d57600080fd5b506101a261026c366004610cda565b6387a211a2600c908152600091909152602090205490565b61012c61071e565b34801561029857600080fd5b506101a26102a7366004610cda565b6338377508600c908152600091909152602090205490565b3480156102cb57600080fd5b50638b78c6d819546040516001600160a01b039091168152602001610150565b3480156102f757600080fd5b50610143610732565b34801561030c57600080fd5b5061017961031b366004610c5a565b610741565b34801561032c57600080fd5b5061012c61033b366004610cf5565b610754565b34801561034c57600080fd5b506101a261035b366004610d68565b610910565b34801561036c57600080fd5b5061012c61037b366004610c84565b610957565b61012c61038e366004610cda565b6109f5565b61012c6103a1366004610cda565b610a35565b3480156103b257600080fd5b506101a26103c1366004610cda565b63389a75e1600c908152600091909152602090205490565b6060600080546103e890610d9b565b80601f016020809104026020016040519081016040528092919081815260200182805461041490610d9b565b80156104615780601f1061043657610100808354040283529160200191610461565b820191906000526020600020905b81548152906001019060200180831161044457829003601f168201915b5050505050905090565b60006001600160a01b0383166e22d473030f116ddee9f6b43ac78ba3188219151761049e57633f68539a6000526004601cfd5b82602052637f5e9f20600c5233600052816034600c205581600052602c5160601c337f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560206000a35060015b92915050565b60008360601b6e22d473030f116ddee9f6b43ac78ba333146105475733602052637f5e9f208117600c526034600c208054801915610544578085111561053e576313be252b6000526004601cfd5b84810382555b50505b6387a211a28117600c526020600c2080548085111561056e5763f4d678b86000526004601cfd5b84810382555050836000526020600c208381540181555082602052600c5160601c8160601c600080516020610e1d833981519152602080a3505060019392505050565b60006202a30067ffffffffffffffff164201905063389a75e1600c5233600052806020600c2055337fdbf36a107da19e49527a7176a1babf963b4b0ff8cde35ee35d6cd8f1f9ac7e1d600080a250565b60008061060c6103d9565b805190602001209050604080517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f815260208101929092527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc69082015246606082015230608082015260a09020919050565b610686610a5c565b600355565b60035481106106d45760405162461bcd60e51b8152602060048201526011602482015270135a5b9d0818d85c08195e18d959591959607a1b604482015260640160405180910390fd5b6106de8282610a77565b5050565b63389a75e1600c523360005260006020600c2055337ffa7b8eab7da67f412cc9575ed43464468f9bfbae89d1675917346ca6d8fe3c92600080a2565b610726610a5c565b6107306000610ae4565b565b6060600180546103e890610d9b565b600061074d8383610b22565b9392505050565b6001600160a01b0386166e22d473030f116ddee9f6b43ac78ba3188519151761078557633f68539a6000526004601cfd5b600061078f6103d9565b8051906020012090507fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc6428610156107cf57631a15a3cc6000526004601cfd5b6040518960601b60601c99508860601b60601c985065383775081901600e52896000526020600c2080547f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f835284602084015283604084015246606084015230608084015260a08320602e527f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c983528b60208401528a60408401528960608401528060808401528860a084015260c08320604e526042602c206000528760ff1660205286604052856060526020806080600060015afa8c3d51146108bb5763ddafbaef6000526004601cfd5b0190556303faf4f960a51b89176040526034602c20889055888a7f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925602060608501a36040525050600060605250505050505050565b60006e22d473030f116ddee9f6b43ac78ba2196001600160a01b0383160161093b57506000196104ea565b50602052637f5e9f20600c908152600091909152603490205490565b6109613382610b8b565b826001600160a01b03166340c10f1983670de0b6b3a7640000600254856109889190610dd5565b6109929190610dfa565b6040516001600160e01b031960e085901b1681526001600160a01b0390921660048301526024820152604401600060405180830381600087803b1580156109d857600080fd5b505af11580156109ec573d6000803e3d6000fd5b50505050505050565b6109fd610a5c565b63389a75e1600c52806000526020600c208054421115610a2557636f5e88186000526004601cfd5b60009055610a3281610ae4565b50565b610a3d610a5c565b8060601b610a5357637448fbae6000526004601cfd5b610a3281610ae4565b638b78c6d819543314610730576382b429006000526004601cfd5b6805345cdf77eb68f44c5481810181811015610a9b5763e5cfe9576000526004601cfd5b806805345cdf77eb68f44c5550506387a211a2600c52816000526020600c208181540181555080602052600c5160601c6000600080516020610e1d833981519152602080a35050565b638b78c6d81980546001600160a01b039092169182907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0600080a355565b60006387a211a2600c52336000526020600c20805480841115610b4d5763f4d678b86000526004601cfd5b83810382555050826000526020600c208281540181555081602052600c5160601c33600080516020610e1d833981519152602080a350600192915050565b6387a211a2600c52816000526020600c20805480831115610bb45763f4d678b86000526004601cfd5b82900390556805345cdf77eb68f44c8054829003905560008181526001600160a01b038316600080516020610e1d833981519152602083a35050565b602081526000825180602084015260005b81811015610c1e5760208186018101516040868401015201610c01565b506000604082850101526040601f19601f83011684010191505092915050565b80356001600160a01b0381168114610c5557600080fd5b919050565b60008060408385031215610c6d57600080fd5b610c7683610c3e565b946020939093013593505050565b600080600060608486031215610c9957600080fd5b610ca284610c3e565b9250610cb060208501610c3e565b929592945050506040919091013590565b600060208284031215610cd357600080fd5b5035919050565b600060208284031215610cec57600080fd5b61074d82610c3e565b600080600080600080600060e0888a031215610d1057600080fd5b610d1988610c3e565b9650610d2760208901610c3e565b95506040880135945060608801359350608088013560ff81168114610d4b57600080fd5b9699959850939692959460a0840135945060c09093013592915050565b60008060408385031215610d7b57600080fd5b610d8483610c3e565b9150610d9260208401610c3e565b90509250929050565b600181811c90821680610daf57607f821691505b602082108103610dcf57634e487b7160e01b600052602260045260246000fd5b50919050565b80820281158282048414176104ea57634e487b7160e01b600052601160045260246000fd5b600082610e1757634e487b7160e01b600052601260045260246000fd5b50049056feddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3efa26469706673582212200d5f90e0206d00249ed2b8c4707bb32d3ed7210500d96b4af0573b0b2237c75c64736f6c634300081e0033" as const;

