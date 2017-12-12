import Vue from 'vue';
import Router from 'vue-router';
import main from '@/components/main/main';
import index from '@/components/index/index';
import gift from '@/components/gift/gift';
import cart from '@/components/cart/cart';
import order from '@/components/order/order';
import commdetail from '@/components/commdetail/commdetail';
import Mint from 'mint-ui';

Vue.use(Router);
Vue.use(Mint);

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/main',
      name: 'main',
      component: main,
      children: [
        {
          path: '/index',
          name: 'index',
          component: index
        },
        {
          path: '/gift',
          name: 'gift',
          component: gift
        },
        {
          path: '/cart',
          name: 'cart',
          component: cart
        },
        {
          path: '/order',
          name: 'order',
          component: order
        }
      ]
    },
    {
      path: '/commdetail/:id',
      name: 'commdetail',
      component: commdetail
    }
  ]
})
