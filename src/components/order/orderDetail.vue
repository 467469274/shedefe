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
      <p class="ortherP" style="margin-bottom: .19rem">
        发送网点:&nbsp;{{sendwd}}
      </p>
      <span class="lookwl"
            @click="looglogistics">查看物流</span>
    </div>
    <div class="allPic">
      <p class="title">
        商品全家福
      </p>
      <img src="/static/images/banner_02.jpg">
    </div>
    <div class="orderCommList">
      <div class="orderCommItem">
        <div class="commInfo">
          <img src="/static/images/banner_02.jpg">
          <div class="txt">
            <p class="title">
              索尼a6000微单反相机镜头
            </p>
            <p class="t1">
              租金：¥396+（10天-7天）*¥59=¥698
            </p>
            <p class="t1">
              租金：¥396+（10天-7天）*¥59=¥698
            </p>
          </div>
        </div>
        <div class="equipmentInfo">
          <div class="equipmentInner">
            <p class="num">
              设备序列号：1151642dfefewrfe156151
            </p>
            <p class="title">
              设备描述
            </p>
            <p class="des">
              索尼照相机走的是高端时尚前卫路线,CCD技术先进，便携中CCD技术先进，便携中的高像素，自动捕捉头像，而且索尼照相机还支持笑脸快门，可以捕捉精彩的一瞬间。
            </p>
            <div class="imgs">
              <img src="/static/images/banner_02.jpg">
              <img src="/static/images/banner_02.jpg">
              <img src="/static/images/banner_02.jpg">
              <img src="/static/images/banner_02.jpg">
              <img src="/static/images/banner_02.jpg">
              <img src="/static/images/banner_02.jpg">
              <img src="/static/images/banner_02.jpg">
            </div>
          </div>
        </div>
      </div>
      <div class="orderCommItem">
        <div class="commInfo">
          <img src="/static/images/banner_02.jpg">
          <div class="txt">
            <p class="title">
              索尼a6000微单反相机镜头
            </p>
            <p class="t1">
              租金：¥396+（10天-7天）*¥59=¥698
            </p>
            <p class="t1">
              租金：¥396+（10天-7天）*¥59=¥698
            </p>
          </div>
        </div>
        <div class="equipmentInfo">
          <div class="equipmentInner">
            <p class="num">
              设备序列号：1151642dfefewrfe156151
            </p>
            <p class="title">
              设备描述
            </p>
            <p class="des">
              索尼照相机走的是高端时尚前卫路线,CCD技术先进，便携中CCD技术先进，便携中的高像素，自动捕捉头像，而且索尼照相机还支持笑脸快门，可以捕捉精彩的一瞬间。
            </p>
            <div class="imgs">
              <img src="/static/images/banner_02.jpg">
              <img src="/static/images/banner_02.jpg">
              <img src="/static/images/banner_02.jpg">
              <img src="/static/images/banner_02.jpg">
              <img src="/static/images/banner_02.jpg">
              <img src="/static/images/banner_02.jpg">
              <img src="/static/images/banner_02.jpg">
            </div>
          </div>
        </div>
      </div>
      <div class="orderCommItem">
        <div class="commInfo">
          <img src="/static/images/banner_02.jpg">
          <div class="txt">
            <p class="title">
              索尼a6000微单反相机镜头
            </p>
            <p class="t1">
              租金：¥396+（10天-7天）*¥59=¥698
            </p>
            <p class="t1">
              租金：¥396+（10天-7天）*¥59=¥698
            </p>
          </div>
        </div>
        <div class="equipmentInfo">
          <div class="equipmentInner">
            <p class="num">
              设备序列号：1151642dfefewrfe156151
            </p>
            <p class="title">
              设备描述
            </p>
            <p class="des">
              索尼照相机走的是高端时尚前卫路线,CCD技术先进，便携中CCD技术先进，便携中的高像素，自动捕捉头像，而且索尼照相机还支持笑脸快门，可以捕捉精彩的一瞬间。
            </p>
            <div class="imgs">
              <img src="/static/images/banner_02.jpg">
              <img src="/static/images/banner_02.jpg">
              <img src="/static/images/banner_02.jpg">
              <img src="/static/images/banner_02.jpg">
              <img src="/static/images/banner_02.jpg">
              <img src="/static/images/banner_02.jpg">
              <img src="/static/images/banner_02.jpg">
            </div>
          </div>
        </div>
      </div>
      <div class="orderCommItem">
        <div class="commInfo">
          <img src="/static/images/banner_02.jpg">
          <div class="txt">
            <p class="title">
              索尼a6000微单反相机镜头
            </p>
            <p class="t1">
              租金：¥396+（10天-7天）*¥59=¥698
            </p>
            <p class="t1">
              租金：¥396+（10天-7天）*¥59=¥698
            </p>
          </div>
        </div>
        <div class="equipmentInfo">
          <div class="equipmentInner">
            <p class="num">
              设备序列号：1151642dfefewrfe156151
            </p>
            <p class="title">
              设备描述
            </p>
            <p class="des">
              索尼照相机走的是高端时尚前卫路线,CCD技术先进，便携中CCD技术先进，便携中的高像素，自动捕捉头像，而且索尼照相机还支持笑脸快门，可以捕捉精彩的一瞬间。
            </p>
            <div class="imgs">
              <img src="/static/images/banner_02.jpg">
              <img src="/static/images/banner_02.jpg">
              <img src="/static/images/banner_02.jpg">
              <img src="/static/images/banner_02.jpg">
              <img src="/static/images/banner_02.jpg">
              <img src="/static/images/banner_02.jpg">
              <img src="/static/images/banner_02.jpg">
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
      <p class="allNum">
        合计:<span class="red">
        租金￥2000  押金￥3000
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
      <p class="wz1">
        下单时间：{{createTime}}
      </p>
      <p class="wz1">
        延期费用：¥{{yq}}
      </p>
      <p class="wz1">
        延期费用：¥{{yjtk}}
      </p>
      <p class="wz1">
        租金退款：¥{{zjtk}}
      </p>
      <p class="wz2">
        商品发还验收后24小时内退还剩余费用
      </p>
    </div>
    <div class="adminInfo borderb2">
      <p class="title">
        管理员操作备注
      </p>
      <p class="wz1">
        待确认：
        已通过审核，将尽快为您安排发货
      </p>
      <p class="wz1">
        待确认：
        已通过审核，将尽快为您安排发货
      </p>
      <p class="wz1">
        待确认：
        已通过审核，将尽快为您安排发货
      </p>
      <p class="wz1">
        待确认：
        已通过审核，将尽快为您安排发货
      </p>
    </div>
    <div class="adminInfo aboutInfo">
      <p class="title">相关注意事项</p>
      <a href="http://www.baidu.com">
        链接1
      </a>
      <a href="http://www.baidu.com">
        链接1
      </a>
      <a href="http://www.baidu.com">
        链接1
      </a>
      <a href="http://www.baidu.com">
        链接1
      </a>
      <a href="http://www.baidu.com">
        链接1
      </a>
      <a href="http://www.baidu.com">
        链接1
      </a>
      <a href="http://www.baidu.com">
        链接1
      </a>
    </div>
    <div class="bottom">
      <span class="btn cancel">取消订单</span>
      <span class="btn gopay">支付租金</span>
      <span class="btn gopay" @click="goreturn">商品返还</span>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import orderStatus from '../orderStatus/orderStatus.vue'
  export default{
    data(){
      return {
        orderStatus: 1,
        userName: '何沙乐',
        tel: '15610433391',
        sendLocation: '北京丰台区丰台街道宋家庄苇子坑149号庄子商务楼北楼一层新墨公司',
        sendwd: '北京',
        orderNum: '201706260812001',
        createTime: '2017-06-26 13:45',
        yq: '560',
        yjtk: '560',
        zjtk: '560'
      }
    },
    components: {
      orderStatus
    },
    methods:{
      looglogistics(){
        this.$router.push({path: '/logistics/1'});
      },
      goreturn(){
        this.$router.push({path: '/returnComm/'+this.$route.params.id});
      }
    }
  }
</script>
<style>
  @import "../../assets/css/order/orderDetail.css";
</style>
