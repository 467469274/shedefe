<template>
  <div class="commentWarp">
    <p class="commentLength">
      全部评价&nbsp;&nbsp;({{comlength}})
    </p>
    <div class="commentList">
      <div class="commentItem" v-for="(item,index) in commentList" @click="goDetail(item.id)">
        <p class="itemTitle">
          <span class="userName">{{item.member_name}}</span>
          <span class="time">{{item.created_at |formatDate}}</span>
        </p>
        <p>
          <start :start="item.star"></start><span style="vertical-align:5px;padding-left: 10px;">({{parseInt(item.star)}}.0)</span>
        </p>
        <p class="content">
          {{item.content}}
        </p>
        <div class="imgList">
          <img :src=im class="imgItem" v-for="(im,ins) in item.pic_url">
        </div>
      </div>
      <div class="empty"v-if="comlength==0">暂无评价</div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import start from '../start/start.vue'
  import {formatDate} from '../../common/date';
  export default {
    filters: {
      formatDate(time) {
        if (time == 0){
          return '-';
        }
        var date = new Date(time*1000);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }},
    data() {
      return {
        datas: {},
        comlength: 0,
        commentList: [
        ]
      }
    },
    created() {
      document.title = '评论'
      this.getdata();
    },
    methods: {
      getdata() {
        let _this = this;
        _this.ajget('/api/allComments', {
            page: 1,
            pagesize: 100,
            goods_id: _this.$route.params.id
          },
          function (data) {
            _this.datas = data;
            console.log(data)
            _this.commentList = data.comments;
            _this.comlength = data.comments.length;
          }, function () {

          })
      },
      goDetail(id) {
        this.$router.push({path: '/commentDetail/' + id});
      }
    },
    components: {
      start
    },
    computed: {}
  }
</script>
<style>
  @import "../../assets/css/comment/comment.css";
</style>
