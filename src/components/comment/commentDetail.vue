<template>
  <div class="commentWarp">
    <div class="commentList">
      <div class="commentItem commDetail">
        <p class="itemTitle">
          <span class="userName">{{detail.member_name}}</span>
          <span class="time">{{detail.created_at |formatDate}}</span>
        </p>
        <p class="content">
          {{detail.content}}
        </p>
        <div class="imgList">
          <img :src=im class="imgItem" v-for="(im,ins) in detail.pic_big">
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {formatDate} from '../../common/date';
  export default{
    filters: {
      formatDate(time) {
        if (time == 0){
          return '-';
        }
        var date = new Date(time*1000);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }},
    data(){
      return{
        detail:{}
      }
    },
    created(){
      document.title = '评论详情'
      this.getdata();
    },
    methods:{
      getdata(){
        let _this = this;
        _this.ajget('/api/comment',{
            comment_id: _this.$route.params.id
          },
          function(data){
          console.log(data)
            _this.detail = data;
          },function(){

          })
      }
    },
    computed:{
    }
  }
</script>
<style>
  @import "../../assets/css/comment/comment.css";
</style>
