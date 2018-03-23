<template>
  <div>
  <span class="upData" @click="clickUpFile">
    <span style="width: 40px;height: 40px;background: black;position: fixed;left: 50%;top: 50%;-webkit-transform: translate(-50%,-50%);-moz-transform: translate(-50%,-50%);-ms-transform: translate(-50%,-50%);-o-transform: translate(-50%,-50%);transform: translate(-50%,-50%);"></span>
  </span>
    <input type="file" ref="fileInput"
           style="display: none;" id="img-upload"
           accept="image/*" @change="uploadImg()"/>
  </div>
</template>
<script type="text/ecmascript-6">
  import { Indicator } from 'mint-ui';
  function getCookie(c_name) {
    if (document.cookie.length > 0) {
      let c_start = document.cookie.indexOf(c_name + "=");
      if (c_start != -1) {
        c_start = c_start + c_name.length + 1;
        let c_end = document.cookie.indexOf(";", c_start);
        if (c_end == -1) c_end = document.cookie.length;
        let end = unescape(document.cookie.substring(c_start, c_end));
        return end
      }
    }
    return ""
  }
  import axios from 'axios';
  export default{
    methods: {
      clickUpFile(){
        this.$refs.fileInput.click()
      },
      uploadImg(){
        Indicator.open('上传中...');
        let _this = this;
        let filess = _this.$refs.fileInput;
        let formDa = new FormData();
        formDa.append('model', 'comment');
        formDa.append('image', filess.files[0]);
        formDa.append('token', getCookie('token'));
        axios({
          method: 'post',
          url: 'http://shede.sinmore.vip/api/storeImage',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          },
          dataType: 'json',
          data: formDa
        }).then(function (re) {
          let url = re.data.data.url;
          _this.$emit('postUrl',{url:url,index:_this.zIndex})
          Indicator.close();
        }).catch(function (error) {
          console.log(error)
        });
      }
    },
    data(){
      return {}
    },
    props:{
      zIndex:{
        type:Number
      }
    }
  }
</script>
<style>
  .upData {
    width: 1.2rem;
    height: 1.2rem;
    float: left;
    background:url("/static/images/came_03.jpg")no-repeat;
    background-size: 100% 100%;
  }
</style>

