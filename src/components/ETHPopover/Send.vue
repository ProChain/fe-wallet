<template>
  <div class="send">
    <div class="btn-back" @click="goBack"></div>
    <div class="send-title">SEND TRANSACTION</div>
    <input class="send-input-address" placeholder="Address" type="text" v-model="address">
    <input class="send-input-amount" placeholder="Amount" type="number" v-model.number="amount">
    <div class="withdrawal-label">
      <span>Withdrawal amount: </span>
      <span class="withdrawal-value">{{proToken}} PRO, {{eth}} ETH</span>
    </div>
    <input class="send-input-remarks" placeholder="Remarks" type="text" v-model="remarks">
    <div class="btn-dropmenu" @click="toggle">
      <span>Advanced Options</span>
      <div :class="['arrow-down', {'arrow-down-expend': !collapsed}]"></div>
    </div>
    <input v-show="!collapsed" class="input-gas-price" maxlength="3" placeholder="Gas Price" type="number" v-model.number="gasPrice"/>
    <input v-show="!collapsed" class="input-gas-limit" placeholder="Gas Limit" type="number" v-model.number="gasLimit"/>
    <div v-show="!collapsed" class="fee-amount">
      <div class="fee-label">Max Transaction Fee</div>
      <div class="fee-value">
        <span>{{fee}} ETH </span><br>
        <span class="fee-expression">=Gas({{gasLimit}}) * Gas Price({{gasPrice}} gwei)</span>
      </div>
    </div>
    <div class="btn-next" @click="goDetail">Next</div>
  </div>
</template>

<script>
import {
  STORE_GET_ACCOUNT,
  ETH_SEND_VIEW,
  ETH_ACCOUNT_VIEW,
  STORE_CHANGE_VIEW,
  STORE_CHANGE_TRANSACTION,
  STORE_GET_TRANSACTION_FEE,
  ETH_DETAIL_VIEW,
  GAS_LIMIT,
  UNIT
} from '@/config';
import { mapGetters } from 'vuex';
import { exportAccount, fromWei, toWei, getProTokenBalance, getETHBalance, getGasPrice } from '@/utils';
export default {
  name: ETH_SEND_VIEW,
  data () {
    return {
      eth: 0,
      proToken: 0,
      address: this.$store.state.Transaction.transaction.to,
      amount: this.$store.state.Transaction.transaction.value,
      remarks: '',
      gasPrice: this.$store.state.Transaction.transaction.gasPrice,
      gasLimit: this.$store.state.Transaction.transaction.gasLimit,
      collapsed: true
    }
  },

  props: {
    close: {type: Function, required: true}
  },

  mounted () {
    this.query();
  },

  computed: {
    ...mapGetters({
      account: STORE_GET_ACCOUNT
    }),

    fee () {
      return (fromWei(toWei(this.gasPrice * this.gasLimit + '', UNIT.GWEI)) - 0).toFixed(3);
    }
  },

  watch: {
    address () {
      this.$store.commit(STORE_CHANGE_TRANSACTION, {to: this.address.trim()});
    },

    amount () {
      this.$store.commit(STORE_CHANGE_TRANSACTION, {value: this.amount});
    },

    gasPrice () {
      this.$store.commit(STORE_CHANGE_TRANSACTION, {gasPrice: toWei(this.gasPrice + '', UNIT.GWEI) - 0});
    },

    gasLimit () {
      this.$store.commit(STORE_CHANGE_TRANSACTION, {gasLimit: this.gasLimit});
    }
  },

  methods: {
    toggle () {
      this.collapsed = !this.collapsed;
    },

    goBack () {
      this.$store.commit(STORE_CHANGE_VIEW, {view: ETH_ACCOUNT_VIEW});
    },

    goDetail () {
      if (!this.address || !this.address.trim()) {
        
      }
      this.$store.commit(STORE_CHANGE_VIEW, {view: ETH_DETAIL_VIEW});
    },

    query () {
      getProTokenBalance(this.account.address, balance => {
        this.proToken = balance.toFixed(3) - 0;
      });
      getETHBalance(this.account.address, balance => {
        this.eth = balance.toFixed(3) - 0;
      });
      getGasPrice(gasPrice => {
        this.gasPrice = fromWei(gasPrice + '', UNIT.GWEI) - 0;
      });
    },
  }
}
</script>

