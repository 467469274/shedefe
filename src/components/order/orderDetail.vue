<template>
  <div class="orderDetail">
    <orderStatus :orderType="orderStatus"></orderStatus>
    <div class="lastTime">
      <p class="title">未支付</p>
      <p class="lastDate">请于 2小时35分 内支付租金</p>
    </div>
    <div class="sendInfo">
      <p class="title">
        发送信息
      </p>
      <p class="ortherP">
        收货人:&nbsp;{{userName}}&nbsp;&nbsp;{{tel}}
      </p>
      <p class="ortherP">
        发送地址:&nbsp;{{sendLocation}}
      </p>
      <span class="lookwl"
            @click="looglogistics" v-if="orderStatus>4">查看物流</span>
    </div>
    <div class="allPic" v-if="all_pic">
      <p class="title">
        商品全家福
      </p>
      <img :src=all_pic>
    </div>
    <div class="orderCommList">
      <div class="orderCommItem" v-for="(it,ins) in get_goodsname">
        <div class="commInfo">
          <img :src=it.goods_pic>
          <div class="txt">
            <p class="title">
              {{it.goods_name}}
            </p>
            <p class="t1">
              租金：¥{{it.start_price}}+（{{it.start_days}}天-{{tenancy}}天）*¥{{it.keep_price}}=¥{{it.start_price+(it.start_days-tenancy)*it.keep_price}}
            </p>
            <p class="t1">
              押金：¥{{it.goods_deposit}}
            </p>
          </div>
        </div>
        <!--  -->
        <div class="equipmentInfo">
          <div class="equipmentInner" v-for="(e,s) in it.get_equipment">
            <p class="num">
              设备序列号：{{e.number}}<span style="float: right">颜色：{{e.color}}</span>
            </p>
            <p class="title">
              设备描述
            </p>
            <p class="des">
              索尼照相机走的是高端时尚前卫路线,CCD技术先进，便携中CCD技术先进，便携中的高像素，自动捕捉头像，而且索尼照相机还支持笑脸快门，可以捕捉精彩的一瞬间。
            </p>
            <div class="imgs">
              <img :src=httptxt+ik.pic_url v-for="(ik,ilq) in e.has_manypics">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="p23 padding0 borderb2">
      <div class="infoTop">
        <div class="le kdj">
          <p class="title">
            收到时间
          </p>
          <p class="date">{{get_goods}}</p>
        </div>
        <div class="middle kdj">
          <p class="title">
            租期
          </p>
          <p class="day">
            {{tenancy}}天
          </p>
        </div>
        <div class="re kdj">
          <p class="title">
            返还时间
          </p>
          <p class="date">{{back_goods}}</p>
        </div>
      </div>
      <p class="allNum">
        合计:<span class="red">
        租金￥{{rent}}  押金￥{{deposit}}
      </span>
      </p>
    </div>
    <div class="orderInfo borderb2">
      <p class="wz1">
        订单编号：{{orderNum}}
      </p>
      <p class="wz1">
        下单时间：{{createTime}}
      </p>
      <p class="wz1" v-if="delay_total!=null">
        延期费用：¥{{delay_total}}
      </p>
      <p class="wz1">
        押金退款：¥{{back_deposit}}
      </p>
      <p class="wz1">
        租金退款：¥{{back_rent}}
      </p>
      <p class="wz2">
        商品发还验收后24小时内退还剩余费用
      </p>
    </div>
    <div class="adminInfo borderb2" v-if="get_remark.length>0">
      <p class="title" v-for="(iqwe,iwqd) in get_remark">
        {{iqwe}}
      </p>
    </div>
    <div class="adminInfo aboutInfo">
      <p class="title">相关注意事项</p>
      <a :href="item.link" v-for="(item,ins) in prizeList">
        {{item.title}}
      </a>
    </div>
    <div class="bottom">
      <!---->
      <span class="btn cancel" @click="cancelOrder" v-if="orderStatus==2">取消订单</span>
      <span class="btn gopay" @click="pay(1)" v-if="orderStatus==1">支付租金</span>
      <span class="btn gopay" @click="pay(2)" v-if="orderStatus==3">支付押金</span>
      <span class="btn gopay" @click="goreturn" v-if="orderStatus==7">商品返还</span>
      <span class="btn gopay" @click="addDay" v-if="orderStatus==7">延期申请</span>
      <span class="btn gopay" @click="looglogistics" v-if="orderStatus==5">查看物流</span>
      <span class="btn gopay" @click="shouhuoyichang" v-if="orderStatus==5">收货异常</span>
      <span class="btn gopay" @click="goelva" v-if="orderStatus==10">评价</span>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import orderStatus from '../orderStatus/orderStatus.vue'
  import { MessageBox,Toast } from 'mint-ui';
  export default{
    data(){
      return {
        orderStatus: 1,
        userName: '何沙乐',
        tel: '15610433391',
        sendLocation: '北京丰台区丰台街道宋家庄苇子坑149号庄子商务楼北楼一层新墨公司',
        orderNum: '201706260812001',
        createTime: '2017-06-26 13:45',
        delay_total: '',
        back_deposit: '',
        back_rent: '',
        tenancy:'',
        get_goods:'',
        back_goods:'',
        deposit:"",
        rent:"",
        all_pic:'',
        get_goodsname:[],
        get_remark:[],
        httptxt:'http://shede.sinmore.vip/storage/equipment/',
        prizeList:[]
      }
    },
    components: {
      orderStatus
    },
    created(){
      let _this = this;
      this.getData();
      this.ajget('/api/getContentByPostion', {text_location:2}, function (datas) {
        console.log(datas)
        _this.prizeList = datas;
      }, function (errs) {
        console.log(errs)
      });
    },
    methods:{
      looglogistics(){
        this.$router.push({path: '/logistics/1'});
      },
      goreturn(){
        this.$router.push({path: '/returnComm/'+this.$route.params.id});
      },
      getData(){
        let orderSn = this.$route.params.id;
        let _this = this;
        _this.ajpost('/api/orderDetail',{order_id:orderSn},function (data) {
          console.log(data)
          _this.orderStatus = data.data.type;
          _this.sendLocation = data.data.address;
          _this.userName = data.data.consignee;
          _this.tel = data.data.mobile;
          _this.tenancy = data.data.tenancy;
          _this.get_goods = data.data.get_goods;
          _this.back_goods = data.data.back_goods;
          _this.rent = data.data.rent;
          _this.deposit = data.data.deposit;
          _this.orderNum = data.data.order_sn;
          _this.all_pic = data.data.all_pic;
          _this.get_goodsname = data.data.get_goodsname;
          _this.delay_total = data.data.delay_total;
          _this.back_rent = data.data.back_rent;
          _this.get_remark = data.data.get_remark;
          _this.back_deposit = data.data.back_deposit;
        },function (err) {
          console.log(err)
        })
      },
      cancelOrder(){
        let _this = this;
        MessageBox({
          title: '提示',
          message: '确定要取消此订单?',
          showCancelButton: true
        }).then(action => {
          if(action == 'confirm'){
            _this.ajpost('/api/orderAbandon',{
              order_id:_this.$route.params.id
            },function (data) {
              console.log(data);
              window.location ='/#/order'
            })
          }
        });
        /**/
      },
      addDay(){
      },
      pay(n){
        let _this =this;
        _this.ajpost('/api/WeixinHandler', {out_trade_no: _this.orderNum, paytype: n}, function (payData) {
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
                window.location='/#/payCall/'+data.data.order_sn+'/'+''+n+''
              }else{
                window.location='/#/payCall/'+data.data.order_sn+'/'+''+n+''
              }
            });
        },function(err){console.log(err)});
      },
      shouhuoyichang(){
        let _this = this;
        _this.ajpost('/api/orderabnormal',{order_id:_this.$route.params.id},function (data) {
          if(data.error_code ==0){
            Toast('成功');
          }else{
            Toast(''+data.error_msg+'');
          }
        })
      },
      goelva(){

      }
    }
  }
</script>
<style>
  @import "../../assets/css/order/orderDetail.css";
</style>
