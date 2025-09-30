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
        "internalType": "struct IthacaAccount.Key",
        "components": [
          {
            "name": "expiry",
            "type": "uint40",
            "internalType": "uint40"
          },
          {
            "name": "keyType",
            "type": "uint8",
            "internalType": "enum IthacaAccount.KeyType"
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
        "internalType": "struct IthacaAccount.Key",
        "components": [
          {
            "name": "expiry",
            "type": "uint40",
            "internalType": "uint40"
          },
          {
            "name": "keyType",
            "type": "uint8",
            "internalType": "enum IthacaAccount.KeyType"
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
        "internalType": "struct IthacaAccount.Key[]",
        "components": [
          {
            "name": "expiry",
            "type": "uint40",
            "internalType": "uint40"
          },
          {
            "name": "keyType",
            "type": "uint8",
            "internalType": "enum IthacaAccount.KeyType"
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
    "name": "hash",
    "inputs": [
      {
        "name": "key",
        "type": "tuple",
        "internalType": "struct IthacaAccount.Key",
        "components": [
          {
            "name": "expiry",
            "type": "uint40",
            "internalType": "uint40"
          },
          {
            "name": "keyType",
            "type": "uint8",
            "internalType": "enum IthacaAccount.KeyType"
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
        "internalType": "struct IthacaAccount.Key",
        "components": [
          {
            "name": "expiry",
            "type": "uint40",
            "internalType": "uint40"
          },
          {
            "name": "keyType",
            "type": "uint8",
            "internalType": "enum IthacaAccount.KeyType"
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
        "internalType": "struct IthacaAccount.Key",
        "components": [
          {
            "name": "expiry",
            "type": "uint40",
            "internalType": "uint40"
          },
          {
            "name": "keyType",
            "type": "uint8",
            "internalType": "enum IthacaAccount.KeyType"
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

export const code = "0x610140604052604051615cd6380380615cd6833981016040819052610023916100ea565b306080524660a052606080610075604080518082018252600d81526c125d1a1858d85058d8dbdd5b9d609a1b602080830191909152825180840190935260068352650302e352e31360d41b9083015291565b815160209283012081519183019190912060c082905260e0819052604080517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f8152938401929092529082015246606082015230608082015260a090206101005250506001600160a01b031661012052610117565b5f602082840312156100fa575f5ffd5b81516001600160a01b0381168114610110575f5ffd5b9392505050565b60805160a05160c05160e0516101005161012051615b636101735f395f81816107800152818161195401528181611ff8015261378b01525f612f3b01525f612ff501525f612fcf01525f612f7f01525f612f5c0152615b635ff3fe60806040526004361061026a575f3560e01c80638e87cf4711610143578063cb4774c4116100b5578063e9ae5c5311610079578063e9ae5c5314610859578063f81d87a71461086c578063faba56d81461088b578063fac750e0146108aa578063fcd4e707146108be578063ff619c6b146108e657610271565b8063cb4774c4146107a2578063cebfe336146107c3578063d03c7914146107e2578063dcc09ebf14610801578063e5adda711461082d57610271565b8063b70e36f011610107578063b70e36f0146106d1578063b75c7dc6146106f0578063bc2c554a1461070f578063be766d151461073c578063bf53096914610750578063c885f95a1461076f57610271565b80638e87cf4714610628578063912aa1b8146106545780639e49fbf114610673578063a840fe4914610686578063ad077083146106a557610271565b80632f3f30c7116101dc57806357022451116101a05780635702245114610552578063598daac41461057157806360d2f33d146105905780636fd91454146105c35780637656d304146105e257806384b0196e1461060157610271565b80632f3f30c7146104c057806335058501146104da5780633e1b0812146104f45780634223b5c214610513578063515c9d6d1461053257610271565b806317e69ab81161022e57806317e69ab8146103a95780631a912f3e146103d857806320606b70146104195780632081a2781461044c5780632150c5181461046b5780632f1d14cb1461048d57610271565b80630cef73b4146102aa57806311a86fd6146102e557806312aaac7014610324578063136a12f7146103505780631626ba7e1461037157610271565b3661027157005b5f3560e01c63bc197c81811463f23a6e6182141763150b7a028214171561029c57806020526020603cf35b50633c10b94e5f526004601cfd5b3480156102b5575f5ffd5b506102c96102c4366004614f67565b610905565b6040805192151583526020830191909152015b60405180910390f35b3480156102f0575f5ffd5b5061030c73323232323232323232323232323232323232323281565b6040516001600160a01b0390911681526020016102dc565b34801561032f575f5ffd5b5061034361033e366004614fae565b610bbf565b6040516102dc9190615054565b34801561035b575f5ffd5b5061036f61036a366004615092565b610cae565b005b34801561037c575f5ffd5b5061039061038b366004614f67565b610dd8565b6040516001600160e01b031990911681526020016102dc565b3480156103b4575f5ffd5b506103c86103c3366004614fae565b610ebd565b60405190151581526020016102dc565b3480156103e3575f5ffd5b5061040b7f9085b19ea56248c94d86174b3784cfaaa8673d1041d6441f61ff52752dac848381565b6040519081526020016102dc565b348015610424575f5ffd5b5061040b7f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f81565b348015610457575f5ffd5b5061036f6104663660046150fc565b610f84565b348015610476575f5ffd5b5061047f6110d3565b6040516102dc929190615171565b348015610498575f5ffd5b5061040b7feff7fda3af271797e53f62724a17c2e5c118cf95ac65e8274759fcfff97bf1fe81565b3480156104cb575f5ffd5b50610390630707070760e51b81565b3480156104e5575f5ffd5b50610390631919191960e11b81565b3480156104ff575f5ffd5b5061040b61050e3660046151de565b61123d565b34801561051e575f5ffd5b5061034361052d366004614fae565b611275565b34801561053d575f5ffd5b5061040b5f516020615b235f395f51905f5281565b34801561055d575f5ffd5b5061036f61056c366004615204565b6112ad565b34801561057c575f5ffd5b5061036f61058b366004615243565b61139a565b34801561059b575f5ffd5b5061040b7f9a5906d05ceef8b2885ad4b95ec46e2570079e7f040193be5767e1329736de5781565b3480156105ce575f5ffd5b5061040b6105dd3660046152c6565b6114ec565b3480156105ed575f5ffd5b5061036f6105fc36600461530d565b61162b565b34801561060c575f5ffd5b506106156116e5565b6040516102dc9796959493929190615341565b348015610633575f5ffd5b50610647610642366004614fae565b61170b565b6040516102dc91906153d7565b34801561065f575f5ffd5b5061036f61066e366004615431565b6117f3565b61036f610681366004614fae565b611949565b348015610691575f5ffd5b5061040b6106a0366004615511565b6119ab565b3480156106b0575f5ffd5b506106c46106bf366004614fae565b6119e4565b6040516102dc91906155be565b3480156106dc575f5ffd5b5061036f6106eb366004614fae565b6119f7565b3480156106fb575f5ffd5b5061036f61070a366004614fae565b611a5f565b34801561071a575f5ffd5b5061072e6107293660046155fe565b611ab4565b6040516102dc9291906156d6565b348015610747575f5ffd5b5061040b611beb565b34801561075b575f5ffd5b5061036f61076a366004615794565b611c40565b34801561077a575f5ffd5b5061030c7f000000000000000000000000000000000000000000000000000000000000000081565b3480156107ad575f5ffd5b506107b6611ce4565b6040516102dc91906157c6565b3480156107ce575f5ffd5b5061040b6107dd366004615511565b611cfd565b3480156107ed575f5ffd5b506103c86107fc366004614fae565b611d65565b34801561080c575f5ffd5b5061082061081b366004614fae565b611d77565b6040516102dc91906157d8565b348015610838575f5ffd5b5061084c610847366004614fae565b611f3b565b6040516102dc91906157ea565b61036f610867366004614f67565b611f4e565b348015610877575f5ffd5b5061036f6108863660046157fc565b611fd0565b348015610896575f5ffd5b5061040b6108a5366004615857565b6121de565b3480156108b5575f5ffd5b5061040b612316565b3480156108c9575f5ffd5b506108d361c1d081565b60405161ffff90911681526020016102dc565b3480156108f1575f5ffd5b506103c8610900366004615881565b612329565b5f80602183101561091b5750600190505f610bb7565b6041831460408414171561094957306109358686866125fd565b6001600160a01b03161491505f9050610bb7565b506020198281018381118185180281189385019182013591601f19013560ff161561097a5761097786612685565b95505b505f61098582610bbf565b805190915064ffffffffff1642811090151516156109a6575f925050610bb7565b5f816020015160038111156109bd576109bd614fc5565b03610a18575f80603f86118735810290602089013502915091505f5f6109fc856060015180516020820151604090920151603f90911191820292910290565b91509150610a0d8a8585858561269e565b965050505050610bab565b600181602001516003811115610a3057610a30614fc5565b03610ab557606081810151805160208083015160409384015184518084018d9052855180820385018152601f8c018590049094028101870186529485018a8152603f9490941091820295910293610aac935f92610aa5928d918d918291018382808284375f9201919091525061273792505050565b858561281f565b94505050610bab565b600281602001516003811115610acd57610acd614fc5565b03610afc57610af58160600151806020019051810190610aed91906158d8565b87878761293e565b9250610bab565b600381602001516003811115610b1457610b14614fc5565b03610bab57806060015151602014610b3f5760405163145a1fdd60e31b815260040160405180910390fd5b5f8160600151610b4e906158f3565b60601c9050604051638afc93b48152876020820152836040820152606080820152856080820152858760a08301375f5f526084860160205f82601c8501865afa915050638afc93b45f5160e01c14811615610ba857600194505b50505b82610bb557600192505b505b935093915050565b604080516080810182525f80825260208201819052918101919091526060808201525f82815268448e3efef2f6a7f2f960205260408120610bff90612a1e565b8051909150610c215760405163395ed8c160e21b815260040160405180910390fd5b8051600619015f610c358383016020015190565b60d881901c855260c881901c915060d01c60ff166003811115610c5a57610c5a614fc5565b84602001906003811115610c7057610c70614fc5565b90816003811115610c8357610c83614fc5565b90525060ff811615156040850152610ca083838151811082025290565b606085015250919392505050565b333014610ccd576040516282b42960e81b815260040160405180910390fd5b8380610cec57604051638707510560e01b815260040160405180910390fd5b5f516020615b235f395f51905f528514610d2757610d0985612a84565b15610d2757604051630442081560e01b815260040160405180910390fd5b610d318484612ae8565b15610d4f576040516303a6f8c760e21b815260040160405180910390fd5b610d7260e084901c606086901b1783610800610d6a89612b10565b929190612b5f565b50604080518681526001600160a01b03861660208201526001600160e01b031985169181019190915282151560608201527f7eb91b8ac56c0864a4e4f5598082d140d04bed1a4dd62a41d605be2430c494e1906080015b60405180910390a15050505050565b5f5f610e0d7feff7fda3af271797e53f62724a17c2e5c118cf95ac65e8274759fcfff97bf1fe865f9182526020526040902090565b604080517f035aff83d86937d35b32e04f0ddc6ff469290eef2f1b692d8a815c89404d47495f908152306020908152838220905261190190528282526042601e20915290915094505f5f610e62878787610905565b90925090508115158115151615610e9857610e7c81612a84565b80610e955750610e9533610e8f83612b88565b90612bb7565b91505b81610ea75763ffffffff610ead565b631626ba7e5b60e01b93505050505b9392505050565b5f333014610edd576040516282b42960e81b815260040160405180910390fd5b5f610f16610f12610f0f60017fa7d540c151934097be66b966a69e67d3055ab4350de7ff57a5f5cb2284ad4a5a61594b565b90565b5c90565b90507f0a9f35b227e9f474cb86caa2e9b62847626fede22333cf52c7abea325d2eaa358114610f43575f5ffd5b610f79610f74610f0f60017fa7d540c151934097be66b966a69e67d3055ab4350de7ff57a5f5cb2284ad4a5a61594b565b612c61565b60019150505b919050565b333014610fa3576040516282b42960e81b815260040160405180910390fd5b8280610fc257604051638707510560e01b815260040160405180910390fd5b610fcb84612a84565b15610fe95760405163f2fee1e160e01b815260040160405180910390fd5b5f610ff385612b10565b6001600160a01b0385165f90815260028201602052604090206001909101915061104184600681111561102857611028614fc5565b8254600160ff9092169190911b80198216845516151590565b15611061575f61105082612c67565b036110615761105f8286612c82565b505b611090816001015f86600681111561107b5761107b614fc5565b60ff1681526020019081526020015f205f9055565b7fa17fd662986af6bbcda33ce6b68c967b609aebe07da86cd25ee7bfbd01a65a278686866040516110c39392919061595e565b60405180910390a1505050505050565b6060805f6110df612316565b9050806001600160401b038111156110f9576110f961544c565b60405190808252806020026020018201604052801561114857816020015b604080516080810182525f80825260208083018290529282015260608082015282525f199092019101816111175790505b509250806001600160401b038111156111635761116361544c565b60405190808252806020026020018201604052801561118c578160200160208202803683370190505b5091505f805b82811015611232575f6111b38268448e3efef2f6a7f2f65b60020190612db7565b90505f6111bf82610bbf565b805190915064ffffffffff1642811090151516156111de57505061122a565b808785815181106111f1576111f1615981565b60200260200101819052508186858151811061120f5761120f615981565b60209081029190910101528361122481615995565b94505050505b600101611192565b508084528252509091565b6001600160c01b0381165f90815268448e3efef2f6a7f2f76020526040808220549083901b67ffffffffffffffff1916175b92915050565b604080516080810182525f808252602082018190529181019190915260608082015261126f61033e8368448e3efef2f6a7f2f66111aa565b3330146112cc576040516282b42960e81b815260040160405180910390fd5b82806112eb57604051638707510560e01b815260040160405180910390fd5b5f516020615b235f395f51905f5284146113265761130884612a84565b156113265760405163f2fee1e160e01b815260040160405180910390fd5b5f61133085612b10565b600301905061134f8185856001600160a01b0381161515610800612e00565b50604080518681526001600160a01b0380871660208301528516918101919091527f7e2baa9c3a554d7c6587682e28fe9607c29d1d8c8a46968368d5614607c6079990606001610dc9565b3330146113b9576040516282b42960e81b815260040160405180910390fd5b83806113d857604051638707510560e01b815260040160405180910390fd5b6113e185612a84565b156113ff5760405163f2fee1e160e01b815260040160405180910390fd5b5f61140986612b10565b600101905061141a81866040612e2b565b506001600160a01b0385165f908152600182016020526040902061146085600681111561144957611449614fc5565b8254600160ff9092169190911b8082178455161590565b505f816001015f87600681111561147957611479614fc5565b60ff1681526020019081526020015f2090505f61149582612e67565b86815290506114a48282612eb1565b7f68c781b0acb659616fc73da877ee77ae95c51ce973b6c7a762c8692058351b4a898989896040516114d994939291906159ad565b60405180910390a1505050505050505050565b5f806115088460408051828152600190920160051b8201905290565b90505f5b848110156115a8575f5f365f6115238a8a87612ef6565b92965090945092509050611598856115897f9085b19ea56248c94d86174b3784cfaaa8673d1041d6441f61ff52752dac84836001600160a01b0388168761156a8888612f28565b6040805194855260208501939093529183015260608201526080902090565b600190910160051b8801528690565b505050505080600101905061150c565b5061c1d060f084901c145f6116027f9a5906d05ceef8b2885ad4b95ec46e2570079e7f040193be5767e1329736de5783855160051b6020870120886040805194855260208501939093529183015260608201526080902090565b9050816116175761161281612f39565b611620565b6116208161304f565b979650505050505050565b33301461164a576040516282b42960e81b815260040160405180910390fd5b5f83815268448e3efef2f6a7f2f9602052604090205460ff166116805760405163395ed8c160e21b815260040160405180910390fd5b611699828261020061169187612b88565b9291906130c3565b50816001600160a01b0316837f30653b7562c17b712ebc81c7a2373ea1c255cf2a055380385273b5bf7192cc99836040516116d8911515815260200190565b60405180910390a3505050565b600f60f81b6060805f8080836116f96130de565b97989097965046955030945091925090565b60605f61171783612b10565b600301905061172581613122565b6001600160401b0381111561173c5761173c61544c565b60405190808252806020026020018201604052801561178057816020015b604080518082019091525f808252602082015281526020019060019003908161175a5790505b5091505f5b82518110156117ec57611798828261312c565b8483815181106117aa576117aa615981565b60200260200101515f018584815181106117c6576117c6615981565b6020908102919091018101516001600160a01b0393841691015291169052600101611785565b5050919050565b333014611812576040516282b42960e81b815260040160405180910390fd5b6001600160a01b03811661183957604051634adebaa360e11b815260040160405180910390fd5b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc80545f908152606083901b600c525190555f6118746130de565b91506118d090507f0a9f35b227e9f474cb86caa2e9b62847626fede22333cf52c7abea325d2eaa356118ca610f0f60017fa7d540c151934097be66b966a69e67d3055ab4350de7ff57a5f5cb2284ad4a5a61594b565b90613166565b306317e69ab86118df8361316d565b6040518263ffffffff1660e01b81526004016118fd91815260200190565b6020604051808303815f875af1158015611919573d5f5f3e3d5ffd5b505050506040513d601f19601f8201168201806040525081019061193d91906159df565b611945575f5ffd5b5050565b336001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614611991576040516282b42960e81b815260040160405180910390fd5b6119a868448e3efef2f6a7f2f65b60010182613195565b50565b5f61126f826020015160038111156119c5576119c5614fc5565b60ff168360600151805190602001205f1c5f9182526020526040902090565b606061126f6119f283612b88565b6131ac565b333014611a16576040516282b42960e81b815260040160405180910390fd5b611a2968448e3efef2f6a7f2f782613280565b6040518181527f4d9dbebf1d909894d9c26fe228c27cec643b2cb490124e5b658f4edd203c20c19060200160405180910390a150565b333014611a7e576040516282b42960e81b815260040160405180910390fd5b611a87816132ea565b60405181907fe5af7daed5ab2a2dc5f98d53619f05089c0c14d11a6621f6b906a2366c9a7ab3905f90a250565b60608082806001600160401b03811115611ad057611ad061544c565b604051908082528060200260200182016040528015611b0357816020015b6060815260200190600190039081611aee5790505b509250806001600160401b03811115611b1e57611b1e61544c565b604051908082528060200260200182016040528015611b5157816020015b6060815260200190600190039081611b3c5790505b5091505f5b81811015611be257611b7f868683818110611b7357611b73615981565b90506020020135611d77565b848281518110611b9157611b91615981565b6020026020010181905250611bbd868683818110611bb157611bb1615981565b90506020020135611f3b565b838281518110611bcf57611bcf615981565b6020908102919091010152600101611b56565b50509250929050565b5f80611c19611c0860015f516020615b435f395f51905f5261594b565b604080516020810190915290815290565b9050611c2481515c90565b5f03611c3157505f919050565b611c3a81613355565b91505090565b333014611c5f576040516282b42960e81b815260040160405180910390fd5b611ca782828080601f0160208091040260200160405190810160405280939291908181526020018383808284375f92019190915250611ca19250612a11915050565b90613375565b7faec6ef4baadc9acbdf52442522dfffda03abe29adba8d4af611bcef4cbe0c9ad8282604051611cd8929190615a22565b60405180910390a15050565b6060611cf868448e3efef2f6a7f2f6612a1e565b905090565b5f333014611d1d576040516282b42960e81b815260040160405180910390fd5b611d26826133cd565b9050807f3d3a48be5a98628ecf98a6201185102da78bbab8f63a4b2d6b9eef354f5131f583604051611d589190615054565b60405180910390a2919050565b5f611d6f8261343b565b151592915050565b60605f611d8383612b10565b6001019050611d9e6040518060200160405280606081525090565b5f611da883613484565b90505f5b81811015611f31575f611dbf85836134d5565b6001600160a01b0381165f9081526001870160205260408120919250611de48261352e565b90505f5b8151811015611f22575f828281518110611e0457611e04615981565b602002602001015190505f611e2d856001015f8460ff1681526020019081526020015f20612e67565b9050611e6a6040805160e081019091525f808252602082019081526020015f81526020015f81526020015f81526020015f81526020015f81525090565b8260ff166006811115611e7f57611e7f614fc5565b81602001906006811115611e9557611e95614fc5565b90816006811115611ea857611ea8614fc5565b9052506001600160a01b03871681528151604080830191909152820151608082015260208201516060820152611eed4260ff851660068111156108a5576108a5614fc5565b60c08201819052608082015160608301519111150260a082015280611f128b82613587565b5050505050806001019050611de8565b50505050806001019050611dac565b5050519392505050565b606061126f611f4983612b10565b613630565b5f611f588461343b565b905080600303611f7357611f6d8484846136e9565b50505050565b365f365f84611f8957637f1812755f526004601cfd5b5085358087016020810194503592505f90604011600286141115611fb7575050602080860135860190810190355b611fc688888887878787613781565b5050505050505050565b813580830190604081901c602084101715611fe9575f5ffd5b5061205e336001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016146120553061202a6020860186615431565b6001600160a01b031614306120456080870160608801615431565b6001600160a01b03161417151590565b15159015151690565b61207a576040516282b42960e81b815260040160405180910390fd5b3061208b6080830160608401615431565b6001600160a01b03160361213e575f84815268448e3efef2f6a7f2fb602052604090205460ff16156120d057604051638f56f14960e01b815260040160405180910390fd5b5f84815268448e3efef2f6a7f2fb60205260408120805460ff1916600117905580612103866102c4610240860186615a35565b975091508690506001600160c01b0332311061211e57600191505b8161213b576040516282b42960e81b815260040160405180910390fd5b50505b61216961215160a0830160808401615431565b61216361022084016102008501615431565b88613999565b84158061217a575061217a85612a84565b6121d6575f61218886612b10565b6001810191506121d4906002015f6121a660a0860160808701615431565b6001600160a01b0316815260208101919091526040015f206121ce60a0850160808601615431565b896139c1565b505b505050505050565b5f808260068111156121f2576121f2614fc5565b0361220557603c808404025b905061126f565b600182600681111561221957612219614fc5565b0361222a57610e10808404026121fe565b600282600681111561223e5761223e614fc5565b036122505762015180808404026121fe565b600382600681111561226457612264614fc5565b0361228a576007600362015180808604918201929092069003620545ff851102026121fe565b5f5f61229585613ae6565b50909250905060048460068111156122af576122af614fc5565b036122c9576122c082826001613b90565b9250505061126f565b60058460068111156122dd576122dd614fc5565b036122ee576122c082600180613b90565b600684600681111561230257612302614fc5565b036123125760019250505061126f565b5f5ffd5b5f611cf868448e3efef2f6a7f2f8613be7565b5f84612337575060016125f5565b61234085612a84565b1561234d575060016125f5565b631919191960e11b60048310612361575082355b826123705750630707070760e51b5b61237a8582612ae8565b15612388575f9150506125f5565b5f61239287612b10565b905061239d81613be7565b1561245a576123b860e083901c606088901b175b8290613c33565b156123c8576001925050506125f5565b6123db6332323232606088901b176123b1565b156123eb576001925050506125f5565b61241160e083901c73191919191919191919191919191919191919191960611b176123b1565b15612421576001925050506125f5565b61244a7f32323232323232323232323232323232323232320000000000000000323232326123b1565b1561245a576001925050506125f5565b6124705f516020615b235f395f51905f52612b10565b905061247b81613be7565b156125355761249360e083901c606088901b176123b1565b156124a3576001925050506125f5565b6124b66332323232606088901b176123b1565b156124c6576001925050506125f5565b6124ec60e083901c73191919191919191919191919191919191919191960611b176123b1565b156124fc576001925050506125f5565b6125257f32323232323232323232323232323232323232320000000000000000323232326123b1565b15612535576001925050506125f5565b612543878888898989613cb7565b15612553576001925050506125f5565b6125758788733232323232323232323232323232323232323232898989613cb7565b15612585576001925050506125f5565b6125a05f516020615b235f395f51905f528888808989613cb7565b156125b0576001925050506125f5565b6125df5f516020615b235f395f51905f5288733232323232323232323232323232323232323232898989613cb7565b156125ef576001925050506125f5565b5f925050505b949350505050565b5f6040518260408114612618576041811461263f5750612670565b60208581013560ff81901c601b0190915285356040526001600160ff1b0316606052612650565b60408501355f1a6020526040856040375b50845f526020600160805f60015afa5191505f606052806040523d61267d575b638baa579f5f526004601cfd5b509392505050565b5f815f526020600160205f60025afa5190503d610f7f57fe5b5f6040518681528560208201528460408201528360608201528260808201525f5f5260205f60a0836101005afa503d612702576d1ab2e8006fd8b71907bf06a5bdee3b6127025760205f60a0836dd01ea45f9efd5c54f037fa57ea1a5afa61270257fe5b505f516001147f7fffffff800000007fffffffffffffffde737d56d38bcf4279dce5617e3192a8851110905095945050505050565b61276c6040518060c0016040528060608152602001606081526020015f81526020015f81526020015f81526020015f81525090565b815160c081106128195760208301818101818251018281108260c0830111171561279857505050612819565b80815101925080602082015101818110838211178285108486111717156127c25750505050612819565b82815160208301011183855160208701011117156127e35750505050612819565b8386528060208701525060408101516040860152606081015160608601526080810151608086015260a081015160a08601525050505b50919050565b5f5f5f61282e88600180613d65565b905060208601518051602082019150604088015160608901518451600d81016c1131b430b63632b733b2911d1160991b60981c8752848482011060228286890101515f1a14168160138901208286890120141685846014011085851760801c1074113a3cb832911d113bb2b130baba34371733b2ba1160591b60581c8589015160581c14161698505080865250505087515189151560021b600117808160218c510151161460208311881616965050851561291257602089510181810180516020600160208601856020868a8c60025afa60011b5afa51915295503d905061291257fe5b5050508215612933576129308287608001518860a00151888861269e565b92505b505095945050505050565b5f6001600160a01b038516156125f557604051853b6129ce57826040811461296e57604181146129955750612a08565b60208581013560ff81901c601b0190915285356040526001600160ff1b03166060526129a6565b60408501355f1a6020526040856040375b50845f526020600160805f60015afa5180871860601b3d119250505f60605280604052612a08565b631626ba7e60e01b80825285600483015260248201604081528460448401528486606485013760208160648701858b5afa90519091141691505b50949350505050565b68448e3efef2f6a7f2f690565b60405181546020820190600881901c5f8260ff841714612a4c57505080825260ff8116601f80821115612a6e575b855f5260205f205b8160051c81015482860152602082019150828210612a5457505b508084525f920191825250602001604052919050565b5f81815268448e3efef2f6a7f2f960205260408120805460ff808216908114801590910260089290921c021780612ace5760405163395ed8c160e21b815260040160405180910390fd5b612adb825f198301613e56565b60ff161515949350505050565b6001600160a01b039190911630146001600160e01b03199190911663e9ae5c5360e01b141690565b5f805f516020615b235f395f51905f528314612b3457612b2f83613ec3565b612b43565b5f516020615b235f395f51905f525b68b11ddb8fabd886bebb6009525f908152602990209392505050565b5f82612b7457612b6f8585613ef0565b612b7f565b612b7f858584613fee565b95945050505050565b5f81815268448e3efef2f6a7f2fa602052604081208054601f5263d4203f8b6004528152603f81208190610eb6565b63978aab926004525f828152602481206001600160a01b03929092169168fbb67fda52d4bfb8be198301612bf25763f5a267f15f526004601cfd5b82612c045768fbb67fda52d4bfb8bf92505b80546001600160601b038116612c485760019250838160601c0315612c5957600182015460601c8414612c5957600282015460601c8414612c59575b5f9250612c59565b81602052835f5260405f2054151592505b505092915050565b5f815d50565b5f81545b801561281957600191820191811901811618612c6b565b63978aab926004525f828152602481206001600160a01b03929092169168fbb67fda52d4bfb8be198301612cbd5763f5a267f15f526004601cfd5b82612ccf5768fbb67fda52d4bfb8bf92505b80546001600160601b03811680612d495760019350848260601c03612d075760018301805484556002840180549091555f9055612dae565b84600184015460601c03612d285760028301805460018501555f9055612dae565b84600284015460601c03612d41575f6002840155612dae565b5f9350612dae565b82602052845f5260405f20805480612d62575050612dae565b60018360011c039250826001820314612d92578285015460601c8060601b60018303870155805f52508060405f20555b5060018260011b17845460601c60601b1784555f815550600193505b50505092915050565b6318fb58646004525f8281526024902081015468fbb67fda52d4bfb8bf81141502612de183613be7565b821061126f57604051634e23d03560e01b815260040160405180910390fd5b5f82612e1557612e10868661400b565b612e21565b612e218686868561403c565b9695505050505050565b5f612e368484614077565b90508015610eb65781612e4885613484565b1115610eb65760405163155176b960e11b815260040160405180910390fd5b612e8860405180606001604052805f81526020015f81526020015f81525090565b5f612e9283612a1e565b905080515f14612819575f612ea6826141d2565b602001949350505050565b60408051825160208083019190915283015181830152908201516060820152611945908390612ef19060800160405160208183030381529060405261431e565b613375565b60051b82013590910180356001600160a01b031680153002179260208083013593506040830135909201918201913590565b5f8183604051375060405120919050565b7f00000000000000000000000000000000000000000000000000000000000000007f000000000000000000000000000000000000000000000000000000000000000030147f000000000000000000000000000000000000000000000000000000000000000046141661302c5750604080517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f81527f000000000000000000000000000000000000000000000000000000000000000060208201527f00000000000000000000000000000000000000000000000000000000000000009181019190915246606082015230608082015260a090205b6719010000000000005f5280601a5281603a52604260182090505f603a52919050565b5f5f5f61305a6130de565b915091506040517f91ab3d17e3a50a9d89e63fd30b92be7f5336b03b287bb946787a83a9d62a27665f5282516020840120602052815160208301206040523060605260805f206020526119015f52846040526042601e20935080604052505f6060525050919050565b5f826130d357612b6f8585612c82565b612b7f858584612e2b565b604080518082018252600d81526c125d1a1858d85058d8dbdd5b9d609a1b602080830191909152825180840190935260068352650302e352e31360d41b9083015291565b5f61126f82613484565b5f80600184018161313d86866134d5565b6001600160a01b038082168352602083019390935260409091015f205490969116945092505050565b80825d5050565b8051602181106131845763ec92f9a35f526004601cfd5b9081015160209190910360031b1b90565b5f5f6131a1848461454b565b600101905550505050565b63978aab926004525f818152602481206060915068fbb67fda52d4bfb8bf81548060a01b60a01c6040519450846020018260601c925083831415830281528161323a57821561323557600191508185015460601c92508215613235578284141590920260208301525060028381015460601c918215613235576003915083831415830260408201525b61326a565b600191821c915b82811015613268578581015460601c858114158102600583901b8401529350600101613241565b505b8186528160051b81016040525050505050919050565b604081811c5f90815260208490522080546001600160401b03831610156132ba576040516312ee5c9360e01b815260040160405180910390fd5b6132e46132de836001600160401b031667fffffffffffffffe808218908211021890565b60010190565b90555050565b5f81815268448e3efef2f6a7f2f96020908152604080832083905568448e3efef2f6a7f2fa90915290208054600101905568448e3efef2f6a7f2f661333868448e3efef2f6a7f2f883613ef0565b6119455760405163395ed8c160e21b815260040160405180910390fd5b80515f90805c8061336d5763bc7ec7795f526004601cfd5b015c92915050565b80518060081b60ff175f60fe831161339e575050601f8281015160081b821790808311156133c5575b60208401855f5260205f205b828201518360051c8201556020830192508483106133aa5750505b509092555050565b5f6133d7826119ab565b90505f68448e3efef2f6a7f2f660608401518451602080870151604080890151905195965061342e9561340c95949301615a77565b60408051601f198184030181529181525f858152600385016020522090613375565b6117ec6002820183614591565b6003690100000000007821000260b09290921c69ffff00000000ffffffff16918214026901000000000078210001821460011b6901000000000000000000909214919091171790565b63978aab926004525f8181526024812080548060a01b60a01c8060011c9350808260601c15176134cd576001935083830154156134cd576002935083830154156134cd57600393505b505050919050565b63978aab926004525f828152602481208281015460601c915068fbb67fda52d4bfb8bf8214158202915061350884613484565b831061352757604051634e23d03560e01b815260040160405180910390fd5b5092915050565b604051815460208201905f905b80156135715761ffff8116613556576010918201911c61353b565b8183526020600582901b16909201916001918201911c61353b565b5050601f198282030160051c8252604052919050565b604080516060815290819052829050825160018151018060051b661d174b32e2c55360208403518181061582820402905080831061361f578281178101811582602001870160405118176135eb57828102601f19870152850160200160405261361f565b602060405101816020018101604052808a52601f19855b888101518382015281018061360257509184029181019190915294505b505082019390935291909152919050565b6318fb58646004525f81815260249020801954604051919068fbb67fda52d4bfb8bf9060208401816136a957835480156136a3578084141502815260018481015490925080156136a3578084141502602082015260028481015490925080156136a3576003925083811415810260408301525b506136d4565b8160011c91505f5b828110156136d257848101548481141502600582901b8301526001016136b1565b505b8185528160051b810160405250505050919050565b600360b01b929092189181358083018035916020808301928686019291600586901b9091018101831090861017604082901c171561372e57633995943b5f526004601cfd5b505f5b8381146121d457365f8260051b850135808601602081019350803592505084828401118160401c171561376b57633995943b5f526004601cfd5b50613777898383611f4e565b5050600101613731565b6001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016330361384757602081146137d25760405163438e981560e11b815260040160405180910390fd5b6040805160208101909152823590613807908290806137ff60015f516020615b435f395f51905f5261594b565b9052906146a3565b6138128585836146bd565b6040805160208101909152613841908061383a60015f516020615b435f395f51905f5261594b565b9052614b86565b506121d4565b8061387b5733301461386b576040516282b42960e81b815260040160405180910390fd5b61387684845f6146bd565b6121d4565b602081101561389d5760405163438e981560e11b815260040160405180910390fd5b81356138b168448e3efef2f6a7f2f661199f565b6040518181527f4d9dbebf1d909894d9c26fe228c27cec643b2cb490124e5b658f4edd203c20c19060200160405180910390a15f5f61390e6138f48888866114ec565b602080871081881802188088019080880390881102610905565b915091508161392f576040516282b42960e81b815260040160405180910390fd5b61395a81604051806020016040528060015f516020615b435f395f51905f525f1c6137ff919061594b565b6139658787836146bd565b604080516020810190915261398d908061383a60015f516020615b435f395f51905f5261594b565b50505050505050505050565b6001600160a01b0383166139b6576139b18282614ba7565b505050565b6139b1838383614bc0565b806139cb57505050565b5f6139d58461352e565b905080515f036139f857604051635ee7e5b160e01b815260040160405180910390fd5b5f5b8151811015613adf575f828281518110613a1657613a16615981565b602002602001015190505f866001015f8360ff1681526020019081526020015f2090505f613a4382612e67565b90505f613a5f428560ff1660068111156108a5576108a5614fc5565b90508082604001511015613a7b57604082018190525f60208301525b815f01518783602001818151613a919190615ac6565b9150818152501115613ac65760405163482a648960e11b81526001600160a01b03891660048201526024015b60405180910390fd5b613ad08383612eb1565b505050508060010190506139fa565b5050505050565b5f8080613b83613af96201518086615ad9565b5f5f5f620afa6c8401935062023ab1840661016d62023ab082146105b48304618eac84048401030304606481048160021c8261016d0201038203915060996002836005020104600161030161f4ff830201600b1c84030193506b030405060708090a0b0c010260a01b811a9450506003841061019062023ab1880402820101945050509193909250565b9196909550909350915050565b5f620afa6c1961019060038510860381810462023ab10260649290910691820461016d830260029390931c9290920161f4ff600c60098901060261030101600b1c8601019190910301016201518002949350505050565b6318fb58646004525f818152602481208019548060011c9250806117ec5781545f9350156117ec576001925082820154156117ec576002925082820154156117ec575060039392505050565b6318fb58646004525f8281526024812068fbb67fda52d4bfb8bf8303613c605763f5a267f15f526004601cfd5b82613c725768fbb67fda52d4bfb8bf92505b801954613ca357805460019250831461352757600181015483146135275760028101548314613527575f9150613527565b602052505f90815260409020541515919050565b5f5f5f613cd087613cc78b612b10565b60030190614c0a565b915091508115613d57576040516001629e639560e01b031981526001600160a01b0382169063ff619c6b90613d0f908b908a908a908a90600401615af8565b602060405180830381865afa158015613d2a573d5f5f3e3d5ffd5b505050506040513d601f19601f82011682018060405250810190613d4e91906159df565b92505050612e21565b505f98975050505050505050565b60608351801561267d576003600282010460021b60405192507f4142434445464748494a4b4c4d4e4f505152535455565758595a616263646566601f526106708515027f6768696a6b6c6d6e6f707172737475767778797a303132333435363738392d5f18603f526020830181810183886020010180515f82525b60038a0199508951603f8160121c16515f53603f81600c1c1651600153603f8160061c1651600253603f811651600353505f518452600484019350828410613de0579052602001604052613d3d60f01b60038406600204808303919091525f861515909102918290035290038252509392505050565b5f82548060ff821714613e9e57601e8311613e755780831a9150613527565b8060ff168311613e9957835f52601f83038060051c60205f200154601f82161a9250505b613527565b8060081c831161352757835f528260051c60205f200154601f84161a91505092915050565b5f81815268448e3efef2f6a7f2fa602052604081208054601f5263d4203f8b6004528152603f812061126f565b6318fb58646004525f8281526024812068fbb67fda52d4bfb8bf8303613f1d5763f5a267f15f526004601cfd5b82613f2f5768fbb67fda52d4bfb8bf92505b80195480613f90576001925083825403613f5c5760018201805483556002830180549091555f9055612c59565b83600183015403613f7a5760028201805460018401555f9055612c59565b83600283015403612c40575f6002830155612c59565b81602052835f5260405f20805480613fa9575050612c59565b60018360011c039250826001820314613fd357828401548060018303860155805f52508060405f20555b5060018260011b178319555f81555060019250505092915050565b5f613ff98484614591565b90508015610eb65781612e4885613be7565b6001600160a01b0381165f908152600183016020526040812080546001600160a01b0319169055610eb68383612c82565b6001600160a01b038381165f908152600186016020526040812080546001600160a01b03191692851692909217909155612b7f858584612e2b565b63978aab926004525f828152602481206001600160a01b03929092169168fbb67fda52d4bfb8be1983016140b25763f5a267f15f526004601cfd5b826140c45768fbb67fda52d4bfb8bf92505b80546001600160601b0381168260205280614186578160601c806140f2578560601b84556001945050612dae565b8581036140ff5750612dae565b600184015460601c80614120578660601b6001860155600195505050612dae565b86810361412e575050612dae565b600285015460601c80614150578760601b600287015560019650505050612dae565b87810361415f57505050612dae565b5f928352604080842060019055918352818320600290558252902060039055506007908117905b845f5260405f2080546141c857600191821c8083018255919450816141b4578560601b600317845550612dae565b8560601b8285015582600201845550612dae565b5050505092915050565b6060815115610f7f576040519050600482018051835184602001017f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f6020850183198552866020015b8051805f1a61427357600190811a016080811161425357600282019150803684379182019184821061424d5750614300565b5061421b565b5f198352918201607f1901916002919091019084821061424d5750614300565b80835283811684011783171980157fc0c8c8d0c8e8d0d8c8e8e0e8d0d8e0f0c8d0e8d0e0e0d8f0d0d0e0d8f8f8f8f8601f6f8421084210842108cc6318c6db6d54be660204081020408185821060071b86811c6001600160401b031060061b1795861c0260181a1c161a90911860031c01918201910183811061421b578381111561430057838103820391505b509290935250601f198382030183525f815260200160405250919050565b6060614376565b6fffffffffffffffffffffffffffffffff811160071b81811c6001600160401b031060061b1781811c63ffffffff1060051b1781811c61ffff1060041b1790811c60ff1060039190911c17601f1890565b50604051815182017f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f60208301845b83811461452757600101805160ff168061442f575b6020820151806143fe5782860360208181189082110218607f839003818111818318021893840193928301929050601f81116143f757505061441f565b50506143ba565b61440781614325565b90508286038181118183180218928301929190910190505b60f01b82526002909101906143a5565b60ff8103614482576020808301511980156144505761444d81614325565b91505b508286038181118282180218601f81811890821102186080811760f01b85526002909401939290920191506143a59050565b80835350602081015160018381018290528482168501821791198581168601179190911684171980157fc0c8c8d0c8e8d0d8c8e8e0e8d0d8e0f0c8d0e8d0e0e0d8f0d0d0e0d8f8f8f8f86f8421084210842108cc6318c6db6d54be660204081020408184821060071b85811c6001600160401b031060061b1794851c0260181a1c601f161a90911860031c0182860381811191811891909102189283010191016143a5565b50600484018051199052601f198482030184525f8152602001604052509092915050565b604081811c5f90815260208490522080546001600160401b0380841682149082101661458a57604051633ab3447f60e11b815260040160405180910390fd5b9250929050565b6318fb58646004525f8281526024812068fbb67fda52d4bfb8bf83036145be5763f5a267f15f526004601cfd5b826145d05768fbb67fda52d4bfb8bf92505b8019548160205280614674578154806145f0578483556001935050612c59565b8481036145fd5750612c59565b60018301548061461857856001850155600194505050612c59565b858103614626575050612c59565b6002840154806146425786600286015560019550505050612c59565b86810361465157505050612c59565b5f9283526040808420600190559183528183206002905582529020600390555060075b835f5260405f208054612dae57600191821c8381018690558083019182905590821b8217831955909250612c59565b5f825f015190506001815c01828183015d80825d50505050565b8015806146ce57506146ce81612a84565b156146de576139b1838383614c44565b5f6146e882612b10565b60010190506147566040805160e081018252606060c0820181815282528251602080820185528282528084019190915283518082018552828152838501528351808201855282815282840152835180820185528281526080840152835190810190935282529060a082015290565b5f61476083613484565b90505f5b818110156147b2575f61477785836134d5565b90506001600160a01b038116156147a95760408401516147979082614c8e565b5060608401516147a7905f613587565b505b50600101614764565b505f5f5b868110156149a3575f5f365f6147cd8c8c87612ef6565b9350935093509350825f146147e9576147e68387615ac6565b95505b60048110156147fb575050505061499b565b813560e01c63a9059cbb81900361483257604089015161481b9086614c8e565b5061483060248401355b60608b015190614cad565b505b8063ffffffff166323b872dd03614895573060248401356001600160a01b03160361486157505050505061499b565b60448301355f0361487657505050505061499b565b60408901516148859086614c8e565b506148936044840135614825565b505b8063ffffffff1663095ea7b3036148fb5760248301355f036148bb57505050505061499b565b88516148c79086614c8e565b506148db600484013560208b015190614c8e565b5060408901516148eb9086614c8e565b506148f96024840135614825565b505b8063ffffffff166387517c4503614995576001600160a01b0385166e22d473030f116ddee9f6b43ac78ba31461493557505050505061499b565b60448301355f0361494a57505050505061499b565b61495d600484013560808b015190614c8e565b50614971602484013560a08b015190614c8e565b50614985600484013560408b015190614c8e565b506149936044840135614825565b505b50505050505b6001016147b6565b506040830151516060840151516149ba9190614cc3565b5f6149ed6149cb8560400151515190565b60606040518260201c5f031790508181528160051b6020820101604052919050565b90505f5b60408501515151811015614a3957604085015151600582901b0160200151614a2f82614a1d8330614e06565b85919060059190911b82016020015290565b50506001016149f1565b50614a45888888614c44565b5f8080526001860160205260408120614a5e91846139c1565b5f5b84515151811015614aa257845151600582901b0160200151614a9981614a93848960200151614df690919063ffffffff16565b5f614e30565b50600101614a60565b505f5b60808501515151811015614aec57608085015151600582901b0160200151614ae381614ade848960a00151614df690919063ffffffff16565b614e70565b50600101614aa5565b505f5b60408501515151811015614b7b57604085810151516020600584901b9182018101516001600160a01b0381165f90815260018b018352939093206060890151518301820151928601909101519091614b719183918591614b6c9190614b6190614b588930614e06565b80821191030290565b808218908210021890565b6139c1565b5050600101614aef565b505050505050505050565b8051805c80614b9c5763bc7ec7795f526004601cfd5b60018103825d505050565b5f385f3884865af16119455763b12d13eb5f526004601cfd5b816014528060345263a9059cbb60601b5f5260205f604460105f875af18060015f511416614c0057803d853b151710614c00576390b8ec185f526004601cfd5b505f603452505050565b6001600160a01b038181165f90815260018401602052604081205490911680151580614c3b5750614c3b8484614ecb565b91509250929050565b5f82614c505750505050565b5f5f365f614c5f888887612ef6565b9350935093509350614c74848484848a614ed6565b50505050838390508160010191508103614c505750505050565b604080516060815290819052610eb683836001600160a01b0316613587565b604080516060815290819052610eb68383613587565b614d50565b805181602083015b8281511015614cfc57805160209290920180518252918252614cfc868301878301805182519091529052565b602001848110614cd057508251815184528152614d23858201868501805182519091529052565b808360400111614d3857614d38858285614cc8565b838160600111613adf57613adf858560208401614cc8565b805180835114614d6c57634e487b715f5260326020526024601cfd5b600281106139b157828203602084018260051b8101614d8c838284614cc8565b82820151604087015b8051845114614db15781858501525f9150602084019350805184525b8085015191820191821015614dd257634e487b715f5260116020526024601cfd5b602081019050828103614d9557509282019290925284900360051c93849052505052565b905160059190911b016020015190565b5f816014526370a0823160601b5f5260208060246010865afa601f3d111660205102905092915050565b816014528060345263095ea7b360601b5f5260205f604460105f875af18060015f511416614c0057803d853b151710614c0057633e3f8f735f526004601cfd5b60405163cc53287f8152602080820152600160408201528260601b60601c60608201528160601b60601c60808201525f3860a0601c84015f6e22d473030f116ddee9f6b43ac78ba35af16139b1576396b3de235f526004601cfd5b5f610eb68383612bb7565b614ee281868585612329565b614f07578085848460405163f78c1b5360e01b8152600401613abd9493929190615af8565b613adf8585858585604051828482375f388483888a5af16121d6573d5f823e3d81fd5b5f5f83601f840112614f3a575f5ffd5b5081356001600160401b03811115614f50575f5ffd5b60208301915083602082850101111561458a575f5ffd5b5f5f5f60408486031215614f79575f5ffd5b8335925060208401356001600160401b03811115614f95575f5ffd5b614fa186828701614f2a565b9497909650939450505050565b5f60208284031215614fbe575f5ffd5b5035919050565b634e487b7160e01b5f52602160045260245ffd5b5f81518084528060208401602086015e5f602082860101526020601f19601f83011685010191505092915050565b64ffffffffff81511682525f60208201516004811061502857615028614fc5565b806020850152506040820151151560408401526060820151608060608501526125f56080850182614fd9565b602081525f610eb66020830184615007565b6001600160a01b03811681146119a8575f5ffd5b80151581146119a8575f5ffd5b8035610f7f8161507a565b5f5f5f5f608085870312156150a5575f5ffd5b8435935060208501356150b781615066565b925060408501356001600160e01b0319811681146150d3575f5ffd5b915060608501356150e38161507a565b939692955090935050565b803560078110610f7f575f5ffd5b5f5f5f6060848603121561510e575f5ffd5b83359250602084013561512081615066565b915061512e604085016150ee565b90509250925092565b5f8151808452602084019350602083015f5b82811015615167578151865260209586019590910190600101615149565b5093949350505050565b5f604082016040835280855180835260608501915060608160051b8601019250602087015f5b828110156151c857605f198786030184526151b3858351615007565b94506020938401939190910190600101615197565b505050508281036020840152612b7f8185615137565b5f602082840312156151ee575f5ffd5b81356001600160c01b0381168114610eb6575f5ffd5b5f5f5f60608486031215615216575f5ffd5b83359250602084013561522881615066565b9150604084013561523881615066565b809150509250925092565b5f5f5f5f60808587031215615256575f5ffd5b84359350602085013561526881615066565b9250615276604086016150ee565b9396929550929360600135925050565b5f5f83601f840112615296575f5ffd5b5081356001600160401b038111156152ac575f5ffd5b6020830191508360208260051b850101111561458a575f5ffd5b5f5f5f604084860312156152d8575f5ffd5b83356001600160401b038111156152ed575f5ffd5b6152f986828701615286565b909790965060209590950135949350505050565b5f5f5f6060848603121561531f575f5ffd5b83359250602084013561533181615066565b915060408401356152388161507a565b60ff60f81b8816815260e060208201525f61535f60e0830189614fd9565b82810360408401526153718189614fd9565b606084018890526001600160a01b038716608085015260a0840186905283810360c0850152845180825260208087019350909101905f5b818110156153c65783518352602093840193909201916001016153a8565b50909b9a5050505050505050505050565b602080825282518282018190525f918401906040840190835b8181101561542657835180516001600160a01b0390811685526020918201511681850152909301926040909201916001016153f0565b509095945050505050565b5f60208284031215615441575f5ffd5b8135610eb681615066565b634e487b7160e01b5f52604160045260245ffd5b604051608081016001600160401b03811182821017156154825761548261544c565b60405290565b5f82601f830112615497575f5ffd5b81356001600160401b038111156154b0576154b061544c565b604051601f8201601f19908116603f011681016001600160401b03811182821017156154de576154de61544c565b6040528181528382016020018510156154f5575f5ffd5b816020850160208301375f918101602001919091529392505050565b5f60208284031215615521575f5ffd5b81356001600160401b03811115615536575f5ffd5b820160808185031215615547575f5ffd5b61554f615460565b813564ffffffffff81168114615563575f5ffd5b8152602082013560048110615576575f5ffd5b602082015261558760408301615087565b604082015260608201356001600160401b038111156155a4575f5ffd5b6155b086828501615488565b606083015250949350505050565b602080825282518282018190525f918401906040840190835b818110156154265783516001600160a01b03168352602093840193909201916001016155d7565b5f5f6020838503121561560f575f5ffd5b82356001600160401b03811115615624575f5ffd5b61563085828601615286565b90969095509350505050565b6007811061564c5761564c614fc5565b9052565b5f8151808452602084019350602083015f5b8281101561516757815180516001600160a01b031687526020808201515f9161568d908a018261563c565b505060408181015190880152606080820151908801526080808201519088015260a0808201519088015260c0908101519087015260e09095019460209190910190600101615662565b5f604082016040835280855180835260608501915060608160051b8601019250602087015f5b8281101561572d57605f19878603018452615718858351615650565b945060209384019391909101906001016156fc565b50505050828103602084015280845180835260208301915060208160051b840101602087015f5b8381101561578657601f19868403018552615770838351615137565b6020958601959093509190910190600101615754565b509098975050505050505050565b5f5f602083850312156157a5575f5ffd5b82356001600160401b038111156157ba575f5ffd5b61563085828601614f2a565b602081525f610eb66020830184614fd9565b602081525f610eb66020830184615650565b602081525f610eb66020830184615137565b5f5f5f5f5f60808688031215615810575f5ffd5b85359450602086013593506040860135925060608601356001600160401b0381111561583a575f5ffd5b61584688828901614f2a565b969995985093965092949392505050565b5f5f60408385031215615868575f5ffd5b82359150615878602084016150ee565b90509250929050565b5f5f5f5f60608587031215615894575f5ffd5b8435935060208501356158a681615066565b925060408501356001600160401b038111156158c0575f5ffd5b6158cc87828801614f2a565b95989497509550505050565b5f602082840312156158e8575f5ffd5b8151610eb681615066565b805160208201516bffffffffffffffffffffffff198116919060148210156117ec576bffffffffffffffffffffffff1960149290920360031b82901b161692915050565b634e487b7160e01b5f52601160045260245ffd5b8181038181111561126f5761126f615937565b8381526001600160a01b0383166020820152606081016125f5604083018461563c565b634e487b7160e01b5f52603260045260245ffd5b5f600182016159a6576159a6615937565b5060010190565b8481526001600160a01b0384166020820152608081016159d0604083018561563c565b82606083015295945050505050565b5f602082840312156159ef575f5ffd5b8151610eb68161507a565b81835281816020850137505f828201602090810191909152601f909101601f19169091010190565b602081525f6125f56020830184866159fa565b5f5f8335601e19843603018112615a4a575f5ffd5b8301803591506001600160401b03821115615a63575f5ffd5b60200191503681900382131561458a575f5ffd5b5f85518060208801845e60d886901b6001600160d81b03191690830190815260048510615aa657615aa6614fc5565b60f894851b600582015292151590931b6006830152506007019392505050565b8082018082111561126f5761126f615937565b5f82615af357634e487b7160e01b5f52601260045260245ffd5b500490565b8481526001600160a01b03841660208201526060604082018190525f90612e2190830184866159fa56fe3232323232323232323232323232323232323232323232323232323232323232def24cb3236edf62937b12ea8dc676927599974e90729c6e9eafa9f05b03eab8" as const;

