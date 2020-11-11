/*
 * @Author: your name
 * @Date: 2020-10-26 14:57:00
 * @LastEditTime: 2020-10-27 16:16:59
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
import nameViews from '../views/nameViews.vue'
import nameView1 from '../views/nameView1.vue'
import nameView2 from '../views/nameView2.vue'
import nameView3 from '../views/nameView3.vue'
import routerMeta from '../views/routerMeta/routerMeta.vue'
import routerMetaChild from '../views/routerMeta/routerMetaChild.vue'
import error from '../views/error.vue'
Vue.use(VueRouter)

const router=new VueRouter({
    routes:[
      //重定向
      {
        path:'',
        redirect:'/home'
        //1.直接重定向路径 redirect:'/home'
        //2.可以重定向name redirect:{name:'Home'}
        //3.可以重定向一个方法 redirect:to=>{
        //    const {a,b,c}=to
        //    if(a){
        //      ......
        //    }
        //    if(b){
        //      ......
        //    }
        //    if(c){
        //      ......
        //    }
        // }
      },
      {
        path:'/',
        redirect:'/home',
      },
      //重命名
      //当访问 /homes时，会自动被映射到 /Home
      {
        name:'Home',
        path:'/Home',
        component:Home,
        alias:'/homes'
      },
      //路由组件传参
      //1.布尔模式,传递参数必须跟在路径后
      // {
      //   name:'TestESlint',
      //   path:'/TestESlint/:id/:name',
      //   component:TestESlint,
      //   props:true
      // },
      //对象模式，可以将参数写在props对象中（只适用于静态值，没什么作用）
      // {
      //   name:'TestESlint',
      //   path:'/TestESlint',
      //   component:TestESlint,
      //   props:{name:"word",id:"zzzzz"},
      // },
      //函数模式，
      {
        name:'TestESlint',
        path:'/TestESlint',
        component:TestESlint,
        // props:(route)=>({name:route.params.name,id:route.params.id}),
        props:(route)=>({name:route.query.name,id:route.query.id}),
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
      //测试命名视图
      {
        name:'nameViews',
        path:'/nameViews',
        component:nameViews,
        children:[
          {
            name:'',
            path:'',
            components:{
              default:nameView1,
              a:nameView2,
              b:nameView3
            }
          },
          {
            name:'nameView1',
            path:'nameView1',
            components:{
              default:nameView1,
              // a:nameView2,
              // b:nameView3
            }
          },  
          {
            name:'nameView2',
            path:'nameView2',
            components:{
              // default:nameView1,
              a:nameView2,
              // b:nameView3
            }
          },  
          {
            name:'nameView3',
            path:'nameView3',
            components:{
              // default:nameView1,
              // a:nameView2,
              b:nameView3
            }
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
      //测试路由元信息
      {
        name:'routerMeta',
        path:'/routerMeta',
        component:routerMeta,
        meta:{login_status:true},
        children:[
          {
            name:'routerMetaChild',
            path:'routerMetaChild',
            component:routerMetaChild,
            meta:{login_status:false}
          }
        ]
      },
      {
        name:'testLess',
        path:'testLess',
        component:()=>import('../views/testLess.vue')
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
//全局前置守卫
// router.beforeEach((to,from,next)=>{
//   console.log('to',to);
//   console.log('from',from);
//   console.log('to.meta.login_status',to.meta.login_status);
//   if(to.meta.login_status){
//     console.log('允许');
//     next()
//   }else if(to.name=='Home'){
//     console.log('跳转');
//     next()
//   }else{
//     next({path:'/Home'})
//   }
// })
export default router
