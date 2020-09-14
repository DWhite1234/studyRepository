# 1.let

```js
作用：
	1.产生块级作用域
  2.不能重复定义
  3.有预解析，有变量提升，不能提前使用
  
注意点：
	1.全局变量提升
  	会创建一个变量对象script用来收集let定义的变量，但是没有赋值
  2.局部变量提升
  	会将var let定义的变量全部放到当前函数的变量对象中
  3.与var的变量提升的区别
  	1.let提升的变量不允许提前使用
    
    
重点使用：遍历
var btns=document.querySelectorAll('button')
for(let i=0;i<10;i++){
  btns[i].onclick=function(){
    alert(i)
  }
}
原因：let使for循环成为一个块级作用域，类似于局部作用域，在函数中使用可以遵循作用域链的原则
```

# 2.const

```js
作用：用来定义常量
其他作用与let相同
```

# 3.变量的解构赋值

```js
//注意点：使用解构赋值时，会自动声明属性，以便下面调用
		
		// 1.对象的解构赋值
		var obj={
			name:'zs',
			age:18
		}
		let {name,age}=obj;//按需索取
		console.log(name)
		console.log(age)
		
		//2.数组的解构赋值
		var arr=[1,2,3,4]
		let[,,a]=arr;//按下标索取，用逗号占位
		console.log(a)

解构赋值的简单应用：形参解构赋值
	var obj={
			name:'zs',
			age:18
		}
		function fun({name,age}){
			console.log(name,age)
		}
		fun(obj)
```

# 4.模板字符串拼接字符串

```js
用法：模板字符串必须使用``包含
变量使用${obj.name}

示例：
var obj={
			name:'zs',
			age:18
		}
		
		var str='我的名字是'+obj.name
		let str2=`my name is ${obj.name}`
		console.log(str,str2)
```

# 5.对象的简写

```js
		let name='zs'
		let age=18
		var obj={
			name:name,
			age:age,
			showName:function(){
				console.log(this.name)
			}
		}
		console.log(obj)
		
		//简写
		let obj2={
			name,//可以省略与属性相同的属性值
			age,
			showName(){//方法可以省略function关键字和冒号
				console.log(this.name)
			}
		} 
```

# 6.箭头函数

```js
//箭头函数左边(参数)
		//1.没有形参时，（）不可以省略
		let a1=()=>console.log('没有形参时，（）不可以省略')
		a1()
		//2.只有一个形参时，（）能省略
		let a2= b=>console.log(`只有一个形参时，（）能省略`)
		a2()
		//3.有多个形参时，（）不能省略
		let a3=(c,d)=>console.log('有多个形参时，（）不能省略')
		a3()
		
		
//箭头函数右边(函数体)
		//1.函数体只有一句语句或表达式时{}可以省略,
		//当{}省略时，会自动return当前语句或表达式的值，分号结尾
		let a4=()=> 123
		console.log(a4())
		
		//2.当函数体有多句语句时，不能省略{},如果不指定返回值，则默认返回undefined
		let a5=()=>{
			let a=3;
			console.log('当函数体有多句语句时，不能省略{}',a)
			return a;
		}
		console.log(a5())

特点:箭头函数无法作为构造函数（构造函数的特点，this指向实例），
原因：箭头函数的this指向在定义的时候就决定过了，而不是看调用的时候决定
```

![image-20200909213057806](H:\学习笔记\图片\image-20200909213057806.png)

# 7.rest可变参数(三点运算符)(...运算符）

```js
// 区别:
		// arguments伪数组（只有数组的length属性，没有一般数组方法）
		// ...运算符,是数组,有数组的一般方法
		
		//...运算符，用来取代arguments伪数组，更加灵活
		*//1.收集所有的实参
		function fn(...values){
			console.log(...values)
		}
		fn(1,2,3)
		
		*//2.收集除去占用的，剩余所有实参
		function fn2(a,...values){
			console.log(a)
			console.log(...values)
		}
		fn2(1,2,3)
		
		*//拓展，数组合并
		var arr1=[1,5]
		var arr2=[2,3,4]
		
		var arr3=[1,...arr2,5]
		console.log(arr3)

		*//...arr的作用，遍历数组，输出数组的值
		console.log(...arr1)//1,5
```

# 8.形参默认值

```js
//形参默认值的值，根据实参类型而定
		function person(x=1,y=2){
			this.x=x,
			this.y=y
		}
		var person1=new person()
		console.log(person1)//person1{x:1,y:2}
```

# 9.新增基本数据类型symbol

![image-20200911180925558](H:\学习笔记\图片\image-20200911180925558.png)

```js
for of 遍历的原理：只适用于数组（因为数组具有Symbol(Symbol.iterator)接口）
for(let itme of arr){
  console.log(item)
}
 
如果想遍历对象，需要给对对象的原型添加Symbol(Symbol.iterator)接口
Object.prototype.[Symbol.iterator]=iteratorUtil(我们自己实现的iterator原理接口)
 
//iterator原理
function iteratorUtil() { // iterator接口 ： 方法 || api
    console.log('我的方法被调用了', this); // this是遍历的目标数组
    // console.log(target);// undefined
    // 缓存this
    let that = this;
    ,
    let index = 0; //  标识指针的起始位置
    let keys = Object.keys(that);// 获取对象中所有key的数组
    if(this instanceof Array){ // 遍历数组
      return { // 生成iterator遍历器对象
        next:  function (){ // 可以使用箭头函数解决this的指向问题
          return index < that.length?{value: that[index++], done: false}:{value: that[index++], done: true}
        }
      }
    }else {// 遍历对象
      return { // 生成iterator遍历器对象
        next:  function (){ // 可以使用箭头函数解决this的指向问题
          return index < keys.length?{value: that[keys[index++]], done: false}:{value: that[keys[index++]], done: true}
        }
      }
    }
  }

  Array.prototype[Symbol.iterator] = iteratorUtil;
  Object.prototype[Symbol.iterator] = iteratorUtil;
  let arr = [2,3,4,5];
  for(let item of arr){
    console.log(item);
  }
  
  // for of 消费 iterator接口
  // 三点运算符消费 iterator接口
  console.log(...arr);
  
  let obj = {
    username: 'kobe',
    age: 43
  }

  console.log(Object.keys(obj));
  
  for(let item of obj){
    console.log(item);
  }
```

