<!--
 * @Author: your name
 * @Date: 2020-10-27 13:51:34
 * @LastEditTime: 2020-10-27 14:12:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \codesRepository\vue-cli\vue2\myvue\src\views\routerMeta\routerMeta.vue
-->
<template>
  <div>
    <h1>测试路由元信息</h1>
    <router-link to='/routerMeta/routerMetaChild'>路由元信息</router-link>

    <router-view></router-view>
    <h1>总结</h1>
    <p>
      1.路由元信息可以用来设置标记，对当前路由做出限制，比如会员登录之类的
      2.路由元信息会被设置到$route对象中
      3.如果需要使用元信息，可以在全局前置路由中判断这些元信息就行限制
      示例：
        
    </p>
  </div>
</template>

<script>
export default {
  mounted(){
    console.log('this.route',this.$route);
  }
}
</script>

<style>

</style>