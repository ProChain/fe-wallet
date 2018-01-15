<template>
  <div class="detail">
    <div class="btn-back" @click="goBack"></div>
    <div class="detail-title">TRANSACTION DETAILS</div>
    <div class="item-label">Recipient Address</div>
    <div class="recipient-address">{{tx.to}}</div>
    <div class="item-label">Payment Wallet Address</div>
    <div class="payment-address">{{account.address}}</div>
    <div class="item-label">Transaction Fee</div>
    <div class="transaction-fee">{{fee}}</div>
    <div class="item-label">Transaction Amount</div>
    <div class="transaction-amount">{{tx.value}}</div>
    <div class="next-btn" @click="sendProToken">{{buttonTitle}}</div>
  </div>
</template>

<script>
import {
  ETH_DETAIL_VIEW,
  ETH_ACCOUNT_VIEW,
  ETH_SEND_VIEW,
  STORE_GET_ACCOUNT,
  STORE_CHANGE_VIEW,
  STORE_GET_TRANSACTION,
  STORE_GET_TRANSACTION_FEE,
  STORE_INIT_TRANSACTION,
  ETHERSCAN_TRANSACTION_ADDRESS_URL
} from '@/config';
import { mapGetters } from 'vuex';
import { sendProToken } from '@/utils';
export default {
  name: ETH_DETAIL_VIEW,

  data () {
    return {
      sending: false,
      buttonTitle: 'Confirm'
    }
  },

  computed: {
    ...mapGetters({
      account: STORE_GET_ACCOUNT,
      tx: STORE_GET_TRANSACTION,
      fee: STORE_GET_TRANSACTION_FEE
    })
  },

  methods: {

    goBack () {
      this.$store.commit(STORE_CHANGE_VIEW, {view: ETH_SEND_VIEW});
    },

    sendProToken () {
      if (!this.sending) {
        this.sending = true;
        sendProToken (this.account, this.tx, receipt => {
          this.sending = false;
          this.buttonTitle = 'Confirm';
          window.open(`${ETHERSCAN_TRANSACTION_ADDRESS_URL}/${receipt.transactionHash}`);
          this.$store.commit(STORE_INIT_TRANSACTION);
          this.$store.commit(STORE_CHANGE_VIEW, {view: ETH_ACCOUNT_VIEW});
        });
        this.buttonTitle = 'Sending PRO...';
      }
    }
  }
}
</script>

