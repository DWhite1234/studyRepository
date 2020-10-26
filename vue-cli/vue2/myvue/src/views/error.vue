<!--
 * @Author: your name
 * @Date: 2020-10-26 16:34:56
 * @LastEditTime: 2020-10-26 16:59:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \codesRepository\vue-cli\vue2\myvue\src\views\error.vue
-->
<template>
  <div>
    <h1>404</h1>
    <span>页面走丢了</span>
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