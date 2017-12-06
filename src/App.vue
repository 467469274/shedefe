<template>
  <div id="app" style="background: #ffffff">
    <div class="view">
      <router-view/>
    </div>
    <div class="tab">
      <router-link class="tab-item" to="/index">
        <i class="icon-cream icon"></i>
        <span>租相机</span>
      </router-link>
      <router-link class="tab-item" to="/gift">
        <i class="icon-liwu icon"></i>
        <span>形形色色</span>
      </router-link>
      <router-link class="tab-item" to="/cart">
        <i class="icon-care icon"></i>
        <span>购物车</span>
      </router-link>
      <router-link class="tab-item" to="/order">
        <i class="icon-dingda icon"></i>
        <span>查订单</span>
      </router-link>
    </div>
  </div>
</template>

<script>
  import {Tabbar, TabItem} from 'mint-ui';

  export default {
    name: 'app'
  }
</script>

<style>
@import "assets/css/app/app.css";
</style>
