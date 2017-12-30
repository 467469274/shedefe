<template>
  <div class="payCall">
    <div class="payCallMain">
      <img :src="imgSrc" alt="">
      <p class="title">费用未支付</p>
      <p class="mesg">超过24小时未支付，订单将自动取消</p>
      <div class="btns" v-show="this.$route.params.type!='success'">
        <span class="btn" @click="orderList">订单列表</span>
        <span class="btn ri pay" @click="goPay">立即支付</span>
      </div>
      <div class="btns" v-show="this.$route.params.type=='success'">
        <span class="btn" @click="lookDetail">查看订单</span>
        <span class="btn ri pay" @click="goIndex">返回主页</span>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
    export default{
      data(){
        return{
        }
      },
      created(){
      },
      methods:{
        orderList(){
          window.location='/#/order'
        },
        goPay(){
          let _this =this;
          _this.ajpost('/api/WeixinHandler', {out_trade_no: _this.$route.params.id, paytype:_this.$route.params.type}, function (payData) {
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
//                    alert('支付成功')
                }else if(call == 'get_brand_wcpay_request:cancel'){
//                    alert('支付过程中用户取消')
                }else{
//                    alert('支付失败');
                }
              });
          },function(err){console.log(err)});
        },
        goIndex(){
          window.location='/#/index'
        },
        lookDetail(){
          window.location='/#/orderDetail'+_this.$route.params.id
        }
      },
      computed:{
        imgSrc(){
          if(this.$route.params.id!='success'){
            return '/static/images/cancel.png'
          }else {
            return '/static/images/success.png'
          }
        }
      }
    }
</script>
<style>
  @import "../../assets/css/payCall/payCall.css";
</style>
