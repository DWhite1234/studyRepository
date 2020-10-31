<!--
 * @Author: your name
 * @Date: 2020-10-26 15:59:48
 * @LastEditTime: 2020-10-27 13:58:30
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
      <div>
        <span>2.测试命名视图</span>
        <input type="text" v-model="url">
        <button @click.stop='$router.push({name:"nameViews"})'>测试</button>
      </div>
      <div>
        <span>3.测试路由组件传参</span>
        <button @click.stop="$router.push({path:'/TestESlint/1/zs',query:{name:'测试',id:1}})">测试1</button>
        <button @click.stop="$router.push({path:'/TestESlint',query:{name:'测试',id:1}})">测试2</button>
        <button @click.stop="$router.push({name:'TestESlint',params:{name:'测试2',id:2}})">测试3</button>
        <button @click.stop="$router.push({name:'TestESlint',query:{name:'测试4',id:4}})">测试4</button>
        <button @click.stop="$router.push({path:'/TestESlint',query:{name:'测试3',id:3}})">测试5</button>
      </div>
      <div>
        <span>4.测试路由元信息</span>
        <button @click.stop='$router.push({name:"routerMetaChild"})'>测试</button>
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
  width: 70px;
  height: 20px;
  line-height:20px;
  border-radius: 2vw;
  background-color: #fff;
}
</style>