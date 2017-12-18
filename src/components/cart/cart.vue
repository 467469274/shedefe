<template>
  <div class="cartWarp">
    <newmenber></newmenber>
    <orderStatus :orderType="1"></orderStatus>
    <div :key="index" v-for="(item,index) in gCartList" class="cartItem">
      <img :src=item.cover alt="">
      <div class="txt">
        <p class="title sl">
          {{item.name}}
        </p>
        <p class="labas">
          <span v-for="(it,ins) in item.goods_label">{{it}}</span>
        </p>
        <p class="orderInfo">
          <span class="price">
            ￥{{item.start_price}}
          </span>
          <span class="dayNum">
            /{{item.start_days}}天起租
          </span>
          <span class="del" @click="adeComm(item.id)"></span>
        </p>
      </div>
    </div>
    <div class="closeAccount" v-show="gCartList.length>0" @click="gocartend">
      立即预约
    </div>
    <div class="empty" v-show="gCartList.length<=0">
      购物车里空空如也！快去预定吧
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import newmenber from '../newmenber/newmenber.vue'
  import orderStatus from '../orderStatus/orderStatus.vue'
  import {mapState,mapActions,mapGetters} from 'vuex'
  export default{
    data(){
      return{
        orderType:1
      }
    },
    computed:{
      ...mapGetters([
        "gCartList"
      ])
    },
    created(){
    },
    methods:{
      ...mapActions(["adeComm"]),
      gocartend(){
        this.$router.push({path: '/cartend/1'});
      }
    },
    components:{
      newmenber,
      orderStatus
    }
  }
</script>
<style>
  @import "../../assets/css/cart/cart.css";
</style>
