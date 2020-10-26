<!--
 * @Author: your name
 * @Date: 2020-10-26 15:59:48
 * @LastEditTime: 2020-10-26 16:37:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \codesRepository\vue-cli\vue2\myvue\src\views\Home.vue
-->
<template>
  <div>
    <div>Home</div>
    <div class="content">测试内容
      <div>
        <span>1.测试动态路由</span>
        <input type="text" v-model="url">
        <button @click.stop='jump'>测试</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      url:''
    }
  },
  methods:{
    jump(){
      this.$router.push({path:'Users/'+this.url})
    }
  }
}
</script>

<style>
.content{
  width:1000px;
  height: 500px;
  margin: 0 auto;
  background-color: yellowgreen;
}
button{
  vertical-align: middle;
  text-align: center;
  width: 50px;
  height: 20px;
  line-height:20px;
  border-radius: 2vw;
  background-color: #fff;
}
</style>