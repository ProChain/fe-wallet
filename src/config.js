// export const PROVIDER = 'https://ropsten.infura.io/LFnqZg0NFRuiYRGUxeyn';
export const PROVIDER = 'https://ropsten.infura.io/LFnqZg0NFRuiYRGUxeyn';

export const CONTRACT_ADDRESS = '0x31429682F4F84a424812b24DDD7296171F1Ff938';

export const GAS_LIMIT = 4000000;

export const KEYSTORE_KEY = 'keystore';

//二维码协议格式
// export const ETH_QR_PROTOCAL = 'ethereum:${to}?amount=${amount}';
export const ETH_QR_PROTOCAL = 'ethereum:0x31429682F4F84a424812b24DDD7296171F1Ff938?tokenSymbol=PRO&amount=123';
export const ERC20_TOKEN_QR_PROTOCAL = 'ethereum:${to}?tokenSymbol=PRO&value=123';
export const CONTRACT_QR_PROTOCAL = 'ethereum:${to}?from=${from}&amount=${amount}&gas=${gas}';

//
// export const ETHERSCAN_HOST = 'https://etherscan.io';
export const ETHERSCAN_HOST = 'https://ropsten.etherscan.io';

export const ETHERSCAN_ACCOUNT_ADDRESS_URL = `${ETHERSCAN_HOST}/address`;
export const ETHERSCAN_TRANSACTION_ADDRESS_URL = `${ETHERSCAN_HOST}/tx`;

//
export const ETH_LOGIN_VIEW = 'Login';
export const ETH_BACKUP_VIEW = 'Backup';
export const ETH_ACCOUNT_VIEW = 'Account';
export const ETH_DEPOSIT_VIEW = 'Deposit';
export const ETH_SEND_VIEW = 'Send';
export const ETH_DETAIL_VIEW = 'Detail';
export const ETH_SUCCESS_VIEW = 'Success';

//
export const STORE_CREATE_ACCOUNT = 'createAccount';
export const STORE_IMPORT_ACCOUNT = 'importAccount';
export const STORE_DESTORY_ACCOUNT = 'destoryAccount';
export const STORE_GET_ACCOUNT = 'getAccount';
export const STORE_GET_ETHSCAN_URL = 'getEthScanURL';
export const STORE_CHANGE_VIEW = 'changeView';
export const STORE_GET_VIEW = 'getView';
export const STORE_CHANGE_TRANSACTION = 'changeTransaction';
export const STORE_INIT_TRANSACTION = 'initTransaction';
export const STORE_GET_TRANSACTION = 'getTransaction';
export const STORE_GET_TRANSACTION_FEE = 'getTransactionFee';

//
export const ETH_ALERDY_LOGIN_TITLE = 'Login with ETH account';
export const ETH_LOGIN_TITLE = 'Import JSON to Login with ETH account';
export const ETH_CREATE_TITLE = 'Create ETH account and Login';

//
export const ETH_CREATE_LINK_TITLE = 'Create ETH account';
export const ETH_LOGIN_LINK_TITLE = 'I already have ETH account';
export const ETH_CHANGE_LINK_TITLE = 'Change account';

//
export const ETH_CREATE_BUTTON_TITLE = 'Create Account';
export const ETH_LOGIN_BUTTON_TITLE = 'Login';
export const ETH_FILE_TITLE = 'Select JSON File';

export const UNIT = {
  WEI: 'wei',
  KWEI: 'kwei',
  MWEI: 'mwei',
  GWEI: 'gwei',
  ETHER: 'ether'
};

export const ABI = [{
  "constant": true,
  "inputs": [],
  "name": "name",
  "outputs": [{
    "name": "",
    "type": "string"
  }],
  "payable": false,
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "_spender",
    "type": "address"
  }, {
    "name": "_value",
    "type": "uint256"
  }],
  "name": "approve",
  "outputs": [{
    "name": "success",
    "type": "bool"
  }],
  "payable": false,
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "totalSupply",
  "outputs": [{
    "name": "",
    "type": "uint256"
  }],
  "payable": false,
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "_from",
    "type": "address"
  }, {
    "name": "_to",
    "type": "address"
  }, {
    "name": "_value",
    "type": "uint256"
  }],
  "name": "transferFrom",
  "outputs": [{
    "name": "success",
    "type": "bool"
  }],
  "payable": false,
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "decimals",
  "outputs": [{
    "name": "",
    "type": "uint8"
  }],
  "payable": false,
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "version",
  "outputs": [{
    "name": "",
    "type": "string"
  }],
  "payable": false,
  "type": "function"
}, {
  "constant": true,
  "inputs": [{
    "name": "_owner",
    "type": "address"
  }],
  "name": "balanceOf",
  "outputs": [{
    "name": "balance",
    "type": "uint256"
  }],
  "payable": false,
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "symbol",
  "outputs": [{
    "name": "",
    "type": "string"
  }],
  "payable": false,
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "_to",
    "type": "address"
  }, {
    "name": "_value",
    "type": "uint256"
  }],
  "name": "transfer",
  "outputs": [{
    "name": "success",
    "type": "bool"
  }],
  "payable": false,
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "_spender",
    "type": "address"
  }, {
    "name": "_value",
    "type": "uint256"
  }, {
    "name": "_extraData",
    "type": "bytes"
  }],
  "name": "approveAndCall",
  "outputs": [{
    "name": "success",
    "type": "bool"
  }],
  "payable": false,
  "type": "function"
}, {
  "constant": true,
  "inputs": [{
    "name": "_owner",
    "type": "address"
  }, {
    "name": "_spender",
    "type": "address"
  }],
  "name": "allowance",
  "outputs": [{
    "name": "remaining",
    "type": "uint256"
  }],
  "payable": false,
  "type": "function"
}, {
  "inputs": [{
    "name": "_initialAmount",
    "type": "uint256"
  }, {
    "name": "_tokenName",
    "type": "string"
  }, {
    "name": "_decimalUnits",
    "type": "uint8"
  }, {
    "name": "_tokenSymbol",
    "type": "string"
  }],
  "payable": false,
  "type": "constructor"
}, {
  "payable": false,
  "type": "fallback"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "name": "_from",
    "type": "address"
  }, {
    "indexed": true,
    "name": "_to",
    "type": "address"
  }, {
    "indexed": false,
    "name": "_value",
    "type": "uint256"
  }],
  "name": "Transfer",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "name": "_owner",
    "type": "address"
  }, {
    "indexed": true,
    "name": "_spender",
    "type": "address"
  }, {
    "indexed": false,
    "name": "_value",
    "type": "uint256"
  }],
  "name": "Approval",
  "type": "event"
}];
