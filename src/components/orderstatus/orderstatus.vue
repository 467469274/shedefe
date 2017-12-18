<template>
  <div class="orderStatus">
    <div class="statusItem" :class="{'active':orderType==1||orderType==2||orderType==3||orderType==4}">
      <span class="icon"></span>
      <p class="title">预约</p>
    </div>
    <div class="statusItem" :class="{'active':orderType==5}">
      <span class="icon"></span>
      <p class="title">发送</p>
    </div>
    <div class="statusItem" :class="{'active':orderType==7}">
      <span class="icon"></span>
      <p class="title">使用</p>
    </div>
    <div class="statusItem" :class="{'active':orderType==8||orderType==9||orderType==10}">
      <span class="icon"></span>
      <p class="title">发还</p>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
    export default{
      props:{
        orderType:{
          type:Number
        }
      }
    }
</script>
<style>
  @import "../../assets/css/orderStatus/orderStatus.css";
</style>
