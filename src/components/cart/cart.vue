<template>
  <div class="cartWarp">
    <newmenber></newmenber>
    <orderStatus :orderType="1"></orderStatus>
    <div :key="index" v-for="(item,index) in gCartList" @click="gocomm(item)"
         class="cartItem">
      <img :src=item.cover alt="">
      <div class="txt">
        <p class="title sl">
          {{item.name}}
        </p>
        <p class="labas">
          <span
            v-for="(it,ins) in item.goods_label.split(',')">{{it}}</span>
        </p>
        <p class="orderInfo">
          <span class="price">
            ￥{{item.start_price}}
          </span>
          <span class="dayNum">
            /{{item.start_days}}天起租
          </span>
          <span class="del"
                @click.stop="adeComm(item.cart_id)"></span>
        </p>
      </div>
    </div>
    <div class="closeAccount" v-show="gCartList.length>0"
         @click="gocartend">
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
  import {mapState, mapActions, mapGetters} from 'vuex'
  import {Toast} from 'mint-ui';

  export default {
    data() {
      return {
        orderType: 1,
        gCartList: []
      }
    },
    computed: {},
    created() {
      this.getCartList();
      document.title = '购物车';
    },
    methods: {
      ...mapActions(['aars']),
      gocartend() {
        let _this = this;
        let ars = [];
        for (let i = 0; i < this.gCartList.length; i++) {
          ars.push(this.gCartList[i].cart_id)
        }
        ars = ars.join(',');
        _this.aars(ars);
        _this.$router.push({path: '/cartend'});
      },
      getCartList() {
        let _this = this;
        _this.ajget('/api/cart', {
          page: 1,
          pagesize: 999
        }, function (data) {
          _this.gCartList = data;
          console.log(data)
        })
      },
      adeComm(n) {
        let _this = this;
        _this.ajpost('/api/cartDel', {cart_id: n}, function (data) {
          if (data.error_msg == '删除成功') {
            Toast('删除成功');
            _this.getCartList()
          }
        })
      },
      gocomm(s){
        console.log(s)
        window.location='/#/commdetail/'+s.goods_id
      }
//
    },
    components: {
      newmenber,
      orderStatus
    }
  }
</script>
<style>
  @import "../../assets/css/cart/cart.css";
</style>
