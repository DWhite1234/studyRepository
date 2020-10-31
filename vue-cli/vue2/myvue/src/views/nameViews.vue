<!--
 * @Author: your name
 * @Date: 2020-10-27 08:56:54
 * @LastEditTime: 2020-10-27 16:27:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \codesRepository\vue-cli\vue2\myvue\src\views\nameViews.vue
-->
<template>
  <div>
    <h1>测试命名视图</h1>
    <router-link to="/nameViews/nameView1" style="margin-left:5vw;">默认视图</router-link>
    <router-link to="/nameViews/nameView2" style="margin-left:5vw;">视图a</router-link>
    <router-link to="/nameViews/nameView3" style="margin-left:5vw;">视图b</router-link><br>

    <div>
      视图展示1：<transition name="slide"><router-view></router-view></transition><br>==========================<br>
      视图展示2：<transition name="slide-left"><router-view name="a"></router-view></transition><br>==========================<br>
      视图展示3：<transition name="slide-left"><router-view name="b"></router-view></transition><br>==========================<br>
    </div>
    <h1>总结</h1>
    <p>
      1.视图可以指定多个,通过name属性
      2.每个路由可以指定多个组件
      3.不指定name属性则为默认
      <img src="../img/nameViews.jpg" alt="">
    </p>
  </div>
  
</template>

<script>
export default {

}
</script>

<style>

</style>