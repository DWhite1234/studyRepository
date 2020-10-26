<!--
 * @Author: your name
 * @Date: 2020-10-26 16:11:46
 * @LastEditTime: 2020-10-26 17:45:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \codesRepository\vue-cli\vue2\myvue\src\views\Users.vue
-->
<template>
  <div>
    {{$route.params.id}}<br>
    <!-- 
      ps1:该方式只能适用于path路由
      ps2:当不跳转当前页面的只更改路由复用组件时，钩子函数将不会执行
      ps3:当使用了通配符使用时，this.$route会自动添加一个pathMatch参数
    -->
    <span style="font-size:20px;color:red;">没有被通配符匹配上</span>
    <img src="../img/users_1.jpg" alt=""><br>
    <span style="font-size:20px;color:red;">被通配符匹配上</span>
    <img src="../img/users_2.jpg" alt="">
    <img src="../img/userChild.jpg" alt="">
    <div class="footer">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  beforeCreate(){
    console.log('this route',this.$route);
    console.log('beforeCreate开始执行。。。。。。。。');
  }
}
</script>

<style>

</style>