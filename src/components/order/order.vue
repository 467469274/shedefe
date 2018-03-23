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
      <li class="orderItem"@click="goDetail(item.id)" v-for="(item,index) in orderList">
        <p class="orderTop">
          <span class="orderNum">订单号:&nbsp;&nbsp;&nbsp;{{item.order_sn}}</span>
          <span class="orderType">{{item.type | order}}</span>
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
        <div class="goOrder" @click.stop="gopay(item.order_sn,1)" v-if="item.type == 1">
          支付租金
        </div>
        <div class="goOrder" @click.stop="gopay(item.order_sn,2)" v-if="item.type == 3">
          支付押金
        </div>
        <div class="goOrder" @click.stop="orderErro(item.order_sn)" v-if="item.type == 6">
          收货异常
        </div>
        <div class="goOrder" @click.stop="addDay(item)" v-if="item.type == 7 &&item.status ==2">
          申请延期
        </div>
        <div class="goOrder" @click.stop="commBack(item)" v-if="item.type == 7">
          商品发还
        </div>
        <div class="goOrder" @click.stop="ela(item.order_sn)" v-if="item.type == 10">
          去评价
        </div>
        <p class="mesg">
          <span v-if="item.type == 1">请于{{item.overdue_time}} 前支付租金</span>
          <span v-if="item.type == 0">已为您取消本次订单，如有需要请再次下单。</span>
          <span v-if="item.type == 2">请等待管理员审核订单，通过后请按时支付押金。</span>
          <!--<span v-if="item.type == 3">请您于{{item.overdue_time}}之前支付押金</span>-->
          <span v-if="item.type == 9">正在为您处理退款事宜</span>
          <span v-if="item.type == 7">如有需要，可以申请延期发还商品一次哦~</span>
          <span v-if="item.type == 8">我们将在收到包裹24小时内完成审核</span>
          <span v-if="item.type ==10">优秀评价可获得现金奖励哦</span>
        </p>
      </li>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
  import {Toast} from 'mint-ui';
  import {mapState, mapActions, mapGetters} from 'vuex'
  export default{
    filters: {
      order(data) {
        console.log(data)
        switch (data) {
          case 0:
            return '关闭订单';
          case 1:
            return '待支付租金';
          case 2:
            return '待确认';
          case 3:
            return '待支付押金';
          case 4:
            return '已支付押金待发货';
          case 5:
            return '已发货待收货';
          case 6:
            return '收货异常中';
          case 7:
            return '确认收货使用中';
          case 8:
            return '发还中待商家确认收货';
          case 9:
            return '商家确认收货待退款';
          case 10:
            return '已退';
          case 11:
            return '已评价';
        }
      }
    },
    data(){
      return {
        type: 1,
        orderList:[]
      }
    },
    created(){
      this.getData();
      document.title = '订单列表'
    },
    methods: {
      ...mapActions(['apar','aorderId']),
      check(n){
        this.type = n;
        this.getData();
      },
      goDetail(n){
        this.aorderId(n);
        this.$router.push({path: '/orderDetail'});
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
                /*let ke = data.data.order_sn+','+'success';
                _this.apar(ke);
                window.location='/#/payCall'*/
                _this.getData();
              }else if(call == 'get_brand_wcpay_request:cancel'){
                let ke = data.data.order_sn+','+''+type+'';
                _this.apar(ke);
                window.location='/#/payCall'
              }else{
                let ke = data.data.order_sn+','+''+type+'';
                _this.apar(ke)
                window.location='/#/payCall'
              }
            });
        },function(err){console.log(err)});
      },
      cancel(orderSn){
        let _this = this;
        MessageBox({
          title: '提示',
          message: '确定要取消此订单?',
          showCancelButton: true
        }).then(action => {
          if(action == 'confirm'){
            _this.ajpost('/api/orderAbandon',{
              order_id:orderSn
            },function (data) {
              window.location ='/#/order'
            })
          }
        });
      },
      orderErro(orderSn){
        let _this = this;
        _this.ajpost('/api/orderabnormal',{order_id:orderSn},function (data) {
          if(data.error_code == 0){
            Toast('成功');
            _this.getData()
          }else {
            Toast(''+data.error_msg+'');
          }
        })
      },
      addDay(orderSn){
        window.localStorage.orderId = orderSn.id;
        window.location='/#/addDay'
      },
      commBack(orderSn){
        window.location = '/#/returnComm/'+orderSn.id;
      },
      ela(orderSn){
        window.location = '/#/usercomment/'+orderSn;
      }
    }
  }
</script>
<style>
  @import "../../assets/css/order/orderlist.css";
</style>
