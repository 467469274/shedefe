import Vue from 'vue';
import Router from 'vue-router';
import main from '@/components/main/main';
import index from '@/components/index/index';
import gift from '@/components/gift/gift';
import cart from '@/components/cart/cart';
import order from '@/components/order/order';
import commdetail from '@/components/commdetail/commdetail';
import comment from '@/components/comment/comment';
import commentDetail from '@/components/comment/commentDetail';
import detail from '@/components/comm/detail';
import empty from '@/components/empty/empty';
import cartend from '@/components/cartend/cartend';
import agreement from '@/components/agreement/agreement';
import addLocation from '@/components/addLocation/addLocation';
import orderDetail from '@/components/order/orderDetail';
import logistics from '@/components/logistics/logistics';
import returnComm from '@/components/returnComm/returnComm';
import payCall from '@/components/payCall/payCall';
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
          path: '*',
          name: 'index',
          component: index
        },
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
    },
    {
      path: '/comment/:id',
      name: 'comment',
      component: comment
    },
    {
      path: '/commentDetail/:id',
      name: 'commentDetail',
      component: commentDetail
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: detail
    },
    {
      path: '/empty',
      name: 'empty',
      component: empty
    },
    {
      path: '/cartend',
      name: 'cartend',
      component: cartend
    },
    {
      path: '/agreement',
      name: 'agreement',
      component: agreement
    },
    {
      path: '/addLocation',
      name: 'addLocation',
      component: addLocation
    },
    {
      path: '/orderDetail/:id',
      name: 'orderDetail',
      component: orderDetail
    },
    {
      path: '/logistics/:id',
      name: 'logistics',
      component: logistics
    },
    {
      path: '/returnComm/:id',
      name: 'returnComm',
      component: returnComm
    },
    {
      path: '/payCall/:id/:type',
      name: 'payCall',
      component: payCall
    },
    {
      path: '*',
      component:empty
    }
  ]
})
