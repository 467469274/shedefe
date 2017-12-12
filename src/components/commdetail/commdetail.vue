<template>
  <div class="commdetailWarp">
    <mt-swipe :auto="4000" class="siwper">
      <mt-swipe-item v-for="(item,index) in comm.pic"
                     :key="index">
        <img :src="item">
      </mt-swipe-item>
    </mt-swipe>
    <div class="commInfo">
      <p class="title sl">
        {{comm.name}}
      </p>
      <p class="numMen">
        {{comm.sale_num}}人用过
      </p>
      <div class="labalList">
        <span>拍星星</span>
        <span>配件专区</span>
        <span>背景虚化</span>
        <span>全画幅</span>
        <span>风景</span>
        <span>拍星星</span>
        <span>配件专区</span>
        <span>背景虚化</span>
        <span>全画幅</span>
        <span>风景</span>
        <span>拍星星</span>
        <span>配件专区</span>
        <span>背景虚化</span>
        <span>全画幅</span>
        <span>风景</span>
      </div>
    </div>
    <div class="numInfo">
      <div class="numItem">
        <p class="title">¥{{comm.start_price}}/5天</p>
        <p class="other">
          起租价
        </p>
      </div>
      <div class="numItem">
        <p class="title">¥{{comm.keep_price}}</p>
        <p class="other">
          续租价
        </p>
      </div>
      <div class="numItem">
        <p class="title">¥{{comm.deposit}}</p>
        <p class="other">
          押金
        </p>
      </div>
    </div>
    <div class="strategy">
      <img src="/static/images/shoubashou_03.png" alt="">
    </div>
    <div class="cardItem">
      <div class="inner borderbo">
        综合评价
        
      </div>
    </div>
    <div class="cardItem bor2">
      <div class="inner">
        图文详情
      </div>
    </div>
    <div class="mesg">
      *支付租金即预约，发货前支付押金
    </div>
    <div class="bottom">
      <div class="cart">
        <span class="iconsss"></span>
        <p class="txt">购物车</p>
      </div>
      <div class="r">
        <span class="btn">加入购物车</span>
        <span class="btn" style="background: #c942b3">立即预约</span>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import { Swipe, SwipeItem } from 'mint-ui'
  export default{
    name: 'commdetail',
    data(){
      return {
        picList: [],
        comm: {}
      }
    },
    created(){
      this.getData()
    },
    methods: {
      getData(){
        let _this = this;
        this.ajget('/api/goodsDetail', {goods_id: _this.$route.params.id}, function (data) {
          console.log(data);
          _this.comm = data;

        })
      }
    }
  }
</script>
<style>
  @import "../../assets/css/commdetail/commdetail.css";
</style>
