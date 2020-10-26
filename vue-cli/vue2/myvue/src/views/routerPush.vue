<!--
 * @Author: your name
 * @Date: 2020-10-26 17:51:56
 * @LastEditTime: 2020-10-26 18:08:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \codesRepository\vue-cli\vue2\myvue\src\views\routerPush.vue
-->
<template>
  <div>
    <div class="history">
      <div>1.声明式导航
      <!-- router-link -->
      <router-link to="/routerPush/routerChild">点击跳转子路由</router-link>
      </div>

      <div>2.编程式导航
        <!-- this.$router.push -->
        <button @click="jump" style="width:130px;">点击跳转子路由</button>
      </div>
      <!-- 总结：这两种方式都会产生历史记录，也就是会返回上一页 -->

    </div>
    <div class="noHistory">
      <div>1.声明式导航 replace
        <!-- router-link -->
        <router-link to="/routerPush/routerChild" replace>点击跳转子路由</router-link>
      </div>

      <div>2.编程式导航 replace
        <!-- this.$router.push -->
        <button @click="jump2" style="width:130px;">点击跳转子路由</button>
      </div>
      <!-- 这两种方式不会产生历史记录，也就不能返回上一页 -->
    </div>
    <div class="go">
      <!--
        router.go() 可以控制在历史记录中前进或后退，和window.history.go()基本一致
        1：历史记录中前进一步
        -1：历史记录中后退一步
      -->
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  methods:{
    jump(){
      this.$router.push({name:'routerChild'})
      // this.$router.push({path:'routerChild',params:{userId}})
      // 携带单独变量的可以使用模板字符串
      // this.$router.push({path:`/routerPush/routerChild/${userId}`})
    },
    jump2(){
      this.$router.replace({name:'routerChild'})
    }
  }
}
</script>

<style>

</style>