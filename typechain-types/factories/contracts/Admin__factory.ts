/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { Admin, AdminInterface } from "../../contracts/Admin";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_logic",
        type: "address",
      },
      {
        internalType: "address",
        name: "_admin",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "proxy_deployed",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_symbol",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_holdTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_personLimit",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_price",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_meta",
        type: "string",
      },
      {
        internalType: "address payable",
        name: "_receiver",
        type: "address",
      },
    ],
    name: "deployProxy",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "meetings",
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "string",
                name: "name",
                type: "string",
              },
              {
                internalType: "string",
                name: "symbol",
                type: "string",
              },
              {
                internalType: "uint256",
                name: "holdTime",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "personLimit",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "price",
                type: "uint256",
              },
              {
                internalType: "string",
                name: "metaURL",
                type: "string",
              },
              {
                internalType: "enum EventInfo.EventState",
                name: "state",
                type: "uint8",
              },
              {
                internalType: "address",
                name: "contractAddress",
                type: "address",
              },
            ],
            internalType: "struct EventInfo.BasicInfo",
            name: "basic",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
              },
              {
                internalType: "bool",
                name: "canInvite",
                type: "bool",
              },
              {
                internalType: "bool",
                name: "isSigned",
                type: "bool",
              },
              {
                internalType: "bool",
                name: "isSigner",
                type: "bool",
              },
            ],
            internalType: "struct EventInfo.UserInfo",
            name: "user",
            type: "tuple",
          },
        ],
        internalType: "struct EventInfo.AllInfo[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_newLogin",
        type: "address",
      },
    ],
    name: "updateLogic",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b50604051620035de380380620035de833981810160405281019062000037919062000217565b620000576200004b620000e160201b60201c565b620000e960201b60201c565b81600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050506200025e565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620001df82620001b2565b9050919050565b620001f181620001d2565b8114620001fd57600080fd5b50565b6000815190506200021181620001e6565b92915050565b60008060408385031215620002315762000230620001ad565b5b6000620002418582860162000200565b9250506020620002548582860162000200565b9150509250929050565b613370806200026e6000396000f3fe6080604052600436106200005c5760003560e01c8063715018a61462000061578063795e617e146200007b57806389c2f4b614620000a95780638da5cb5b14620000c9578063a0ce083f14620000f9578063f2fde38b1462000129575b600080fd5b3480156200006e57600080fd5b506200007962000157565b005b3480156200008857600080fd5b50620000a76004803603810190620000a1919062000b6d565b6200016f565b005b620000c76004803603810190620000c1919062000d81565b620001bd565b005b348015620000d657600080fd5b50620000e1620003a0565b604051620000f0919062000ea2565b60405180910390f35b3480156200010657600080fd5b5062000111620003c9565b60405162000120919062001243565b60405180910390f35b3480156200013657600080fd5b506200015560048036038101906200014f919062000b6d565b6200066e565b005b62000161620006f8565b6200016d60006200077d565b565b62000179620006f8565b80600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b6000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16604051620002139062000a1e565b62000220929190620012a2565b604051809103906000f0801580156200023d573d6000803e3d6000fd5b5090508073ffffffffffffffffffffffffffffffffffffffff166385e5c864898989898989896040518863ffffffff1660e01b815260040162000287979695949392919062001358565b600060405180830381600087803b158015620002a257600080fd5b505af1158015620002b7573d6000803e3d6000fd5b50505050600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507f3de3d7e22c6f1883ee1374a9ed0a6698e9daffbd17cfa610efaa32894952d48981336040516200038e929190620013ea565b60405180910390a15050505050505050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60606000600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208054806020026020016040519081016040528092919081815260200182805480156200048e57602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001906001019080831162000443575b505050505090506000805b8251811015620004f857620004cb838281518110620004bd57620004bc62001417565b5b602002602001015162000841565b15620004e2578180620004de9062001475565b9250505b8080620004ef9062001475565b91505062000499565b5060008167ffffffffffffffff81111562000518576200051762000bba565b5b6040519080825280602002602001820160405280156200055557816020015b6200054162000a2c565b815260200190600190039081620005375790505b5090506000805b845181101562000663576200058e85828151811062000580576200057f62001417565b5b602002602001015162000841565b156200064d576000620005be868381518110620005b057620005af62001417565b5b6020026020010151620008dc565b9050858281518110620005d657620005d562001417565b5b6020026020010151816000015160e0019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff16815250508084848151811062000630576200062f62001417565b5b60200260200101819052508280620006489062001475565b935050505b80806200065a9062001475565b9150506200055c565b508194505050505090565b62000678620006f8565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603620006ea576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620006e19062001538565b60405180910390fd5b620006f5816200077d565b50565b6200070262000a16565b73ffffffffffffffffffffffffffffffffffffffff1662000722620003a0565b73ffffffffffffffffffffffffffffffffffffffff16146200077b576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016200077290620015aa565b60405180910390fd5b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b60008060008373ffffffffffffffffffffffffffffffffffffffff166040516200086b9062001627565b600060405180830381855afa9150503d8060008114620008a8576040519150601f19603f3d011682016040523d82523d6000602084013e620008ad565b606091505b509150915081620008bd57600080fd5b80806020019051810190620008d391906200166f565b92505050919050565b620008e662000a2c565b600033604051602401620008fb919062000ea2565b6040516020818303038152906040527f170956ad000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff838183161783525050505090506000808473ffffffffffffffffffffffffffffffffffffffff1683604051620009a49190620016e3565b600060405180830381855afa9150503d8060008114620009e1576040519150601f19603f3d011682016040523d82523d6000602084013e620009e6565b606091505b509150915081620009f657600080fd5b8080602001905181019062000a0c919062001a13565b9350505050919050565b600033905090565b6118d68062001a6583390190565b604051806040016040528062000a4162000a56565b815260200162000a5062000ac6565b81525090565b6040518061010001604052806060815260200160608152602001600081526020016000815260200160008152602001606081526020016000600181111562000aa35762000aa262000f85565b5b8152602001600073ffffffffffffffffffffffffffffffffffffffff1681525090565b6040518060800160405280600081526020016000151581526020016000151581526020016000151581525090565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600062000b358262000b08565b9050919050565b62000b478162000b28565b811462000b5357600080fd5b50565b60008135905062000b678162000b3c565b92915050565b60006020828403121562000b865762000b8562000afe565b5b600062000b968482850162000b56565b91505092915050565b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b62000bf48262000ba9565b810181811067ffffffffffffffff8211171562000c165762000c1562000bba565b5b80604052505050565b600062000c2b62000af4565b905062000c39828262000be9565b919050565b600067ffffffffffffffff82111562000c5c5762000c5b62000bba565b5b62000c678262000ba9565b9050602081019050919050565b82818337600083830152505050565b600062000c9a62000c948462000c3e565b62000c1f565b90508281526020810184848401111562000cb95762000cb862000ba4565b5b62000cc684828562000c74565b509392505050565b600082601f83011262000ce65762000ce562000b9f565b5b813562000cf884826020860162000c83565b91505092915050565b6000819050919050565b62000d168162000d01565b811462000d2257600080fd5b50565b60008135905062000d368162000d0b565b92915050565b600062000d498262000b08565b9050919050565b62000d5b8162000d3c565b811462000d6757600080fd5b50565b60008135905062000d7b8162000d50565b92915050565b600080600080600080600060e0888a03121562000da35762000da262000afe565b5b600088013567ffffffffffffffff81111562000dc45762000dc362000b03565b5b62000dd28a828b0162000cce565b975050602088013567ffffffffffffffff81111562000df65762000df562000b03565b5b62000e048a828b0162000cce565b965050604062000e178a828b0162000d25565b955050606062000e2a8a828b0162000d25565b945050608062000e3d8a828b0162000d25565b93505060a088013567ffffffffffffffff81111562000e615762000e6062000b03565b5b62000e6f8a828b0162000cce565b92505060c062000e828a828b0162000d6a565b91505092959891949750929550565b62000e9c8162000b28565b82525050565b600060208201905062000eb9600083018462000e91565b92915050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b600081519050919050565b600082825260208201905092915050565b60005b8381101562000f2757808201518184015260208101905062000f0a565b60008484015250505050565b600062000f408262000eeb565b62000f4c818562000ef6565b935062000f5e81856020860162000f07565b62000f698162000ba9565b840191505092915050565b62000f7f8162000d01565b82525050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b6002811062000fc85762000fc762000f85565b5b50565b600081905062000fdb8262000fb4565b919050565b600062000fed8262000fcb565b9050919050565b62000fff8162000fe0565b82525050565b620010108162000b28565b82525050565b600061010083016000830151848203600086015262001036828262000f33565b9150506020830151848203602086015262001052828262000f33565b915050604083015162001069604086018262000f74565b5060608301516200107e606086018262000f74565b50608083015162001093608086018262000f74565b5060a083015184820360a0860152620010ad828262000f33565b91505060c0830151620010c460c086018262000ff4565b5060e0830151620010d960e086018262001005565b508091505092915050565b60008115159050919050565b620010fb81620010e4565b82525050565b60808201600082015162001119600085018262000f74565b5060208201516200112e6020850182620010f0565b506040820151620011436040850182620010f0565b506060820151620011586060850182620010f0565b50505050565b600060a08301600083015184820360008601526200117d828262001016565b915050602083015162001194602086018262001101565b508091505092915050565b6000620011ad83836200115e565b905092915050565b6000602082019050919050565b6000620011cf8262000ebf565b620011db818562000eca565b935083602082028501620011ef8562000edb565b8060005b858110156200123157848403895281516200120f85826200119f565b94506200121c83620011b5565b925060208a01995050600181019050620011f3565b50829750879550505050505092915050565b600060208201905081810360008301526200125f8184620011c2565b905092915050565b600082825260208201905092915050565b50565b60006200128a60008362001267565b9150620012978262001278565b600082019050919050565b6000606082019050620012b9600083018562000e91565b620012c8602083018462000e91565b8181036040830152620012db816200127b565b90509392505050565b600082825260208201905092915050565b6000620013028262000eeb565b6200130e8185620012e4565b93506200132081856020860162000f07565b6200132b8162000ba9565b840191505092915050565b620013418162000d01565b82525050565b620013528162000d3c565b82525050565b600060e082019050818103600083015262001374818a620012f5565b905081810360208301526200138a8189620012f5565b90506200139b604083018862001336565b620013aa606083018762001336565b620013b9608083018662001336565b81810360a0830152620013cd8185620012f5565b9050620013de60c083018462001347565b98975050505050505050565b600060408201905062001401600083018562000e91565b62001410602083018462000e91565b9392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000620014828262000d01565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203620014b757620014b662001446565b5b600182019050919050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b600062001520602683620012e4565b91506200152d82620014c2565b604082019050919050565b60006020820190508181036000830152620015538162001511565b9050919050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b600062001592602083620012e4565b91506200159f826200155a565b602082019050919050565b60006020820190508181036000830152620015c58162001583565b9050919050565b600081905092915050565b7f0c362f7200000000000000000000000000000000000000000000000000000000600082015250565b60006200160f600483620015cc565b91506200161c82620015d7565b600482019050919050565b6000620016348262001600565b9150819050919050565b6200164981620010e4565b81146200165557600080fd5b50565b60008151905062001669816200163e565b92915050565b60006020828403121562001688576200168762000afe565b5b6000620016988482850162001658565b91505092915050565b600081519050919050565b6000620016b982620016a1565b620016c58185620015cc565b9350620016d781856020860162000f07565b80840191505092915050565b6000620016f18284620016ac565b915081905092915050565b600080fd5b600080fd5b60006200171d620017178462000c3e565b62000c1f565b9050828152602081018484840111156200173c576200173b62000ba4565b5b6200174984828562000f07565b509392505050565b600082601f83011262001769576200176862000b9f565b5b81516200177b84826020860162001706565b91505092915050565b600081519050620017958162000d0b565b92915050565b60028110620017a957600080fd5b50565b600081519050620017bd816200179b565b92915050565b600081519050620017d48162000b3c565b92915050565b60006101008284031215620017f457620017f3620016fc565b5b6200180161010062000c1f565b9050600082015167ffffffffffffffff81111562001824576200182362001701565b5b620018328482850162001751565b600083015250602082015167ffffffffffffffff81111562001859576200185862001701565b5b620018678482850162001751565b60208301525060406200187d8482850162001784565b6040830152506060620018938482850162001784565b6060830152506080620018a98482850162001784565b60808301525060a082015167ffffffffffffffff811115620018d057620018cf62001701565b5b620018de8482850162001751565b60a08301525060c0620018f484828501620017ac565b60c08301525060e06200190a84828501620017c3565b60e08301525092915050565b6000608082840312156200192f576200192e620016fc565b5b6200193b608062000c1f565b905060006200194d8482850162001784565b6000830152506020620019638482850162001658565b6020830152506040620019798482850162001658565b60408301525060606200198f8482850162001658565b60608301525092915050565b600060a08284031215620019b457620019b3620016fc565b5b620019c0604062000c1f565b9050600082015167ffffffffffffffff811115620019e357620019e262001701565b5b620019f184828501620017da565b600083015250602062001a078482850162001916565b60208301525092915050565b60006020828403121562001a2c5762001a2b62000afe565b5b600082015167ffffffffffffffff81111562001a4d5762001a4c62000b03565b5b62001a5b848285016200199b565b9150509291505056fe6080604052604051620018d6380380620018d6833981810160405281019062000029919062000748565b82816200003f828260006200005b60201b60201c565b505062000052826200009e60201b60201c565b50505062000a8a565b6200006c83620000fc60201b60201c565b6000825111806200007a5750805b1562000099576200009783836200015360201b6200034a1760201c565b505b505050565b7f7e644d79422f17c01e4894b5f4f588d331ebfa28653d42ae832dc59e38c9798f620000cf6200018960201b60201c565b82604051620000e0929190620007d4565b60405180910390a1620000f981620001ed60201b60201c565b50565b6200010d81620002dd60201b60201c565b8073ffffffffffffffffffffffffffffffffffffffff167fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b60405160405180910390a250565b6060620001818383604051806060016040528060278152602001620018af60279139620003b360201b60201c565b905092915050565b6000620001c47fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d610360001b6200044560201b620003771760201c565b60000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036200025f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620002569062000888565b60405180910390fd5b80620002997fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d610360001b6200044560201b620003771760201c565b60000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b620002f3816200044f60201b620003811760201c565b62000335576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016200032c9062000920565b60405180910390fd5b806200036f7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b6200044560201b620003771760201c565b60000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b60606000808573ffffffffffffffffffffffffffffffffffffffff1685604051620003df91906200098f565b600060405180830381855af49150503d80600081146200041c576040519150601f19603f3d011682016040523d82523d6000602084013e62000421565b606091505b50915091506200043a868383876200047260201b60201c565b925050509392505050565b6000819050919050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b60608315620004e2576000835103620004d95762000496856200044f60201b60201c565b620004d8576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620004cf90620009f8565b60405180910390fd5b5b829050620004f5565b620004f48383620004fd60201b60201c565b5b949350505050565b600082511115620005115781518083602001fd5b806040517f08c379a000000000000000000000000000000000000000000000000000000000815260040162000547919062000a66565b60405180910390fd5b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620005918262000564565b9050919050565b620005a38162000584565b8114620005af57600080fd5b50565b600081519050620005c38162000598565b92915050565b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6200061e82620005d3565b810181811067ffffffffffffffff8211171562000640576200063f620005e4565b5b80604052505050565b60006200065562000550565b905062000663828262000613565b919050565b600067ffffffffffffffff821115620006865762000685620005e4565b5b6200069182620005d3565b9050602081019050919050565b60005b83811015620006be578082015181840152602081019050620006a1565b60008484015250505050565b6000620006e1620006db8462000668565b62000649565b9050828152602081018484840111156200070057620006ff620005ce565b5b6200070d8482856200069e565b509392505050565b600082601f8301126200072d576200072c620005c9565b5b81516200073f848260208601620006ca565b91505092915050565b6000806000606084860312156200076457620007636200055a565b5b60006200077486828701620005b2565b93505060206200078786828701620005b2565b925050604084015167ffffffffffffffff811115620007ab57620007aa6200055f565b5b620007b98682870162000715565b9150509250925092565b620007ce8162000584565b82525050565b6000604082019050620007eb6000830185620007c3565b620007fa6020830184620007c3565b9392505050565b600082825260208201905092915050565b7f455243313936373a206e65772061646d696e20697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b60006200087060268362000801565b91506200087d8262000812565b604082019050919050565b60006020820190508181036000830152620008a38162000861565b9050919050565b7f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60008201527f6f74206120636f6e747261637400000000000000000000000000000000000000602082015250565b600062000908602d8362000801565b91506200091582620008aa565b604082019050919050565b600060208201905081810360008301526200093b81620008f9565b9050919050565b600081519050919050565b600081905092915050565b6000620009658262000942565b6200097181856200094d565b9350620009838185602086016200069e565b80840191505092915050565b60006200099d828462000958565b915081905092915050565b7f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000600082015250565b6000620009e0601d8362000801565b9150620009ed82620009a8565b602082019050919050565b6000602082019050818103600083015262000a1381620009d1565b9050919050565b600081519050919050565b600062000a328262000a1a565b62000a3e818562000801565b935062000a508185602086016200069e565b62000a5b81620005d3565b840191505092915050565b6000602082019050818103600083015262000a82818462000a25565b905092915050565b610e158062000a9a6000396000f3fe60806040526004361061004e5760003560e01c80633659cfe6146100675780634f1ef286146100905780635c60da1b146100ac5780638f283970146100d7578063f851a440146101005761005d565b3661005d5761005b61012b565b005b61006561012b565b005b34801561007357600080fd5b5061008e6004803603810190610089919061091b565b610145565b005b6100aa60048036038101906100a591906109ad565b6101ab565b005b3480156100b857600080fd5b506100c1610248565b6040516100ce9190610a1c565b60405180910390f35b3480156100e357600080fd5b506100fe60048036038101906100f9919061091b565b61029f565b005b34801561010c57600080fd5b506101156102f3565b6040516101229190610a1c565b60405180910390f35b6101336103a4565b61014361013e610423565b610432565b565b61014d610458565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff160361019f5761019a816040518060200160405280600081525060006104af565b6101a8565b6101a761012b565b5b50565b6101b3610458565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff160361023a576102358383838080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505060016104af565b610243565b61024261012b565b5b505050565b6000610252610458565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16036102935761028c610423565b905061029c565b61029b61012b565b5b90565b6102a7610458565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16036102e7576102e2816104db565b6102f0565b6102ef61012b565b5b50565b60006102fd610458565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff160361033e57610337610458565b9050610347565b61034661012b565b5b90565b606061036f8383604051806060016040528060278152602001610db960279139610527565b905092915050565b6000819050919050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b6103ac610458565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1603610419576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161041090610ae0565b60405180910390fd5b6104216105ad565b565b600061042d6105af565b905090565b3660008037600080366000845af43d6000803e8060008114610453573d6000f35b3d6000fd5b60006104867fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d610360001b610377565b60000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6104b883610606565b6000825111806104c55750805b156104d6576104d4838361034a565b505b505050565b7f7e644d79422f17c01e4894b5f4f588d331ebfa28653d42ae832dc59e38c9798f610504610458565b82604051610513929190610b00565b60405180910390a161052481610655565b50565b60606000808573ffffffffffffffffffffffffffffffffffffffff16856040516105519190610b9a565b600060405180830381855af49150503d806000811461058c576040519150601f19603f3d011682016040523d82523d6000602084013e610591565b606091505b50915091506105a286838387610735565b925050509392505050565b565b60006105dd7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b610377565b60000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b61060f816107aa565b8073ffffffffffffffffffffffffffffffffffffffff167fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b60405160405180910390a250565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036106c4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106bb90610c23565b60405180910390fd5b806106f17fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d610360001b610377565b60000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b6060831561079757600083510361078f5761074f85610381565b61078e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161078590610c8f565b60405180910390fd5b5b8290506107a2565b6107a18383610863565b5b949350505050565b6107b381610381565b6107f2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107e990610d21565b60405180910390fd5b8061081f7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b610377565b60000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b6000825111156108765781518083602001fd5b806040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108aa9190610d96565b60405180910390fd5b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006108e8826108bd565b9050919050565b6108f8816108dd565b811461090357600080fd5b50565b600081359050610915816108ef565b92915050565b600060208284031215610931576109306108b3565b5b600061093f84828501610906565b91505092915050565b600080fd5b600080fd5b600080fd5b60008083601f84011261096d5761096c610948565b5b8235905067ffffffffffffffff81111561098a5761098961094d565b5b6020830191508360018202830111156109a6576109a5610952565b5b9250929050565b6000806000604084860312156109c6576109c56108b3565b5b60006109d486828701610906565b935050602084013567ffffffffffffffff8111156109f5576109f46108b8565b5b610a0186828701610957565b92509250509250925092565b610a16816108dd565b82525050565b6000602082019050610a316000830184610a0d565b92915050565b600082825260208201905092915050565b7f5472616e73706172656e745570677261646561626c6550726f78793a2061646d60008201527f696e2063616e6e6f742066616c6c6261636b20746f2070726f7879207461726760208201527f6574000000000000000000000000000000000000000000000000000000000000604082015250565b6000610aca604283610a37565b9150610ad582610a48565b606082019050919050565b60006020820190508181036000830152610af981610abd565b9050919050565b6000604082019050610b156000830185610a0d565b610b226020830184610a0d565b9392505050565b600081519050919050565b600081905092915050565b60005b83811015610b5d578082015181840152602081019050610b42565b60008484015250505050565b6000610b7482610b29565b610b7e8185610b34565b9350610b8e818560208601610b3f565b80840191505092915050565b6000610ba68284610b69565b915081905092915050565b7f455243313936373a206e65772061646d696e20697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b6000610c0d602683610a37565b9150610c1882610bb1565b604082019050919050565b60006020820190508181036000830152610c3c81610c00565b9050919050565b7f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000600082015250565b6000610c79601d83610a37565b9150610c8482610c43565b602082019050919050565b60006020820190508181036000830152610ca881610c6c565b9050919050565b7f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60008201527f6f74206120636f6e747261637400000000000000000000000000000000000000602082015250565b6000610d0b602d83610a37565b9150610d1682610caf565b604082019050919050565b60006020820190508181036000830152610d3a81610cfe565b9050919050565b600081519050919050565b6000601f19601f8301169050919050565b6000610d6882610d41565b610d728185610a37565b9350610d82818560208601610b3f565b610d8b81610d4c565b840191505092915050565b60006020820190508181036000830152610db08184610d5d565b90509291505056fe416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a26469706673582212200fc6747a2c2065c68ded1d05b604c9ea21a74a61bdb9658660e830de32c5346e64736f6c63430008110033416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a26469706673582212201f329351450183329281b6d0b9f11451e6e90e2a2b13ecc9ea31f7c9b0c2b82f64736f6c63430008110033";

type AdminConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: AdminConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Admin__factory extends ContractFactory {
  constructor(...args: AdminConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _logic: PromiseOrValue<string>,
    _admin: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Admin> {
    return super.deploy(_logic, _admin, overrides || {}) as Promise<Admin>;
  }
  override getDeployTransaction(
    _logic: PromiseOrValue<string>,
    _admin: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_logic, _admin, overrides || {});
  }
  override attach(address: string): Admin {
    return super.attach(address) as Admin;
  }
  override connect(signer: Signer): Admin__factory {
    return super.connect(signer) as Admin__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): AdminInterface {
    return new utils.Interface(_abi) as AdminInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Admin {
    return new Contract(address, _abi, signerOrProvider) as Admin;
  }
}
