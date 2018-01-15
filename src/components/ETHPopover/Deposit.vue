<template>
  <div class="deposit">
    <img class="go-back" @click="goback">
    <div class="deposit-title">Deposit</div>
    <div class="deposit-input-label">Please input Deposit Amount</div>
    <div class="deposit-input-div">
      <input type="text" class="deposit-input" v-model="amount">
    </div>
    <div class="qr-label">Your Wallet Address QR Code</div>
    <div id="qrcode2" class="deposit-qrcode"></div>
    <div class="deposit-address-label">Your Address</div>
    <div class="deposit-address">{{this.account.address}}</div>
    <div class="deposit-btn-div">
      <button class="deposit-btn" v-clipboard:copy="account.address" v-clipboard:success="copySuccess">
        Copy Address
      </button>
    </div>
  </div>
</template>

<script>
import {
  KEYSTORE_KEY, 
  ETH_DEPOSIT_VIEW,
  STORE_GET_ACCOUNT,
  STORE_CHANGE_VIEW,
  ETH_ACCOUNT_VIEW,
  ETH_QR_PROTOCAL
} from '@/config';
import { mapGetters } from 'vuex';
import { createQRCode, createETHQRString, createERC20TokenQRString } from '@/utils';
export default {
  
  name: ETH_DEPOSIT_VIEW,

  data () {
    return {
      amount: 0
    }
  },

  mounted () {
    this.createQRCode();
  },

  computed: {
    ...mapGetters({
        account: STORE_GET_ACCOUNT
    })
  },

  watch: {
    amount () {
      this.createQRCode();
    }
  },

  methods: {
    copySuccess () {
        this.$notify({
            title: '复制成功',
            message: '公钥地址已经成功复制到剪切板！',
            type: 'success'
        });
    },
    
    createQRCode () {
      let QRString = createETHQRString({to: this.account.address, amount: this.amount});
      createQRCode('qrcode2', QRString, 5, 14);
    },

    goback () {
      this.$store.commit(STORE_CHANGE_VIEW, {view: ETH_ACCOUNT_VIEW});
    }
  }
}
</script>

<style scoped>

