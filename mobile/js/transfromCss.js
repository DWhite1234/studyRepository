/*
目标:创建一个可用复用的transform样式设置和获取函数

1.transformCss(element,'translateX',100)
2.transformCss(element,'rotate',100)
3.transformCss(element,'translateX')

*/
(function (w) {

	var styles={}
	function transformCss(ele,prop,val){
		console.log(arguments)
		console.log(prop,'prop');
		var dw=null
		if(prop.indexOf('translate')>=0){
			dw='px)'
		}else if(prop.indexOf('rotate')>=0){
			dw='deg)'
		}else if(prop.indexOf('scale')>=0){
			dw=' '
		}
		if(arguments.length==3){
			//第一种方式
			ele.style.transform=ele.style.transform.indexOf(prop)>=0?ele.style.transform.replace(prop,''):ele.style.transform+prop+'('+val+dw
			console.log(ele.style.transform,'ele.style.transform');
			//第二种方式,遍历对象拼串
			// styles[prop]=val
			// for(let i in styles){
			// 	console.log(i)
			// 	if(i.indexOf('translate')>=0){
			// 		styles[i]=styles[i]+'px'
			// 	}else if(i.indexOf('rotate')>=0){
			// 		styles[i]=styles[i]+'deg'
			// 	}else if(i.indexOf('scale')>=0){
			// 		styles[i]=styles[i]+'deg'
			// 	}
			// }
			// console.log(styles)
			// ele.style.transform=ele.style.transform+prop+'('+val+dw
		}else if(arguments.length==2){
			var res=getComputedStyle(ele)
			//matrix( scaleX(), skewY(), skewX(), scaleY(), translateX(), translateY() )
			console.log(res.transform)
			console.log(res)
		}
	}
	w.transformCss=transformCss
})(window)

