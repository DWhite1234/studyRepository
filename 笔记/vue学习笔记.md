# 1.函数回调的注意点

```java
回调函数的三个注意点:
1.回调函数什么时候执行？
2.回调函数的作用是什么？
3.函数中的this指的谁

```

# 2.*computed计算属性

```js
*计算属性的应用场景：【经常使用】
	通过已有属性，计算产生一个需要的新的属性，而且可以直接使用

计算属性computed：包装了getter，setter

执行的时机：
	初始化显示第一次执行，得到初始化显示
  依赖数据发生改变就会再次调用
this指的谁：
	所有vue控制的回调函数的this都是vm实例或者组件对象

```

```javascript
computed:{
    //该函数默认使用getter
    fullName(){
    },

    //包含setter和getter函数的的对象
    fullName2:{
      getter(){
        return 1
      },
      setter(value){
      }
    }
  
  }
```

```js
使用:
1.只用getter，计算属性就是一个函数-----常用
2.setter，getter都使用，计算属性就是一个包含setter，getter的对象

重点:
1.计算属性拥有缓存
2.以对象的形式缓存，属性名是字符串类型的
3.作用:多次读取只执行一次getter计算
```

# 3.watch监视属性

```js
data:{
  person：{
    name：'张安',
    age: '12'
  }
},
watch:{
    firstName:function (value) {

    },
    lastName:function (value) {

    },
    //此处应该是属性而不能是对象
  	name:function(value){
      
    }
  }
```

```js
当被监视的属性值发生变化是自动回调
注意：监视的必须是属性，属性可以被多层嵌套

```

# 4.动态绑定class和style

```js
理解：
1.class绑定： ：class='xxxx'
  xxx可以是字符串
  	示例：<div :class="myClass">xxx</div> 【适用于类名不确定的场景】
  xxx可以是对象
  	示例：<div :class="{classA:true,classB:false}">xxx</div> 【适用于类名确定，是否使用不确定的场景】
  xxx可以是数组(不常用)
		示例：<div :class="['classA','classB']"></div>

2.style绑定:  :style='xxx'
xxx只能是对象
	示例：<div :style="{color:myColor,fotSize:myFontSize}"></div>

Export default {
  data(){
    return{
      myclass:'classC',
      classA:true,
      classB:false,
      myColor:'red',
      myFontSize:''
    }
  }
}
```

# 5.条件渲染

```js
v-if:直接删除创建节点
v-eles:直接删除创建节点

v-show:利用样式显示隐藏节点

	
	
<div v-if="ok">表白成功</div>
<div v-else="!ok">表白失败</div>

<div v-show="!ok">表白失败</div>
<div v-show="ok">表白成功</div>



```

# 6.列表渲染(数据绑定原理)

```js
遍历数组：
<ul>
  <li v-for="(per,i) in persons" :key="i">
    {{per.id}}---{{per.name}}---{{per.age}}
    
    <button @click="delP(i)">删除</button>
    <button @click="updateP(i,{id:5,name:'E',age:15})">添加</button>
  </li>
</ul>


遍历对象：用键值对的方式
<ul>
  <li v-for="(value,key) in persons.[1]" :key="key">
		{{key}}:{{value}}    
  </li>
</ul>


export default {
  		data(){
       return {
            persons:[
                    {id:1,name:'A',age:11},
                    {id:2,name:'B',age:12},
                    {id:3,name:'C',age:13},
                    {id:4,name:'D',age:14}
                ]
            };
        },
        methods: {
            delP(i){
                this.persons.splice(i,1)
            },
            updateP(i,newP){
                // this.psersons[i]=newP [数组本身属性没有发生变化，无法触发视图更新]
                this.persons.splice(i,1,newP)
            }
        }
    };
```

```java
		/*
    *  Vue数据绑定原理：
    *   1.vue会监视data中所有层次的属性，无论嵌套多少层
    *   2.对象中的属性数据通过添加set方法来实现监视
    *  【只要对象的属性发生了变化，对象即可被视为发生变化，即可触发视图更新】
    
    *   3.数组中的元素也实现了监视：重写数组一系列的更新元素的方法
    *  【数组单纯的增删改不视为数组本身属性发生变化，需要调用vue对数组处理的重写方法,
    *   也可以称为变异方法，才能触发视图更新】
    *       1).调用原生的对应的方法对元素进行处理
    *       2).出发视图更新
    *
    * */
```

