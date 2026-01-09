export const abi = [
  {
    "type": "constructor",
    "inputs": [
      {
        "name": "orchestrator",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "payable"
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
    "name": "ANY_FN_SEL",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "bytes4",
        "internalType": "bytes4"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "ANY_KEYHASH",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "ANY_TARGET",
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
    "name": "CALL_TYPEHASH",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "DOMAIN_TYPEHASH",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "EMPTY_CALLDATA_FN_SEL",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "bytes4",
        "internalType": "bytes4"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "EXECUTE_TYPEHASH",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "MULTICHAIN_NONCE_PREFIX",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint16",
        "internalType": "uint16"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "ORCHESTRATOR",
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
    "name": "SIGN_TYPEHASH",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "approvedSignatureCheckers",
    "inputs": [
      {
        "name": "keyHash",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "address[]",
        "internalType": "address[]"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "authorize",
    "inputs": [
      {
        "name": "key",
        "type": "tuple",
        "internalType": "struct IthacaAccountOld.Key",
        "components": [
          {
            "name": "expiry",
            "type": "uint40",
            "internalType": "uint40"
          },
          {
            "name": "keyType",
            "type": "uint8",
            "internalType": "enum IthacaAccountOld.KeyType"
          },
          {
            "name": "isSuperAdmin",
            "type": "bool",
            "internalType": "bool"
          },
          {
            "name": "publicKey",
            "type": "bytes",
            "internalType": "bytes"
          }
        ]
      }
    ],
    "outputs": [
      {
        "name": "keyHash",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "callCheckerInfos",
    "inputs": [
      {
        "name": "keyHash",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "outputs": [
      {
        "name": "results",
        "type": "tuple[]",
        "internalType": "struct GuardedExecutor.CallCheckerInfo[]",
        "components": [
          {
            "name": "target",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "checker",
            "type": "address",
            "internalType": "address"
          }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "canExecute",
    "inputs": [
      {
        "name": "keyHash",
        "type": "bytes32",
        "internalType": "bytes32"
      },
      {
        "name": "target",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "data",
        "type": "bytes",
        "internalType": "bytes"
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
    "name": "canExecutePackedInfos",
    "inputs": [
      {
        "name": "keyHash",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bytes32[]",
        "internalType": "bytes32[]"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "checkAndIncrementNonce",
    "inputs": [
      {
        "name": "nonce",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "computeDigest",
    "inputs": [
      {
        "name": "calls",
        "type": "tuple[]",
        "internalType": "struct ERC7821.Call[]",
        "components": [
          {
            "name": "to",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "value",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "data",
            "type": "bytes",
            "internalType": "bytes"
          }
        ]
      },
      {
        "name": "nonce",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
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
    "name": "execute",
    "inputs": [
      {
        "name": "mode",
        "type": "bytes32",
        "internalType": "bytes32"
      },
      {
        "name": "executionData",
        "type": "bytes",
        "internalType": "bytes"
      }
    ],
    "outputs": [],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "getContextKeyHash",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getKey",
    "inputs": [
      {
        "name": "keyHash",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "outputs": [
      {
        "name": "key",
        "type": "tuple",
        "internalType": "struct IthacaAccountOld.Key",
        "components": [
          {
            "name": "expiry",
            "type": "uint40",
            "internalType": "uint40"
          },
          {
            "name": "keyType",
            "type": "uint8",
            "internalType": "enum IthacaAccountOld.KeyType"
          },
          {
            "name": "isSuperAdmin",
            "type": "bool",
            "internalType": "bool"
          },
          {
            "name": "publicKey",
            "type": "bytes",
            "internalType": "bytes"
          }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getKeys",
    "inputs": [],
    "outputs": [
      {
        "name": "keys",
        "type": "tuple[]",
        "internalType": "struct IthacaAccountOld.Key[]",
        "components": [
          {
            "name": "expiry",
            "type": "uint40",
            "internalType": "uint40"
          },
          {
            "name": "keyType",
            "type": "uint8",
            "internalType": "enum IthacaAccountOld.KeyType"
          },
          {
            "name": "isSuperAdmin",
            "type": "bool",
            "internalType": "bool"
          },
          {
            "name": "publicKey",
            "type": "bytes",
            "internalType": "bytes"
          }
        ]
      },
      {
        "name": "keyHashes",
        "type": "bytes32[]",
        "internalType": "bytes32[]"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getNonce",
    "inputs": [
      {
        "name": "seqKey",
        "type": "uint192",
        "internalType": "uint192"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
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
    "name": "hash",
    "inputs": [
      {
        "name": "key",
        "type": "tuple",
        "internalType": "struct IthacaAccountOld.Key",
        "components": [
          {
            "name": "expiry",
            "type": "uint40",
            "internalType": "uint40"
          },
          {
            "name": "keyType",
            "type": "uint8",
            "internalType": "enum IthacaAccountOld.KeyType"
          },
          {
            "name": "isSuperAdmin",
            "type": "bool",
            "internalType": "bool"
          },
          {
            "name": "publicKey",
            "type": "bytes",
            "internalType": "bytes"
          }
        ]
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "stateMutability": "pure"
  },
  {
    "type": "function",
    "name": "invalidateNonce",
    "inputs": [
      {
        "name": "nonce",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "isValidSignature",
    "inputs": [
      {
        "name": "digest",
        "type": "bytes32",
        "internalType": "bytes32"
      },
      {
        "name": "signature",
        "type": "bytes",
        "internalType": "bytes"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bytes4",
        "internalType": "bytes4"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "keyAt",
    "inputs": [
      {
        "name": "i",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple",
        "internalType": "struct IthacaAccountOld.Key",
        "components": [
          {
            "name": "expiry",
            "type": "uint40",
            "internalType": "uint40"
          },
          {
            "name": "keyType",
            "type": "uint8",
            "internalType": "enum IthacaAccountOld.KeyType"
          },
          {
            "name": "isSuperAdmin",
            "type": "bool",
            "internalType": "bool"
          },
          {
            "name": "publicKey",
            "type": "bytes",
            "internalType": "bytes"
          }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "keyCount",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "label",
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
    "name": "pay",
    "inputs": [
      {
        "name": "paymentAmount",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "keyHash",
        "type": "bytes32",
        "internalType": "bytes32"
      },
      {
        "name": "intentDigest",
        "type": "bytes32",
        "internalType": "bytes32"
      },
      {
        "name": "encodedIntent",
        "type": "bytes",
        "internalType": "bytes"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "removeSpendLimit",
    "inputs": [
      {
        "name": "keyHash",
        "type": "bytes32",
        "internalType": "bytes32"
      },
      {
        "name": "token",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "period",
        "type": "uint8",
        "internalType": "enum GuardedExecutor.SpendPeriod"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "revoke",
    "inputs": [
      {
        "name": "keyHash",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "setCallChecker",
    "inputs": [
      {
        "name": "keyHash",
        "type": "bytes32",
        "internalType": "bytes32"
      },
      {
        "name": "target",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "checker",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "setCanExecute",
    "inputs": [
      {
        "name": "keyHash",
        "type": "bytes32",
        "internalType": "bytes32"
      },
      {
        "name": "target",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "fnSel",
        "type": "bytes4",
        "internalType": "bytes4"
      },
      {
        "name": "can",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "setLabel",
    "inputs": [
      {
        "name": "newLabel",
        "type": "string",
        "internalType": "string"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "setSignatureCheckerApproval",
    "inputs": [
      {
        "name": "keyHash",
        "type": "bytes32",
        "internalType": "bytes32"
      },
      {
        "name": "checker",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "isApproved",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "setSpendLimit",
    "inputs": [
      {
        "name": "keyHash",
        "type": "bytes32",
        "internalType": "bytes32"
      },
      {
        "name": "token",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "period",
        "type": "uint8",
        "internalType": "enum GuardedExecutor.SpendPeriod"
      },
      {
        "name": "limit",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "spendAndExecuteInfos",
    "inputs": [
      {
        "name": "keyHashes",
        "type": "bytes32[]",
        "internalType": "bytes32[]"
      }
    ],
    "outputs": [
      {
        "name": "spends",
        "type": "tuple[][]",
        "internalType": "struct GuardedExecutor.SpendInfo[][]",
        "components": [
          {
            "name": "token",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "period",
            "type": "uint8",
            "internalType": "enum GuardedExecutor.SpendPeriod"
          },
          {
            "name": "limit",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "spent",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "lastUpdated",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "currentSpent",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "current",
            "type": "uint256",
            "internalType": "uint256"
          }
        ]
      },
      {
        "name": "executes",
        "type": "bytes32[][]",
        "internalType": "bytes32[][]"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "spendInfos",
    "inputs": [
      {
        "name": "keyHash",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "outputs": [
      {
        "name": "results",
        "type": "tuple[]",
        "internalType": "struct GuardedExecutor.SpendInfo[]",
        "components": [
          {
            "name": "token",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "period",
            "type": "uint8",
            "internalType": "enum GuardedExecutor.SpendPeriod"
          },
          {
            "name": "limit",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "spent",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "lastUpdated",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "currentSpent",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "current",
            "type": "uint256",
            "internalType": "uint256"
          }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "startOfSpendPeriod",
    "inputs": [
      {
        "name": "unixTimestamp",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "period",
        "type": "uint8",
        "internalType": "enum GuardedExecutor.SpendPeriod"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "pure"
  },
  {
    "type": "function",
    "name": "supportsExecutionMode",
    "inputs": [
      {
        "name": "mode",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "outputs": [
      {
        "name": "result",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "unwrapAndValidateSignature",
    "inputs": [
      {
        "name": "digest",
        "type": "bytes32",
        "internalType": "bytes32"
      },
      {
        "name": "signature",
        "type": "bytes",
        "internalType": "bytes"
      }
    ],
    "outputs": [
      {
        "name": "isValid",
        "type": "bool",
        "internalType": "bool"
      },
      {
        "name": "keyHash",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "upgradeHook",
    "inputs": [
      {
        "name": "previousVersion",
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
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "upgradeProxyAccount",
    "inputs": [
      {
        "name": "newImplementation",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "event",
    "name": "Authorized",
    "inputs": [
      {
        "name": "keyHash",
        "type": "bytes32",
        "indexed": true,
        "internalType": "bytes32"
      },
      {
        "name": "key",
        "type": "tuple",
        "indexed": false,
        "internalType": "struct IthacaAccountOld.Key",
        "components": [
          {
            "name": "expiry",
            "type": "uint40",
            "internalType": "uint40"
          },
          {
            "name": "keyType",
            "type": "uint8",
            "internalType": "enum IthacaAccountOld.KeyType"
          },
          {
            "name": "isSuperAdmin",
            "type": "bool",
            "internalType": "bool"
          },
          {
            "name": "publicKey",
            "type": "bytes",
            "internalType": "bytes"
          }
        ]
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "CallCheckerSet",
    "inputs": [
      {
        "name": "keyHash",
        "type": "bytes32",
        "indexed": false,
        "internalType": "bytes32"
      },
      {
        "name": "target",
        "type": "address",
        "indexed": false,
        "internalType": "address"
      },
      {
        "name": "checker",
        "type": "address",
        "indexed": false,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "CanExecuteSet",
    "inputs": [
      {
        "name": "keyHash",
        "type": "bytes32",
        "indexed": false,
        "internalType": "bytes32"
      },
      {
        "name": "target",
        "type": "address",
        "indexed": false,
        "internalType": "address"
      },
      {
        "name": "fnSel",
        "type": "bytes4",
        "indexed": false,
        "internalType": "bytes4"
      },
      {
        "name": "can",
        "type": "bool",
        "indexed": false,
        "internalType": "bool"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "ImplementationApprovalSet",
    "inputs": [
      {
        "name": "implementation",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "isApproved",
        "type": "bool",
        "indexed": false,
        "internalType": "bool"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "ImplementationCallerApprovalSet",
    "inputs": [
      {
        "name": "implementation",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "caller",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "isApproved",
        "type": "bool",
        "indexed": false,
        "internalType": "bool"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "LabelSet",
    "inputs": [
      {
        "name": "newLabel",
        "type": "string",
        "indexed": false,
        "internalType": "string"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "NonceInvalidated",
    "inputs": [
      {
        "name": "nonce",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "Revoked",
    "inputs": [
      {
        "name": "keyHash",
        "type": "bytes32",
        "indexed": true,
        "internalType": "bytes32"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "SignatureCheckerApprovalSet",
    "inputs": [
      {
        "name": "keyHash",
        "type": "bytes32",
        "indexed": true,
        "internalType": "bytes32"
      },
      {
        "name": "checker",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "isApproved",
        "type": "bool",
        "indexed": false,
        "internalType": "bool"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "SpendLimitRemoved",
    "inputs": [
      {
        "name": "keyHash",
        "type": "bytes32",
        "indexed": false,
        "internalType": "bytes32"
      },
      {
        "name": "token",
        "type": "address",
        "indexed": false,
        "internalType": "address"
      },
      {
        "name": "period",
        "type": "uint8",
        "indexed": false,
        "internalType": "enum GuardedExecutor.SpendPeriod"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "SpendLimitSet",
    "inputs": [
      {
        "name": "keyHash",
        "type": "bytes32",
        "indexed": false,
        "internalType": "bytes32"
      },
      {
        "name": "token",
        "type": "address",
        "indexed": false,
        "internalType": "address"
      },
      {
        "name": "period",
        "type": "uint8",
        "indexed": false,
        "internalType": "enum GuardedExecutor.SpendPeriod"
      },
      {
        "name": "limit",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "error",
    "name": "BatchOfBatchesDecodingError",
    "inputs": []
  },
  {
    "type": "error",
    "name": "CannotSelfExecute",
    "inputs": []
  },
  {
    "type": "error",
    "name": "ExceededSpendLimit",
    "inputs": [
      {
        "name": "token",
        "type": "address",
        "internalType": "address"
      }
    ]
  },
  {
    "type": "error",
    "name": "ExceedsCapacity",
    "inputs": []
  },
  {
    "type": "error",
    "name": "FnSelectorNotRecognized",
    "inputs": []
  },
  {
    "type": "error",
    "name": "IndexOutOfBounds",
    "inputs": []
  },
  {
    "type": "error",
    "name": "InvalidNonce",
    "inputs": []
  },
  {
    "type": "error",
    "name": "InvalidPublicKey",
    "inputs": []
  },
  {
    "type": "error",
    "name": "KeyDoesNotExist",
    "inputs": []
  },
  {
    "type": "error",
    "name": "KeyHashIsZero",
    "inputs": []
  },
  {
    "type": "error",
    "name": "KeyTypeCannotBeSuperAdmin",
    "inputs": []
  },
  {
    "type": "error",
    "name": "NewImplementationIsZero",
    "inputs": []
  },
  {
    "type": "error",
    "name": "NewSequenceMustBeLarger",
    "inputs": []
  },
  {
    "type": "error",
    "name": "NoSpendPermissions",
    "inputs": []
  },
  {
    "type": "error",
    "name": "OpDataError",
    "inputs": []
  },
  {
    "type": "error",
    "name": "PaymasterNonceError",
    "inputs": []
  },
  {
    "type": "error",
    "name": "SuperAdminCanExecuteEverything",
    "inputs": []
  },
  {
    "type": "error",
    "name": "SuperAdminCanSpendAnything",
    "inputs": []
  },
  {
    "type": "error",
    "name": "Unauthorized",
    "inputs": []
  },
  {
    "type": "error",
    "name": "UnauthorizedCall",
    "inputs": [
      {
        "name": "keyHash",
        "type": "bytes32",
        "internalType": "bytes32"
      },
      {
        "name": "target",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "data",
        "type": "bytes",
        "internalType": "bytes"
      }
    ]
  },
  {
    "type": "error",
    "name": "UnsupportedExecutionMode",
    "inputs": []
  }
] as const;

export const code = "0x610140604052604051615d4f380380615d4f833981016040819052610023916100e9565b306080524660a052606080610074604080518082018252600d81526c125d1a1858d85058d8dbdd5b9d609a1b60208083019190915282518084019093526005835264302e302e3160d81b9083015291565b815160209283012081519183019190912060c082905260e0819052604080517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f8152938401929092529082015246606082015230608082015260a090206101005250506001600160a01b031661012052610116565b5f602082840312156100f9575f5ffd5b81516001600160a01b038116811461010f575f5ffd5b9392505050565b60805160a05160c05160e0516101005161012051615bdd6101725f395f8181610793015281816119d401528181612078015261380a01525f612fbb01525f61307501525f61304f01525f612fff01525f612fdc0152615bdd5ff3fe608060405260043610610275575f3560e01c806384b0196e1161014e578063c885f95a116100c0578063e9ae5c5311610079578063e9ae5c531461086c578063f81d87a71461087f578063faba56d81461089e578063fac750e0146108bd578063fcd4e707146108d1578063ff619c6b146108f95761027c565b8063c885f95a14610782578063cb4774c4146107b5578063cebfe336146107d6578063d03c7914146107f5578063dcc09ebf14610814578063e5adda71146108405761027c565b8063ad07708311610112578063ad077083146106b8578063b70e36f0146106e4578063b75c7dc614610703578063bc2c554a14610722578063be766d151461074f578063bf530969146107635761027c565b806384b0196e146106145780638e87cf471461063b578063912aa1b8146106675780639e49fbf114610686578063a840fe49146106995761027c565b80632f1d14cb116101e7578063515c9d6d116101ab578063515c9d6d146105455780635702245114610565578063598daac41461058457806360d2f33d146105a35780636fd91454146105d65780637656d304146105f55761027c565b80632f1d14cb146104a05780632f3f30c7146104d357806335058501146104ed5780633e1b0812146105075780634223b5c2146105265761027c565b80631626ba7e116102395780631626ba7e1461038457806317e69ab8146103bc5780631a912f3e146103eb57806320606b701461042c5780632081a2781461045f5780632150c5181461047e5761027c565b80630cef73b4146102b557806311a86fd6146102f057806312aaac701461032f578063136a12f71461035b57806313e0b99d1461037c5761027c565b3661027c57005b5f3560e01c63bc197c81811463f23a6e6182141763150b7a02821417156102a757806020526020603cf35b50633c10b94e5f526004601cfd5b3480156102c0575f5ffd5b506102d46102cf366004614fe1565b610918565b6040805192151583526020830191909152015b60405180910390f35b3480156102fb575f5ffd5b5061031773323232323232323232323232323232323232323281565b6040516001600160a01b0390911681526020016102e7565b34801561033a575f5ffd5b5061034e610349366004615028565b610bd2565b6040516102e791906150ce565b348015610366575f5ffd5b5061037a61037536600461510c565b610cc1565b005b61037a610deb565b34801561038f575f5ffd5b506103a361039e366004614fe1565b610e58565b6040516001600160e01b031990911681526020016102e7565b3480156103c7575f5ffd5b506103db6103d6366004615028565b610f3d565b60405190151581526020016102e7565b3480156103f6575f5ffd5b5061041e7f9085b19ea56248c94d86174b3784cfaaa8673d1041d6441f61ff52752dac848381565b6040519081526020016102e7565b348015610437575f5ffd5b5061041e7f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f81565b34801561046a575f5ffd5b5061037a610479366004615176565b611004565b348015610489575f5ffd5b50610492611153565b6040516102e79291906151eb565b3480156104ab575f5ffd5b5061041e7feff7fda3af271797e53f62724a17c2e5c118cf95ac65e8274759fcfff97bf1fe81565b3480156104de575f5ffd5b506103a3630707070760e51b81565b3480156104f8575f5ffd5b506103a3631919191960e11b81565b348015610512575f5ffd5b5061041e610521366004615258565b6112bd565b348015610531575f5ffd5b5061034e610540366004615028565b6112f5565b348015610550575f5ffd5b5061041e5f516020615b9d5f395f51905f5281565b348015610570575f5ffd5b5061037a61057f36600461527e565b61132d565b34801561058f575f5ffd5b5061037a61059e3660046152bd565b61141a565b3480156105ae575f5ffd5b5061041e7f9a5906d05ceef8b2885ad4b95ec46e2570079e7f040193be5767e1329736de5781565b3480156105e1575f5ffd5b5061041e6105f0366004615340565b61156c565b348015610600575f5ffd5b5061037a61060f366004615387565b6116ab565b34801561061f575f5ffd5b50610628611765565b6040516102e797969594939291906153bb565b348015610646575f5ffd5b5061065a610655366004615028565b61178b565b6040516102e79190615451565b348015610672575f5ffd5b5061037a6106813660046154ab565b611873565b61037a610694366004615028565b6119c9565b3480156106a4575f5ffd5b5061041e6106b336600461558b565b611a2b565b3480156106c3575f5ffd5b506106d76106d2366004615028565b611a64565b6040516102e79190615638565b3480156106ef575f5ffd5b5061037a6106fe366004615028565b611a77565b34801561070e575f5ffd5b5061037a61071d366004615028565b611adf565b34801561072d575f5ffd5b5061074161073c366004615678565b611b34565b6040516102e7929190615750565b34801561075a575f5ffd5b5061041e611c6b565b34801561076e575f5ffd5b5061037a61077d36600461580e565b611cc0565b34801561078d575f5ffd5b506103177f000000000000000000000000000000000000000000000000000000000000000081565b3480156107c0575f5ffd5b506107c9611d64565b6040516102e79190615840565b3480156107e1575f5ffd5b5061041e6107f036600461558b565b611d7d565b348015610800575f5ffd5b506103db61080f366004615028565b611de5565b34801561081f575f5ffd5b5061083361082e366004615028565b611df7565b6040516102e79190615852565b34801561084b575f5ffd5b5061085f61085a366004615028565b611fbb565b6040516102e79190615864565b61037a61087a366004614fe1565b611fce565b34801561088a575f5ffd5b5061037a610899366004615876565b612050565b3480156108a9575f5ffd5b5061041e6108b83660046158d1565b61225e565b3480156108c8575f5ffd5b5061041e612396565b3480156108dc575f5ffd5b506108e661c1d081565b60405161ffff90911681526020016102e7565b348015610904575f5ffd5b506103db6109133660046158fb565b6123a9565b5f80602183101561092e5750600190505f610bca565b6041831460408414171561095c573061094886868661267d565b6001600160a01b03161491505f9050610bca565b506020198281018381118185180281189385019182013591601f19013560ff161561098d5761098a86612705565b95505b505f61099882610bd2565b805190915064ffffffffff1642811090151516156109b9575f925050610bca565b5f816020015160038111156109d0576109d061503f565b03610a2b575f80603f86118735810290602089013502915091505f5f610a0f856060015180516020820151604090920151603f90911191820292910290565b91509150610a208a8585858561271e565b965050505050610bbe565b600181602001516003811115610a4357610a4361503f565b03610ac857606081810151805160208083015160409384015184518084018d9052855180820385018152601f8c018590049094028101870186529485018a8152603f9490941091820295910293610abf935f92610ab8928d918d918291018382808284375f920191909152506127b792505050565b858561289f565b94505050610bbe565b600281602001516003811115610ae057610ae061503f565b03610b0f57610b088160600151806020019051810190610b009190615952565b8787876129be565b9250610bbe565b600381602001516003811115610b2757610b2761503f565b03610bbe57806060015151602014610b525760405163145a1fdd60e31b815260040160405180910390fd5b5f8160600151610b619061596d565b60601c9050604051638afc93b48152876020820152836040820152606080820152856080820152858760a08301375f5f526084860160205f82601c8501865afa915050638afc93b45f5160e01c14811615610bbb57600194505b50505b82610bc857600192505b505b935093915050565b604080516080810182525f80825260208201819052918101919091526060808201525f82815268448e3efef2f6a7f2f960205260408120610c1290612a9e565b8051909150610c345760405163395ed8c160e21b815260040160405180910390fd5b8051600619015f610c488383016020015190565b60d881901c855260c881901c915060d01c60ff166003811115610c6d57610c6d61503f565b84602001906003811115610c8357610c8361503f565b90816003811115610c9657610c9661503f565b90525060ff811615156040850152610cb383838151811082025290565b606085015250919392505050565b333014610ce0576040516282b42960e81b815260040160405180910390fd5b8380610cff57604051638707510560e01b815260040160405180910390fd5b5f516020615b9d5f395f51905f528514610d3a57610d1c85612b04565b15610d3a57604051630442081560e01b815260040160405180910390fd5b610d448484612b68565b15610d62576040516303a6f8c760e21b815260040160405180910390fd5b610d8560e084901c606086901b1783610800610d7d89612b90565b929190612bdf565b50604080518681526001600160a01b03861660208201526001600160e01b031985169181019190915282151560608201527f7eb91b8ac56c0864a4e4f5598082d140d04bed1a4dd62a41d605be2430c494e1906080015b60405180910390a15050505050565b33731adb9959eb142be128e6dfecc8d571f07cd66dee14610e1e576040516282b42960e81b815260040160405180910390fd5b36602319018060045f375f80828136601f1901356001600160a01b03165af490503d805f5f3e818015610e4f57815ff35b815ffd5b505050565b5f5f610e8d7feff7fda3af271797e53f62724a17c2e5c118cf95ac65e8274759fcfff97bf1fe865f9182526020526040902090565b604080517f035aff83d86937d35b32e04f0ddc6ff469290eef2f1b692d8a815c89404d47495f908152306020908152838220905261190190528282526042601e20915290915094505f5f610ee2878787610918565b90925090508115158115151615610f1857610efc81612b04565b80610f155750610f1533610f0f83612c08565b90612c37565b91505b81610f275763ffffffff610f2d565b631626ba7e5b60e01b93505050505b9392505050565b5f333014610f5d576040516282b42960e81b815260040160405180910390fd5b5f610f96610f92610f8f60017fa7d540c151934097be66b966a69e67d3055ab4350de7ff57a5f5cb2284ad4a5a6159c5565b90565b5c90565b90507f0a9f35b227e9f474cb86caa2e9b62847626fede22333cf52c7abea325d2eaa358114610fc3575f5ffd5b610ff9610ff4610f8f60017fa7d540c151934097be66b966a69e67d3055ab4350de7ff57a5f5cb2284ad4a5a6159c5565b612ce1565b60019150505b919050565b333014611023576040516282b42960e81b815260040160405180910390fd5b828061104257604051638707510560e01b815260040160405180910390fd5b61104b84612b04565b156110695760405163f2fee1e160e01b815260040160405180910390fd5b5f61107385612b90565b6001600160a01b0385165f9081526002820160205260409020600190910191506110c18460068111156110a8576110a861503f565b8254600160ff9092169190911b80198216845516151590565b156110e1575f6110d082612ce7565b036110e1576110df8286612d02565b505b611110816001015f8660068111156110fb576110fb61503f565b60ff1681526020019081526020015f205f9055565b7fa17fd662986af6bbcda33ce6b68c967b609aebe07da86cd25ee7bfbd01a65a27868686604051611143939291906159d8565b60405180910390a1505050505050565b6060805f61115f612396565b9050806001600160401b03811115611179576111796154c6565b6040519080825280602002602001820160405280156111c857816020015b604080516080810182525f80825260208083018290529282015260608082015282525f199092019101816111975790505b509250806001600160401b038111156111e3576111e36154c6565b60405190808252806020026020018201604052801561120c578160200160208202803683370190505b5091505f805b828110156112b2575f6112338268448e3efef2f6a7f2f65b60020190612e37565b90505f61123f82610bd2565b805190915064ffffffffff16428110901515161561125e5750506112aa565b80878581518110611271576112716159fb565b60200260200101819052508186858151811061128f5761128f6159fb565b6020908102919091010152836112a481615a0f565b94505050505b600101611212565b508084528252509091565b6001600160c01b0381165f90815268448e3efef2f6a7f2f76020526040808220549083901b67ffffffffffffffff1916175b92915050565b604080516080810182525f80825260208201819052918101919091526060808201526112ef6103498368448e3efef2f6a7f2f661122a565b33301461134c576040516282b42960e81b815260040160405180910390fd5b828061136b57604051638707510560e01b815260040160405180910390fd5b5f516020615b9d5f395f51905f5284146113a65761138884612b04565b156113a65760405163f2fee1e160e01b815260040160405180910390fd5b5f6113b085612b90565b60030190506113cf8185856001600160a01b0381161515610800612e80565b50604080518681526001600160a01b0380871660208301528516918101919091527f7e2baa9c3a554d7c6587682e28fe9607c29d1d8c8a46968368d5614607c6079990606001610ddc565b333014611439576040516282b42960e81b815260040160405180910390fd5b838061145857604051638707510560e01b815260040160405180910390fd5b61146185612b04565b1561147f5760405163f2fee1e160e01b815260040160405180910390fd5b5f61148986612b90565b600101905061149a81866040612eab565b506001600160a01b0385165f90815260018201602052604090206114e08560068111156114c9576114c961503f565b8254600160ff9092169190911b8082178455161590565b505f816001015f8760068111156114f9576114f961503f565b60ff1681526020019081526020015f2090505f61151582612ee7565b86815290506115248282612f31565b7f68c781b0acb659616fc73da877ee77ae95c51ce973b6c7a762c8692058351b4a898989896040516115599493929190615a27565b60405180910390a1505050505050505050565b5f806115888460408051828152600190920160051b8201905290565b90505f5b84811015611628575f5f365f6115a38a8a87612f76565b92965090945092509050611618856116097f9085b19ea56248c94d86174b3784cfaaa8673d1041d6441f61ff52752dac84836001600160a01b038816876115ea8888612fa8565b6040805194855260208501939093529183015260608201526080902090565b600190910160051b8801528690565b505050505080600101905061158c565b5061c1d060f084901c145f6116827f9a5906d05ceef8b2885ad4b95ec46e2570079e7f040193be5767e1329736de5783855160051b6020870120886040805194855260208501939093529183015260608201526080902090565b9050816116975761169281612fb9565b6116a0565b6116a0816130cf565b979650505050505050565b3330146116ca576040516282b42960e81b815260040160405180910390fd5b5f83815268448e3efef2f6a7f2f9602052604090205460ff166117005760405163395ed8c160e21b815260040160405180910390fd5b611719828261020061171187612c08565b929190613143565b50816001600160a01b0316837f30653b7562c17b712ebc81c7a2373ea1c255cf2a055380385273b5bf7192cc9983604051611758911515815260200190565b60405180910390a3505050565b600f60f81b6060805f80808361177961315e565b97989097965046955030945091925090565b60605f61179783612b90565b60030190506117a5816131a1565b6001600160401b038111156117bc576117bc6154c6565b60405190808252806020026020018201604052801561180057816020015b604080518082019091525f80825260208201528152602001906001900390816117da5790505b5091505f5b825181101561186c5761181882826131ab565b84838151811061182a5761182a6159fb565b60200260200101515f01858481518110611846576118466159fb565b6020908102919091018101516001600160a01b0393841691015291169052600101611805565b5050919050565b333014611892576040516282b42960e81b815260040160405180910390fd5b6001600160a01b0381166118b957604051634adebaa360e11b815260040160405180910390fd5b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc80545f908152606083901b600c525190555f6118f461315e565b915061195090507f0a9f35b227e9f474cb86caa2e9b62847626fede22333cf52c7abea325d2eaa3561194a610f8f60017fa7d540c151934097be66b966a69e67d3055ab4350de7ff57a5f5cb2284ad4a5a6159c5565b906131e5565b306317e69ab861195f836131ec565b6040518263ffffffff1660e01b815260040161197d91815260200190565b6020604051808303815f875af1158015611999573d5f5f3e3d5ffd5b505050506040513d601f19601f820116820180604052508101906119bd9190615a59565b6119c5575f5ffd5b5050565b336001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614611a11576040516282b42960e81b815260040160405180910390fd5b611a2868448e3efef2f6a7f2f65b60010182613214565b50565b5f6112ef82602001516003811115611a4557611a4561503f565b60ff168360600151805190602001205f1c5f9182526020526040902090565b60606112ef611a7283612c08565b61322b565b333014611a96576040516282b42960e81b815260040160405180910390fd5b611aa968448e3efef2f6a7f2f7826132ff565b6040518181527f4d9dbebf1d909894d9c26fe228c27cec643b2cb490124e5b658f4edd203c20c19060200160405180910390a150565b333014611afe576040516282b42960e81b815260040160405180910390fd5b611b0781613369565b60405181907fe5af7daed5ab2a2dc5f98d53619f05089c0c14d11a6621f6b906a2366c9a7ab3905f90a250565b60608082806001600160401b03811115611b5057611b506154c6565b604051908082528060200260200182016040528015611b8357816020015b6060815260200190600190039081611b6e5790505b509250806001600160401b03811115611b9e57611b9e6154c6565b604051908082528060200260200182016040528015611bd157816020015b6060815260200190600190039081611bbc5790505b5091505f5b81811015611c6257611bff868683818110611bf357611bf36159fb565b90506020020135611df7565b848281518110611c1157611c116159fb565b6020026020010181905250611c3d868683818110611c3157611c316159fb565b90506020020135611fbb565b838281518110611c4f57611c4f6159fb565b6020908102919091010152600101611bd6565b50509250929050565b5f80611c99611c8860015f516020615bbd5f395f51905f526159c5565b604080516020810190915290815290565b9050611ca481515c90565b5f03611cb157505f919050565b611cba816133d4565b91505090565b333014611cdf576040516282b42960e81b815260040160405180910390fd5b611d2782828080601f0160208091040260200160405190810160405280939291908181526020018383808284375f92019190915250611d219250612a91915050565b906133f4565b7faec6ef4baadc9acbdf52442522dfffda03abe29adba8d4af611bcef4cbe0c9ad8282604051611d58929190615a9c565b60405180910390a15050565b6060611d7868448e3efef2f6a7f2f6612a9e565b905090565b5f333014611d9d576040516282b42960e81b815260040160405180910390fd5b611da68261344c565b9050807f3d3a48be5a98628ecf98a6201185102da78bbab8f63a4b2d6b9eef354f5131f583604051611dd891906150ce565b60405180910390a2919050565b5f611def826134ba565b151592915050565b60605f611e0383612b90565b6001019050611e1e6040518060200160405280606081525090565b5f611e2883613503565b90505f5b81811015611fb1575f611e3f8583613554565b6001600160a01b0381165f9081526001870160205260408120919250611e64826135ad565b90505f5b8151811015611fa2575f828281518110611e8457611e846159fb565b602002602001015190505f611ead856001015f8460ff1681526020019081526020015f20612ee7565b9050611eea6040805160e081019091525f808252602082019081526020015f81526020015f81526020015f81526020015f81526020015f81525090565b8260ff166006811115611eff57611eff61503f565b81602001906006811115611f1557611f1561503f565b90816006811115611f2857611f2861503f565b9052506001600160a01b03871681528151604080830191909152820151608082015260208201516060820152611f6d4260ff851660068111156108b8576108b861503f565b60c08201819052608082015160608301519111150260a082015280611f928b82613606565b5050505050806001019050611e68565b50505050806001019050611e2c565b5050519392505050565b60606112ef611fc983612b90565b6136af565b5f611fd8846134ba565b905080600303611ff357611fed848484613768565b50505050565b365f365f8461200957637f1812755f526004601cfd5b5085358087016020810194503592505f90604011600286141115612037575050602080860135860190810190355b61204688888887878787613800565b5050505050505050565b813580830190604081901c602084101715612069575f5ffd5b506120de336001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016146120d5306120aa60208601866154ab565b6001600160a01b031614306120c560808701606088016154ab565b6001600160a01b03161417151590565b15159015151690565b6120fa576040516282b42960e81b815260040160405180910390fd5b3061210b60808301606084016154ab565b6001600160a01b0316036121be575f84815268448e3efef2f6a7f2fb602052604090205460ff161561215057604051638f56f14960e01b815260040160405180910390fd5b5f84815268448e3efef2f6a7f2fb60205260408120805460ff1916600117905580612183866102cf610240860186615aaf565b975091508690506001600160c01b0332311061219e57600191505b816121bb576040516282b42960e81b815260040160405180910390fd5b50505b6121e96121d160a08301608084016154ab565b6121e3610220840161020085016154ab565b88613a18565b8415806121fa57506121fa85612b04565b612256575f61220886612b90565b600181019150612254906002015f61222660a08601608087016154ab565b6001600160a01b0316815260208101919091526040015f2061224e60a08501608086016154ab565b89613a3b565b505b505050505050565b5f808260068111156122725761227261503f565b0361228557603c808404025b90506112ef565b60018260068111156122995761229961503f565b036122aa57610e108084040261227e565b60028260068111156122be576122be61503f565b036122d057620151808084040261227e565b60038260068111156122e4576122e461503f565b0361230a576007600362015180808604918201929092069003620545ff8511020261227e565b5f5f61231585613b60565b509092509050600484600681111561232f5761232f61503f565b036123495761234082826001613c0a565b925050506112ef565b600584600681111561235d5761235d61503f565b0361236e5761234082600180613c0a565b60068460068111156123825761238261503f565b03612392576001925050506112ef565b5f5ffd5b5f611d7868448e3efef2f6a7f2f8613c61565b5f846123b757506001612675565b6123c085612b04565b156123cd57506001612675565b631919191960e11b600483106123e1575082355b826123f05750630707070760e51b5b6123fa8582612b68565b15612408575f915050612675565b5f61241287612b90565b905061241d81613c61565b156124da5761243860e083901c606088901b175b8290613cad565b1561244857600192505050612675565b61245b6332323232606088901b17612431565b1561246b57600192505050612675565b61249160e083901c73191919191919191919191919191919191919191960611b17612431565b156124a157600192505050612675565b6124ca7f3232323232323232323232323232323232323232000000000000000032323232612431565b156124da57600192505050612675565b6124f05f516020615b9d5f395f51905f52612b90565b90506124fb81613c61565b156125b55761251360e083901c606088901b17612431565b1561252357600192505050612675565b6125366332323232606088901b17612431565b1561254657600192505050612675565b61256c60e083901c73191919191919191919191919191919191919191960611b17612431565b1561257c57600192505050612675565b6125a57f3232323232323232323232323232323232323232000000000000000032323232612431565b156125b557600192505050612675565b6125c3878888898989613d31565b156125d357600192505050612675565b6125f58788733232323232323232323232323232323232323232898989613d31565b1561260557600192505050612675565b6126205f516020615b9d5f395f51905f528888808989613d31565b1561263057600192505050612675565b61265f5f516020615b9d5f395f51905f5288733232323232323232323232323232323232323232898989613d31565b1561266f57600192505050612675565b5f925050505b949350505050565b5f604051826040811461269857604181146126bf57506126f0565b60208581013560ff81901c601b0190915285356040526001600160ff1b03166060526126d0565b60408501355f1a6020526040856040375b50845f526020600160805f60015afa5191505f606052806040523d6126fd575b638baa579f5f526004601cfd5b509392505050565b5f815f526020600160205f60025afa5190503d610fff57fe5b5f6040518681528560208201528460408201528360608201528260808201525f5f5260205f60a0836101005afa503d612782576d1ab2e8006fd8b71907bf06a5bdee3b6127825760205f60a0836dd01ea45f9efd5c54f037fa57ea1a5afa61278257fe5b505f516001147f7fffffff800000007fffffffffffffffde737d56d38bcf4279dce5617e3192a8851110905095945050505050565b6127ec6040518060c0016040528060608152602001606081526020015f81526020015f81526020015f81526020015f81525090565b815160c081106128995760208301818101818251018281108260c0830111171561281857505050612899565b80815101925080602082015101818110838211178285108486111717156128425750505050612899565b82815160208301011183855160208701011117156128635750505050612899565b8386528060208701525060408101516040860152606081015160608601526080810151608086015260a081015160a08601525050505b50919050565b5f5f5f6128ae88600180613ddf565b905060208601518051602082019150604088015160608901518451600d81016c1131b430b63632b733b2911d1160991b60981c8752848482011060228286890101515f1a14168160138901208286890120141685846014011085851760801c1074113a3cb832911d113bb2b130baba34371733b2ba1160591b60581c8589015160581c14161698505080865250505087515189151560021b600117808160218c510151161460208311881616965050851561299257602089510181810180516020600160208601856020868a8c60025afa60011b5afa51915295503d905061299257fe5b50505082156129b3576129b08287608001518860a00151888861271e565b92505b505095945050505050565b5f6001600160a01b0385161561267557604051853b612a4e5782604081146129ee5760418114612a155750612a88565b60208581013560ff81901c601b0190915285356040526001600160ff1b0316606052612a26565b60408501355f1a6020526040856040375b50845f526020600160805f60015afa5180871860601b3d119250505f60605280604052612a88565b631626ba7e60e01b80825285600483015260248201604081528460448401528486606485013760208160648701858b5afa90519091141691505b50949350505050565b68448e3efef2f6a7f2f690565b60405181546020820190600881901c5f8260ff841714612acc57505080825260ff8116601f80821115612aee575b855f5260205f205b8160051c81015482860152602082019150828210612ad457505b508084525f920191825250602001604052919050565b5f81815268448e3efef2f6a7f2f960205260408120805460ff808216908114801590910260089290921c021780612b4e5760405163395ed8c160e21b815260040160405180910390fd5b612b5b825f198301613ed0565b60ff161515949350505050565b6001600160a01b039190911630146001600160e01b03199190911663e9ae5c5360e01b141690565b5f805f516020615b9d5f395f51905f528314612bb457612baf83613f3d565b612bc3565b5f516020615b9d5f395f51905f525b68b11ddb8fabd886bebb6009525f908152602990209392505050565b5f82612bf457612bef8585613f6a565b612bff565b612bff858584614068565b95945050505050565b5f81815268448e3efef2f6a7f2fa602052604081208054601f5263d4203f8b6004528152603f81208190610f36565b63978aab926004525f828152602481206001600160a01b03929092169168fbb67fda52d4bfb8be198301612c725763f5a267f15f526004601cfd5b82612c845768fbb67fda52d4bfb8bf92505b80546001600160601b038116612cc85760019250838160601c0315612cd957600182015460601c8414612cd957600282015460601c8414612cd9575b5f9250612cd9565b81602052835f5260405f2054151592505b505092915050565b5f815d50565b5f81545b801561289957600191820191811901811618612ceb565b63978aab926004525f828152602481206001600160a01b03929092169168fbb67fda52d4bfb8be198301612d3d5763f5a267f15f526004601cfd5b82612d4f5768fbb67fda52d4bfb8bf92505b80546001600160601b03811680612dc95760019350848260601c03612d875760018301805484556002840180549091555f9055612e2e565b84600184015460601c03612da85760028301805460018501555f9055612e2e565b84600284015460601c03612dc1575f6002840155612e2e565b5f9350612e2e565b82602052845f5260405f20805480612de2575050612e2e565b60018360011c039250826001820314612e12578285015460601c8060601b60018303870155805f52508060405f20555b5060018260011b17845460601c60601b1784555f815550600193505b50505092915050565b6318fb58646004525f8281526024902081015468fbb67fda52d4bfb8bf81141502612e6183613c61565b82106112ef57604051634e23d03560e01b815260040160405180910390fd5b5f82612e9557612e908686614085565b612ea1565b612ea1868686856140b6565b9695505050505050565b5f612eb684846140f1565b90508015610f365781612ec885613503565b1115610f365760405163155176b960e11b815260040160405180910390fd5b612f0860405180606001604052805f81526020015f81526020015f81525090565b5f612f1283612a9e565b905080515f14612899575f612f268261424c565b602001949350505050565b604080518251602080830191909152830151818301529082015160608201526119c5908390612f7190608001604051602081830303815290604052614398565b6133f4565b60051b82013590910180356001600160a01b031680153002179260208083013593506040830135909201918201913590565b5f8183604051375060405120919050565b7f00000000000000000000000000000000000000000000000000000000000000007f000000000000000000000000000000000000000000000000000000000000000030147f00000000000000000000000000000000000000000000000000000000000000004614166130ac5750604080517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f81527f000000000000000000000000000000000000000000000000000000000000000060208201527f00000000000000000000000000000000000000000000000000000000000000009181019190915246606082015230608082015260a090205b6719010000000000005f5280601a5281603a52604260182090505f603a52919050565b5f5f5f6130da61315e565b915091506040517f91ab3d17e3a50a9d89e63fd30b92be7f5336b03b287bb946787a83a9d62a27665f5282516020840120602052815160208301206040523060605260805f206020526119015f52846040526042601e20935080604052505f6060525050919050565b5f8261315357612bef8585612d02565b612bff858584612eab565b604080518082018252600d81526c125d1a1858d85058d8dbdd5b9d609a1b60208083019190915282518084019093526005835264302e302e3160d81b9083015291565b5f6112ef82613503565b5f8060018401816131bc8686613554565b6001600160a01b038082168352602083019390935260409091015f205490969116945092505050565b80825d5050565b8051602181106132035763ec92f9a35f526004601cfd5b9081015160209190910360031b1b90565b5f5f61322084846145c5565b600101905550505050565b63978aab926004525f818152602481206060915068fbb67fda52d4bfb8bf81548060a01b60a01c6040519450846020018260601c92508383141583028152816132b95782156132b457600191508185015460601c925082156132b4578284141590920260208301525060028381015460601c9182156132b4576003915083831415830260408201525b6132e9565b600191821c915b828110156132e7578581015460601c858114158102600583901b84015293506001016132c0565b505b8186528160051b81016040525050505050919050565b604081811c5f90815260208490522080546001600160401b0383161015613339576040516312ee5c9360e01b815260040160405180910390fd5b61336361335d836001600160401b031667fffffffffffffffe808218908211021890565b60010190565b90555050565b5f81815268448e3efef2f6a7f2f96020908152604080832083905568448e3efef2f6a7f2fa90915290208054600101905568448e3efef2f6a7f2f66133b768448e3efef2f6a7f2f883613f6a565b6119c55760405163395ed8c160e21b815260040160405180910390fd5b80515f90805c806133ec5763bc7ec7795f526004601cfd5b015c92915050565b80518060081b60ff175f60fe831161341d575050601f8281015160081b82179080831115613444575b60208401855f5260205f205b828201518360051c8201556020830192508483106134295750505b509092555050565b5f61345682611a2b565b90505f68448e3efef2f6a7f2f66060840151845160208087015160408089015190519596506134ad9561348b95949301615af1565b60408051601f198184030181529181525f8581526003850160205220906133f4565b61186c600282018361460b565b6003690100000000007821000260b09290921c69ffff00000000ffffffff16918214026901000000000078210001821460011b6901000000000000000000909214919091171790565b63978aab926004525f8181526024812080548060a01b60a01c8060011c9350808260601c151761354c5760019350838301541561354c5760029350838301541561354c57600393505b505050919050565b63978aab926004525f828152602481208281015460601c915068fbb67fda52d4bfb8bf8214158202915061358784613503565b83106135a657604051634e23d03560e01b815260040160405180910390fd5b5092915050565b604051815460208201905f905b80156135f05761ffff81166135d5576010918201911c6135ba565b8183526020600582901b16909201916001918201911c6135ba565b5050601f198282030160051c8252604052919050565b604080516060815290819052829050825160018151018060051b661d174b32e2c55360208403518181061582820402905080831061369e5782811781018115826020018701604051181761366a57828102601f19870152850160200160405261369e565b602060405101816020018101604052808a52601f19855b888101518382015281018061368157509184029181019190915294505b505082019390935291909152919050565b6318fb58646004525f81815260249020801954604051919068fbb67fda52d4bfb8bf90602084018161372857835480156137225780841415028152600184810154909250801561372257808414150260208201526002848101549092508015613722576003925083811415810260408301525b50613753565b8160011c91505f5b8281101561375157848101548481141502600582901b830152600101613730565b505b8185528160051b810160405250505050919050565b600360b01b929092189181358083018035916020808301928686019291600586901b9091018101831090861017604082901c17156137ad57633995943b5f526004601cfd5b505f5b83811461225457365f8260051b850135808601602081019350803592505084828401118160401c17156137ea57633995943b5f526004601cfd5b506137f6898383611fce565b50506001016137b0565b6001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001633036138c657602081146138515760405163438e981560e11b815260040160405180910390fd5b60408051602081019091528235906138869082908061387e60015f516020615bbd5f395f51905f526159c5565b90529061471d565b613891858583614737565b60408051602081019091526138c090806138b960015f516020615bbd5f395f51905f526159c5565b9052614c00565b50612254565b806138fa573330146138ea576040516282b42960e81b815260040160405180910390fd5b6138f584845f614737565b612254565b602081101561391c5760405163438e981560e11b815260040160405180910390fd5b813561393068448e3efef2f6a7f2f6611a1f565b6040518181527f4d9dbebf1d909894d9c26fe228c27cec643b2cb490124e5b658f4edd203c20c19060200160405180910390a15f5f61398d61397388888661156c565b602080871081881802188088019080880390881102610918565b91509150816139ae576040516282b42960e81b815260040160405180910390fd5b6139d981604051806020016040528060015f516020615bbd5f395f51905f525f1c61387e91906159c5565b6139e4878783614737565b6040805160208101909152613a0c90806138b960015f516020615bbd5f395f51905f526159c5565b50505050505050505050565b6001600160a01b038316613a3057610e538282614c21565b610e53838383614c3a565b80613a4557505050565b5f613a4f846135ad565b905080515f03613a7257604051635ee7e5b160e01b815260040160405180910390fd5b5f5b8151811015613b59575f828281518110613a9057613a906159fb565b602002602001015190505f866001015f8360ff1681526020019081526020015f2090505f613abd82612ee7565b90505f613ad9428560ff1660068111156108b8576108b861503f565b90508082604001511015613af557604082018190525f60208301525b815f01518783602001818151613b0b9190615b40565b9150818152501115613b405760405163482a648960e11b81526001600160a01b03891660048201526024015b60405180910390fd5b613b4a8383612f31565b50505050806001019050613a74565b5050505050565b5f8080613bfd613b736201518086615b53565b5f5f5f620afa6c8401935062023ab1840661016d62023ab082146105b48304618eac84048401030304606481048160021c8261016d0201038203915060996002836005020104600161030161f4ff830201600b1c84030193506b030405060708090a0b0c010260a01b811a9450506003841061019062023ab1880402820101945050509193909250565b9196909550909350915050565b5f620afa6c1961019060038510860381810462023ab10260649290910691820461016d830260029390931c9290920161f4ff600c60098901060261030101600b1c8601019190910301016201518002949350505050565b6318fb58646004525f818152602481208019548060011c92508061186c5781545f93501561186c5760019250828201541561186c5760029250828201541561186c575060039392505050565b6318fb58646004525f8281526024812068fbb67fda52d4bfb8bf8303613cda5763f5a267f15f526004601cfd5b82613cec5768fbb67fda52d4bfb8bf92505b801954613d1d5780546001925083146135a657600181015483146135a657600281015483146135a6575f91506135a6565b602052505f90815260409020541515919050565b5f5f5f613d4a87613d418b612b90565b60030190614c84565b915091508115613dd1576040516001629e639560e01b031981526001600160a01b0382169063ff619c6b90613d89908b908a908a908a90600401615b72565b602060405180830381865afa158015613da4573d5f5f3e3d5ffd5b505050506040513d601f19601f82011682018060405250810190613dc89190615a59565b92505050612ea1565b505f98975050505050505050565b6060835180156126fd576003600282010460021b60405192507f4142434445464748494a4b4c4d4e4f505152535455565758595a616263646566601f526106708515027f6768696a6b6c6d6e6f707172737475767778797a303132333435363738392d5f18603f526020830181810183886020010180515f82525b60038a0199508951603f8160121c16515f53603f81600c1c1651600153603f8160061c1651600253603f811651600353505f518452600484019350828410613e5a579052602001604052613d3d60f01b60038406600204808303919091525f861515909102918290035290038252509392505050565b5f82548060ff821714613f1857601e8311613eef5780831a91506135a6565b8060ff168311613f1357835f52601f83038060051c60205f200154601f82161a9250505b6135a6565b8060081c83116135a657835f528260051c60205f200154601f84161a91505092915050565b5f81815268448e3efef2f6a7f2fa602052604081208054601f5263d4203f8b6004528152603f81206112ef565b6318fb58646004525f8281526024812068fbb67fda52d4bfb8bf8303613f975763f5a267f15f526004601cfd5b82613fa95768fbb67fda52d4bfb8bf92505b8019548061400a576001925083825403613fd65760018201805483556002830180549091555f9055612cd9565b83600183015403613ff45760028201805460018401555f9055612cd9565b83600283015403612cc0575f6002830155612cd9565b81602052835f5260405f20805480614023575050612cd9565b60018360011c03925082600182031461404d57828401548060018303860155805f52508060405f20555b5060018260011b178319555f81555060019250505092915050565b5f614073848461460b565b90508015610f365781612ec885613c61565b6001600160a01b0381165f908152600183016020526040812080546001600160a01b0319169055610f368383612d02565b6001600160a01b038381165f908152600186016020526040812080546001600160a01b03191692851692909217909155612bff858584612eab565b63978aab926004525f828152602481206001600160a01b03929092169168fbb67fda52d4bfb8be19830161412c5763f5a267f15f526004601cfd5b8261413e5768fbb67fda52d4bfb8bf92505b80546001600160601b0381168260205280614200578160601c8061416c578560601b84556001945050612e2e565b8581036141795750612e2e565b600184015460601c8061419a578660601b6001860155600195505050612e2e565b8681036141a8575050612e2e565b600285015460601c806141ca578760601b600287015560019650505050612e2e565b8781036141d957505050612e2e565b5f928352604080842060019055918352818320600290558252902060039055506007908117905b845f5260405f20805461424257600191821c80830182559194508161422e578560601b600317845550612e2e565b8560601b8285015582600201845550612e2e565b5050505092915050565b6060815115610fff576040519050600482018051835184602001017f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f6020850183198552866020015b8051805f1a6142ed57600190811a01608081116142cd5760028201915080368437918201918482106142c7575061437a565b50614295565b5f198352918201607f190191600291909101908482106142c7575061437a565b80835283811684011783171980157fc0c8c8d0c8e8d0d8c8e8e0e8d0d8e0f0c8d0e8d0e0e0d8f0d0d0e0d8f8f8f8f8601f6f8421084210842108cc6318c6db6d54be660204081020408185821060071b86811c6001600160401b031060061b1795861c0260181a1c161a90911860031c019182019101838110614295578381111561437a57838103820391505b509290935250601f198382030183525f815260200160405250919050565b60606143f0565b6fffffffffffffffffffffffffffffffff811160071b81811c6001600160401b031060061b1781811c63ffffffff1060051b1781811c61ffff1060041b1790811c60ff1060039190911c17601f1890565b50604051815182017f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f60208301845b8381146145a157600101805160ff16806144a9575b6020820151806144785782860360208181189082110218607f839003818111818318021893840193928301929050601f8111614471575050614499565b5050614434565b6144818161439f565b90508286038181118183180218928301929190910190505b60f01b825260029091019061441f565b60ff81036144fc576020808301511980156144ca576144c78161439f565b91505b508286038181118282180218601f81811890821102186080811760f01b855260029094019392909201915061441f9050565b80835350602081015160018381018290528482168501821791198581168601179190911684171980157fc0c8c8d0c8e8d0d8c8e8e0e8d0d8e0f0c8d0e8d0e0e0d8f0d0d0e0d8f8f8f8f86f8421084210842108cc6318c6db6d54be660204081020408184821060071b85811c6001600160401b031060061b1794851c0260181a1c601f161a90911860031c01828603818111918118919091021892830101910161441f565b50600484018051199052601f198482030184525f8152602001604052509092915050565b604081811c5f90815260208490522080546001600160401b0380841682149082101661460457604051633ab3447f60e11b815260040160405180910390fd5b9250929050565b6318fb58646004525f8281526024812068fbb67fda52d4bfb8bf83036146385763f5a267f15f526004601cfd5b8261464a5768fbb67fda52d4bfb8bf92505b80195481602052806146ee5781548061466a578483556001935050612cd9565b8481036146775750612cd9565b60018301548061469257856001850155600194505050612cd9565b8581036146a0575050612cd9565b6002840154806146bc5786600286015560019550505050612cd9565b8681036146cb57505050612cd9565b5f9283526040808420600190559183528183206002905582529020600390555060075b835f5260405f208054612e2e57600191821c8381018690558083019182905590821b8217831955909250612cd9565b5f825f015190506001815c01828183015d80825d50505050565b801580614748575061474881612b04565b1561475857610e53838383614cbe565b5f61476282612b90565b60010190506147d06040805160e081018252606060c0820181815282528251602080820185528282528084019190915283518082018552828152838501528351808201855282815282840152835180820185528281526080840152835190810190935282529060a082015290565b5f6147da83613503565b90505f5b8181101561482c575f6147f18583613554565b90506001600160a01b038116156148235760408401516148119082614d08565b506060840151614821905f613606565b505b506001016147de565b505f5f5b86811015614a1d575f5f365f6148478c8c87612f76565b9350935093509350825f14614863576148608387615b40565b95505b60048110156148755750505050614a15565b813560e01c63a9059cbb8190036148ac5760408901516148959086614d08565b506148aa60248401355b60608b015190614d27565b505b8063ffffffff166323b872dd0361490f573060248401356001600160a01b0316036148db575050505050614a15565b60448301355f036148f0575050505050614a15565b60408901516148ff9086614d08565b5061490d604484013561489f565b505b8063ffffffff1663095ea7b3036149755760248301355f03614935575050505050614a15565b88516149419086614d08565b50614955600484013560208b015190614d08565b5060408901516149659086614d08565b50614973602484013561489f565b505b8063ffffffff166387517c4503614a0f576001600160a01b0385166e22d473030f116ddee9f6b43ac78ba3146149af575050505050614a15565b60448301355f036149c4575050505050614a15565b6149d7600484013560808b015190614d08565b506149eb602484013560a08b015190614d08565b506149ff600484013560408b015190614d08565b50614a0d604484013561489f565b505b50505050505b600101614830565b50604083015151606084015151614a349190614d3d565b5f614a67614a458560400151515190565b60606040518260201c5f031790508181528160051b6020820101604052919050565b90505f5b60408501515151811015614ab357604085015151600582901b0160200151614aa982614a978330614e80565b85919060059190911b82016020015290565b5050600101614a6b565b50614abf888888614cbe565b5f8080526001860160205260408120614ad89184613a3b565b5f5b84515151811015614b1c57845151600582901b0160200151614b1381614b0d848960200151614e7090919063ffffffff16565b5f614eaa565b50600101614ada565b505f5b60808501515151811015614b6657608085015151600582901b0160200151614b5d81614b58848960a00151614e7090919063ffffffff16565b614eea565b50600101614b1f565b505f5b60408501515151811015614bf557604085810151516020600584901b9182018101516001600160a01b0381165f90815260018b018352939093206060890151518301820151928601909101519091614beb9183918591614be69190614bdb90614bd28930614e80565b80821191030290565b808218908210021890565b613a3b565b5050600101614b69565b505050505050505050565b8051805c80614c165763bc7ec7795f526004601cfd5b60018103825d505050565b5f385f3884865af16119c55763b12d13eb5f526004601cfd5b816014528060345263a9059cbb60601b5f5260205f604460105f875af18060015f511416614c7a57803d853b151710614c7a576390b8ec185f526004601cfd5b505f603452505050565b6001600160a01b038181165f90815260018401602052604081205490911680151580614cb55750614cb58484614f45565b91509250929050565b5f82614cca5750505050565b5f5f365f614cd9888887612f76565b9350935093509350614cee848484848a614f50565b50505050838390508160010191508103614cca5750505050565b604080516060815290819052610f3683836001600160a01b0316613606565b604080516060815290819052610f368383613606565b614dca565b805181602083015b8281511015614d7657805160209290920180518252918252614d76868301878301805182519091529052565b602001848110614d4a57508251815184528152614d9d858201868501805182519091529052565b808360400111614db257614db2858285614d42565b838160600111613b5957613b59858560208401614d42565b805180835114614de657634e487b715f5260326020526024601cfd5b60028110610e5357828203602084018260051b8101614e06838284614d42565b82820151604087015b8051845114614e2b5781858501525f9150602084019350805184525b8085015191820191821015614e4c57634e487b715f5260116020526024601cfd5b602081019050828103614e0f57509282019290925284900360051c93849052505052565b905160059190911b016020015190565b5f816014526370a0823160601b5f5260208060246010865afa601f3d111660205102905092915050565b816014528060345263095ea7b360601b5f5260205f604460105f875af18060015f511416614c7a57803d853b151710614c7a57633e3f8f735f526004601cfd5b60405163cc53287f8152602080820152600160408201528260601b60601c60608201528160601b60601c60808201525f3860a0601c84015f6e22d473030f116ddee9f6b43ac78ba35af1610e53576396b3de235f526004601cfd5b5f610f368383612c37565b614f5c818685856123a9565b614f81578085848460405163f78c1b5360e01b8152600401613b379493929190615b72565b613b598585858585604051828482375f388483888a5af1612256573d5f823e3d81fd5b5f5f83601f840112614fb4575f5ffd5b5081356001600160401b03811115614fca575f5ffd5b602083019150836020828501011115614604575f5ffd5b5f5f5f60408486031215614ff3575f5ffd5b8335925060208401356001600160401b0381111561500f575f5ffd5b61501b86828701614fa4565b9497909650939450505050565b5f60208284031215615038575f5ffd5b5035919050565b634e487b7160e01b5f52602160045260245ffd5b5f81518084528060208401602086015e5f602082860101526020601f19601f83011685010191505092915050565b64ffffffffff81511682525f6020820151600481106150a2576150a261503f565b806020850152506040820151151560408401526060820151608060608501526126756080850182615053565b602081525f610f366020830184615081565b6001600160a01b0381168114611a28575f5ffd5b8015158114611a28575f5ffd5b8035610fff816150f4565b5f5f5f5f6080858703121561511f575f5ffd5b843593506020850135615131816150e0565b925060408501356001600160e01b03198116811461514d575f5ffd5b9150606085013561515d816150f4565b939692955090935050565b803560078110610fff575f5ffd5b5f5f5f60608486031215615188575f5ffd5b83359250602084013561519a816150e0565b91506151a860408501615168565b90509250925092565b5f8151808452602084019350602083015f5b828110156151e15781518652602095860195909101906001016151c3565b5093949350505050565b5f604082016040835280855180835260608501915060608160051b8601019250602087015f5b8281101561524257605f1987860301845261522d858351615081565b94506020938401939190910190600101615211565b505050508281036020840152612bff81856151b1565b5f60208284031215615268575f5ffd5b81356001600160c01b0381168114610f36575f5ffd5b5f5f5f60608486031215615290575f5ffd5b8335925060208401356152a2816150e0565b915060408401356152b2816150e0565b809150509250925092565b5f5f5f5f608085870312156152d0575f5ffd5b8435935060208501356152e2816150e0565b92506152f060408601615168565b9396929550929360600135925050565b5f5f83601f840112615310575f5ffd5b5081356001600160401b03811115615326575f5ffd5b6020830191508360208260051b8501011115614604575f5ffd5b5f5f5f60408486031215615352575f5ffd5b83356001600160401b03811115615367575f5ffd5b61537386828701615300565b909790965060209590950135949350505050565b5f5f5f60608486031215615399575f5ffd5b8335925060208401356153ab816150e0565b915060408401356152b2816150f4565b60ff60f81b8816815260e060208201525f6153d960e0830189615053565b82810360408401526153eb8189615053565b606084018890526001600160a01b038716608085015260a0840186905283810360c0850152845180825260208087019350909101905f5b81811015615440578351835260209384019390920191600101615422565b50909b9a5050505050505050505050565b602080825282518282018190525f918401906040840190835b818110156154a057835180516001600160a01b03908116855260209182015116818501529093019260409092019160010161546a565b509095945050505050565b5f602082840312156154bb575f5ffd5b8135610f36816150e0565b634e487b7160e01b5f52604160045260245ffd5b604051608081016001600160401b03811182821017156154fc576154fc6154c6565b60405290565b5f82601f830112615511575f5ffd5b81356001600160401b0381111561552a5761552a6154c6565b604051601f8201601f19908116603f011681016001600160401b0381118282101715615558576155586154c6565b60405281815283820160200185101561556f575f5ffd5b816020850160208301375f918101602001919091529392505050565b5f6020828403121561559b575f5ffd5b81356001600160401b038111156155b0575f5ffd5b8201608081850312156155c1575f5ffd5b6155c96154da565b813564ffffffffff811681146155dd575f5ffd5b81526020820135600481106155f0575f5ffd5b602082015261560160408301615101565b604082015260608201356001600160401b0381111561561e575f5ffd5b61562a86828501615502565b606083015250949350505050565b602080825282518282018190525f918401906040840190835b818110156154a05783516001600160a01b0316835260209384019390920191600101615651565b5f5f60208385031215615689575f5ffd5b82356001600160401b0381111561569e575f5ffd5b6156aa85828601615300565b90969095509350505050565b600781106156c6576156c661503f565b9052565b5f8151808452602084019350602083015f5b828110156151e157815180516001600160a01b031687526020808201515f91615707908a01826156b6565b505060408181015190880152606080820151908801526080808201519088015260a0808201519088015260c0908101519087015260e090950194602091909101906001016156dc565b5f604082016040835280855180835260608501915060608160051b8601019250602087015f5b828110156157a757605f198786030184526157928583516156ca565b94506020938401939190910190600101615776565b50505050828103602084015280845180835260208301915060208160051b840101602087015f5b8381101561580057601f198684030185526157ea8383516151b1565b60209586019590935091909101906001016157ce565b509098975050505050505050565b5f5f6020838503121561581f575f5ffd5b82356001600160401b03811115615834575f5ffd5b6156aa85828601614fa4565b602081525f610f366020830184615053565b602081525f610f3660208301846156ca565b602081525f610f3660208301846151b1565b5f5f5f5f5f6080868803121561588a575f5ffd5b85359450602086013593506040860135925060608601356001600160401b038111156158b4575f5ffd5b6158c088828901614fa4565b969995985093965092949392505050565b5f5f604083850312156158e2575f5ffd5b823591506158f260208401615168565b90509250929050565b5f5f5f5f6060858703121561590e575f5ffd5b843593506020850135615920816150e0565b925060408501356001600160401b0381111561593a575f5ffd5b61594687828801614fa4565b95989497509550505050565b5f60208284031215615962575f5ffd5b8151610f36816150e0565b805160208201516bffffffffffffffffffffffff1981169190601482101561186c576bffffffffffffffffffffffff1960149290920360031b82901b161692915050565b634e487b7160e01b5f52601160045260245ffd5b818103818111156112ef576112ef6159b1565b8381526001600160a01b03831660208201526060810161267560408301846156b6565b634e487b7160e01b5f52603260045260245ffd5b5f60018201615a2057615a206159b1565b5060010190565b8481526001600160a01b038416602082015260808101615a4a60408301856156b6565b82606083015295945050505050565b5f60208284031215615a69575f5ffd5b8151610f36816150f4565b81835281816020850137505f828201602090810191909152601f909101601f19169091010190565b602081525f612675602083018486615a74565b5f5f8335601e19843603018112615ac4575f5ffd5b8301803591506001600160401b03821115615add575f5ffd5b602001915036819003821315614604575f5ffd5b5f85518060208801845e60d886901b6001600160d81b03191690830190815260048510615b2057615b2061503f565b60f894851b600582015292151590931b6006830152506007019392505050565b808201808211156112ef576112ef6159b1565b5f82615b6d57634e487b7160e01b5f52601260045260245ffd5b500490565b8481526001600160a01b03841660208201526060604082018190525f90612ea19083018486615a7456fe3232323232323232323232323232323232323232323232323232323232323232def24cb3236edf62937b12ea8dc676927599974e90729c6e9eafa9f05b03eab8" as const;

