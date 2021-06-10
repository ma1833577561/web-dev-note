### 常用技能
· JavaScript 的数据类型包括原始类型和对象类型：

 原始类型：Null、Undefined、Number、String、Boolean、Symbol、BigInt
 对象类型：Object

`判断数据类型`
```
// 检测数据类型
const getType = function(obj) {
    let type = typeof obj
    if (type !== 'object') {
        return type
    }
    return Object.prototype.toString.call(obj).replace(/^\[object (\S+)\]$/, '$1').toLowerCase()
}
```
```
// 检测数据类型
var obj='1'
Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
```

```
//用 instanceof 检测原始类型
class PrimitiveNumber {
  static [Symbol.hasInstance] = x  => typeof x === 'number';
}
//number可以是string、number、boolean、symbol、null、undefined
// instanceof 不能检测原始类型，但是Symbol.hasInstance 允许我们自定义 instanceof 的行为让其用于检测原始类型。
```
`自己造一个instanceo`
```
const privateInstanceof = function(left, right) {
    if (typeof left !== 'object' || left === null) return false
    // 静态方法 Reflect.getPrototypeOf()与Object.getPrototypeOf()方法是一样的。都是返回指定对象的原型（即，内部的 [[Prototype]]属性的值）。
    let proto = Reflect.getPrototypeOf(left)
    while (true) {
        if (proto === null) return false
        if (proto === right.prototype) return true
        proto = Reflect.getPrototypeOf(proto)
    }
}


```
### 开发常见的问题


`解析连接 url`
  创造 a 标签，给 a 标签赋值 href 属性的方式，获取到协议，pathname，origin等 location 对象上的属性。
```
// 创建a标签
const aEle = document.createElement('a');
// 给a标签赋值href路径
aEle.href = '/test.html';
// 访问aEle中的属性
aEle.protocol; // 获取协议
aEle.pathname; // 获取path
aEle.origin;
aEle.host;
aEle.search;


```
`解析 get 参数`
  通过 replace 方法获取 url 中的参数键值对，可以快速解析 get 参数。
```
  const q = {};
location.search.replace(/([^?&=]+)=([^&]+)/g,(_,k,v)=>q[k]=v);
console.log(q);
```

`解决 ios audio / video 无法自动播放、循环播放的问题`
```
// 解决ios audio无法自动播放、循环播放的问题
var music = document.getElementById('video');
var state = 0;

document.addEventListener('touchstart', function(){
    if(state==0){
        music.play();
        state=1;
    }
}, false);

document.addEventListener("WeixinJSBridgeReady", function () {
    music.play();
}, false);
//循环播放
music.onended = function () {
    music.load();
    music.play();
}

```

