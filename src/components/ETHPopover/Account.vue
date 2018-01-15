<template>
  <div class="account">
    <div class="logout" @click="exit"></div>
    <div class="account-name">My Account</div>
    <div class="cash-info-div">
        <div class="cash-info-top">
            <span class="protoken-value cash-info-title">{{proToken.toFixed(3)}}</span>
            <span class="protoken-unit cash-info-title">PRO</span>
            <div class="account-refresh" @click="query">
                <img src="/static/btn-refresh.png" :class="['account-refresh-image', {'img-refresing': refresh}]">
            </div>
        </div>
        <div class="cash-info-bottom">
            <span class="eth-value cash-info-title">{{eth.toFixed(3)}}</span>
            <span class="eth-value cash-info-title">ETH</span>
        </div>
    </div>
    <div class="cash-action">
        <button class="btn-action" @click="deposit">Deposit</button>
        <button class="btn-action" @click="withdraw">Withdraw</button>
    </div>
    <div class="split-line"></div>
    <div class="address-tips">WALLET ADDRESS</div>
    <div id="qrcode" class="qrcode"></div>

    <div class="address-div">
        <a class="account-address" :href="etherScanURL" target="_blank">
            {{account.address}}
        </a>
    </div>
    <div class="account-btn-group">
        <div class="account-btn" @click="detail">
            <img class="account-btn-image" src="/static/icon_detail.png">
            <span class="account-btn-text">Detail</span>
        </div>
        <div class="account-btn" v-clipboard:copy="account.address" v-clipboard:success="copySuccess">
            <img class="account-btn-image" src="/static/icon_copy.png">
            <span class="account-btn-text">Copy</span>
        </div>
        <div class="account-btn" @click="exportKeystore">
            <img class="account-btn-image" src="/static/icon_export.png">
            <span class="account-btn-text">Export</span>
        </div>
    </div>
  </div>
</template>

<script>
import { 
    ETH_ACCOUNT_VIEW,
    STORE_GET_ACCOUNT,
    STORE_DESTORY_ACCOUNT,
    KEYSTORE_KEY,
    STORE_CHANGE_VIEW,
    STORE_GET_ETHSCAN_URL,
    ETH_DEPOSIT_VIEW,
    ETH_SEND_VIEW,
    ETH_LOGIN_VIEW
} from '@/config';
import { 
    exportAccount,
    getProTokenBalance,
    getETHBalance,
    download,
    createQRCode,
    createETHQRString,
    createERC20TokenQRString
} from '@/utils';
import { mapGetters } from 'vuex';

export default {
    name: ETH_ACCOUNT_VIEW,
    data () {
        return {
            eth: 0.000,
            proToken: 0.000,
            refresh: false
        }
    },

    computed: {
        ...mapGetters({
            account: STORE_GET_ACCOUNT,
            etherScanURL: STORE_GET_ETHSCAN_URL
        })
    },

    mounted () {
        this.query();
        this.createQRCode();
    },

    methods: {
        copySuccess () {
            this.$notify({
                title: '复制成功',
                message: '公钥地址已经成功复制到剪切板！',
                type: 'success'
            });
        },

        exit () {
            this.$store.commit(STORE_DESTORY_ACCOUNT);
            this.$store.commit(STORE_CHANGE_VIEW, {view: ETH_LOGIN_VIEW});
        },

        createQRCode () {
            let QRString = createETHQRString({to: this.account.address});
            createQRCode('qrcode', QRString);
        },

        deposit () {
            this.$store.commit(STORE_CHANGE_VIEW, {view: ETH_DEPOSIT_VIEW});
        },

        withdraw () {
            this.$store.commit(STORE_CHANGE_VIEW, {view: ETH_SEND_VIEW});
        },

        detail () {
            window.open(this.etherScanURL);
        },

        exportKeystore () {
            let fileName = `UTC--${(new Date().toISOString().replace(/:/g, '-'))}--${this.account.address}`;
            download(fileName, localStorage.getItem(KEYSTORE_KEY));
        },

        query () {
            this.refresh = true;
            let proRefresh = true, ethRefresh = true;
            getProTokenBalance(this.account.address, balance => {
                proRefresh = false;
                this.refresh = proRefresh || ethRefresh;
                this.proToken = balance;
            });
            getETHBalance(this.account.address, balance => {
                ethRefresh = false;
                this.refresh = proRefresh || ethRefresh;
                this.eth = balance;
            });
        }
    }
}
</script>

