<template>
  <div class="agreementWarp">
    <div class="title">
      首部及导言
    </div>
    <p class="item">

      1.1本协议是您与腾讯之间关于用户使用腾讯相关服务所订立的协议。“腾讯”是指腾讯公司及其相关服务可能存在的运营关联单位。“用户”是指使用腾讯相关服务的使用人，在本协议中更多地称为“您”。



    </p>
    <p class="item">
      1.2本协议项下的服务是指腾讯向用户提供的包括但不限于即时通讯、网络媒体、互联网增值、互动娱乐、电子商务和广告等产品及服务（以下简称“本服务”）。


    </p>
    <p class="item">
      1.3本协议内容同时包括《QQ号码规则》（链接地址：
      http://zc.qq.com/chs/agreement1_chs.html）和《隐私政策》（链接地址：
      http://www.qq.com/privacy.htm）,且您在使用腾讯某一特定服务时，该服务可能会另有单独的协议、相关业务规则等（以下统称为“单独协议”）。上述内容一经正式发布，即为本协议不可分割的组成部分，您同样应当遵守。您对前述任何业务规则、单独协议的接受，即视为您对本协议全部的接受。

    </p>
    <span class="ty" @click="gr">我已同意以上内容</span>
  </div>
</template>
<script type="text/ecmascript-6">
    export default{
      created(){
        document.title='服务协议'
      },
      methods:{
        gr(){
          this.$router.push({path: '/cartend/0'});
        }
      }
    }
</script>
<style>
  @import '../../assets/css/agreement/agreement.css';
</style>