## 面试案例（过滤,排序，v-for）

```js
<input type="text" v-model="searchName">
<ul>
  <li v-for="(per,i) in filterPersons" :key="i">
    {{per.id}}---{{per.name}}---{{per.age}}
  </li>
</ul>

<button @click="sortType=1"></button>
<button @click="sortType=2"></button>
<button @click="sortType=3"></button>

data() {
  return {
    persons:[
      {id:1,name:'A',age:11},
      {id:2,name:'B',age:12},
      {id:3,name:'C',age:13},
      {id:4,name:'D',age:14}
    ],
    searchName:'',
    sortType:1
  };
},
computed:{
  filterPersons(){
    const {sortType,searchName,persons}=this
    const arr=persons.filter(p=>p.name.indexOf(searchName)>=0)
    if(sortType!=1){
      arr.sort((p1,p2)=>{
        if(sortType==2){
          return p1.age-p2.age
        }else{
          return p2.age-p1.age
        }
      })
    }
    return arr
  }
}
```

# 7.事件处理

```js
<div id="app">
        <h1>事件监听</h1>
        <button @click="test1">test1</button>
        <button @click="test2('abc')">test1</button>
        <button @click="test3('abd',$event)">test1</button>
        <br>
  
        <h1>事件修饰符</h1>
        <!-- 阻止默认行为 -->
        <a href="http:www.baidu.com" @click.prevent="test4">test4</a>
        <!-- 停止冒泡-->
        <div @click="test6">
            <div @click.stop="test5">
                冒泡
            </div>
        </div>
        <br>
          
        <h1>键盘事件符</h1>
        <input type="text" v-model="msg" @keyup.13="test7">
        <input type="text" v-model="msg" @keyup.enter="test7">
    </div>

<script>
    var vm=new Vue({
        el:'#app',
        data:{
            msg:''
        },
        methods:{
            test1(){
                alert("111")
            },
            test2(e){
                alert(e)
            },
            test3(e,event){
                alert(e+'-'+event.target.innerHTML)
            },
            test4(){
                alert("阻止了默认行为")
            },
            test5(){
                alert("内层冒泡")
            },
            test6(){
                alert("外层冒泡")
            },
            test7(){
                alert(this.msg)
            }
        }
    });
</script>
```

```js
更多详细内容查看官方文档
```

# 8.路由传值

```java
1.params传值--需要用name属性，路由中必须配置name
  router.js:
import Main from './views/main.vue'
import Main2 from './views/main2.vue'
  
export default new Router({
    // mode: 'abstract',
    routes: [{
            path: '/main',
            component: Main,
        },
        {
            path: '/',
            redirect: '/main'
        }
        ,
        {	//单纯只配置path是无法使用params方式传值的
            name:'main2',
            path:'/main2',
            component:Main2
        }
    ]
})
  
  传值组件：
  methods: {
    jump(to) {
      //这里必须是$router
      this.$router.push({
        name:to,//这里必须使用name属性，使用path则只会跳转无法传值
        params:{
          mon:this.money
        }
      })
    }
  }

	接收组件：
  created() {
    this.money=this.$route.params.mon//使用params传值，这里也必须是params，同时这里是$route,不是$router
      alert(this.money)
  }
2.query传值--需要使用path属性，路由中必须配置path
  router.js:
import Main from './views/main.vue'
import Main2 from './views/main2.vue'
  
export default new Router({
    // mode: 'abstract',
    routes: [{
            path: '/main',
            component: Main,
        },
        {
            path: '/',
            redirect: '/main'
        }
        ,
        {	//单纯只配置path只能使用query方式传值
            //name:'main2',
            path:'/main2',
            component:Main2
        }
    ]
})
  
  
传值组件：
  methods: {
    jump(to) {
      //这里必须是$router
      this.$router.push({
        path:to,//这里必须使用name属性，使用path则只会跳转无法传值
        query:{
          mon:this.money
        }
      })
    }
  }

接收组件：
  created() {
    this.money=this.$route.query.mon//使用query传值，这里也必须是query，同时这里是$route,不是$router
      alert(this.money)
  }
```

# 9.v-model自动收集表单数据

