<template>
  <div class="orderWarp">
    <div class="ordertabs">
      <div class="ordtab" @click="check(1)"
           :class="{'active':type == 1}">
        <span class="inner">全部</span>
      </div>
      <div class="ordtab" @click="check(2)"
           :class="{'active':type == 2}">
        <span class="inner">进行中</span>
      </div>
      <div class="ordtab" @click="check(3)"
           :class="{'active':type == 3}">
        <span class="inner">已完成</span>
      </div>
    </div>
    <ul class="orderList">
      <li class="orderItem"@click="goDetail" v-for="(item,index) in orderList">
        <p class="orderTop">
          <span class="orderNum">订单号:&nbsp;&nbsp;&nbsp;{{item.order_sn}}</span>
          <span class="orderType">待支付租金</span>
        </p>
        <div class="commList">
          <div class="commItem" v-for="(it,ix) in item.get_goodsname">
            <img :src=it.goods_pic alt="">
            <div class="txt">
              <p class="title sl">
                {{it.goods_name}}
              </p>
              <p class="t2">
                租金：¥{{it.start_price}}+（{{item.tenancy}}天-{{it.start_days}}天）*¥{{it.keep_price}}=¥{{it.start_price+(item.tenancy-it.start_days)*it.keep_price}}
              </p>
              <p class="t2">
                押金：{{it.goods_deposit}}
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
              <p class="date">
                {{item.get_goods}}
              </p>
            </div>
            <div class="middle kdj">
              <p class="title">
                租期
              </p>
              <p class="day">
                {{item.tenancy}}天
              </p>
            </div>
            <div class="re kdj">
              <p class="title">
                返还时间
              </p>
              <p class="date">{{item.back_goods}}</p>
            </div>
          </div>
          <p class="infoBottom">
            费用合计：<span class="red">租金￥{{item.rent}}</span> <span
            class="red">押金￥{{item.deposit}}</span>
          </p>
        </div>
        <div class="goOrder" @click="gopay(item.order_sn,1)">
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
        type: 1,
        orderList:[]
      }
    },
    created(){
      this.getData()
    },
    methods: {
      check(n){
        this.type = n;
        this.getData();
      },
      goDetail(n){
        this.$router.push({path: '/orderDetail/'+n});
      },
      getData(){
        let _this  = this ;
        let objs = {type:_this.type}
        _this.ajpost('/api/orderList',objs,function(data){
          console.log(data.data)
          _this.orderList = data.data;
        },function(erro){
        })
      },
      gopay(orderSn,type){
        let _this = this;
        _this.ajpost('/api/WeixinHandler', {out_trade_no: orderSn, paytype: type}, function (payData) {
          let dataqq = JSON.parse(payData.data.status);
          WeixinJSBridge.invoke(
            'getBrandWCPayRequest',
            {
              appId:dataqq.appId,
              nonceStr:dataqq.nonceStr,
              package:dataqq.package,
              paySign:dataqq.paySign,
              signType:dataqq.signType,
              timeStamp:dataqq.timeStamp
            },
            function(res){
              console.log(res);
              let call = res.err_msg;
              if(call == 'get_brand_wcpay_request:ok'){
                window.location='/#/payCall/'+data.data.order_sn+'/'+'success'
              }else if(call == 'get_brand_wcpay_request:cancel'){
                window.location='/#/payCall/'+data.data.order_sn+'/'+''+1+''
              }else{
                window.location='/#/payCall/'+data.data.order_sn+'/'+''+1+''
              }
            });
        },function(err){console.log(err)});
      }
    }
  }
</script>
<style>
  @import "../../assets/css/order/orderlist.css";
</style>
