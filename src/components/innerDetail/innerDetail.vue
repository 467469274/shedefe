<template>
  <div style="padding: .2rem">
    <div v-html="htmlDiv"></div>
  </div>
</template>
<script type="text/ecmascript-6">
    export default {
      data(){
        return{
          htmlDiv:''
        }
      },
      created(){
        let _this = this,
          id = _this.$route.params.id;
        _this.ajget('/api/detail',{con_id:id},function (data) {
          console.log(data)
          document.title = data.title;
          _this.htmlDiv = data.content;
        })
      }
    }
</script>
<style>
</style>
