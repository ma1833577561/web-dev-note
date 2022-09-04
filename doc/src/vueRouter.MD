

# vueRouter





## 4、总结



1、Vue视图渲染内容

```vue

  <template>

    <!-- 路由匹配到的组件将渲染在这里 -->

    <router-view></router-view>

  </template>

```



## 3、开发



### 1.B(browser)端

  * 管理后台

1).目录`src/app.js`



```js

// app.js或者main.js

import Vue from 'vue';

import router from './router';

import App from './App.vue';

import store from './store';



// 初始化用户信息

router.beforeEach((to, from, next) => {

    if (store.state.user.info.userId || to.path === '/login' || to.path === '/signup') {

        next();

    } else {

      // 是否登录，登录了可以进编辑页

        store.dispatch('user/getUserInfo').then(() => {

            const isPermission = store.getters['user/isPermission'] && !/^\/goods\/edit/.test(to.path);

            if (isPermission) {

                next('/goods/edit');

            } else {

                next();

            }

        });

    }

});



new Vue({

    router,

    store,

    render: h => h(App)

}).$mount('#app');



```



2).目录`src/router/index.js`



```js

 // index.js

import Vue from 'vue'

import Router from 'vue-router'



Vue.use(Router)



const routes = [

	{

		path: '/',

		component: () => import('@/views/home/index.vue'),

    // hidden: true // 侧边栏渲染时是否展示 自定义

    // children:[]

    // redirect() {

    //    // 是跳转填写页

    //    // 不是跳转浏览页

    //   return 是否是新开店铺 ? 'shop/edit' : 'shop/views'

    // },

	},

  {

    path: '/home',

    sdTitle: '首页', // 侧边栏 菜单名称 自定义

    component: () => import('@/views/home/index.vue'),

    icon: 'el-icon-s-home', // 侧边栏icon 自定义

    meta: {

        title: '首页' // header名称 

    },

    permission: 'MENU:HOME' // 权限码 自定义

  }, 

  {

    path: '/goods',

    hdTitle: '商品', // header名称  自定义

    sdTitle: '商品', // 侧边栏 菜单名称 自定义 

    hideChildMenu: true, // 是否隐藏侧边栏二级菜单 自定义

    component: () => import(/* webpackChunkName: 'goods' */'@/views/goods/index.vue'),

    permission: 'MENU:GOODS', // 权限码 自定义

    icon: 'el-icon-s-goods',  // 侧边栏icon 自定义

    children: [

      {

          path: 'add',

          component: () => import(/* webpackChunkName: 'goods' */'@/views/goods/add/index.vue'),

          meta: {

              title: '新建商品', // header名称 

              needToBack: true // 是否需要返回按钮 自定义

          },

      },

      {

          path: 'edit/:id',

          name: 'goodsEdit',

          component: () => import(/* webpackChunkName: 'goods' */'@/views/goods/add/index.vue'),

          props: {

              isEdit: true // 是否编辑

          },

      },

    ]

  },

]



export default new Router({

  mode:'hash', // 路由模式hash还是history

	routes,

	strict: process.env.NODE_ENV !== 'production',

})



```



3).目录src/store/index



```js

// index.js

import Vue from 'vue';

import Vuex from 'vuex';

import createLogger from 'vuex/dist/logger';

import user from './user';



Vue.use(Vuex);



const debug = process.env.NODE_ENV !== 'production';

// eslint-disable-next-line

const plugins = debug ? [createLogger()] : [];

const store = new Vuex.Store({

    // 组合各个模块

    modules: {

        user,

    },

    // 关闭严格模式

    strict: debug,

    plugins

});



if (module.hot) {

    module.hot.accept(['./user', './goods'], () => {

        const userHot = require('./user').default;

        const goodsHot = require('./goods').default;

        // swap in the new modules and mutations

        store.hotUpdate({

            modules: {

                user: userHot,

                goods: goodsHot

            }

        });

    });

}



export default store;



```



`user.js`



