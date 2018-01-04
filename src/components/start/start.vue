<template>
  <div class="startList">
    <div class="startWarp">
      <span class="start" @click.stop="clickStart(1)">12</span>
      <span class="start" @click.stop="clickStart(2)">23</span>
      <span class="start" @click.stop="clickStart(3)">45</span>
      <span class="start" @click.stop="clickStart(4)">124</span>
      <span class="start" @click.stop="clickStart(5)">124</span>
    </div>
    <div class="stbg" :style="{width:startSize}"></div>
    <div class="grbg"></div>
  </div>
</template>
<script type="text/ecmascript-6">
    export default {
      props:{
        start:{
          type:Number
        },
        zin:{
          type:Number
        },
        isDis:{
          type:String,
          default() {
            return 'false';
          }
        },
        size:{
          type:String,
          default() {
            return 'small';
          }
        }
      },
      data(){
        return{
        }
      },
      methods:{
        clickStart(n){
          let _this =this;
          if(this.isDis !='false'){
            this.$emit('addStart',{StarNum:n,index:_this.zin})
          }
        }
      },
      computed:{
        startSize(){
          if(this.size == 'small'){
            return this.start*0.32+'rem'
          }else {
            return this.start*0.71+'rem'
          }
        }
      }
    }
</script>
<style>
  @import "../../assets/css/start/start.css";
</style>