.deposit {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.go-back {
  cursor: pointer;
  position: absolute;
  top: 10px;
  left: 10px;
  width: 26px;
  height: 26px;
  border: 0;
  background-position: 0 -26px;
  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAABOCAYAAAA+VQYvAAABgmlDQ1BzUkdCIElFQzYxOTY2LTIuMQAAKJF1kc8rw2Ecx1+GJpumOCgOS+O0aaYWF4ctRuEwU4bL9rUfaj++fb+TlqtyVZS4+HXgL+CqnJUiUlJuzsSF9fX52mpL9jw9n8/reT+fz6fn+TxgiWSUrN7khWyuoIVDAed8dMFpfcFGNxaxXTFFV6dnxyPUHZ/3NJj+1mPWqh/377AtJ3QFGlqERxVVKwhPCE+tFVSTd4Q7lXRsWfhM2K3JBYXvTD1e5leTU2X+NlmLhINgaRd2pmo4XsNKWssKy8txZTOrSuU+5kvsidzcrPheWT3ohAkRwMkkYwTxM8iIWD8efAzIjjr53t/8GfKSq4hVKaKxQoo0Bdyirkr1hPik6AmZGYpm///2VU8O+crV7QFofjaM9z6wbkNpyzC+jgyjdAyNT3CZq+bnD2H4Q/StquY6AMcGnF9VtfguXGxC16Ma02K/UqMsSzIJb6fQFoWOG2hdLPescs7JA0TW5auuYW8f+iXesfQDLidnzCz2xsMAAAAJcEhZcwAACxMAAAsTAQCanBgAAAMcSURBVFiF7djPqxV1GMfx93O8euWGN+2C11DshyklZYgK2g8LpBZBWFCL0IVoUGBFf0DQpoWrQtFSorDA2gkRIhkIqVh2zyIkQRcGRgaKlRWaKN53i3ku3NWdOeNMizifzXCG73dezJzvmef5Hujnfx/1dnVG2bjOLSIPAc8Aa8rGDtQEpgGrgYWAwLmyOVEDmQmsBUaAG8DxiPi1UUidDTwBDAFXgCMRcbnK3MqQOh94hOJxXwKORsS1qvMrQer9wPL8eA44ERE3qyKlkNoBVgKL8tTJiDjVCzCRslW3hmJl3QS+i4if6yBQ/jsazuM/wB91ESh/dEMUq2w2cB04FhEXGocSG6BYbfMpfpxjEXG2cSixAB4GHshTp4EfIsJGoUngImBVzjsPfBsRNxqHEpsLPA7MAC4D30TE1cahxGZRLJJZwLXEfp9qTq0yERF/A4eAC8BMYFmd61SO2lEXqyOtQv30008zUe/MutUaEOqz6h719bLxdTvV6cAmisZFYKxsTp0yMQxsBe6meHN/GBE/NgqpC4DXgDnAb8CuiDhfZW4vneoy4GVgEPgJeD/LRaVUaU4CWAe8kOO/Bz6tWsIrQdkBvQQ8lqe+AA720pRMpGzVbQZWUGxP9kZEt1dgImWlfDSPfwK122Eof3RzKFbZAuAqsDsizjQOJTYIbKFoIMeBfRFxrHEosQ7wPPB0nvoa2B8R441Ck8BHgY0U3+1J4KOqu746r6AlwKvAbcAvFG+HKZvHWlBicykWySjwF7AzIqb8C6Bup3oR2EaxqxgG1te5TuWo09Qn1Xtahfrpp59mot6bm+fWgFBfUbvq9rLxdTvVQeBtivo0DnxV5zplyIj6Sd7JkaxRjSOL1QOJfKne1wayVj2ayMfqHU0DoW5QxxJ5p8o/970i09W3EuiqW7JFbjbqtgSOq0/dyrXKSvldebwE1GocK0UdVT/LuzqsrmwTG1LfTeyE+lybWEd9Y9KieDO719bA9XlXXfW9trf9K/L76qqfq/PaxBaq+xM7pC5tExtWP0hsR2tQYgPqi+qDrUL9/Cf5F2L81paFImLsAAAAAElFTkSuQmCC");
}

.deposit-title {
  font-size: 16px;
  color: hsla(0,0%,100%,.9);
  line-height: 26px;
  margin-top: 10px;
}

.deposit-input-label {
  margin-top: 48px;
  color: hsla(0,0%,100%,.7);
}

.deposit-input-div {
  margin-top: 10px;
  margin-bottom: 15px;
  width: 100%;
  text-align: center;
}

.deposit-input {
  width: 80%;
  height: 40px;
  border: 1px solid hsla(0,0%,100%,.5);
  padding: 5px 10px;
  color: hsla(0,0%,100%,.9);
  background: #2f3342;
  font-size: 14px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  box-sizing: border-box;
}

.qr-label {
  margin-top: 20px;
  color: hsla(0,0%,100%,.7);
}

.deposit-qrcode {
  margin-top: 20px;
  text-align: center;
}

.deposit-address-label {
  margin-top: 20px;
  color: hsla(0,0%,100%,.7);
}

.deposit-address {
  margin-top: 10px;
  color: hsla(0,0%,100%,.9);
}

.deposit-btn-div {
  width: 100%;
  margin-top: 30px;
  margin-bottom: 40px;
  text-align: center;
}

.deposit-btn {
  width: 50%;
  background: rgba(88,196,92,.7);
  padding-top: 10px;
  padding-bottom: 10px;
  color: hsla(0,0%,100%,.9);
  border: 0;
  text-align: center;
  cursor: pointer;
}
</style>
