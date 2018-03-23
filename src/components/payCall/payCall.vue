<template>
  <div class="payCall">
    <div class="payCallMain">
      <img :src="imgSrc" alt="">
      <p class="title" v-show="type=='success'">支付成功</p>
      <p class="title" v-show="type!='success'">费用未支付</p>
      <p class="mesg" v-show="type!='success'">超过24小时未支付，订单将自动取消</p>
      <p class="mesg" v-show="type=='success'">您已成功提交订单，我们会尽快为您确认商品档期</p>
      <div class="btns" v-show="type!='success'">
        <span class="btn" @click="orderList">订单列表</span>
        <span class="btn ri pay" @click="goPay">立即支付</span>
      </div>
      <div class="btns" v-show="type=='success'">
        <span class="btn" @click="lookDetail">查看订单</span>
        <span class="btn ri pay" @click="goIndex">返回主页</span>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {mapState, mapActions, mapGetters} from 'vuex'
  export default{
      data(){
        return{
          type:''
        }
      },
      created(){
        document.title = '支付结果';
        this.type = this.gpar.split(',')[1];
      },
      methods:{
        orderList(){
          window.location='/#/order'
        },
        goPay(){
          let _this =this;
          let orderId = _this.gpar.split(',')[0];
          let type =  _this.gpar.split(',')[1];
          _this.ajpost('/api/WeixinHandler', {out_trade_no: orderId, paytype:type}, function (payData) {
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
          window.location='/#/order/'
    }
      },
      computed:{
        ...mapGetters(['gpar']),
        imgSrc(){
          let _this = this;
          if( _this.gpar.split(',')[1]!='success'){
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
