<template>
  <div class="returnWarp">
    <div class="retop">
      <div class="top">
        <p class="wz1">
          返还时间：请在 <span class="co">2017-06-25日前包括25日</span>寄出
        </p>
        <p class="wz1">
          返还时间：收货人：舍得叔叔相机铺  17600220747
        </p>
        <p class="wz2">
          返还地址：北京丰台区丰台街道宋家庄苇子坑149号庄子商务楼北楼一层新墨公司
        </p>
      </div>
    </div>
    <div class="main">
      <div class="top">
        <input type="text" class="num" placeholder="请输入物流单号">
        <span class="btn">还货</span>
      </div>
      <div class="middle">
        <p class="wz1">*发还地址可能存在变动，请以最终提交发还时显示地址为准</p>
        <p class="wz1">*目前仅支持顺丰快递，如果延期归还则会受到一定的押金扣除。</p>
        <p class="wz2">
          <a href="http://www.baidu.com">了解详细规则</a>
        </p>
      </div>
      <img src="/static/images/dkqwpok_02.png" alt="">
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
    export default{
      created(){
        window.title='商品返还'
      }
    }
</script>
<style>
  @import "../../assets/css/return/return.css";
</style>
