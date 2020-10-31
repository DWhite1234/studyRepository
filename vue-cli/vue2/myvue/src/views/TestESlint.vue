<!--
 * @Author: your name
 * @Date: 2020-10-26 15:55:04
 * @LastEditTime: 2020-10-27 11:07:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \codesRepository\vue-cli\vue2\myvue\src\views\TestESlint.vue
-->
<template>
  <div>
    
    <input type="text" v-model="id">
    <input type="text" v-model="name">
    <h1>props传值的三种方式</h1>
    <p>
      1.在路由中设置props:true,可以将/TestESlint/:id/:name
      中的id和name设置成组件的params属性<br>
      2.在路由中使用对象模式 props:{name:"word",id:"zzzzz"},只能用于写死的值<br>
      3.这路由中使用函数模式 props:(route)=>({name:route.query.name,id:route.query.id})<br>
    </p>
    <h1>示例</h1>
    <p>
      路由组件传参
      1.布尔模式,传递参数必须跟在路径后
      {
        name:'TestESlint',
        path:'/TestESlint/:id/:name',
        component:TestESlint,
        props:true
      },
      2.对象模式，可以将参数写在props对象中（只适用于静态值，没什么作用）
      {
        name:'TestESlint',
        path:'/TestESlint',
        component:TestESlint,
        props:{name:"word",id:"zzzzz"},
      },
      3.函数模式，
      {
        name:'TestESlint',
        path:'/TestESlint',
        component:TestESlint,
        // props:(route)=>({name:route.params.name,id:route.params.id}),
        props:(route)=>({name:route.query.name,id:route.query.id}),
      },
    </p>
  </div>
</template>

<script>
export default {
  props:['id','name'],
  mounted(){
    console.log('this route',this.$route);
    console.log('this',this);
    console.log('this.id',this.id);
    console.log('this.name',this.name);
  }
}
</script>

<style>

</style>