```js

import API from '@/services/common.js';



export default {

    namespaced: true,

    state: {

        info: {},

        roles: [],

        permissions: [],

    },

    getters: {

        userId(state) {

            return state.info.userId;

        },

        // 是否登录

        isPermission(state) {

            return state.roles.includes('ROLE_USTORE_LOGIN');

        },



    },

    mutations: {

        setUserInfo(state, data) {

            state.info = {

                userId: data.userId,

                userName: data.userName,

                isCreateShop: data.isCreateShop

            };

            state.permissions = [...data.permissions];

            state.roles = data.roles;

        }

    },

    actions: {

        async getUserInfo({ commit }) {

            const { data } = await API.getInitOperator();

            commit('setUserInfo', data);

        }

    }

};



```

`src/services/common.js`



```js

import request from 'http-request';



function GetRequest() {

    const url = location.search;

    const theRequest = {};

    if (url.indexOf('?') !== -1) {

        const str = url.substr(1);

        const strs = str.split('&');

        for (let i = 0; i < strs.length; i++) {

            theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1]);

        }

    }

    return theRequest;

}



export default {

    getInitOperator: ()=> request.get('operator/init', { userId: GetRequest().userId }); 

};



```





  * 网站

1).目录`src/app.js`



```js

// app.js或者main.js

import Vue from 'vue';

import router from './router';

import App from './App.vue';



new Vue({

    router,

    render: h => h(App)

}).$mount('#app');



```



2).目录`src/router/index.js`



```js

 // index.js

import Vue from 'vue'

import Router from 'vue-router'



Vue.use(Router)



const routes = [

	{ path: '/', component: () => import('@/views/home/index.vue')},

  {

		path: '/home',

		component: () => import('@/views/home/index.vue'),

    redirect: ()=> 登录信息 ? '/home/views' : '/404',

    children: [

      { path: '', component: () =>  import('@/views/home/page.vue');},

      { path: 'views', component: () => import('@/views/home/views.vue')},

    ]

	},

  { path: '/404',component: () => import('@/views/notFound/index.vue') },

]



export default new Router({

  mode:'hash', // 路由模式hash还是history

	routes,

	strict: process.env.NODE_ENV !== 'production',

})



```



### 2.C(移动端)端



1).目录`src/app.js`



```js

// app.js或者main.js

import Vue from 'vue';

import router from './router';

import App from './App.vue';



new Vue({

    router,

    render: h => h(App)

}).$mount('#app');



```



2).目录`src/router/index.js`



```js

 // index.js

import Vue from 'vue'

import Router from 'vue-router'



Vue.use(Router)



const routes = [

	{

		path: '/',

		component: () => import('@/views/home/index.vue'),

	},

]



export default new Router({

  mode:'history', // hash或者history

	routes,

	strict: process.env.NODE_ENV !== 'production', // 是否开启严格模式

  /**

   * 滚动行为

   * 这个功能只在支持 history.pushState 的浏览器中可用

   * 

  */

  scrollBehavior (to, from, savedPosition) { 

	    if (savedPosition) { 

		    return savedPosition

		} else {

			if (from.meta.keepAlive) {

				from.meta.savedPosition = document.body.scrollTop;

			}

		    return { x: 0, y: to.meta.savedPosition || 0 }

		}

	}

})



```



## 2、使用





* 1、目录`src/app.js`



```js

// app.js或者main.js

import Vue from 'vue';

import router from './router';

import App from './App.vue';



new Vue({

    router,

    render: h => h(App)

}).$mount('#app');



```





* 2、目录`src/router/index.js`



```js

 // index.js

import Vue from 'vue'

import Router from 'vue-router'



Vue.use(Router)



const routes = [

	{

		path: '/',

		component: () => import('@/views/home/index.vue'),

	},

]



export default new Router({

  mode:'hash', // 路由模式hash还是history

	routes,

})



```





* 3、常用code

  页面跳转

```js

  // 跳转到users路由

  this.$router.push('/users') 

  

  // 替换当前页面

  this.$router.replace({ path: '/home' }) 

  

  // 刷新当前页面

  this.$router.go(0) 

  

  // 返回上一页面

  this.$router.go(-1); 



  

```

  获取路由信息

```js

  // 当前路径

  this.$route.path

  

  // 当前路由携带参数信息

  this.$route.params

  this.$route.query

```



## 1、安装



```bash

 $ npm install vue-router@next --save  # yarn add vue-router@next --save

```