<style scoped>
  .account-name {
    font-size: 20px;
    color: hsla(0,0%,100%,.9);
    margin-top: 16px;
    text-align: center;
  }

  .cash-info-div {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -ms-flex-pack: center;
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: flex-start;
    -ms-flex-item-align: center;
    align-self: center;
    margin-top: 30px;
    padding: 0 16px;
  }

  .cash-info-top {
    width: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
  }

  .cash-info-bottom {
    width: 100%;
    font-size: 20px;
    color: #78797f;
    text-align: center;
  }

  .protoken-value {
    font-size: 32px;
    color: #70c1de;
    margin-right: 10px;
  }

  .protoken-unit {
    font-size: 28px;
    color: #78797f;
    margin-right: 10px;
  }

  .eth-value {
    font-size: 18px;
    color: #78797f;
  }

  .eth-unit {
    font-size: 18px;
    color: #78797f;
  }

  .cash-info-title {
    text-align: center;
    line-height: 45px;
    vertical-align: middle;
  }

  .account-refresh {
    width: 32px;
    height: 32px;
    margin-top: 7px;
    background: rgba(0,0,0,.13);
    border: 1px solid hsla(0,0%,100%,.2);
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    cursor: pointer;
  }

  .account-refresh-image {
    width: 22px;
    height: 22px;
    vertical-align: middle;
  }

  .img-refresing {
    -webkit-transform: rotate(1turn);
    transform: rotate(1turn);
    -webkit-animation: rotation 1s linear infinite;
    animation: rotation 1s linear infinite;
  }

  .btn-action {
    width: 110px;
    height: 32px;
    color: #71c1de;
    border: 1px solid #70c1de;
    border-radius: 90px;
    cursor: pointer;
    background-color: transparent;
  }

  .btn-action:first-child {
    margin-right: 10px;
  }

  .split-line {
    width: 100%;
    height: 1px;
    background: hsla(0,0%,100%,.1);
    margin-top: 30px;
  }

  .address-tips {
    font-size: 16px;
    font-weight: 700;
    color: #71c1de;
    text-align: center;
    margin-top: 16px;
  }

  .qrcode {
    margin: 16px 0;
    width: 100%;
    text-align: center;
  }

  .address-div {
    text-align: center;
  }

  .account-address {
    font-size: 12px;
    color: hsla(0,0%,100%,.7) !important;
    margin-top: 4px;
    text-align: center;
    cursor: pointer;
    text-decoration: none;
    background-color: transparent;
  }

  .account-address:hover {
    color: #88898f !important;
  }

  .logout {
    position: absolute;
    right: 10px;
    top: 17px;
    width: 26px;
    height: 26px;
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAA0CAYAAACU7CiIAAABgGlDQ1BzUkdCIElFQzYxOTY2LTIuMQAAKJF1kc8rRFEUxz8GjRiNolhYvISVEaMmNhYjvwqL8ZRfm5k3v9S88XrvSbJVtooSG78W/AVslbVSRErKzprYoOe8mamZZM7t3PO533vP6d5zwaNmNN2q6gE9a5uR0bAyOzeveF+ooQoPzfiimmVMTo+olLXPeyrceBtwa5U/96/VxROWBhU1woOaYdrCY8ITq7bh8o5wk5aOxoXPhLtMuaDwnavH8vzqcirP3y6bamQIPA3CSqqEYyWspU1dWF5Ou55Z0Qr3cV/iS2RnpiW2ibdiEWGUMArjDDNEiF4GZA4RIEi3rCiT35PLn2JZcjWZDdYwWSJFGpsuUVekekJiUvSEjAxrbv//9tVK9gXz1X1hqH52nPcO8G7Dz5bjfB05zs8xVD7BZbaYv3wI/R+ibxW19gPwb8D5VVGL7cLFJrQ8GlEzmpMqxT3JJLydQv0cNN5A7UK+Z4V9Th5AXZevuoa9feiU8/7FX/SUZ7LLNiuFAAAACXBIWXMAAAsTAAALEwEAmpwYAAABfElEQVRYhe2WIU/EMBiGnyMkQAICNXeiBtMEhTwm0Dg8GnFi/SHtTyD8A4InuSJBkdRgJnBVJxB3UyBuIUdut5W7bYGkTzLTfum7fum6ByKRkkHdZGbzAbBXU1KYVHyGBO00hEyAWc0zKes2D2Kxk/OQRULYDaw7BuYV48GtCw2am1RUBZHZfAhMTSo+6haoa10op8BLZnPZdRDACfCc2fx6XUFo6wDIbH4B3AOHFdMHwG1m8xEwNqmYLU+2taNlKg/Hr3ZkUvEIHC2PZTa/BB5YfFc3JhV3WwfV8AZcmVS4dQVtBL0CZ03HOzRoP7N51XhhUvEeskDoYZjS4V1XAE+BL9JIb7+JSCQSWaX2CtLON15BSibbmWoZMqHBVMu6zYP4a6Ya2rpgU1UyqTRV7fwQmCqZ9GOq2vn+TFU7346paucbTVU7PwLGSib/wFSVTFZMVTv/w1SVTLo3VSWT7k216XgHm6p2vmq8UDLpx1TbuOv6M9U2fxORyDdfz0me6omlcJoAAAAASUVORK5CYII=");
    cursor: pointer;
  }

  .account-btn-group {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    margin-top: 18px;
    margin-bottom: 18px;
    cursor: pointer;
  }

  .account-btn {
    margin-right: 30px;
    margin-left: 30px;
  }

  .account-btn:first-child {
    margin-right: 0;
    margin-left: 30px;
  }

  .account-btn:last-child {
    margin-right: 30px;
    margin-left: 0;
  }

  .account-btn-image {
    vertical-align: middle;
    border: 0;
  }

  .account-btn-text {
    margin-right: 0;
    margin-left: 5px;
    color: #70c1de;
    font-size: 14px;
  }

  .cash-action {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    width: 100%;
    margin-top: 20px;
  }

  @-webkit-keyframes rotation {
      0% { -webkit-transform:rotate(0deg);transform:rotate(0deg) }
      to { -webkit-transform:rotate(1turn);transform:rotate(1turn) }
  }
  @keyframes rotation {
      0% { -webkit-transform:rotate(0deg);transform:rotate(0deg) }
      to { -webkit-transform:rotate(1turn);transform:rotate(1turn) }
  }
</style>