```js

<div id="demo">
  <form action="/xxx" @submit.prevent="sub">
    <span>用户名: </span>
    <input type="text" v-model="person.username"><br>

    <span>密码: </span>
    <input type="password" v-model="person.pwd"><br>

    <span>性别: </span>
    <input type="radio" id="female" value="女" v-model="person.sex">
    <label for="female">女</label>
    <input type="radio" id="male" value="男" v-model="person.sex">
    <label for="male">男</label><br>

    <span>爱好: </span>
    <input type="checkbox" id="basket" value="basket" v-model="person.hobbies">
    <label for="basket">篮球</label>
    <input type="checkbox" id="foot" value="foot" v-model="person.hobbies">
    <label for="foot">足球</label>
    <input type="checkbox" id="pingpang" value="pingpang" v-model="person.hobbies">
    <label for="pingpang">乒乓</label><br>

    <span>城市: </span>
    <select v-model="person.cityId">
      <option value="4" selected>未选择</option>
      <option :value="city.id" v-for="(city, index) in cities" :key="city.id">{{city.name}}</option>
    </select><br>
    <span>介绍: </span>
    <textarea rows="10" v-model="person.info"></textarea><br><br>

    <input type="submit" value="注册">
  </form>
</div>

<script type="text/javascript" src="../js/vue.js"></script>
<script type="text/javascript">
  new Vue({
    el: '#demo',
    data: {
      person:{
        username:'',
        pwd:'',
        sex:'男',
        hobbies:[
          'foot'
        ],
        cityId:'1',
        info:''
      },
      cities:[
        {id:1,name:'BJ'},
        {id:2,name:'SH'},
        {id:3,name:'SZ'},
      ]
    },
    methods: {
      sub(){
        alert("发送Ajax请求。。。。")
      }
    }
  })
</script>

```

# 10.vue生命周期

![11370083-f279314aef6741db](H:\学习笔记\图片\11370083-f279314aef6741db.webp)

```js
一、创建
1、beforeCreate：这个阶段实例已经初始化，只是数据观察与事件机制尚未形成，不能获取DOM节点（没有data，没有el）
使用场景：因为此时data和methods都拿不到，所以通常在实例以外使用
2、created：实例已经创建，仍然不能获取DOM节点（有data，没有el）
使用场景：模板渲染成html前调用，此时可以获取data和methods，so 可以初始化某些属性值，然后再渲染成视图，异步操作可以放在这里

二、载入
1、beforeMount：是个过渡阶段，此时依然获取不到具体的DOM节点，但是vue挂载的根节点已经创建（有data，有el）
2、mounted：数据和DOM都已经被渲染出来了
使用场景：模板渲染成html后调用，通常是初始化页面完成后再对数据和DOM做一些操作，需要操作DOM的方法可以放在这里（异步请求）

三、更新
1、beforeUpdate：检测到数据更新时，但在DOM更新前执行（页面还是旧的页面，数据也是旧的数据）
2、updated：更新结束后执行（页面还是新的页面，数据是新的数据）
使用场景：需要对数据更新做统一处理的；如果需要区分不同的数据更新操作可以使用$nextTick

四、销毁
1、beforeDestroy：当要销毁vue实例时，在销毁前执行
2、destroyed：销毁vue实例时执行

第一次页面加载会触发哪些钩子
beforeCreate、created、beforeMount、mounted

```

# 11.过滤器

```js
<!--
1. 理解过滤器
  功能: 对要显示的数据进行特定格式化后再显示
  注意: 并没有改变原本的数据, 可是产生新的对应的数据
2. 编码
  1). 定义过滤器
    Vue.filter(filterName, function(value[,arg1,arg2,...]){
      // 进行一定的数据处理
      return newValue
    })
  2). 使用过滤器
    <div>{{myData | filterName}}</div>
    <div>{{myData | filterName(arg)}}</div>
-->
      
<!--需求: 对当前时间进行指定格式显示-->
  
<div id="test">
  <h2>显示格式化的日期时间</h2>
  <P>{{time}}</P>
	//使用过滤器的方法可以带参，也可以不带参
	<p>{{time | dataFormat}}</p>
  <p>{{time | dataFormat('YYYY-MM-DD')}}</p>
</div>

<script type="text/javascript" src="../js/vue.js"></script>
<script src="https://cdn.bootcdn.net/ajax/libs/moment.js/2.27.0/moment.js"></script>
<script>
  方法一二：
  Vue.filter('dataFormat',function(value,formatSta){
    // return moment(value).format(formatSta||'YYYY-MM-DD HH:mm:ss')
   // return moment(value).format(formatSta?formatSta:'YYYY-MM-DD HH:mm:ss')
  })
方法三：形参默认值
	Vue.filter('dataFormat',function(value,formatSta='YYYY-MM-DD HH:mm:ss'){
     return moment(value).format(formatSta)
  })
  new Vue({
    el: '#test',
    data: {
      time: Date.now()
    },
    //局部过滤器
    filters:{
      dataFormat:function(value,formatSta){
        return moment(value).format(formatSta?formatSta:'YYYY-MM-DD HH:mm:ss')
      }
     // dataFormat(value,formatSta){
     //  return moment(value).format(formatSta?formatSta:'YYYY-MM-DD HH:mm:ss')
     // } 
    }
  })
</script>
```

