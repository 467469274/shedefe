<template>
  <div class="returnWarp">
    <div class="retop">
      <div class="top">
        <p class="wz1">
          返还时间：请在 <span class="co">{{date}}日前包括{{date | de}}日</span>寄出
        </p>
        <p class="wz1">
          收货人：{{consignee}}&nbsp;&nbsp;&nbsp;&nbsp;{{telephone}}
        </p>
        <p class="wz2">
          返还地址：{{backInfo}}
        </p>
      </div>
    </div>
    <div class="main">
      <div class="top">
        <input type="text" v-model="nm" class="num" placeholder="请输入物流单号">
        <span class="btn" @click="back">还货</span>
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
  import {Toast} from 'mint-ui';

  export default {
    data() {
      return {
        date: '',
        consignee: '',
        backInfo: '',
        nm: ''
      }
    },
    filters: {
      de(time) {
        let date = new Date(time.replace(/-/g, '/'));
        return (date.getDate() > 9 ? date.getDate() : '0' + date.getDate())
      }
    },
    created() {
      document.title = '商品返还';
      let _this = this;
      _this.ajpost('/api/orderback', {order_id: _this.$route.params.id}, function (data) {
        _this.date = data.data.back_goods;
        _this.consignee = data.data.get_website.contacts;
        _this.telephone = data.data.get_website.telephone;
        _this.backInfo = data.data.get_website.province + ' ' + data.data.get_website.city + ' ' + data.data.get_website.area + ' ' + data.data.get_website.address;
      })
    },
    methods: {
      back() {
        let _this = this;
        if (_this.nm == '') {
          Toast('请填写物流编号');
          return;
        }
        _this.ajpost('/api/orderDeal', {order_id: _this.$route.params.id, back_odd_number: _this.nm}, function (data) {
          if (data.error_code == 0) {
            Toast('成功');
            window.location = '/#/orderDetail/' + _this.$route.params.id
          } else {
            Toast(''+data.error_msg+'');
          }
        })
      }
    }
  }
</script>
<style>
  @import "../../assets/css/return/return.css";
</style>
