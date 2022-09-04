# vue自定义指令



#### (2).自定义指令


```

* v-permission

* v-copy

* v-longpress

* v-draggable

* v-waterMarker

* v-emoji

* v-debounce

* v-LazyLoad

```



* 批量注册指令



目录`src/directive/index.js`

```js

// index.js

import permission from './permission'

import copy from './copy'

import longpress from './longpress'

import draggable from './draggable'

import waterMarker from './waterMarker'

import emoji from './emoji'

import debounce from './debounce'

import LazyLoad from './LazyLoad'



// 自定义指令

const directives = {

  permission, copy,

  longpress, draggable,

  waterMarker, emoji,

  debounce, LazyLoad,

}

 

export default {

  install(Vue) {

    Object.keys(directives).forEach((key) => {

      Vue.directive(key, directives[key])

    })

  },

}

```



目录`src/main.js`

```js

// 在 main.js或者app.js 引入并调用

import Vue from 'vue'

import Directives from './JS/directives'

Vue.use(Directives)

```
* 权限指令



目录`src/directive/permission.js`

```js

// permission.js

// 1、需求根据用户权限是否展示内容

import store from '../store';

export default {

    bind(el, binding) {

        const { permissions } = store.state.user;

        // 提取公共参数

        const value = `USHOP:HC:AD:USHOP:${binding.value}`;

        if (permissions.indexOf(value) === -1) {

            el.style.display = 'none';

        }

    },

    install(Vue) {

        Vue.directive('permission', {

            bind: this.bind

        });

    }

};

// 在 src/directive/index.js 引入并注册

```



目录`src/views/xxx.vue`

```html

<!-- 文件中 -->

<button v-permission="'SERVICE_EDIT'">编辑</button>

<!-- SERVICE_EDIT  c参数权限1码 -->

```



* 一键复制指令



目录`src/directive/copy.js`

```js

// 2、实现一键复制文本内容，用于鼠标右键粘贴。

export default {

  bind(el, { value }) {

    el.$value = value

    el.handler = () => {

      if (!el.$value) {

        // 值为空的时候，给出提示。可根据项目UI仔细设计

        console.log('无复制内容')

        return

      }

      // 动态创建 textarea 标签

      const textarea = document.createElement('textarea')

      // 将该 textarea 设为 readonly 防止 iOS 下自动唤起键盘，同时将 textarea 移出可视区域

      textarea.readOnly = 'readonly'

      textarea.style.position = 'absolute'

      textarea.style.left = '-9999px'

      // 将要 copy 的值赋给 textarea 标签的 value 属性

      textarea.value = el.$value

      // 将 textarea 插入到 body 中

      document.body.appendChild(textarea)

      // 选中值并复制

      textarea.select()

      const result = document.execCommand('Copy')

      if (result) {

        console.log('复制成功') // 可根据项目UI仔细设计

      }

      document.body.removeChild(textarea)

    }

    // 绑定点击事件，就是所谓的一键 copy 啦

    el.addEventListener('click', el.handler)

  },

  // 当传进来的值更新的时候触发

  componentUpdated(el, { value }) {

    el.$value = value

  },

  // 指令与元素解绑的时候，移除事件绑定

  unbind(el) {

    el.removeEventListener('click', el.handler)

  },

}

/////////////////

// 这样就可使用了

// 在 src/directive/index.js 引入并注册

```



目录`src/views/xxx.vue`

```html

<button v-copy="copyText">复制</button>

<!-- copyText要粘贴的文本 -->

```



* 长按指令



目录`src/directive/longpress.js`

