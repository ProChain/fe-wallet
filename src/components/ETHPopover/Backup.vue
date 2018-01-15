<template>
  <div class="backup">
    <div class="backup-success">
      <img class="success-image" src="/static/icon-tick.png">
    </div>
    <div class="backup-title">Registered Successfully</div>
    <div class="backup-warm-title">Be Safe &amp; Secure</div>
    <div class="backup-warm-list">
      <img class="backup-warm-list-image" src="/static/icon-dot.png">
      <div class="backup-warm-list-text">ProChain does not hold your keys for you. </div>
    </div>
    <div class="backup-warm-list">
      <img class="backup-warm-list-image" src="/static/icon-dot.png">
      <div class="backup-warm-list-text">We cannot access accounts, recover keys, reset passwords, nor reverse transactions.</div>
    </div>
    <div class="backup-warm-list">
      <img class="backup-warm-list-image" src="/static/icon-dot.png">
      <div class="backup-warm-list-text">You are responsible for your security. We are not responsible for any loss.</div>
    </div>
    <textarea class="keystore-textarea" disabled="true" id="secret-key" :value="keystoreString"></textarea>
    <button class="backup-btn" @click="exportKeystore">Backup the KeyStore</button>
    <button class="saved-btn" @click="hasSaved" v-if="saved">I've saved the keys</button>
  </div>
</template>

<script>
import {
  KEYSTORE_KEY, 
  ETH_ACCOUNT_VIEW,
  ETH_BACKUP_VIEW,
  STORE_GET_ACCOUNT,
  STORE_CHANGE_VIEW
} from '@/config';
import { mapGetters } from 'vuex';
import { download } from '@/utils';
export default {
  name: ETH_BACKUP_VIEW,
  data () {
    return {
      saved: false,
      keystoreString: localStorage.getItem(KEYSTORE_KEY)
    }
  },

  computed: {
    ...mapGetters({
      account: STORE_GET_ACCOUNT
    })
  },

  methods: {
    exportKeystore () {
      let fileName = `UTC--${(new Date().toISOString().replace(/:/g, '-'))}--${this.account.address}`;
      download(fileName, this.keystoreString);
      this.saved = true;
    },

    hasSaved () {
      this.$store.commit(STORE_CHANGE_VIEW, {view: ETH_ACCOUNT_VIEW});
    }
  }
}
</script>

<style scoped>
  .backup {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    background: #20232d;
  }

  .backup-success {
    margin-top: 20px;
  }

  .success-image {
    width: 59px;
    height: 48px;
  }

  .backup-title {
    font-size: 20px;
    color: #fff;
    text-align: center;
    margin-top: 12px;
  }

  .backup-warm-title {
    width: 87%;
    font-size: 16px;
    color: hsla(0,0%,100%,.7);
    font-weight: 700;
    margin-top: 22px;
  }

  .backup-warm-list {
    margin-top: 10px;
    margin-left: 6%;
    margin-right: 3%;
    -ms-flex-item-align: left;
    -ms-grid-row-align: left;
    align-self: left;
    white-space:normal;
  }

  .backup-warm-list-image {
    float: left;
    margin-top: 7px;
    width: 5px;
    height: 5px;
    vertical-align: middle;
  }

  .backup-warm-list-text {
    font-size: 16px;
    color: hsla(0,0%,100%,.5);
    margin-left: 14px;
  }

  .keystore-textarea {
    width: 87%;
    height: 70px;
    padding: 5px;
    margin-top: 20px;
    background: #131418;
    border: 1px solid #4d536b;
    color: hsla(0,0%,100%,.5);
    resize: none;
    text-align: left;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    overflow: auto;
    box-sizing: border-box;
  }

  .backup-btn {
    background: #58c45c;
    width: 87%;
    border-radius: 0;
    font-size: 14px;
    color: #fff;
    text-align: center;
    padding: 12px;
    cursor: pointer;
    margin-top: 10px;
    border: 0;
  }

  .saved-btn {
    width: 87%;
    border-radius: 0;
    font-size: 14px;
    color: #fff;
    text-align: center;
    padding: 12px;
    cursor: pointer;
    margin-top: 10px;
    background: #45474e;
    border: 0;
  }
</style>
