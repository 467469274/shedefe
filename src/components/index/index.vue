<template>
  <div class="indexWarp" ref="box">
    <div class="top" ref="top" :class="{'clickAdd':isAdd}">
      <mt-swipe :auto="4000" class="siwper">
        <mt-swipe-item :key="index" v-for="(item,index) in bannerList">
          <img :src="'http://shede.sinmore.vip/storage/banner/'+item.pic_url" alt="" @click="lookBanner(item)">
        </mt-swipe-item>
      </mt-swipe>
      <div class="scroll-wrap">
        <ul class="scroll-content" :style="{ top }">
          <li :key="index" v-for="(item,index) in prizeList" @click="gourl(item)">
            <i class="icons-laba"></i>
            <p>{{item.title}}</p>
            <a>戳此查看>></a>
          </li>
        </ul>
      </div>
      <div class="labalWarp" v-show="labalList.length>0">
        <p class="title">
          Hello！您想要？
        </p>
        <div class="labalList">
          <div class="spanWarp">
            <span :key="index"
                  v-for="(item,index) in labalList"
                  @click="clickSpan(index)"
                  :class="{'isClick':item.isShow}"
            >
              <i class="labalSpan">{{item.title}}</i>
            </span>
            <div class="btns">
              <input type="button" value="重置" class="re" @click="re">
              <input type="button" value="确定" class="sure" @click="sure">
            </div>
          </div>
          <div class="add" @click="clickAdd" :class="{'close':isAdd}"></div>
        </div>
      </div>
    </div>
    <div :class="{'isPaddingTop':isAdd}" class="indexMain">
      <ul
        class="commList"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10">
        <li :key="index" v-for="(item,index) in commList" class="item" @click="godetail(item.id)">
          <img :src="item.cover">
          <div class="itemMain">
            <p class="title">{{item.name}}</p>
            <div class="labalList">
              <span class="labal" v-for="(t,i) in item.goods_label">{{t}}</span>
            </div>
            <p class="allNum">{{item.sale_num+item.attach_sale_num}}人用过</p>
            <p class="pirce">
              <i class="picNum">￥{{item.start_price}}</i><i class="starNum">/{{item.start_days}}天起</i>
              <span class="addCart" @click.stop="addCart(item.id)"></span>
            </p>
          </div>
        </li>
        <li class="more" v-show="loading">{{mesg}}</li>
      </ul>
    </div>
    <div class="mask" v-show="isAdd" @click="clickAdd"></div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {MessageBox, Swipe, SwipeItem, InfiniteScroll} from 'mint-ui';

  export default {
    data() {
      return {
        prizeList: [
          {val: 213}
        ],
        bannerList: [],
        activeIndex: 0,
        commList: [],
        labalList: [],
        p: 1,
        pz: 8,
        mesg: '正在加载',
        loading: false,
        hasGood: false,
        isAdd: false,
        clickLabals: []
      }
    },
    mounted() {
    },
    methods: {
      all() {
        MessageBox('提示', '操作成功');
      },
      loadMore() {
        let _this = this;
        if (this.hasGood) {
          this.loading = true;
          this.p = this.p + 1;
          this.getGoods({
            page: _this.p,
            pagesize: _this.pz
          });
        }
      },
      gourl(r){
        if(r.link){
          window.location = r.link
        }else {
          window.location = '/#/innerDetail/'+r.id
        }
      },
      getGoods(obj, bol) {
        let _this = this;
        this.ajget('/api/getGoods', obj, function (data) {
          for(let i = 0;i<data.length;i++){
            console.log(data[i])
          }
          let arss = [];
          for (let i = 0; i < data.length; i++) {
            let obj = data[i];
            obj.goods_label = data[i].goods_label.split(",");
            arss.push(obj);
            if (bol) {
              _this.commList = arss;
            } else {
              _this.commList.push(obj);
            }
          }
          if (data.length > 0) {
            _this.hasGood = true;
            _this.loading = false;
          }
          if (data.length == 0 || data.length < 8) {
            _this.hasGood = false;
          }
        }, function (err) {
          console.log(err)
        });
        this.ajget('/api/getContentByPostion', {text_location:1}, function (datas) {
          _this.prizeList = datas;
          setInterval(function () {
            if (_this.activeIndex < datas.length - 1) {
              _this.activeIndex += 1;
            } else {
              _this.activeIndex = 0;
            }
          }, 5000);
        }, function (errs) {
          console.log(errs)
        });

      },
      sure() {
        this.p = 1;
        this.commList = [];
        let obj = {
          page: this.p,
          pagesize: this.pz,
        };
        if(this.clickLabals.length!=0){
          obj.goods_label = this.clickLabals
        }
        this.getGoods(obj, true);
        this.clickAdd()
      },
      re(){
        for(let i = 0;i<this.labalList.length;i++){
          this.labalList[i].isShow = false;
        }
        this.p =1;
        let obj = {
          page: this.p,
          pagesize: this.pz
        };
        this.getGoods(obj, true);
        this.clickAdd()
      },
      clickSpan(n) {
        let _this = this;
        _this.commList = [];
        if(!this.isAdd){
          let obj = {
            page: _this.p,
            pagesize: _this.pz,
          };
          if (this.clickLabals.length>=2){
            for(let i = 0;i<this.labalList.length;i++){
              this.labalList[i].isShow = false;
            }
            this.clickLabals = [this.labalList[n].label_id];
            obj.goods_label = this.clickLabals;
            this.labalList[n].isShow = true;
          } else {
            for (let i = 0; i < this.labalList.length; i++) {
              if (n == i) {
                if (this.labalList[i].isShow == true) {
                  this.labalList[i].isShow = false;
                } else {
                  this.labalList[i].isShow = true;
                  this.clickLabals = [this.labalList[i].label_id];
                  _this.p = 1;
                  obj.goods_label = _this.clickLabals

                }
              } else {
                this.labalList[i].isShow = false;
              }
            }
          }
          this.getGoods(obj,true)
        }
        if (this.isAdd) {
          for (let w = 0; w < this.labalList.length; w++) {
            if (n == w) {
              if (this.labalList[w].isShow == true) {
                this.labalList[w].isShow = false;
                for (let q = 0; q < this.clickLabals.length; q++) {
                  if (this.clickLabals[q] == this.labalList[w].label_id) {
                    this.clickLabals.splice(q, 1);
                  }
                }
              } else {
                _this.p = 1;
                this.clickLabals.push(this.labalList[w].label_id);
                this.labalList[w].isShow = true
              }
            }
          }
        }
      },
      clickAdd() {
        this.isAdd = !this.isAdd;
      },
      godetail(n){
        this.$router.push({path: '/commdetail/'+n});
      },
      addCart(n){
        let _this = this;
        _this.ajpost('/api/cartAdd',{goods_id:n},function(data){
          if(data.error_msg == '加入购物车成功'){
            MessageBox('提示', '添加成功');
          }else if(data.error_msg == '购物车中已存在，请勿重复添加'){
            MessageBox('提示', '购物车中已存在，请勿重复添加');
          }
        })
      },
      lookBanner(item){
        if(item.link!=null){
          window.location = item.link
        }
      }
    },
    created() {

     /* pushHistory();
      window.addEventListener("popstate", function(e) {
        MessageBox.confirm('确认要退出吗?').then(action => {
          WeixinJSBridge.call('closeWindow')
        });
      }, false);
      function pushHistory() {
        var state = {
          title: "title",
          url: "#"
        };
        window.history.pushState(state, "title", "#");
      }*/
      document.title = '舍得叔叔';
      let _this = this;
      this.ajget('/api/getBanners', {}, function (data) {
        _this.bannerList = data.reverse();
      }, function (err) {
        console.log(err)
      });
      this.ajget('/api/getLabels', {}, function (data) {
        let ars = [];
        for (let i = 0; i < data.length; i++) {
          let obj = data[i];
          obj.isShow = false;
          ars.push(obj)
        }
        _this.labalList = ars;
      }, function (err) {
        console.log(err)
      });
      this.getGoods({
        page: _this.p,
        pagesize: _this.pz
      });
    },
    mounted(){
      let _this = this;
      window.onscroll = function() {
        let box = _this.$refs.box.scrollHeight;
        let h = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        let wh = document.body.clientHeight;
        if(box - h == wh){
          _this.loadMore()
        }
      }
      //scrollTop就是触发滚轮事件时滚轮的高度
    },
    computed: {
      top() {
        return -this.activeIndex * .88 + 'rem';
      }
    }
  }
</script>
<style>
  @import "../../assets/css/index/index.css";
</style>
