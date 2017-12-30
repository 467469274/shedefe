<template>
  <div class="cartEndWarp">
    <newmenber></newmenber>
    <orderStatus :orderType="1"></orderStatus>
    <div class="lcationWarp">
      <div class="locationIcon"></div>
      <div class="middle" v-if="userName !='noLocation'">
        <p class="userInfo">
          <span class="userName">{{userName}}</span><span
          class="tel">{{tel}}</span>
        </p>
        <p class="locationTxt twosl" @click="golocation">
          {{loca}}
        </p>
      </div>
      <div class="middle noLocation"
           v-show="userName =='noLocation'"
           @click="golocation">
        请输入收货地址...
      </div>
      <div class="rightIcon"></div>
    </div>
    <div class="dateWarp">
      <div class="postTime" @click="showDate('s')">
        <p class="t1">收到日期： <span
          class="date">{{sDate}}</span></p>
        <p class="t2">我们会在该日期前将商品邮寄到您的手中</p>
        <span class="iconRight"></span>
      </div>
      <div class="postTime">
        <div class="t1"><span style="vertical-align: 3px;">租赁天数：</span>
          <div class="btns">
            <span class="btn le"
                  @click="operDay('minus')"></span>
            <span class="t3">{{starNum | second }}</span>
            <span class="btn re"
                  @click="operDay('add')"></span>
          </div>
        </div>
        <p class="t2">商品最低7天起租</p>
      </div>
      <div class="postTime borderN">
        <p class="t1">发还日期： <span class="date"
                                  style="color: #333333">{{endTime}}</span>
        </p>
        <p class="t2">请在该日期前将物品寄回</p>
      </div>
    </div>
    <div class="commList">
      <div class="comItem"
           v-for="(item,index) in gCartList"
           @click="goDetail(item.id)">
        <img :src="item.goods_pic">
        <div class="txt">
          <p class="title">{{item.goods_name}}</p>
          <p class="priceTxt">
            租金:{{parseInt(item.monthly_price)
          + (starNum - item.start_days) * item.keep_price}}
          </p>
          <p class="priceTxt">
            押金:{{item.goods_deposit}}
          </p>
        </div>
      </div>
    </div>
    <div class="isYes" @click="goagreement"><span
      class="isduihao" :class="{'active':isActive}"
      @click.stop="seyYes"></span>我已同意 <span class="peo">《用户服务协议》</span>
    </div>
    <mt-datetime-picker
      v-model="pickerVisible"
      type="date"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      @confirm="handleConfirm"
      style="z-index: 99;"
      v-show="isShowDate"
      @cancel="cancelDate"
      :startDate="newDate"
    >
    </mt-datetime-picker>
    <div class="bottom">
      <div class="bottomInner">
        <div class="txt sl">
          <p class="allprice">
            <span class="title">合计: <i>租金:￥{{zj}}</i>&nbsp;&nbsp;<i>押金:￥{{yj}}</i></span>
          </p>
          <p class="mesg">*支付租金即预约，发货前支付押金</p>
        </div>
        <div class="sureBtn" @click="sure">
          <span>支付租金</span>
        </div>
      </div>
    </div>
    <div class="mask" v-show="isShowDate"
         @click="isShowDate =false"></div>
  </div>
</template>
<script type="text/ecmascript-6">
  import newmenber from '../newmenber/newmenber.vue'
  import orderStatus from '../orderStatus/orderStatus.vue'
  import {addz} from '../../common/addz.js';
  import {DatetimePicker} from 'mint-ui';
  import {mapState, mapActions, mapGetters} from 'vuex'

  export default {
    data() {
      return {
        starNum: 20,
        minStarNum: 20,
        pickerVisible: '',
        isShowDate: false,
        dateType: '',
        sDate: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
        newDate: new Date(),
        isActive: false,
        loca: '',
        tel: '',
        userName: '',
        gCartList: []
      }
    },
    filters: {
      second(time) {
        return addz(time);
      }
    },
    methods: {
      showDate(s) {
        this.dateType = s;
        this.isShowDate = true;
      },
      getCartList() {
        let _this = this;
        let cartId = this.gars.split(',');
        alert(cartId)
        _this.ajpost('/api/orderFirm', {cart_id: cartId}, function (data) {
          _this.gCartList = data.data.goods;
          _this.starNum = data.data.min_day
          console.log(data)
        })
      },
      operDay(op) {
        if (op == 'minus' && this.starNum != this.minStarNum) {
          this.starNum = this.starNum - 1;
        } else if (op == 'add') {
          this.starNum = this.starNum + 1;
        }
      },
      handleConfirm(k) {
        let date = new Date(k);
        this.sDate = date.getFullYear() + '-' + (parseInt(date.getMonth()) + 1) + '-' + date.getDate();
        this.cancelDate();
      },
      cancelDate() {
        this.isShowDate = false;
      },
      endDat(dd, AddDayCount) {
        dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期
        var y = dd.getFullYear();
        var m = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1);//获取当前月份的日期，不足10补0
        var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();//获取当前几号，不足10补0
        return y + "-" + m + "-" + d;
      },
      goagreement() {
        this.$router.push({path: '/agreement'});
      },
      seyYes() {
        this.isActive = !this.isActive
      },
      golocation() {
        this.$router.push({path: '/addLocation'});
      },
      getLocation() {
        let _this = this;
        _this.ajpost('/api/address', {type: 0}, function (data) {
          if (data.error_msg != '成功,但无数据') {
            _this.loca = data.data.province + data.data.city + data.data.area + data.data.address;
            _this.tel = data.data.mobile;
            _this.userName = data.data.name;
          } else {
            _this.userName = 'noLocation'
          }
        })
      },
      goDetail(id) {
        this.$router.push({path: '/commdetail/' + id});
      },
      sure() {
        let _this = this;
        let cartId = _this.gars.split(',');
        _this.ajpost('/api/orderSubmit',
          {cart_id: cartId, get_goods: _this.sDate, back_goods: _this.endTime, tenancy: _this.starNum}
          , function (data) {
            _this.ajpost('/api/WeixinHandler', {out_trade_no: data.data.order_sn, paytype: 1}, function (payData) {
              console.log(payData)
              let dataqq = JSON.parse(payData.data.status);
              console.log(dataqq)
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
                  console.log(res)
                });
            },function(err){console.log(err)});
          }
        )
      }
      },
    created() {
      if (this.$route.params.type == 1) {
        this.isActive = false;
      } else {
        this.isActive = true;
      }
      this.getLocation();
      this.getCartList()
    },
    computed: {
      endTime() {
        let nowDate = new Date(this.sDate);
        let endDate = this.endDat(nowDate, this.starNum);
        return endDate;
      },
      zj() {
        let num = 0;
        let list = JSON.parse(JSON.stringify(this.gCartList));
        for (let i = 0; i < list.length; i++) {
          let n = parseInt(list[i].monthly_price) + (this.starNum - list[i].start_days) * list[i].keep_price
          num = num + n;
        }
        return num;
      },
      yj() {
        let num = 0;
        let list = JSON.parse(JSON.stringify(this.gCartList));
        for (let i = 0; i < list.length; i++) {
          num = num + parseInt(list[i].goods_deposit);
        }
        return num;
      },
      ...mapGetters(['gars'])
    },
    components: {
      newmenber,
      orderStatus
    }
  }
</script>
<style>
  @import '../../assets/css/cartend/cartend.css';
</style>
