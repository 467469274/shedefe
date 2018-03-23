<template>
  <div class="logistics">
    <div class="top">
      <img src="/static/images/jjd.jpg" alt="">
      <div class="wz">
        <p>承运来源：{{name}}</p>
        <p>运单编号：{{number}}</p>
      </div>
    </div>
    <div class="logisticsList">
      <div class="logisticsItme" v-for="(item,index) in list">
        <div class="le">
          <p class="time">{{item.time |de}}</p>
          <p class="date">{{item.time |mo}}</p>
        </div>
        <div class="re">
          {{item.status}}
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {Toast} from 'mint-ui';
  export default {
    data() {
      return {
        name: '',
        number: '',
        list: []
      }
    },
    filters: {
      mo(time) {
        let date = new Date(time.replace(/-/g,'/'));
        return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()
      },
      de(time) {
        let date = new Date(time.replace(/-/g,'/'));
        return (date.getHours()>9?date.getHours():'0'+date.getHours())+'-'+(date.getMinutes()>9?date.getMinutes():'0'+date.getMinutes())
      }
    },
    created() {
      document.title = '查看物流';
      let _this = this;
      _this.ajpost('/api/getlogistics', {order_sn: _this.$route.params.id}, function (data) {
        if(data.error_code!=0){
          Toast(data.error_msg);
          window.history.go(-1);
          return
        }
        _this.name = data.data.type;
        _this.number = data.data.number;
        _this.list = data.data.list;
      })
    }
  }
</script>
<style>
  @import "../../assets/css/logistics/logistics.css";
</style>
