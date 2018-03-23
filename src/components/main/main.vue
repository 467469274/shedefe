<template>
  <div>
    <div class="view">
      <router-view/>
    </div>
    <div class="tab">
      <router-link class="tab-item" to="/index">
        <i class="icon-cream icon"></i>
        <span>租相机</span>
      </router-link>
      <div class="tab-item" @click="gocolor">
        <i class="icon-liwu icon"></i>
        <span>行行摄摄</span>
      </div>
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
<script type="text/ecmascript-6">
    export default{
      methods:{
        gocolor(){
          window.location = 'http://mp.weixin.qq.com/mp/homepage?__biz=MzI2MTgwMjQ4OA==&hid=1&sn=299cba68043bf8a6fc6911e004297bda&scene=18#wechat_redirect'
        }
      }
    }
</script>
<style>
  @import "../../assets/css/app/app.css";
</style>