# 12.自定义指令

```js
常用内置指令
  v-text : 更新元素的 innerText 不转义，原样输出
  v-html : 更新元素的 innerHTML 转义，按功能转义
  v-if : 如果为true, 当前标签才会输出到页面
  v-else: 如果为false, 当前标签才会输出到页面
  v-show : 通过控制display样式来控制显示/隐藏
  v-for : 遍历数组/对象
  v-on : 绑定事件监听, 一般简写为@
  v-bind : 强制绑定解析表达式, 可以省略v-bind
  v-model : 双向数据绑定
  ref : 为某个元素注册一个唯一标识, vue对象通过$refs属性访问这个元素对象【alert(this.$refs.msg.innerHTML)】
  v-cloak : 使用它防止闪现表达式, 与css配合: [v-cloak] { display: none }
```

```js
自定义指令：

<div id="example">
  <p v-upper-text="msg">{{msg}}</p>
  <p v-lower-text="msg2">{{msg2}}</p>
</div>

<script type="text/javascript" src="../js/vue.js"></script>
<script type="text/javascript">
//定义全局指令
  Vue.directive('upper-text',function(el,binding){
    el.innerText=binding.value.toUpperCase()
  })
  new Vue({
    el: '#example',
    data: {
      content: '<a href="http://www.baidu.com">百度一下</a>',
      msg:'success',
      msg2:'SUCCESS'
    },
    //定义局部指令
    directives:{
      //含有特殊符号的Id需要使用''引起来
      'lower-text'(el,binding){
        el.innerText=binding.value.toLowerCase()
      }
    }
  })
</script>
```

# 13.vsCode创建一个vue项目

```js
1.安装vscode，nodejs

2.安装全局vue-cli
npm install -g vue-cli

3.安装全局webpack
npm install -g webpack 

4.初始化vue项目
vue init webpack myvue（项目名）

  该步骤可能出错
  vue : 无法加载文件 C:\Users\10179\AppData\Roaming\npm\vue.ps1，因为在此系统上禁止运行脚本。
  解决方法:
  1 搜powershell，并以管理员身份运行
  2.输入set-ExecutionPolicy RemoteSigned ，选择A或者Y即可
```

# 14.基本开发流程

![image-20200804221349572](C:\Users\10179\AppData\Roaming\Typora\typora-user-images\image-20200804221349572.png)

# 15.onmouseover和onmouseenter两套的区别

![image-20200805203259532](C:\Users\10179\AppData\Roaming\Typora\typora-user-images\image-20200805203259532.png)

# 16.组件间通讯

## 1.标签通信

```js

方式一：只传递数据，只适用于父向子组件通信
父组件:
<B v-for="(p,i) in persons" :key="p.id" :p="p"></B>

子组件：
{{this.p.id}}---{{this.p.name}}
export default{
     components:{
         C
     },
     props:{
         p:Object,
         addPerson:Function
     }
    }

方式二：传递函数，可以实现子组件向父组件通信,如果借助父组件的父组件可以实现同辈组件通信（先自向祖父，在祖父到父同辈组件）
父组件：
<B v-for="(p,i) in persons" :key="p.id" :p="p" :addPerson="addPerson"></B>

子组件：
<input type="button" value="添加" @click="add">
       {{this.p.id}}---{{this.p.name}}

export default{
     components:{
         C
     },
     props:{
         addPerson:Function
     },
     methods:{
         add(){
             const p={
                 id:4,
                 name:'周五'
             }
             this.addPerson(p)
         }
     }
    }
```

