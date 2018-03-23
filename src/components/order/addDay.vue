<template>
  <div class="addDay">
    <p class="addTap">
      请于发还日期（不超过该日）寄出退还包裹，每单最多可申
      请一次哦~
    </p>
    <div class="inputTap">延期天数

      <div class="btns">
            <span class="btn le"
                  @click="operDay('minus')"></span>
        <span class="t3">{{starNum | second }}</span>
        <span class="btn re"
              @click="operDay('add')"></span>
      </div>
    </div>
    <div class="inputTap">发还日期延后至：
      <span style="float: right;display: block">{{eetime}}</span>
    </div>
    <div class="inputTap">延期费用：
      <span style="float: right;display: block">{{endPrice}}</span>
    </div>
    <div class="pay" @click="pay">支付延期费用</div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {mapState, mapActions, mapGetters} from 'vuex'
  import {Toast} from 'mint-ui';
  export default {
    data() {
      return {
        starNum: 1,
        endDate: '2018-11-12',
        keep_price:999
      }
    },
    created() {
      document.title = '商品延期';
      let _this = this;
      _this.ajpost('/api/orderDetail', {order_id: window.localStorage.orderId}, function (data) {
        console.log(data);
        _this.endDate = data.data.back_goods;
        _this.keep_price = data.data.delay_total;
      })
    },
    methods: {
      ...mapActions(['apar']),
      operDay(op) {
        if (this.starNum < 0) {
          return;
        }
        if (op == 'minus' && this.starNum > 1) {
          this.starNum = this.starNum - 1;
        } else if (op == 'add') {
          this.starNum = this.starNum + 1;
        }
      },
      endDat(dd, AddDayCount) {
        dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期
        var y = dd.getFullYear();
        var m = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1);//获取当前月份的日期，不足10补0
        var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();//获取当前几号，不足10补0
        return y + "-" + m + "-" + d;
      }
      ,
      pay(){
        let _this = this;
        _this.ajpost('/api/delay',{
          order_id:window.localStorage.orderId,
          days:_this.starNum
        },function (data) {
          if(data.error_code !=0){
            Toast(data.error_msg);
            return;
          }
          let orderId = data.data.order_sn;
          _this.ajpost('/api/WeixinHandler', {out_trade_no: orderId, paytype: 3}, function (payData) {
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
                  let ke = _this.$route.params.id+','+'success';
                  _this.apar(ke);
                  window.location='/#/payCall'
                }else if(call == 'get_brand_wcpay_request:cancel'){
                  let ke = _this.$route.params.id+','+''+3+'';
                  _this.apar(ke);
                  window.location='/#/payCall'
                }else{
                  let ke = _this.$route.params.id+','+''+3+''
                  _this.apar(ke);
                  window.location='/#/payCall'
                }
              });
          },function(err){console.log(err)});
        },function (err) {
          console.log(err)
        })
      }
    },
    computed: {
      eetime() {
        let date = this.endDate.replace(/-/g,'/');
        let nowDate = new Date(date);
        let endDateq = this.endDat(nowDate, this.starNum);
        return endDateq;
      },
      endPrice(){
        return  this.keep_price*this.starNum
      }
    },
    filters: {
      second(time) {
        let nuk = time;
        if (nuk <= 9) {
          return '0' + '' + nuk + '';
        } else {
          return nuk;
        }
      }
    }
  }
</script>
<style>
  @import "../../assets/css/addDay/addDay.css";
</style>
