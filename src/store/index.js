import Vue from 'vue';
import Vuex from 'vuex';
import { createAccount, importAccount, fromWei } from '@/utils';
import {
    ETH_LOGIN_VIEW,
    STORE_CHANGE_TRANSACTION,
    STORE_INIT_TRANSACTION,
    STORE_GET_TRANSACTION,
    STORE_GET_TRANSACTION_FEE,
    STORE_GET_ACCOUNT,
    STORE_CREATE_ACCOUNT,
    STORE_IMPORT_ACCOUNT,
    STORE_DESTORY_ACCOUNT,
    STORE_GET_ETHSCAN_URL,
    STORE_CHANGE_VIEW,
    STORE_GET_VIEW,
    ETHERSCAN_ACCOUNT_ADDRESS_URL,
    GAS_LIMIT
} from '@/config';

Vue.use(Vuex);

const Account = {
    state: {
        account: null
    },

    mutations: {
        [STORE_CREATE_ACCOUNT]: (state, payload) => {
            try {
                state.account = createAccount();
            } catch (e) {
                payload.fail(e);
            }
        },

        [STORE_IMPORT_ACCOUNT]: (state, payload) => {
            try {
                state.account = importAccount(payload.keystore, payload.password);
            } catch (e) {
                payload.fail(e);
            }
        },

        [STORE_DESTORY_ACCOUNT]: state => {
            state.account = null;
        }
    },

    getters: {
        [STORE_GET_ACCOUNT]: state => state.account,
        [STORE_GET_ETHSCAN_URL]: state => state.account && state.account.address 
            ? `${ETHERSCAN_ACCOUNT_ADDRESS_URL}/${state.account.address}` : ETHERSCAN_ACCOUNT_ADDRESS_URL,
    }
};

const View = {
    state: {
        view: ETH_LOGIN_VIEW,
    },

    mutations: {
        [STORE_CHANGE_VIEW]: (state, payload) => {
            state.view = payload.view;
        }
    },

    getters: {
        [STORE_GET_VIEW]: state => state.view
    }
};

const Transaction = {
    state: {
        transaction: {
            to: '',
            value: 0,
            gasPrice: 0, 
            gasLimit: GAS_LIMIT
        }
    },

    mutations: {
        [STORE_INIT_TRANSACTION]: (state) => {
            state.transaction = {
                to: '',
                value: 0,
                gasPrice: 0, 
                gasLimit: GAS_LIMIT
            };
        },

        [STORE_CHANGE_TRANSACTION]: (state, payload) => {
            state.transaction = { ...state.transaction, ...payload };
        }
    },

    getters: {
        [STORE_GET_TRANSACTION]: state => state.transaction,
        [STORE_GET_TRANSACTION_FEE]: state => (fromWei(state.transaction.gasPrice * state.transaction.gasLimit + '') - 0).toFixed(3)
    }
};

export default new Vuex.Store({
    modules: { Account, View, Transaction }
});