```
2.自定义事件通信


```



## 2.自定义事件

```js
父组件：
方式一：自定义事件
<B v-for="(p,i) in persons" :key="p.id" :p="p" @addPerson="addPerson"></B>
方式二：$on，$emit配合使用ref属性
<B ref="b"></B>

mounted(){
  		//方式二：
 			 //this.$refs.b.$emit('addPerson',p)
     },
methods:{
  			//方式一：
         addPerson(p){
             this.persons.unshift(p)
         }
     }
子组件：
<input type="button" value="添加" @click="add">

methods:{
  			
         add(){
             const p={
                 id:4,
                 name:'周五'
             }
             //触发回调函数
             this.$emit('addPerson',p)
           	
         }
     }
```



## 3.全局事件总线/事件总线

## 1.全局事件总线

```js
1.main.js
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

//方式一：
// Vue.prototype.EventBus = new Vue()
/* eslint-disable no-new */
new Vue({
  //方式二：
  beforeCreate(){
    Vue.prototype.EventBus = this
  },
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
}

        
父组件：
   不要在操作标签，直接挂在vm原型上     
        
     mounted(){
        this.EventBus.$on('addPerson',this.addPerson)
     },
       
子组件：配置事件监听
<input type="button" value="添加" @click="add">
  
	methods:{
         add(){
             const p={
                 id:4,
                 name:'周五'
             }
             this.EventBus.$emit('addPerson',p)
         }
     }
```

## 2.事件总线

1.新建一个实例EventBus

![image-20200806212810806](C:\Users\10179\AppData\Roaming\Typora\typora-user-images\image-20200806212810806.png)

2.在组件中引入实例

```js
父组件：
<template>
    <div>
        <h1>AAAAA</h1>
        <B v-for="(p,i) in persons" :key="p.id" :p="p" ref="header"></B>
        <input type="button" value="测试" @click="test">
        <D></D>
    </div>
</template>
<script>
import B from '../communication/B'
import D from '../communication/D'
//引入实例
import { EventBus } from '../EventBus'
    export default{
     components:{
         B,D
     },
     mounted(){
       //使用实例
        EventBus.$on('addPerson',this.addPerson)
     },
     methods:{
         addPerson(p){
             this.persons.unshift(p)
         }
     }
    }
</script>


子组件：
<template>
    <div>
       <input type="button" value="添加" @click="add">
       {{this.p.id}}---{{this.p.name}}
    </div>
</template>
<script>
 import { EventBus } from '../EventBus'
    export default{
     methods:{
         add(){
             const p={
                 id:4,
                 name:'周五'
             }
             EventBus.$emit('addPerson',p)
         }
     }
    }
</script>

```

# 17.slot插槽

```js
将父组件中的带slot标签插入子组件中与之对应的slot插槽中

父组件：
	<div>
  	<input type="text" slot="first">
  </div>

子组件：
	<slot name="first"></slot>
```

# 18.pubsub使用

```js
pubsub项目发布在github上
```



```js
1.下载pubsub
npm install pubsub-js

2.在子组件中引入，发布消息
import PubSub from 'pubsub-js'

methods:{
         add(){
             const p={
                 id:4,
                 name:'周五'
             }

             console.log(p)
         PubSub.publish('addP',p)
        }
     }


3.在父组件中引入，订阅消息
import PubSub from 'pubsub-js'

mounted(){
  PubSub.subscribe('addP',(msg,p)=>{
    this.addPerson(p)
  })
}
```

# 19.axios

