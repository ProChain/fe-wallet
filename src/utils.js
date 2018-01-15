import Web3 from 'web3';
import QRCode from 'qrcode-generator';
import {
    ABI,
    PROVIDER,
    CONTRACT_ADDRESS,
    GAS_LIMIT,
    UNIT,
    ETH_QR_PROTOCAL,
    ERC20_TOKEN_QR_PROTOCAL,
    CONTRACT_QR_PROTOCAL
} from '@/config';

const web3 = new Web3(PROVIDER);
const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);

export function createAccount () {
    return web3.eth.accounts.create();
}

export function importAccount (keystore, password) {
    return web3.eth.accounts.decrypt(keystore, password);
}

export function exportAccount (account, password) {
    return web3.eth.accounts.encrypt(account.privateKey, password);
}

export function getProTokenBalance (from, cb) {
    contract.methods.balanceOf(from).call()
    .then(balance => cb(web3.utils.fromWei(balance) - 0))
    .catch(error => {
        throw error;
    });
}

export function getETHBalance (from, cb) {
    web3.eth.getBalance(from)
    .then(balance => cb(web3.utils.fromWei(balance) - 0))
    .catch(error => {
        throw error;
    });
}

export function fromWei (value, unit) {
    return web3.utils.fromWei(value, unit ? unit : UNIT.ETHER);
}

export function toWei (value, unit) {
    return web3.utils.toWei(value, unit ? unit : UNIT.ETHER);
}



export function getSendProTokenGas (from, value, success, fail) {
    contract.methods.transfer(from, value).estimateGas()
    .then(gasAmount => {
        success(gasAmount);
    }).catch(error => {
        fail(error);
    });
}

export function getSendETHGas (from, value, success, fail) {
    web3.eth.estimateGas({
        from, value
    })
    .then(gasAmount => success(gasAmount))
    .catch(error => fail(error));
}

export function getGasPrice (success, fail) {
    web3.eth.getGasPrice()
    .then(gasPrice => success(gasPrice - 0))
    .catch(error => fail(error));
}

export function sendProToken (account, transaction, success, fail) {
    account.signTransaction({
        to: CONTRACT_ADDRESS,
        value: 0,
        gasPrice: transaction.gasPrice,
        gas: transaction.gasLimit,
        data: contract.methods.transfer(transaction.to, toWei(transaction.value + '')).encodeABI()
    }).then(encodedTransaction => web3.eth.sendSignedTransaction(encodedTransaction.rawTransaction))
    .then(receipt => success(receipt))
    .catch(error => fail(error));
}

export function sendETH (account, transaction, success, fail) {
    account.signTransaction({
        to: transaction.to,
        value: toWei(transaction.value + ''),
        gasPrice: transaction.gasPrice,
        gas: transaction.gasLimit
    }).then(encodedTransaction => web3.eth.sendSignedTransaction(encodedTransaction.rawTransaction))
    .then(receipt => success(receipt))
    .catch(error => fail(error));
};

export function download (filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);
    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    } else {
        pom.click();
    }
};

export function createQRCode (id, content, cellSize, margin) {
    cellSize = cellSize ? cellSize : 4;
    margin = margin ? margin : 10;
    let qr = QRCode(4, 'L');
    qr.addData(content);
    qr.make();
    document.getElementById(id).innerHTML = qr.createImgTag(cellSize, margin);;
}

//创建ETH交易二维码协议字符串
export function createETHQRString (transaction) {
    let {from, to, amount, gas} = transaction;
    return eval(`\`${ETH_QR_PROTOCAL}\``);
}

//创建智能合约交易二维码协议字符串
export function createContractQRString (transaction) {
    let {from, to, amount, gas} = transaction;
    return eval(`\`${CONTRACT_QR_PROTOCAL}\``);
}

//创建ERC20 Token交易二维码协议字符串
export function createERC20TokenQRString (transaction) {
    let {from, to, amount, gas} = transaction;
    return eval(`\`${ERC20_TOKEN_QR_PROTOCAL}\``);
}

// export function deleteWord (words, cb) {
//     return Vue.http.delete(WORD_LIST_URL, {body: words}).then(response => {
//         if (response.body.status == OK) {
//             cb(response.body);
//         }
//     }, response => {
//     });
// };