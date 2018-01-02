<template>
  <div class="commdetailWarp">
    <div class="swiperWarp">
      <mt-swipe :auto="4000" class="siwper">
        <mt-swipe-item v-for="(item,index) in comm.pic"
                       :key="index">
          <img :src="item">
        </mt-swipe-item>
      </mt-swipe>
      <div class="kuaisu" @click="isShowFun" :class="{'isShowClass':isShow}">
       <div class="btnList">
         <span class="leftIcon"></span>
         <span class="iconTxt"  v-if="!isShow">快速导航</span>
         <div class="items" v-if="isShow">
           <div class="item" @click.stop="gos(1)">
             <p class="itemIcon"><img src="/static/images/loa.png" alt=""></p>
             <p class="itemTxt">租相机</p>
           </div>
           <div class="item" @click.stop="gos(2)">
             <p class="itemIcon"><img src="/static/images/loa.png" alt=""></p>
             <p class="itemTxt">形形色色</p>
           </div>
           <div class="item" @click.stop="goCart">
             <p class="itemIcon"><img src="/static/images/loa.png" alt=""></p>
             <p class="itemTxt">购物车</p>
           </div>
           <div class="item" @click.stop="gos(4)">
             <p class="itemIcon"><img src="/static/images/loa.png" alt=""></p>
             <p class="itemTxt">查订单</p>
           </div>
         </div>
       </div>
      </div>
    </div>
    <div class="commInfo">
      <p class="title sl">
        {{comm.name}}
      </p>
      <p class="numMen">
        {{comm.sale_num}}人用过
      </p>
      <div class="labalList">
        <span v-for="(item,index) in comm.lname">{{item}}</span>
      </div>
    </div>
    <div class="numInfo">
      <div class="numItem">
        <p class="title">¥{{comm.start_price}}/{{comm.start_days}}天</p>
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
    <div class="strategy" v-show="hasgl" @click="isShowgl = !isShowgl">
      <img src="/static/images/shoubashou_03.png" alt="">
    </div>
    <div class="cardItem" @click="gocomment">
      <div class="inner borderbo">
        综合评价
        <span style="float: right;margin-right:.4rem;padding-top: .05rem;margin-left: 10px">({{parseInt(comm.star)}})</span><start :start="comm.star"  style="float: right;margin-top: .3rem;"></start>
      </div>
    </div>
    <div class="cardItem bor2" @click="godetail">
      <div class="inner">
        图文详情
      </div>
    </div>
    <div class="mesg">
      *支付租金即预约，发货前支付押金
    </div>
    <div class="bottom">
      <div class="cart" @click="goCart">
        <span class="iconsss"></span>
        <p class="txt">购物车</p>
      </div>
      <div class="r">
        <span class="btn" style="background: #c942b3" @click="addCart">加入购物车</span>
        <!--<span class="btn" style="background: #c942b3" @click="payNow">立即预约</span>-->
      </div>
    </div>
    <div class="thers" v-show="isShowgl" @click="isShowgl = !isShowgl">
      <p class="theTittle">使用攻略</p>
      <div class="detailOver">
        <!--itesm.study_url-->
        <p v-for="(itesm,indexs) in gl" @click.stop="got(itesm.study_url)">
          {{itesm.study_name}}
        </p>
      </div>
      <div class="backBtn">返回</div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import { Swipe, SwipeItem,MessageBox } from 'mint-ui'
  import detail from '../comm/detail.vue'
  import {mapState, mapActions, mapGetters} from 'vuex'
  import start from '../start/start.vue'
  export default{
    name: 'commdetail',
    data(){
      return {
        picList: [],
        comm: {},
        isShow:false,
        gl:[],
        hasgl:false,
        isShowgl:false
      }
    },
    created(){
      document.documentElement.scrollTop = 0;
      this.getData()
    },
    methods: {
      ...mapActions(['aars']),
      getData(){
        let _this = this;
        this.ajget('/api/goodsDetail', {goods_id: _this.$route.params.id}, function (data) {
          data.lname = data.lname.split(",");
          _this.comm = data;
        })
        this.ajget('/api/study', {goods_id: _this.$route.params.id}, function (data) {
          _this.gl = data;
          console.log(data)
          if(data.length>0){
            _this.hasgl = true
          }
        })
      },
      isShowFun(){
        this.isShow = !this.isShow
      },
      got(url){
        console.log()
        window.location= ''+url
      },
      gos(n){
        if(n == 1){
          this.$router.push({path: '/index'});
        }
        console.log()
      },
      godetail(){
        this.$router.push({path: '/detail/'+this.$route.params.id});
      },
      gocomment(){
        this.$router.push({path: '/comment/'+this.$route.params.id});
      },
      payNow(){
        this.aars(this.$route.params.id);
        this.$router.push({path: '/cartend'});
      },
      addCart(){
        let _this = this;
        _this.ajpost('/api/cartAdd',{goods_id:_this.$route.params.id},function(data){
          if(data.error_msg == '加入购物车成功'){
            MessageBox('提示', '添加成功');
          }else if(data.error_msg == '购物车中已存在，请勿重复添加'){
            MessageBox('提示', '购物车中已存在，请勿重复添加');
          }
        })
      },
      goCart(){
        window.location='/#/cart'
      }
    },
    components:{
      start
    }
  }
</script>
<style>
  @import "../../assets/css/commdetail/commdetail.css";
</style>
