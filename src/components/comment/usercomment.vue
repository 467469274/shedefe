<template>
  <div class="userComm">
    <div class="commItem" v-for="(item,index) in commlist">
      <div class="commHeader">
        <img :src=item.pic>
        {{item.title}}
      </div>
      <div class="commSartWarp">
        <start :isDis=isTrue v-on:addStart="addStart"
               :start="item.star" :size="'big'" class="st"
               :zin="index"></start>
      </div>
      <div class="commWarp">
        <textarea v-model="item.content" placeholder="分享您的使用心得..."></textarea>
        <div class="picList">
          <span class="imgWarp" v-for="(im,iss) in item.commentpic">
            <i class="removeBtn" @click="removeImg(index,iss)"></i>
            <img :src=im>
          </span>
          <upCame :zIndex="index" v-on:postUrl="hasUrl"></upCame>
        </div>
      </div>
    </div>
    <div class="subBtn" @click="sub">
      提交
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {Toast} from 'mint-ui';
  import start from '../start/start.vue'
  import upCame from '../upCame/upCame.vue'
  export default{
    components: {
      start,
      upCame
    },
    data(){
      return {
        commlist: [],
        isTrue: 'true'
      }
    },
    created(){
      document.title = '评价';
      this.getDetail();
    },
    methods: {
      getDetail(){
        let _this = this;
        _this.ajpost('/api/orderDetail', {order_id: _this.$route.params.id}, function (data) {
          let datas = data.data.get_goodsname;
          let arrs = [];
          for (let i = 0; i < datas.length; i++) {
            let obj = {
              title: datas[i].goods_name,
              goods_id: datas[i].goods_id,
              content: '',
              star: 0,
              commentpic: [],
              pic: datas[i].goods_pic
            }
            arrs.push(obj)
          }
          _this.commlist = arrs;
        }, function (erro) {
          console.log(erro)
        })
      },
      addStart(n){
        this.commlist[n.index].star = n.StarNum
      },
      removeImg(n,u){
        this.commlist[n].commentpic.splice(u,1)
      },
      hasUrl(data){
        this.commlist[data.index].commentpic.push(data.url);
        console.log(data)
      },
      sub(){
        console.log(JSON.stringify(this.commlist));
        let _this = this;
        let obj ={
          order_id:_this.$route.params.id,
          comments:_this.commlist
        };
        _this.ajpost('/api/comment',obj,function(data){
          if(data.error_code ==0){
            window.location = '/#/orderDetail/'+_this.$route.params.id
          }else{
            Toast(''+data.error_msg+'');
          }
        });
      }
    }
  }
</script>
<style>
  @import "../../assets/css/userComm/userComm.css";
</style>
