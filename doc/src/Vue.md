# vue





## 4、总结



```tip

  重绘(元素外观的改变所触发的浏览器行为v-show)



  回流(渲染树需要重新计算v-if) 

  

  回流一定重绘,重绘不一定回流

```



  ```js

    vue的内容视图内容都在<router-view></router-view>中



  ```

## 3、开发



### 1.组件通信
#### (1)更多
  见[Vue组件通信](./src/VueComponentDelivery.md)

### 2.插槽



```html

<vue-component>

  张三 

  <template slot="tag">喜欢</template>

<vue-component>

```

目录`src/views/vue-component.vue`

```html

<div>

  <div>xxx</div>

  <!-- 匿名形式 -->

  <slot><!--这里面是张三--></slot>

  <!-- 具名形式 -->

  <slot name="tag"><!--这里面是喜欢--></slot>

  <div>xxx</div>

<div>

```





### 3.自定义指令


#### (1).自定义双向绑定指令



**`list.vue`**

```vue

<template>

    <div class="good-item">

         <item v-model="form.text" class="form-item" @change="changeValidate"/>   

    </div>

</template>

<script>

    import {cloneDeep} from 'lodash';

    import item from './components/item.vue';



    const form = {

        text: ''

    };

    export default ({

        components: {

            item

        },

        data() {

            return {

                form: cloneDeep(form),

                picUrl: ''

            };

        },

        methods:{

            changeValidate(field) {

                 this.form.text = field;

            },

        }

    });

</script>

```



**`litem.vue`**



```vue

<template>

    <div class="goods-item">

        {{ msg }}

    </div>

</template>

<script>

    import serviceApi from '@/services/service';

    export default {

        model: {

            prop: 'text',

            event: 'change'

        },

        props: {

            text: {

                type: String,

                default: '',

            },

        },

        data() {

            return {

                msg: this.text,

            };

        },

        watch: {

            text(val) {

                if (val) {

                    this.msg = val;

                }

            }

        }

    };

</script>

```



#### (2)更多
  参见[vue自定义组件](./src/VueDirective.md)

## 2、使用



目录src/app.js

```js

// app.js/main.js

import Vue from 'vue';

import App from './App.vue';



Vue.config.productionTip = false;



new Vue({

    render: h => h(App)

}).$mount('#app');



```



### 1.指令

  ```

    v-if、v-show、v-html、v-model、v-for、v-on/@、v-bind/:、v-text

  ```



### 2.基础使用



src/views/xxx.vue

```vue

<template>

  <div>  

    {{message}}-{{count}}：

    <span v-if="flag">{{message}}</span>

    <span v-show="flag" :style="{ color: activeColor, fontSize: fontSize + 'px' }">{{count|count}}</span>

    <!--<span v-show="flag" :style="[baseStyles, overridingStyles]">{{count|count}}</span>-->



    <input v-model="count" :class="{'active': flag}">

    <!--<input v-model="count" :class="[activeClass, errorClass]">-->



    <button @click="onAdd">合计+1</button>

    <ol>

      <li v-for="todo in todos" :key="todo.text">

        {{ todo.text }}

      </li>

    </ol>

  </div>

<template>

<script>

  export default {

    filters:{

      count:() => Boolean(count%2) ? '偶数' : '奇数'

    },

    data(){

      return {

        message: 'hello',

        count: 0,

        todos: [

          { text: '学习 JavaScript' },

          { text: '学习 Vue' },

          { text: '整个牛项目' }

        ]

      }

    },

    computed:{

      flag:()=>Boolean(count%2)

    },

    watch:{

      count(){

        this.message = flag ? 'hello' : 'world'

      },

      // count:{

      //   handle(){

      //     this.message = flag ? 'hello' : 'world'

      //   },

      //   deep:true, // 在任何被侦听的对象的 property 改变时被调用，不论其被嵌套多深

      //   immediate: true //在侦听开始之后被立即调用

      // }

    }

    methods:{

      onAdd(){

        this.count+=1

      }

    }

  }

</script

```



## 1、安装



```bash

 $ npm install vue@next --save # yarn add vue@next --save

```