# 10.类

```js
类的作用：定义一种类型，每个实例化出来的对象都是该类型的
优点：减少重复代码
体现：constructor构造器的属性是实例的属性，showInfo方法不放在实例内，方法原型对象Person上，所有实例对象可见

类拥有自己的属性，子类不可使用
	给类添加属性的方法：
  	1.Person.msg='类，自身的属性'
		2.类初始化的时候添加
    	例如：class Person{
        static name='我是类的属性'//通过static给类初始化添加属性
        
        constructor(name,age){
				this.name=name;
				this.age=age
				}
        showInfo(){
				console.log(this.name)
				}
      }

		class Person{
			constructor(name,age){//类的构造器，必须是constructor
				this.name=name;
				this.age=age
			}
			showInfo(){
				console.log(this.name)
			}
		}
		
		let person1=new Person('zs',18);
		 
		 console.log(person1s
```

# 11.类的继承，父类方法的重写

```js
				//父类
        class Person{
            constructor(name,age){
                this.name=name;
                this.age=age;
            }
            showInfo(){
                console.log(this.name,this.age)
            }
        }

        let person1=new Person('ls',11);
        console.log(person1)

        //class 继承 extends
        class Child extends Person{
            constructor(name,age,sex){

                super(name,age);
                //添加子类属性
                this.sex=sex;
                console.log(name,age,sex)
            }
            //重写父类方法
            showInfo(){
                console.log(this.name,this.age,this.sex)
            }
        }

        let child1=new Child('lisi',14,'男');
        console.log(child1)
```

#  12.ES6其他新增方法

```js
//克隆，拷贝属性，会返回新对象，同时也改变原对象
 let obj={}
 let obj2={name:'zs'}
 let obj3={age:12}

 let result =Object.assign(obj,obj2,obj3);
 console.log(obj)
 console.log(result)
```

```js
//直接操作__proto__属性
let obj={name:'zs',age:12}

let obj2={}

obj2.__proto__=obj
console.log(obj2)
```

```js
//数组去重
console.log("----------------------ES5数组去重--------------")
       let arr=[1,2,3,4,5,1,2,3]

       function queryArr(arr){
        let result=[]
        arr.forEach(function(item,index){
            if(result.indexOf(item)<0){
                result.push(item)
            } 
        }); 
        return result
       }

       let arr2=queryArr(arr)
       console.log(arr2)

       console.log("----------------------ES6数组去重--------------")
       let arr=[1,2,3,4,5,1,2,3]

       function queryArr2(arr){
            let result=[]
            let set=new Set(arr)
            for(let item of set){
                result.push(item)
            }
            return result
       }
       //ES6代码优化
       let queryArr3= arr =>[...new Set(arr)];

       let arr2=queryArr3(arr)
       console.log(arr2)
```

# 13.定义检测数据类型的方法

```js
原理：Object的toString()方法可以将数据类型打印出来
例如：let obj={}，let obj=[1,2]
结果：[object Object],     1,2
想法:改变this指向，截取字符串

//定义检测数据类型的方法
       let arr=[]
       function fn(arr){
        return Object.prototype.toString.call(arr).slice(8,-1)
       }
       console.log(fn(arr))
```

# 14.深拷贝，浅拷贝

```js
# 深拷贝：当数组或对象中包含引用类型时，对该数组或对象的复制属性给另一个对象后，新的对象改变其中引用类型的值的时候，原数组或对象的引用类型中的值不会被改变

# 浅拷贝：当数组或对象中包含引用类型时，对该数组或对象的复制属性给另一个对象后，新的对象改变其中引用类型的值的时候，原数组或对象的引用类型中的值会改变

1.判断深拷贝，还是浅拷贝看修改新数据，源数据是否会被改变

自己实现一个深拷贝：
				let obj = {
            name: 'zs',
            sex: {
                sex1: 'nan',
                sex2: 'nv'
            }
        }

        function clone(target) {
            let result;
            if (target instanceof Array) {
                result = [];
            } else if (target instanceof Object) {
                result = {}
            } else {
                return target
            }

            for (let item in target) {
                let value = target[item]
                console.log(value instanceof Array)
                console.log(value instanceof Object)
                console.log('---')
                if (value instanceof Array || value instanceof Object) {
                    //递归调用，对象嵌套对象，在嵌套对象这种
                    //obj{name：'zs',sex:{name:'zs',sex:{...}}}
                    result[item] = clone(value)
                } else {
                    result[item] = value
                }
            }
            return result;
        }

        let obj2 = clone(obj)
            // console.log(obj2)
        obj2.sex.sex1 = '人妖'
        console.log(obj, obj2)
```

# 15.ES7

```js
1.幂运算
console.log(3**3) //27

2.判断数组是否包含某个值
arr.inclues(1)
```

