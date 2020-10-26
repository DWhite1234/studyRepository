<!--
 * @Author: your name
 * @Date: 2020-10-26 16:11:46
 * @LastEditTime: 2020-10-26 17:42:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \codesRepository\vue-cli\vue2\myvue\src\views\Users.vue
-->
<template>
  <div>
    <h1>我是Users的子路由UserChild</h1>
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