```js
1.下载axios
npm install axios

2.引入axios
import Axios from 'axios'

3.发送请求(跨域)
	解决跨域问题：
  	在config/index.js中配置
		proxyTable: {
      '/api': {
        target: 'http://localhost:8081',//后端接口地址
        changeOrigin: true,//是否允许跨越
        pathRewrite: {
            '^/api': 'http://localhost:8081',//重写,
        }
    }


GET:请求（请求必须以api开头）
mounted(){
  Axios.get('/api/hello'，{
    	params:{
          id:1，
          name：'zhangsan'
       }        
    })//成功回调函数
    .then(response=>{
      cosnt result=response.data
    })
    .catch(error=>{
      
    })//失败回调函数
}


Post:请求（请求必须以api开头）
三点注意点：
	1.跨域，请求必须以api开头
  2.post请求必须搭配data
  3.data中的数据必须经过:Qs.stringify(data)处理
import Axios from 'axios'
import Qs from 'qs'
  
let data={
  name:'张三'
}
Axios({
  method:'post',
  url:'/api/hello',
  data:Qs.stringify(data),
})
  .then(response=>{
  const result =response.data
  this.res=result
  console.log(result)
})
}


建议：
	将import Axios from 'axios'
		import Qs from 'qs'添加到原型对象上,方便后面使用

全局使用：
import Axios from 'axios'
import Qs from 'qs'

Vue.prototype.Axios =Axios
Vue.prototype.Qs =Qs


 this.Axios({
   method:'post',
   url:'/api/hello',
   data:this.Qs.stringify(data),
 })
```

# 20.动态路由传值和接受

```js
动态路由配置
在路径后跟上/:xxx 占位符
routes: [
    {
      path:'/ta',
      name:'TA',
      component:TA,
      children:[
        {
          path:'tb/:id',
          name:'TB',
          component:TB,
        },
        {
          path:'tc/:id',
          name:'TC',
          component:TC
        }
      ]
    }
  ]

跳转的两种方式：
ES5拼接字符串，单引号
<router-link :to="'/ta/tb/'+m.id">TestB</router-link>
ES6斜引号
<router-link :to="`/ta/tb/{$m.id}`">TestB</router-link>

接受值：
1.标签接受值
<p>{{$route.params.id}}</p>

2.属性接受值
create(){
  this.id=this.$route.params.id
}

嵌套路由的使用：参考官方文档
https://router.vuejs.org/zh/
```

![image-20200810103801363](C:\Users\10179\AppData\Roaming\Typora\typora-user-images\image-20200810103801363.png)

**因此需要监视路由传的值，否则不能实现动态切换值**

![image-20200810104059115](C:\Users\10179\AppData\Roaming\Typora\typora-user-images\image-20200810104059115.png)

# 21.编程式路由导航

```js

<button @click="jump('td')">去TD</button>

methods:{
       jump(to){
         this.$router.push(to)
       }
     }


完整版：
methods:{
  jump(to){
    this.$router.push({
      path:''，
      query:{
      //问号传参的方式
   	 }
    })
  }
}

methods:{
  jump(to){
    this.$router.push({
      name:''，
      params:{
      //请求体传参
   	 }
    })
  }
}
更多路由设置，查看vue 路由介绍https://router.vuejs.org/zh/
```

# 22.history404

![image-20200810113320535](C:\Users\10179\AppData\Roaming\Typora\typora-user-images\image-20200810113320535.png)

**在router路由中加入mode**

![image-20200810114533360](C:\Users\10179\AppData\Roaming\Typora\typora-user-images\image-20200810114533360.png)



# 24.缓存路由组件

```js
<!-- 指定组件的名称，组件必须命名 -->
  <keep-alive include="" exclude="">
    <router-view></router-view>
	</keep-alive>
```

# 25.vuex

```js
1.配置vuex
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// 包括n个可变的属性数据
const state={
    count:0
}
// 包含n个直接更新状态数据的方法的对象
// 不要包含异步代码和逻辑代码
const mutations={
    increament(state){
        state.count++
    },
    decreament(state){
        state.count--
    }
}
// 包含n个间接更新状态数据的方法的对象
// 可以包含异步代码和逻辑代码
const actions={
  //多个属性可以使用对象的方式取{commit，state}
    increment({commit}){
        commit('increament')
    },
    decrement({commit}){
        commit('decreament')
    }
}
// 包含n个getter计算属性的方法的对象
const getters={
    result(state){
        return state.count %2==0?'偶数':'奇数'
    }
}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})

2.注册进man.js
import store from './store'

new Vue({
  el: '#app',
  store,
  components: { App },
  template: '<App/>'
})
```

