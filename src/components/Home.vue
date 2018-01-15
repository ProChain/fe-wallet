<template>
  <div class="home">
    <el-menu :default-active="activeIndex"
        @select="handleSelect"
        class="wallet-menu" mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="1">菜单1</el-menu-item>
        <el-submenu index="2">
            <template slot="title">菜单2</template>
            <el-menu-item index="2-1">子菜单1</el-menu-item>
            <el-menu-item index="2-2">子菜单2</el-menu-item>
            <el-menu-item index="2-3">子菜单3</el-menu-item>
        </el-submenu>
        <el-menu-item index="3"><a href="#">菜单3</a></el-menu-item>
        <el-menu-item index="4" class="wallet-user">
            <div class="eth-wrapper">
                <div class="eth-account">
                    <img src="/static/icon-avatar.png" alt=""/>
                    <span class="login-name">{{account && account.address ? account.address : 'Sign in'}}</span>
                </div>
                <ETHPopover ref="ethPopover"/>
            </div>
        </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { STORE_GET_ACCOUNT } from '@/config';
import ETHPopover from '@/components/ETHPopover/Index';

export default {
    name: 'home',
    data() {
        return {
            activeIndex: '1'
        };
    },
    components: {ETHPopover},
    computed: {
        ...mapGetters({
            account: STORE_GET_ACCOUNT
        })
    },
    methods: {
        handleSelect(key, keyPath) {
            if (key == '4') {
                this.$refs.ethPopover.toggle();
            }
        },

        preventPopup (e) {
            e.stopPropagation();
            return;
        }
    }
}
</script>

<style >
    .wallet-menu {
        padding-left: 50px;
    }

    .wallet-user {
        float: right !important;
        right: 100px;
    }

    .eth-wrapper {
        position: relative;
    }

    .login-name {
        max-width: 100px;
        display: inline-block;
        color: #e5e5e7;
        font-size: 12px;
        margin-left: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>