<style scoped>
  .send {
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
    position: relative;
    margin: 10px 20px 20px 20px;
  }

  .btn-back {
    cursor: pointer;
    background-position: 0 -26px;
    position: absolute;
    top: 0;
    left: -15px;
    width: 26px;
    height: 26px;
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAABOCAYAAAA+VQYvAAABgmlDQ1BzUkdCIElFQzYxOTY2LTIuMQAAKJF1kc8rw2Ecx1+GJpumOCgOS+O0aaYWF4ctRuEwU4bL9rUfaj++fb+TlqtyVZS4+HXgL+CqnJUiUlJuzsSF9fX52mpL9jw9n8/reT+fz6fn+TxgiWSUrN7khWyuoIVDAed8dMFpfcFGNxaxXTFFV6dnxyPUHZ/3NJj+1mPWqh/377AtJ3QFGlqERxVVKwhPCE+tFVSTd4Q7lXRsWfhM2K3JBYXvTD1e5leTU2X+NlmLhINgaRd2pmo4XsNKWssKy8txZTOrSuU+5kvsidzcrPheWT3ohAkRwMkkYwTxM8iIWD8efAzIjjr53t/8GfKSq4hVKaKxQoo0Bdyirkr1hPik6AmZGYpm///2VU8O+crV7QFofjaM9z6wbkNpyzC+jgyjdAyNT3CZq+bnD2H4Q/StquY6AMcGnF9VtfguXGxC16Ma02K/UqMsSzIJb6fQFoWOG2hdLPescs7JA0TW5auuYW8f+iXesfQDLidnzCz2xsMAAAAJcEhZcwAACxMAAAsTAQCanBgAAAMcSURBVFiF7djPqxV1GMfx93O8euWGN+2C11DshyklZYgK2g8LpBZBWFCL0IVoUGBFf0DQpoWrQtFSorDA2gkRIhkIqVh2zyIkQRcGRgaKlRWaKN53i3ku3NWdOeNMizifzXCG73dezJzvmef5Hujnfx/1dnVG2bjOLSIPAc8Aa8rGDtQEpgGrgYWAwLmyOVEDmQmsBUaAG8DxiPi1UUidDTwBDAFXgCMRcbnK3MqQOh94hOJxXwKORsS1qvMrQer9wPL8eA44ERE3qyKlkNoBVgKL8tTJiDjVCzCRslW3hmJl3QS+i4if6yBQ/jsazuM/wB91ESh/dEMUq2w2cB04FhEXGocSG6BYbfMpfpxjEXG2cSixAB4GHshTp4EfIsJGoUngImBVzjsPfBsRNxqHEpsLPA7MAC4D30TE1cahxGZRLJJZwLXEfp9qTq0yERF/A4eAC8BMYFmd61SO2lEXqyOtQv30008zUe/MutUaEOqz6h719bLxdTvV6cAmisZFYKxsTp0yMQxsBe6meHN/GBE/NgqpC4DXgDnAb8CuiDhfZW4vneoy4GVgEPgJeD/LRaVUaU4CWAe8kOO/Bz6tWsIrQdkBvQQ8lqe+AA720pRMpGzVbQZWUGxP9kZEt1dgImWlfDSPfwK122Eof3RzKFbZAuAqsDsizjQOJTYIbKFoIMeBfRFxrHEosQ7wPPB0nvoa2B8R441Ck8BHgY0U3+1J4KOqu746r6AlwKvAbcAvFG+HKZvHWlBicykWySjwF7AzIqb8C6Bup3oR2EaxqxgG1te5TuWo09Qn1Xtahfrpp59mot6bm+fWgFBfUbvq9rLxdTvVQeBtivo0DnxV5zplyIj6Sd7JkaxRjSOL1QOJfKne1wayVj2ayMfqHU0DoW5QxxJ5p8o/970i09W3EuiqW7JFbjbqtgSOq0/dyrXKSvldebwE1GocK0UdVT/LuzqsrmwTG1LfTeyE+lybWEd9Y9KieDO719bA9XlXXfW9trf9K/L76qqfq/PaxBaq+xM7pC5tExtWP0hsR2tQYgPqi+qDrUL9/Cf5F2L81paFImLsAAAAAElFTkSuQmCC");
  }

  .send-title {
    font-size: 16px;
    color: hsla(0,0%,100%,.9);
    margin-top: 6px;
    margin-bottom: 30px;
  }

  .send-input-address {
    width: 100%;
    height: 40px;
    margin-bottom: 10px;
    border: 1px solid hsla(0,0%,100%,.5);
    padding: 5px 10px;
    color: hsla(0,0%,100%,.9);
    background: #20232d;
    font-size: 14px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-family: inherit;
    line-height: inherit;
    box-sizing: border-box;
  }

  .send-input-amount {
    width: 100%;
    height: 40px;
    margin-bottom: 10px;
    border: 1px solid hsla(0,0%,100%,.5);
    padding: 5px 10px;
    color: hsla(0,0%,100%,.9);
    background: #20232d;
    font-size: 14px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-family: inherit;
    line-height: inherit;
    box-sizing: border-box;
  }

  .withdrawal-label {
    font-size: 12px;
    color: hsla(0,0%,100%,.7);
    -ms-flex-item-align: start;
    align-self: flex-start;
    margin-bottom: 5px;
  }

  .withdrawal-value {
    color: #71c1de;
  }

  .send-input-remarks {
    width: 100%;
    height: 40px;
    margin-bottom: 10px;
    border: 1px solid hsla(0,0%,100%,.5);
    padding: 5px 10px;
    color: hsla(0,0%,100%,.9);
    background: #20232d;
    font-size: 14px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-family: inherit;
    line-height: inherit;
    box-sizing: border-box;
  }

  .btn-dropmenu {
    align-self: flex-end;
    font-size: 14px;
    color: hsla(0,0%,100%,.7);
    margin-bottom: 10px;
    cursor: pointer;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }

  .arrow-down {
    width: 14px;
    height: 9px;
    margin-left: 10px;
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAJCAYAAAACTR1pAAABgmlDQ1BzUkdCIElFQzYxOTY2LTIuMQAAKJF1kc8rw2Ecx1+GJpumOCgOS+O0aaYWF4ctRuEwU4bL9rUfaj++fb+TlqtyVZS4+HXgL+CqnJUiUlJuzsSF9fX52mpL9jw9n8/reT+fz6fn+TxgiWSUrN7khWyuoIVDAed8dMFpfcFGNxaxXTFFV6dnxyPUHZ/3NJj+1mPWqh/377AtJ3QFGlqERxVVKwhPCE+tFVSTd4Q7lXRsWfhM2K3JBYXvTD1e5leTU2X+NlmLhINgaRd2pmo4XsNKWssKy8txZTOrSuU+5kvsidzcrPheWT3ohAkRwMkkYwTxM8iIWD8efAzIjjr53t/8GfKSq4hVKaKxQoo0Bdyirkr1hPik6AmZGYpm///2VU8O+crV7QFofjaM9z6wbkNpyzC+jgyjdAyNT3CZq+bnD2H4Q/StquY6AMcGnF9VtfguXGxC16Ma02K/UqMsSzIJb6fQFoWOG2hdLPescs7JA0TW5auuYW8f+iXesfQDLidnzCz2xsMAAAAJcEhZcwAACxMAAAsTAQCanBgAAADiSURBVCiRfc8xK4ZhFMbx3/PUa5MUg9WEwWhhsOktgww+gAx6St03H4B8gfuOugelDEomhcViQ/kcRotJDLI8bz29eV3bOef6n+ucKuXSxzkOYmiujFDKpYdLzGOpRg8zuEi5rIyAKpxgC9P4qWNobnGKMdykXGb/YPewiy9sxtB81+1gHw+Ywn3KZaKT1kdqy+0YmheoOoYJPGOhXbKOubY3juMYmsOBf5AohuajNb9jDWe4a6FrHHVvrwwp5bKMx/ZneMVqDM1n11cPgzE0T9hpyzdsDEP/KuWymHKZHDX/BW4oPTV0hGJFAAAAAElFTkSuQmCC") no-repeat 100%;
  }
  
  .arrow-down-expend {
    transform: rotate(-180deg);
  }

  .input-gas-price {
    width: 100%;
    height: 40px;
    margin-bottom: 10px;
    border: 1px solid hsla(0,0%,100%,.5);
    padding: 5px 10px;
    color: hsla(0,0%,100%,.9);
    background: #20232d;
    font-size: 14px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-family: inherit;
    line-height: inherit;
    box-sizing: border-box;
  }

  .input-gas-limit {
    width: 100%;
    height: 40px;
    margin-bottom: 10px;
    border: 1px solid hsla(0,0%,100%,.5);
    padding: 5px 10px;
    color: hsla(0,0%,100%,.9);
    background: #20232d;
    font-size: 14px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-family: inherit;
    line-height: inherit;
    box-sizing: border-box;
  }

  .fee-amount {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    width: 100%;
  }

  .fee-label {
    font-size: 12px;
    color: hsla(0,0%,100%,.7);
    -ms-flex-item-align: start;
    align-self: flex-start;
  }

  .fee-value {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    font-size: 14px;
    color: hsla(0,0%,100%,.9);
    text-align: right;
  }

  .fee-expression {
    width: 100%;
    font-size: 10px;
    color: hsla(0,0%,100%,.4);
  }

  .btn-next {
    width: 100%;
    color: #fff;
    padding-top: 12px;
    padding-bottom: 12px;
    font-size: 14px;
    margin-top: 30px;
    background: #4eafd2;
    text-align: center;
    cursor: pointer;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
