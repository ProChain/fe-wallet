<template>
  <div :class="['eth-popover', {'none': !show}]" @click="preventPopup">
    <component v-bind:is="view" :close="close"></component>
  </div>
</template>

<script>
import Login from './Login';
import Backup from './Backup';
import Account from './Account';
import Deposit from './Deposit';
import Send from './Send';
import Detail from './Detail';
import { mapGetters } from 'vuex';
import { STORE_GET_VIEW } from '@/config';

export default {
    name: 'ETHPopover',
    data () {
      return {
        show: false
      };
    },
    components: {Login, Backup, Account, Deposit, Send, Detail},
    computed: {
      ...mapGetters({
        view: STORE_GET_VIEW
      })
    },
    methods: {
      preventPopup (e) {
          e.stopPropagation();
          return;
      },

      close () {
        this.show = false;
      },

      open () {
        this.show = true;
      },

      toggle () {
        this.show = !this.show;
      }
    }
}
</script>

<style scoped>
  .eth-popover {
    font-family: Arial;
    cursor: default;
    width: 352px;
    position: absolute;
    right: -100px;
    top: 60px;
    background: #20232d;
    padding-bottom: 20px;
    z-index: 3;
    line-height: 1.42857143;
  }
</style>

<style>
  .none {
    display: none !important;
  }
</style>