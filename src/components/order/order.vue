<template>
  <div class="orderWarp">
    <div class="ordertabs">
      <div class="ordtab" @click="check(0)"
           :class="{'active':type == 0}">
        <span class="inner">全部</span>
      </div>
      <div class="ordtab" @click="check(1)"
           :class="{'active':type == 1}">
        <span class="inner">进行中</span>
      </div>
      <div class="ordtab" @click="check(2)"
           :class="{'active':type == 2}">
        <span class="inner">已完成</span>
      </div>
    </div>
    <ul class="orderList">
      <li class="orderItem">
        <p class="orderTop">
          <span class="orderNum">订单号:&nbsp;&nbsp;&nbsp;2152033689721</span>
          <span class="orderType">待支付租金</span>
        </p>
        <div class="commList">
          <div class="commItem">
            <img src="/static/images/jjd.jpg" alt="">
            <div class="txt">
              <p class="title sl">
                索尼a6000微单反相机镜头索尼a6000微单反相机镜头索尼a6000微单反相机镜头索尼a6000微单反相机镜头索尼a6000微单反相机镜头索尼a6000微单反相机镜头索尼a6000微单反相机镜头
              </p>
              <p class="t2">
                租金：¥396+（10天-7天）*¥59=¥698
              </p>
              <p class="t2">
                押金：¥396+（10天-7天）*¥59=¥698
              </p>
            </div>
          </div>
        </div>
        <div class="orderInfo">
          <div class="infoTop">
            <div class="le kdj">
              <p class="title">
                收到时间
              </p>
              <p class="date">2017年12月17日</p>
            </div>
            <div class="middle kdj">
              <p class="title">
                租期
              </p>
              <p class="day">
                20天
              </p>
            </div>
            <div class="re kdj">
              <p class="title">
                返还时间
              </p>
              <p class="date">2017年12月17日</p>
            </div>
          </div>
          <p class="infoBottom">
            费用合计：<span class="red">租金￥2000</span> <span
            class="red">押金￥30000</span>
          </p>
        </div>
        <div class="goOrder">
          支付租金
        </div>
        <p class="mesg">
          请等待管理员审核订单，通过后请按时支付押金。
        </p>
      </li>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
  export default{
    data(){
      return {
        type: 0,
      }
    },
    methods: {
      check(n){
        this.type = n
      }
    }
  }
</script>
<style>
  @import "../../assets/css/order/orderlist.css";
</style>
