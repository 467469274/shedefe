<template>
  <div class="commentWarp">
    <div class="commentList">
      <div class="commentItem commDetail">
        <p class="itemTitle">
          <span class="userName">{{detail.member_name}}</span>
          <span class="time">{{detail.created_at}}</span>
        </p>
        <p class="content">
          {{detail.content}}
        </p>
        <div class="imgList">
          <img :src=im class="imgItem" v-for="(im,ins) in detail.pic_url">
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default{
    data(){
      return{
        detail:{
          member_name:'dqwjd',
          created_at:'2017年12月15日00:06:16',
          content:'dqwdqwddqwdqwddqwdqwddqwdqwddqwdqwddqwdqwd',
          pic_url:['/static/images/jjd.jpg','/static/images/jjd.jpg','/static/images/jjd.jpg','/static/images/jjd.jpg','/static/images/jjd.jpg']
        }
      }
    },
    created(){
      this.getdata();
    },
    methods:{
      getdata(){
        let _this = this;
        _this.ajget('/api/allComments',{
            comment_id: _this.$route.params.id
          },
          function(data){
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
