// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router';
import {ajpost,ajget} from './common/ajax.js';

Vue.config.productionTip = false;
Vue.prototype.ajpost = ajpost;
Vue.prototype.ajget = ajget;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
