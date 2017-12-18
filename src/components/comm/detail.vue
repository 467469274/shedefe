<template>
  <div class="detail">
    <div class="detailTop">
      <img src="/static/images/jjd.jpg" alt="">
      <p class="sl">{{commdetail.name}}</p>
    </div>
    <div class="tabs">
      <div class="tab" @click="checkTab" :class="{'active':isDetail}">
        <span>
          商品详情
        </span>
      </div>
      <div class="tab" @click="checkTab"  :class="{'active':!isDetail}">
        <span>
          服务流程
        </span>
      </div>
    </div>
    <div class="detailWarp" v-html="commdetail.detail" v-show="isDetail">

    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default{
    data(){
      return{
        isDetail:true,
        commdetail:{}
      }
    },
    created(){
      this.getData()
    },
    methods:{
      getData(){
        let _this = this;
        this.ajget('/api/goodsDetail', {goods_id: _this.$route.params.id}, function (data) {
          console.log(data);
          _this.commdetail = data;

        })
      },
      checkTab(){
        this.isDetail = !this.isDetail
      }
    }
  }
</script>
<style>
  @import "../../assets/css/detail/detail.css";
</style>