```js

// 3、实现长按，用户需要按下并按住按钮几秒钟，触发相应的事件

export default {

  bind: function (el, binding, vNode) {

    if (typeof binding.value !== 'function') {

      throw 'callback must be a function'

    }

    // 定义变量

    let pressTimer = null

    // 创建计时器（ 2秒后执行函数 ）

    let start = (e) => {

      if (e.type === 'click' && e.button !== 0) {

        return

      }

      if (pressTimer === null) {

        pressTimer = setTimeout(() => {

          handler()

        }, 2000)

      }

    }

    // 取消计时器

    let cancel = (e) => {

      if (pressTimer !== null) {

        clearTimeout(pressTimer)

        pressTimer = null

      }

    }

    // 运行函数

    const handler = (e) => {

      binding.value(e)

    }

    // 添加事件监听器

    el.addEventListener('mousedown', start)

    el.addEventListener('touchstart', start)

    // 取消计时器

    el.addEventListener('click', cancel)

    el.addEventListener('mouseout', cancel)

    el.addEventListener('touchend', cancel)

    el.addEventListener('touchcancel', cancel)

  },

  

  // 当传进来的值更新的时候触发

  componentUpdated(el, { value }) {

    el.$value = value

  },

  // 指令与元素解绑的时候，移除事件绑定

  unbind(el) {

    el.removeEventListener('click', el.handler)

  },

}



// 这样就可使用了

// 在 `src/directive/index.js` 引入并注册

// 给 Dom 加上 v-longpress 及回调函数即可

/////////////////

// 文件中

```



目录`src/views/xxx.vue`



```html

<button v-longpress="longpressFn">长按</button>

<!-- longpressFn 是自定义的一个方法用于回调 -->

```



* 拖拽指令



目录`src/directive/draggable.js`

```js

// 4、实现一个拖拽指令，可在页面可视区域任意拖拽元素

export default {

  inserted: function (el) {

    el.style.cursor = 'move'

    el.onmousedown = function (e) {

      let disx = e.pageX - el.offsetLeft

      let disy = e.pageY - el.offsetTop

      document.onmousemove = function (e) {

        let x = e.pageX - disx

        let y = e.pageY - disy

        let maxX = document.body.clientWidth - parseInt(window.getComputedStyle(el).width)

        let maxY = document.body.clientHeight - parseInt(window.getComputedStyle(el).height)

        if (x < 0) {

          x = 0

        } else if (x > maxX) {

          x = maxX

        }

 

        if (y < 0) {

          y = 0

        } else if (y > maxY) {

          y = maxY

        }

 

        el.style.left = x + 'px'

        el.style.top = y + 'px'

      }

      document.onmouseup = function () {

        document.onmousemove = document.onmouseup = null

      }

    }

  },

}



/////////////////

// 在 `src/directive/index.js` 引入并注册

// 这样就可使用了

```



目录`src/views/xxx.vue`

```html

<!-- 文件中 -->

<div class="el-dialog" v-draggable></div>

```



* 添加水印



目录`src/directive/waterMarker.js`

```js

// 5、给整个页面添加背景水印

function addWaterMarker(str, parentNode, font, textColor) {

  // 水印文字，父元素，字体，文字颜色

  var can = document.createElement('canvas')

  parentNode.appendChild(can)

  can.width = 200

  can.height = 150

  can.style.display = 'none'

  var cans = can.getContext('2d')

  cans.rotate((-20 * Math.PI) / 180)

  cans.font = font || '16px Microsoft JhengHei'

  cans.fillStyle = textColor || 'rgba(180, 180, 180, 0.3)'

  cans.textAlign = 'left'

  cans.textBaseline = 'Middle'

  cans.fillText(str, can.width / 10, can.height / 2)

  parentNode.style.backgroundImage = 'url(' + can.toDataURL('image/png') + ')'

}

 

export default {

  bind: function (el, binding) {

    addWaterMarker(binding.value.text, el, binding.value.font, binding.value.textColor)

  },

}



/////////////////

// 这样就可使用了

// 在 `src/directive/index.js` 引入并注册

```



目录`src/views/xxx.vue`

```html

<!-- 文件中 -->

<div v-waterMarker="{text:'lzg版权所有',textColor:'rgba(180, 180, 180, 0.4)'}"></div>

```



* 禁止输入特殊字符和表情



目录`src/directive/emoji.js`

