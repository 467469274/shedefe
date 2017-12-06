import Vue from 'vue';
import Router from 'vue-router';
import index from '@/components/index/index';
import Mint from 'mint-ui';

Vue.use(Router);
Vue.use(Mint);

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/index',
      name: 'index',
      component: index
    }
  ]
})