<style scoped>
  .detail {
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
    padding: 10px 20px 20px 20px;
  }

  .btn-back {
    cursor: pointer;
    position: absolute;
    top: 10px;
    left: 0;
    width: 26px;
    height: 26px;
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAABOCAYAAAA+VQYvAAABgmlDQ1BzUkdCIElFQzYxOTY2LTIuMQAAKJF1kc8rw2Ecx1+GJpumOCgOS+O0aaYWF4ctRuEwU4bL9rUfaj++fb+TlqtyVZS4+HXgL+CqnJUiUlJuzsSF9fX52mpL9jw9n8/reT+fz6fn+TxgiWSUrN7khWyuoIVDAed8dMFpfcFGNxaxXTFFV6dnxyPUHZ/3NJj+1mPWqh/377AtJ3QFGlqERxVVKwhPCE+tFVSTd4Q7lXRsWfhM2K3JBYXvTD1e5leTU2X+NlmLhINgaRd2pmo4XsNKWssKy8txZTOrSuU+5kvsidzcrPheWT3ohAkRwMkkYwTxM8iIWD8efAzIjjr53t/8GfKSq4hVKaKxQoo0Bdyirkr1hPik6AmZGYpm///2VU8O+crV7QFofjaM9z6wbkNpyzC+jgyjdAyNT3CZq+bnD2H4Q/StquY6AMcGnF9VtfguXGxC16Ma02K/UqMsSzIJb6fQFoWOG2hdLPescs7JA0TW5auuYW8f+iXesfQDLidnzCz2xsMAAAAJcEhZcwAACxMAAAsTAQCanBgAAAMcSURBVFiF7djPqxV1GMfx93O8euWGN+2C11DshyklZYgK2g8LpBZBWFCL0IVoUGBFf0DQpoWrQtFSorDA2gkRIhkIqVh2zyIkQRcGRgaKlRWaKN53i3ku3NWdOeNMizifzXCG73dezJzvmef5Hujnfx/1dnVG2bjOLSIPAc8Aa8rGDtQEpgGrgYWAwLmyOVEDmQmsBUaAG8DxiPi1UUidDTwBDAFXgCMRcbnK3MqQOh94hOJxXwKORsS1qvMrQer9wPL8eA44ERE3qyKlkNoBVgKL8tTJiDjVCzCRslW3hmJl3QS+i4if6yBQ/jsazuM/wB91ESh/dEMUq2w2cB04FhEXGocSG6BYbfMpfpxjEXG2cSixAB4GHshTp4EfIsJGoUngImBVzjsPfBsRNxqHEpsLPA7MAC4D30TE1cahxGZRLJJZwLXEfp9qTq0yERF/A4eAC8BMYFmd61SO2lEXqyOtQv30008zUe/MutUaEOqz6h719bLxdTvV6cAmisZFYKxsTp0yMQxsBe6meHN/GBE/NgqpC4DXgDnAb8CuiDhfZW4vneoy4GVgEPgJeD/LRaVUaU4CWAe8kOO/Bz6tWsIrQdkBvQQ8lqe+AA720pRMpGzVbQZWUGxP9kZEt1dgImWlfDSPfwK122Eof3RzKFbZAuAqsDsizjQOJTYIbKFoIMeBfRFxrHEosQ7wPPB0nvoa2B8R441Ck8BHgY0U3+1J4KOqu746r6AlwKvAbcAvFG+HKZvHWlBicykWySjwF7AzIqb8C6Bup3oR2EaxqxgG1te5TuWo09Qn1Xtahfrpp59mot6bm+fWgFBfUbvq9rLxdTvVQeBtivo0DnxV5zplyIj6Sd7JkaxRjSOL1QOJfKne1wayVj2ayMfqHU0DoW5QxxJ5p8o/970i09W3EuiqW7JFbjbqtgSOq0/dyrXKSvldebwE1GocK0UdVT/LuzqsrmwTG1LfTeyE+lybWEd9Y9KieDO719bA9XlXXfW9trf9K/L76qqfq/PaxBaq+xM7pC5tExtWP0hsR2tQYgPqi+qDrUL9/Cf5F2L81paFImLsAAAAAElFTkSuQmCC");
  }

  .detail-title {
    font-size: 16px;
    color: hsla(0,0%,100%,.9);
    margin-top: 6px;
    margin-bottom: 30px;
  }

  .item-label {
    width: 100%;
    font-size: 12px;
    color: hsla(0,0%,100%,.5);
    -ms-flex-item-align: start;
    align-self: flex-start;
  }

  .recipient-address {
    width: 100%;
    font-size: 14px;
    color: hsla(0,0%,100%,.9);
    -ms-flex-item-align: start;
    align-self: flex-start;
    padding-top: 5px;
    padding-bottom: 5px;
    margin-bottom: 10px;
    border-bottom: 1px solid hsla(226,5%,53%,.3);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .payment-address {
    width: 100%;
    font-size: 14px;
    color: hsla(0,0%,100%,.9);
    -ms-flex-item-align: start;
    align-self: flex-start;
    padding-top: 5px;
    padding-bottom: 5px;
    margin-bottom: 10px;
    border-bottom: 1px solid hsla(226,5%,53%,.3);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .transaction-fee {
    width: 100%;
    font-size: 14px;
    color: hsla(0,0%,100%,.9);
    -ms-flex-item-align: start;
    align-self: flex-start;
    padding-top: 5px;
    padding-bottom: 5px;
    margin-bottom: 10px;
    border-bottom: 1px solid hsla(226,5%,53%,.3);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .next-btn-div {
    width: 100%;
    font-size: 14px;
    color: hsla(0,0%,100%,.9);
    -ms-flex-item-align: start;
    align-self: flex-start;
    padding-top: 5px;
    padding-bottom: 5px;
    margin-bottom: 10px;
    border-bottom: 1px solid hsla(226,5%,53%,.3);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .transaction-amount {
    width: 100%;
    font-size: 14px;
    color: hsla(0,0%,100%,.9);
    -ms-flex-item-align: start;
    align-self: flex-start;
    padding-top: 5px;
    padding-bottom: 5px;
    margin-bottom: 10px;
    border-bottom: 1px solid hsla(226,5%,53%,.3);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .next-btn {
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
