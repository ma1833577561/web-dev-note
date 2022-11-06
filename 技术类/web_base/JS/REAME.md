# js 记录


## 1、JS单例设计模式

* ---22110620$----- 

`good`

    因为都是独立内存的所以不会出现冲突(每一个对象都是一个单独的实例（单独的堆内存），存储的键值对都是堆中私有的内容，所以两个实例之间不会有任何的冲突)

`failing`

   书写起来过于复杂性，造成代码冗余 (每当描述一个事务的信息，需要把对应的键值对都去编写一下，如果重复描述相似事务的信息，不仅需要重复做很多事情，而且还会导致代码的冗余)

`demo`
```js

    var obj = { xxx:xxx , ...}
    // var obj={...}; 本身就是基于 new Object() 构建出来的，所以是标准的单例设计模式；
```

`use`
团队协作中会把不同模块根据功能分到不同人，不同成员开发会有很多属性，方法，部分方法需要私有化，部分需要暴露出来供调用；也叫最base模块化思想

基于单例设计模式思想 + 闭包思想 + 模块管理思想
```js

var utils=(function(){
    function queryElement(){}
    function deleteElement(){}
    //=>导出当前版块中需要供别人调取的属性方法（也相当于把这些属性方法放到utils命名空间下进行分组管理，避免和别人的冲突）
    return {
        queryElement:queryElement,
        deleteElement:deleteElement
    };
})();

var searchModule=(function(){
    function queryData(){}
    function bindHTML(){
        //=>需要调取utils模块（命名空间中的方法）
        utils.queryElement();
    }
    return {
        init:function(){
        }
    };∏
})();
```

`扩展`

* 惰性单例(只需要使用一次的场景)

定义：惰性单例指的是在需要的时候才创建对象的实例。

```js
// 以创建登录模态框为例

const createLoginLayer = (function (){
	let div;
	return function (){
		if (!div) {
			div = document.createElement('div');
			div.innerHTML = '我是登录模态框';
		}
		return div;
	};
})();

// 在点击按钮时才创建节点（惰性）
document.getElementById('login-btn').onclick = function (){
	var loginLayer = createLoginLayer();
	loginLayer.style.display = 'block';
};


// 这里的对惰性单例的实现主要是只有单例了网页上的登录按钮，才会去创建，登录框的dom节点，并且只是创建一次。

```


## 2、JS工厂设计模式（函数封装）


工厂设计模式: 是在需要创建很多“相似实例”的情境下，让我们告别手动创建，而实现工业化批量生产

`good`
简单就是：提高开发效率、减少了页面中的冗余代码，实现 “低耦合高内聚” 进行 函数封装

`failing`
开发门槛提升

```js
function createPerson(name,age,sex,score,qunzi){
	var person={};
	person.name=name;
	person.age=age;
	person.sex=sex;
	person.score=score;
	if(typeof qunzi!=="undefined"){
		//=>传递了qunzi 形参对应的实参值
		person.qunzi=qunzi;
	}
	return person;
}
var person1=createPerson('小明',92,'男',90);
var person2=createPerson('小刚',62,'男',85);
var person3=createPerson('小红',18,'女',100,'red');

```



## 3、闭包


闭包： 能够读取其他函数内部变量的函数。
只有函数内部的子函数才能读取局部变量，闭包可以理解成“定义在一个函数内部的函数“。

`good`
闭包是将函数内部和函数外部连接起来的桥梁

`failing`
闭包会使函数中的变量都被保存在内存中，内存消耗很大，不能滥用闭包，否则会造成网页的性能问题，在IE中可能导致内存泄露。(解决方法是，在退出函数之前，将不使用的局部变量全部删除)

```js

// base
function a(){
    var i=0;
    function b(){
    console.log(++i);
    }
    return b;
}

var c=a();
c();

// more
let c = 4
const addX = x => n => n + x // x => return { return { n + x } }
const addThree = addX(3)  // n => n + 3
let d = addThree(c) //  7
console.log('example partial application', d)

```


## 4、原型，原型链