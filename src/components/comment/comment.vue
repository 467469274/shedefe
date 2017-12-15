<template>
  <div class="commentWarp">
    <p class="commentLength">
      全部评价&nbsp;&nbsp;({{comlength}})
    </p>
    <div class="commentList">
      <div class="commentItem" v-for="(item,index) in commentList" @click="goDetail(item.id)">
        <p class="itemTitle">
          <span class="userName">{{item.member_name}}</span>
          <span class="time">{{item.created_at}}</span>
        </p>
        <p class="content">
          {{item.content}}
        </p>
        <div class="imgList">
          <img :src=im class="imgItem" v-for="(im,ins) in item.pic_url">
        </div>
      </div>
      <div class="empty">暂无评价</div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default{
    data(){
      return{
        datas:{
        },
        comlength:0,
        commentList:[
          {
            member_name:'wqd',
            created_at:'2017年12月14日23:55:14',
            content:'呢哦IQ就我诶加气机我二姐',
            pic_url:['/static/images/jjd.jpg']
          }
        ]
      }
    },
    created(){
      this.getdata();
    },
    methods:{
      getdata(){
        let _this = this;
        _this.ajget('/api/allComments',{
            page:1,
            pagesize:100,
            goods_id: _this.$route.params.id
          },
          function(data){
            _this.datas = data;
            _this.commentList = data.comments;
            this.comlength = this.datas.goods.comments_count;
          },function(){

          })
      },
      goDetail(id){
        this.$router.push({path: '/commentDetail/'+id});
      }
    },
    computed:{
    }
  }
</script>
<style>
  @import "../../assets/css/comment/comment.css";
</style>
