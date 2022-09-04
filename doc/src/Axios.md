# axios





## 4、总结



```tip



  常见的http请求方式：xhr、jsonp（script.src）、ajax、axios、fetch

  开启允许跨域请求 

    1)、jsonp、

    2)、CORS解决跨域 后端设置 "Access-Control-Allow-Origin": *

    3)、webpack.config.js配置devServer proxy代理解决跨域

    4)、postMessage



```





 jsonp封装



```js



jsonp({

  url: 'http://localhost:3001/test',

  //设置参数

  data: {

    name: 'lisi',

    age: 20

  },

  success: function (data) {

    console.log(456)

    console.log(data)

  }

})



function jsonp(options) {

  //动态创建script标签

  const script = document.createElement('script')

  var params =""

  for (let attr in options.data) {

    params += '&'+ attr + "=" + options.data[attr];

  }

  // 设置函数名,让每次调用这个函数的时怪window都能挂载不同的函

  const fileName = 'myJson' + Math.random().toString().replace('.','')

  //将传递过来的函数变成全局函数

  // window.fn = options.success;

  window[fileName] = options.success

  //设置非同源地址

  script.src = options.url + '?callback=' + fileName + params;

  document.body.appendChild(script)

  //为script标签添加onload事件,否则每发送一次请求就会在body里添加

  script.onload = function () {

    document.body.removeChild(script)

  }

}

```



## 3、开发



目录src/views/home/index.vue

```vue

<script>

import API from '@/services'

// import API from '@/services/home'

  export default {

    methods:{

      async getList(){

        const result = await API.home.login({})

        // const result = await API.login({})

      }

    }

  }



</script>

```



目录src/service/index.js

```js

import home from './home';

export default {

    home,

};



```



目录src/service/home.js

```js

import request from '@/utils/request'



export default {

  login(params){

    return request.post('/vue-admin-template/user/login', params)

  }

}



```



* axios二次封装



目录src/utils/request.js



```js

// request.js

import axios from 'axios'

import { MessageBox, Message } from 'element-ui'

import store from '@/store'

import { getToken } from '@/utils/auth'



// create an axios instance

const service = axios.create({

  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url

  headers: { 'X-Requested-With': 'XMLHttpRequest' },

  // withCredentials: true, // send cookies when cross-domain requests

  timeout: 5000 // request timeout

})



// request interceptor

service.interceptors.request.use(

  config => {

    // do something before request is sent



    if (store.getters.token) {

      config.headers['X-Requested-With'] = 'XMLHttpRequest';

      config.headers['X-Token'] = getToken()

    }

    return config

  },

  error => {

    // do something with request error

    console.log(error) // for debug

    return Promise.reject(error)

  }

)



http.defaults.headers.post['Content-Type'] = 'application/json';

// response interceptor

service.interceptors.response.use(

  response => {

    if (isBlob(response)) {

        downloadBlob(response);

        return Promise.resolve();

    }

    const res = response.data



    // if the custom code is not 20000, it is judged as an error.

    if (res.code !== 20000) {

      Message({

        message: res.message || 'Error',

        type: 'error',

        duration: 5 * 1000

      })



      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;

      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {

        // to re-login

        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {

          confirmButtonText: 'Re-Login',

          cancelButtonText: 'Cancel',

          type: 'warning'

        }).then(() => {

          store.dispatch('user/resetToken').then(() => {

            location.reload()

          })

        })

      }
