<template>
  <div class="addLocation">
    <div class="locationList">
      <div class="locationItem">
        <span class="tl">收货人</span>
        <input type="text" class="in" placeholder="请输入姓名"
               v-model="userName">
      </div>
      <div class="locationItem">
        <span class="tl">联系电话</span>
        <input type="text" class="in" placeholder="请输入电话"
               v-model="tel">
      </div>
      <div class="locationItem" @click="cancelDate">
        <span class="tl">收货地址</span>
        <input type="text" class="in" placeholder="请选择地区"
               v-model="endA">
      </div>
      <textarea placeholder="请输入详细地址"
                v-model="tex"></textarea>
      <div class="al" v-show="showDate">
        <p class="operTip">
          <span class="close" @click="cancelDate">取消</span>
          <span class="sure"
                @click="handleConfirm">确定</span>
        </p>
        <mt-picker :slots="myAddressSlots"
                   @change="onMyAddressChange"></mt-picker>
      </div>
    </div>
    <span class="sureBtn" @click="sure">确定</span>
    <div class="mask" v-show="showDate"></div>
  </div>
</template>
<script type="text/ecmascript-6">
  import { Picker ,Toast} from 'mint-ui';
  import myaddress from '../../../static/address3.json'     //引入省市区数据
  export default{
    data(){
      return {
        myAddressSlots: [
          {
            flex: 1,
            defaultIndex: 1,
            values: Object.keys(myaddress),  //省份数组
            className: 'slot1',
            textAlign: 'center'
          }, {
            divider: true,
            content: '-',
            className: 'slot2'
          }, {
            flex: 1,
            values: [],
            className: 'slot3',
            textAlign: 'center'
          },
          {
            divider: true,
            content: '-',
            className: 'slot4'
          },
          {
            flex: 1,
            values: [],
            className: 'slot5',
            textAlign: 'center'
          }
        ],
        myAddressProvince: '省',
        myAddressCity: '市',
        myAddresscounty: '区/县',
        pickerVisible: '',
        noTrue: [],
        showDate: false,
        userName: '',
        tel: '',
        tex: '',
        type: 1
      }
    },
    created(){
      document.title = '收货地址';
      this.getLocation();
    },
    components: {
      'mt-picker': Picker
    },
    methods: {
      onMyAddressChange(picker, values) {
        if (myaddress[values[0]]) {
          picker.setSlotValues(1, Object.keys(myaddress[values[0]]));
          picker.setSlotValues(2, myaddress[values[0]][values[1]]);
          this.noTrue = values
        }
      },
      handleConfirm(){
        this.myAddressProvince = this.noTrue[0]
        this.myAddressCity = this.noTrue[1]
        this.myAddresscounty = this.noTrue[2]
        this.cancelDate()
      },
      cancelDate(){
        this.showDate = !this.showDate;
      },
      sure(){
        let _this = this;
        if (this.userName == '' || this.tel == '' || this.tex == '' || this.myAddressProvince == '省' || this.myAddressCity == '市' || this.myAddresscounty == '区/县') {
          Toast('请仔细填写用户信息');
        } else {
          _this.ajpost('/api/address',
            {
              type: 1
              , name: _this.userName
              , province: _this.myAddressProvince
              , city: _this.myAddressCity
              , area: _this.myAddresscounty
              , address: _this.tex
              , mobile: _this.tel
            }
            , function (data) {
              if (data.error_code == 0) {
                _this.$router.push({path: '/cartend'});
              }else{
                Toast(''+data.error_msg+'');
              }
        }
      );
    }
  },
  getLocation(){
    let _this = this;
    _this.ajpost('/api/address', {type: 0}, function (data) {
      console.log(data.error_msg)
      if(data.error_msg !='成功,但无数据'){
        _this.myAddressProvince = data.data.province
        _this.myAddressCity = data.data.city
        _this.myAddresscounty = data.data.area
        _this.tex = data.data.address;
        _this.tel = data.data.mobile;
        _this.userName = data.data.name;
      }
    })
  }
  },
  mounted(){
    this.$nextTick(() => {
      this.myAddressSlots[0].defaultIndex = 0
    });
  },
  computed: {
    endA()
    {
      return this.myAddressProvince + ',' + this.myAddressCity + ',' + this.myAddresscounty
    }
  }
  }
</script>
<style>
  @import "../../assets/css/addLocation/addLocation.css";
</style>
