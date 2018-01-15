// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
import VueResource from 'vue-resource';
import VueClipboard from 'vue-clipboard2';

Vue.config.productionTip = false;
Vue.use(VueResource);
Vue.use(ElementUI);
Vue.use(VueClipboard);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
});