```js

// 6、对输入内容的限制，比如不能输入表情和特殊字符，只能输入数字或字母等

let findEle = (parent, type) => {

  return parent.tagName.toLowerCase() === type ? parent : parent.querySelector(type)

}

 

const trigger = (el, type) => {

  const e = document.createEvent('HTMLEvents')

  e.initEvent(type, true, true)

  el.dispatchEvent(e)

}

 

export default {

  bind: function (el, binding, vnode) {

    // 正则规则可根据需求自定义

    var regRule = /[^u4E00-u9FA5|d|a-zA-Z|rns,.?!，。？！…—&$=()-+/*{}[]]|s/g

    let $inp = findEle(el, 'input')

    el.$inp = $inp

    $inp.handle = function () {

      let val = $inp.value

      $inp.value = val.replace(regRule, '')

 

      trigger($inp, 'input')

    }

    $inp.addEventListener('keyup', $inp.handle)

  },

  unbind: function (el) {

    el.$inp.removeEventListener('keyup', el.$inp.handle)

  },

}

/////////////////

// 这样就可使用了

// 在 `src/directive/index.js` 引入并注册

``` 



目录`src/views/xxx.vue`

```html

<!-- 文件中 -->

<input type="text" v-model="note" v-emoji />

```



* 防抖



目录`src/directive/debounce.js`

```js

// 7、防止按钮在短时间内被多次点击，使用防抖函数限制规定时间内只能点击一次

export default {

  inserted: function (el, binding) {

    let timer

    el.addEventListener('keyup', () => {

      if (timer) {

        clearTimeout(timer)

      }

      timer = setTimeout(() => {

        binding.value()

      }, 1000)

    })

  },

}

/////////////////

// 这样就可使用了

// 在 `src/directive/index.js` 引入并注册



```



目录`src/views/xxx.vue`

```html

<!-- 文件中 -->

<button v-debounce="debounceClick">防抖</button>

<!-- debounceClick  回调函数 一般是提交表单、按钮点击 -->

```



* 图片懒加载



目录`src/directive/LazyLoad.js`

```js

// 8、实现一个图片懒加载指令，只加载浏览器可见区域的图片

// 判断浏览器是否支持 IntersectionObserver API，如果支持就使用 IntersectionObserver 实现懒加载，否则则使用 srcoll 事件监听 + 节流的方法实现。



export default {

  // install方法

  install(Vue, options) {

    const defaultSrc = options.default

    Vue.directive('lazy', {

      bind(el, binding) {

        LazyLoad.init(el, binding.value, defaultSrc)

      },

      inserted(el) {

        if (IntersectionObserver) {

          LazyLoad.observe(el)

        } else {

          LazyLoad.listenerScroll(el)

        }

      },

    })

  },

  // 初始化

  init(el, val, def) {

    el.setAttribute('data-src', val)

    el.setAttribute('src', def)

  },

  // 利用IntersectionObserver监听el

  observe(el) {

    var io = new IntersectionObserver((entries) => {

      const realSrc = el.dataset.src

      if (entries[0].isIntersecting) {

        if (realSrc) {

          el.src = realSrc

          el.removeAttribute('data-src')

        }

      }

    })

    io.observe(el)

  },

  // 监听scroll事件

  listenerScroll(el) {

    const handler = LazyLoad.throttle(LazyLoad.load, 300)

    LazyLoad.load(el)

    window.addEventListener('scroll', () => {

      handler(el)

    })

  },

  // 加载真实图片

  load(el) {

    const windowHeight = document.documentElement.clientHeight

    const elTop = el.getBoundingClientRect().top

    const elBtm = el.getBoundingClientRect().bottom

    const realSrc = el.dataset.src

    if (elTop - windowHeight < 0 && elBtm > 0) {

      if (realSrc) {

        el.src = realSrc

        el.removeAttribute('data-src')

      }

    }

  },

  // 节流

  throttle(fn, delay) {

    let timer

    let prevTime

    return function (...args) {

      const currTime = Date.now()

      const context = this

      if (!prevTime) prevTime = currTime

      clearTimeout(timer)

 

      if (currTime - prevTime > delay) {

        prevTime = currTime

        fn.apply(context, args)

        clearTimeout(timer)

        return

      }

 

      timer = setTimeout(function () {

        prevTime = Date.now()

        timer = null

        fn.apply(context, args)

      }, delay)

    }

  },

}

 

/////////////////

// 这样就可使用了

// 在 `src/directive/index.js` 引入并注册

```



目录`src/views/xxx.vue`

```html

<!-- 文件中 -->

< img v-LazyLoad="xxx.jpg" />

```


