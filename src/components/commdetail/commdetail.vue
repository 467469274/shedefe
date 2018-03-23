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
             <p class="itemTxt">行行摄摄</p>
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
        {{comm.sale_num+comm.attach_sale_num}}人用过
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
    <div class="cardItem" @click="gocomment" style="border-top: 9px solid rgb(242,242,242);border-bottom: 9px solid rgb(242,242,242);" >
      <div class="inner borderbo" style="overflow: hidden;font-size: 12px;color:rgb(166,166,166);border: none">
        <span style="margin-right:.4rem;padding-top: .05rem;margin-left: 10px">(&nbsp;{{parseInt(comm.star)}}.0&nbsp;)</span>
        <start :start="parseInt(comm.star)"  style="float:left;margin-top: .3rem;"></start>
        <span style="float: right;margin-right: 10px;">{{comNum}}人评价</span>
      </div>
    </div>
    <!--<div class="cardItem bor2" @click="godetail">
      <div class="inner">
        图文详情
      </div>
    </div>-->
    <div class="mesg">
      *支付租金即预约，发货前支付押金
    </div>
    <div class="bottom" style="position: fixed;left: 0;bottom: 0;width: 100%;background: #ffffff;z-index: 9989">
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
    <div class="detail">
      <div class="tabssss">
        <div class="detatab" @click="checkTab" :class="{'active':isDetail}">
        <span>
          商品详情
        </span>
        </div>
        <!--<div class="detatab" @click="checkTab"  :class="{'active':!isDetail}">
        <span>
          服务流程
        </span>
        </div>-->
      </div>
      <div class="detailWarp" v-html="commdetail.detail" v-show="isDetail">

      </div>
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
        isShowgl:false,
        comNum:0,
        isDetail:true,
        commdetail:{},
        pic:''
      }
    },
    created(){
      document.title = '商品详情';
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      this.getData();
      let _this = this;
      _this.ajget('/api/allComments', {
          page: 1,
          pagesize: 100,
          goods_id: _this.$route.params.id
        },
        function (data) {
        this.comNum = data.comments.length;
        }, function () {

        });
    },
    methods: {
      ...mapActions(['aars']),
      getData(){
        let _this = this;
        this.ajget('/api/goodsDetail', {goods_id: _this.$route.params.id}, function (data) {
          data.lname = data.lname.split(",");
          _this.comm = data;
          _this.commdetail = data;
          _this.pic = data.pic[0]
        })
        this.ajget('/api/study', {goods_id: _this.$route.params.id}, function (data) {
          _this.gl = data;
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
        }else if(n == 2){
          window.location = 'http://mp.weixin.qq.com/mp/homepage?__biz=MzI2MTgwMjQ4OA==&hid=1&sn=299cba68043bf8a6fc6911e004297bda&scene=18#wechat_redirect'
        }else if(n == 4){
          this.$router.push({path: '/order'});
        }
      },
      gocomment(){
        this.$router.push({path: '/comment/'+this.$route.params.id});
      },
      payNow(){
        console.log(this.$route.params.id)
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
      },
      checkTab(){
        this.isDetail = !this.isDetail
      }
    },
    components:{
      start
    }
  }
</script>
<style>
  @import "../../assets/css/commdetail/commdetail.css";
  @import "../../assets/css/detail/detail.css";
</style>
