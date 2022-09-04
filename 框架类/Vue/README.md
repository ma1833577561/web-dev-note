### vuex

* state：存储状态（变量）
* getters：对数据获取之前的再次编译，可以理解为state的计算属性。我们在组件中使用 $sotre.getters.fun()
* mutations：修改状态，并且是同步的。在组件中使用$store.commit('',params)。这个和我们组件中的自定义事件类似。
* actions：异步操作。在组件中使用是$store.dispath('')
* modules：store的子模块，为了开发大型项目，方便状态管理而使用的。这里我们就不解释了，用起来和上面的一样。


### Vue2与Vue3区别

* 1.template标签
```
 // vue2
 <template>
  <div>
    ...
  </div>
 </template>

  // vue3
  <template>
    <div>Hello</div>
    <div> world </div>
    <div> ... </div>
 </template>
  
   // 我们可以看到使用vue2的时候，template标签内只能写一个元素，所以我们要用一个大的盒子把里面的元素包起来，但是vue3中却解除了这个限制，也就是说，一个template标签中可以写多个标签
```

* 2.建立数据

```

// 在vue2中，我们在写需要的数据的时候需要在export default的里面添加data并把它return出来
export default{
  data(){
    return {
      str:'Hello world !'
    }
  }
}

// vue3中，新增了个函数setup
export default{
  setup(){
    const str=ref('Hello world !')
    return {
      str
    }
  }
}
// vue2中的声明周期都是写在data外面的，和data同级，但是vue3的生命周期是写在setup函数里面的
```

* 3.绑定事件

```
  <template>
    <div>{{str}}</div>
    
    <button @click="clickHandle>点击按钮</button>
 </template>
 <script>
 import {ref} from 'Vue'
export default{
  setup(){
    const str=ref('Hello world !')
    const clickHandle=()=>{
      console.log('被你抓到了！！！')
    }
    return {
      str,clickHandle
    }
  }
}
 </script>
```
