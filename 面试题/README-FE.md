# 前端面试题



1. 前端性能优化

  1). 使用css Sprites（精灵图）通过background-image、background-repeat、background-position的组合进行背景定位。


2. 水平垂直布局
  1). absolute +transform :绝对定位+转换
  ```
  
  ```
  2). 单元格(子)display:inline-block + (父)text-align:center + (父)display:table-cell + (父)vertical-align:middle
  ```
  
  ```
  3). display:flex + justify-content:center + align-items:center(弹性盒子)
  ```
  
  ```
  
 3.js内置对象有哪些、数据类型有哪些
  1). 内置对象 array、number、string、object、boolean
  2). 数据类型 null、number、string、undefined、boolean

4.如何实现跨域访问
 1). php请求头header{"Access-Control-Allow-Origin:* ”}
 2). jsonp  url+callbackFn

5.什么是原型链
  js对象是面向对象的，每一个构建的实例都有一个_proto_属性，该属性指向他的原型属性，原型属性上有原型属性prototype与实例指的是同一对象。
  在一个对象在查找某个属性时，自身没有回去_proto_去找，如果都没有会继续向原型找，知道找到prototype._proto_:null为止，这一过程叫做原型链。