```js
组件使用
<template>
    <div>
       <p>计数器</p><p>点击次数：{{$store.state.count}}</p><p>count是{{$store.getters.result}}</p>
       <input type="button" value="+" @click="increament">
       <input type="button" value="-" @click="decreament">
       <input type="button" value="+" @click="increament2">
       <input type="button" value="-" @click="decreament2">
    </div>
</template>
<script>
/*
store对象：
    1.state：包含所有state数据的对象
    获取state属性：$store.state.count
    2.getters：包含所有的getter计算属性的对象
    获取getters属性：$store.getters.result
    3.dispatch(actionName,data)
    触发action：this.$store.dispatch('increment')
    4.commit(MutationName,data)
    触发mutation:this.$store.commit('increament')
*/
    export default{
         increament(){
            this.$store.commit('increament')
         },
         decreament(){
            this.$store.commit('decreament')
         },
         increament2(){
            this.$store.dispatch('increment')
         },
         decreament2(){
            this.$store.dispatch('decrement')
         }
     }
    }
</script>
<style  scoped>

</style>
```

```js
优化代码：
<template>
    <div>
       <p>计数器</p><p>点击次数：{{count}}</p><p>count是{{result}}</p>
       <input type="button" value="+" @click="increament">
       <input type="button" value="-" @click="decreament">
       <input type="button" value="+" @click="increament2">
       <input type="button" value="-" @click="decreament2">
    </div>
</template>
<script>
/*
store对象：
    1.state：包含所有state数据的对象
    2.getters：包含所有的getter计算属性的对象
    3.dispatch(actionName,data)
    4.commit(MutationName,data)
*/
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
    export default{
     computed:{
        //  count(){
        //      return this.$store.state.count
        //  },
        //  result(){
        //      return this.$store.getters.result
        //  }
        //优化
        ...mapState(['count']),//count(){return this.$store.state.count}
        ...mapGetters(['result'])//result(){return this.$store.state.result}
     },
     methods:{
        //  increament(){
        //     this.$store.commit('increament')
        //  },
        //  decreament(){
        //     this.$store.commit('decreament')
        //  },
        //  increament2(){
        //     this.$store.dispatch('increment')
        //  },
        //  decreament2(){
        //     this.$store.dispatch('decrement')
        //  }
        ...mapMutations(['increament','decreament']),
        //当绑定的事件监听与触发的action命名不一样时,不能使用数组，需要使用对象指定名称
        ...mapActions({
            increament2:'increment',
            decreament2:'decrement'
        })
     }
    }
</script>
<style  scoped>

</style>
```

# 26.脚手架2和3的下载

```js
2：
npm install -g vue-cli
vue init webpack 项目名

3：
npm install -g @vue/cli
vue create 项目名
```



# 27.跨域

```js
第一种以/api为请求头/api/news
proxy: {
        '/api': {
          target: 'http://localhost:8081',
          ws: true,
          changeOrigin: true,
          //如果要以/api为开头的,这个重写是必须的不然404
          pathRewrite: {
            '^/api': 'http://localhost:8081',//重写,
        }
第二种直接跟请求/news     
proxy: 'http://localhost:8081', 
            
```

# 28 .使用router-link和router-view时

**路由中的嵌套路由可以简写，但是router-link必须是完整路径**

```js
routes:[
                {
                    path:'/',
                    redirect:'/ta'
                },
                {
                    path:'/ta',
                    name:'ta',
                    component:TA
                },
                {
                    path:'/tb',
                    name:'tb',
                    component:TB,
                    children:[
                        {//子路由可以简写
                            path:'tc',
                            name:'tc',
                            component:TC
                        },
                        {
                            path:'td',
                            name:'td',
                            component:TD
                        }
                    ]
                }
            ]

//可以使用
<router-link to="/tb/tc">TestC</router-link><br>
//无效
<router-link to="td">TestD</router-link><br>

router-link必须是完整路径
```

# 29.全局安装webpack

```js
1.下载nodejs
```

```js
2.创建新文件夹node_cache和node_global
```

![image-20200824105447563](H:\学习笔记\图片\image-20200824105447563.png)

```js
3.配置环境变量
C:\Program Files\nodejs\node_global

新建NODE_PATH
C:\Program Files\nodejs\node_modules
```

![image-20200824105601081](H:\学习笔记\图片\image-20200824105601081.png)

![image-20200824105610068](H:\学习笔记\图片\image-20200824105610068.png)

```JS
4.执行npm命令
npm config set prefix "C:\Program Files\nodejs\node_global"

npm config set cache "C:\Program Files\nodejs\node_cache"
```

```js
5.下载webpack
npm install -g webpack
npm install -g webpack-cli
```

