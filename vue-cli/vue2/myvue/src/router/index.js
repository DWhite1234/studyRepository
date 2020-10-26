/*
 * @Author: your name
 * @Date: 2020-10-26 14:57:00
 * @LastEditTime: 2020-10-26 17:57:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \codesRepository\vue-cli\vue2\myvue\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import TestESlint from '../views/TestESlint.vue'
import Home from '../views/Home.vue'
import Users from '../views/Users.vue'
import User from '../views/User.vue'
import UserChild from '../views/UserChild.vue'
import routerPush from '../views/routerPush.vue'
import routerChild from '../views/routerChild.vue'
import error from '../views/error.vue'
Vue.use(VueRouter)

const router=new VueRouter({
    routes:[
      {
        path:'',
        redirect:'/home'
      },
      {
        path:'/',
        redirect:'/home'
      },
      {
        name:'Home',
        path:'/Home',
        component:Home
      },
      {
        name:'TestESlint',
        path:'/TestESlint',
        component:TestESlint
      },
      //动态路由。以：绑定变量，同时在该组件中，使用this.$route.params.id获取该参数
      //ps1:改方式只能适用于path路由
      //ps2:当不跳转当前页面的只更改路由复用组件时，钩子函数将不会执行
      {
        name:'Users',
        path:'/Users/:id',
        component:Users,
        children:[
          {
            name:'',
            path:'',
            component:UserChild
          },
          {
            name:'User',
            path:'User',
            component:User
          },
        ]
      },
      {
        name:'routerPush',
        path:'/routerPush',
        component:routerPush,
        children:[
          {
            name:'routerChild',
            path:'routerChild',
            component:routerChild
          },
        ]
      },
      //通配符匹配路由，主要用于处理404,
      //ps:通配符匹配路由，应该放在所有路由的最后
      {
        path:'*',
        component:error
      }
    ]
    //ps:路由的匹配具有优先级，谁先定义谁先匹配
})
export default router
