# Vuex



## 4、总结


  
## 3、开发

> 开发使用频率

```js
mapState > getters > this.$store.state.[模块].[属性] > mutations > actions

mapState > mapGetters

commit > dispatch

```
 

* 在入口文件引入模块

```js
// src/store/index.js
import Vue from 'vue';
import Vuex from 'vuex';
import manage from './manage';

Vue.use(Vuex);
// ...code

const store = new Vuex.Store({
    // 组合各个模块
    modules: {
        manage,
    },
    // 关闭严格模式
    strict: debug,
});

export default store;

```


* 新建模块文件

```js
// src/store/manage.js
import { mapState } from 'vuex';
export default {
  namespaced: true,
  state: {
    info: {}
    list:[],
    fromConfig:[],
    flag:false,
  },
  getters: {
    hasFlashDeal: state => {
        return state.flag;
    }
  },
  mutations: {
      setList(state, data) {
          state.list = data;
      },
      setInfo(state, data) {
          state.info = data;
      }

  },
  actions: {
    async getInit({ commit }, token) {
        const { data } = await API.home.init(token);
        commit('setInfo', data || []);
    }
  }
}
```

* 文件中使用
```js
// src/pages/home/index.vue
import { mapState, mapGetters } from 'vuex';
export default {
  computed: {
    // 获取
    ...mapState('manage', {
        fromConfig: state => state.fromConfig,
    }),
    ...mapGetters('manage', ['hasFlashDeal']),
    // hasFlashDeal:() => this.$store.getters['manage/hasFlashDeal'];
    userId: () => this.$store.state.manage.info.userId;
  },
  methods: {
    async getList() {
       const { data } = await API.home.list
            // 添加、修改
            this.$store.commit('manage/setList', data || []);
            data.hasPower && this.$store.dispatch('manage/getInit', data.token || '');
        });
    },
  }
}
```


## 2、使用

* 目录src/app.js

```js
  import Vue from 'vue';
  import store from './store';
  import App from './App.vue';

  Vue.config.productionTip = false;

  new Vue({
      store,
      render: h => h(App)
  }).$mount('#app');

```

* 目录src/store

```js
  // index.js
  import Vue from 'vue';
  import Vuex from 'vuex';
  import createLogger from 'vuex/dist/logger';
  // Vuex 自带一个日志插件用于一般的调试，生成状态快照，对比出改变前后不同的值。
  // 注：logger 插件会生成状态快照，所以仅在开发环境使用

  import user from './user'
  import goods from './goods'
  // import 模块A from './模块A'

  Vue.use(Vuex);

  const debug = process.env.NODE_ENV !== 'production';
  const plugins = debug ? [createLogger()] : [];
  const store = new Vuex.Store({
      // 组合各个模块
      modules: {
          user,
          goods,
          // 模块A、模块B...
      },
      // 关闭严格模式
      strict: debug,
      plugins
  });

  // 热更新模块
  if (module.hot) {
    // 使 action 和 mutation 成为可热重载模块
    module.hot.accept(['./user', './goods'], () => {
      // 获取更新后的模块
      // 因为 babel 6 的模块编译格式问题，这里需要加上 `.default`
      const userHot = require('./user').default;
      const goodsHot = require('./goods').default;
      // 加载新模块
      store.hotUpdate({
          modules: {
              user: userHot,
              goods: goodsHot
          }
      })# Vuex



## 4、总结


  
## 3、开发

> 开发使用频率

```js
mapState > getters > this.$store.state.[模块].[属性] > mutations > actions

mapState > mapGetters

commit > dispatch

```
 

* 在入口文件引入模块

```js
// src/store/index.js
import Vue from 'vue';
import Vuex from 'vuex';
import manage from './manage';

Vue.use(Vuex);
// ...code

const store = new Vuex.Store({
    // 组合各个模块
    modules: {
        manage,
    },
    // 关闭严格模式
    strict: debug,
});

export default store;

```


* 新建模块文件

```js
// src/store/manage.js
import { mapState } from 'vuex';
export default {
  namespaced: true,
  state: {
    info: {}
    list:[],
    fromConfig:[],
    flag:false,
  },
  getters: {
    hasFlashDeal: state => {
        return state.flag;
    }
  },
  mutations: {
      setList(state, data) {
          state.list = data;
      },
      setInfo(state, data) {
          state.info = data;
      }

  },
  actions: {
    async getInit({ commit }, token) {
        const { data } = await API.home.init(token);
        commit('setInfo', data || []);
    }
  }
}
```

* 文件中使用
```js
// src/pages/home/index.vue
import { mapState, mapGetters } from 'vuex';
export default {
  computed: {
    // 获取
    ...mapState('manage', {
        fromConfig: state => state.fromConfig,
    }),
    ...mapGetters('manage', ['hasFlashDeal']),
    // hasFlashDeal:() => this.$store.getters['manage/hasFlashDeal'];
    userId: () => this.$store.state.manage.info.userId;
  },
  methods: {
    async getList() {
       const { data } = await API.home.list
            // 添加、修改
            this.$store.commit('manage/setList', data || []);
            data.hasPower && this.$store.dispatch('manage/getInit', data.token || '');
        });
    },
  }
}
```


## 2、使用

* 目录src/app.js

```js
  import Vue from 'vue';
  import store from './store';
  import App from './App.vue';

  Vue.config.productionTip = false;

  new Vue({
      store,
      render: h => h(App)
  }).$mount('#app');

```

* 目录src/store

```js
  // index.js
  import Vue from 'vue';
  import Vuex from 'vuex';
  import createLogger from 'vuex/dist/logger';
  // Vuex 自带一个日志插件用于一般的调试，生成状态快照，对比出改变前后不同的值。
  // 注：logger 插件会生成状态快照，所以仅在开发环境使用

  import user from './user'
  import goods from './goods'
  // import 模块A from './模块A'

  Vue.use(Vuex);

  const debug = process.env.NODE_ENV !== 'production';
  const plugins = debug ? [createLogger()] : [];
  const store = new Vuex.Store({
      // 组合各个模块
      modules: {
          user,
          goods,
          // 模块A、模块B...
      },
      // 关闭严格模式
      strict: debug,
      plugins
  });

  // 热更新模块
  if (module.hot) {
    // 使 action 和 mutation 成为可热重载模块
    module.hot.accept(['./user', './goods'], () => {
      // 获取更新后的模块
      // 因为 babel 6 的模块编译格式问题，这里需要加上 `.default`
      const userHot = require('./user').default;
      const goodsHot = require('./goods').default;
      // 加载新模块
      store.hotUpdate({
          modules: {
              user: userHot,
              goods: goodsHot
          }
      })
    })
  }

  export default store;
```

## 1、安装

```bash
 $ npm install vuex@next --save # yarn add vuex@next --save
```
    })
  }

  export default store;
```

## 1、安装

```bash
 $ npm install vuex@next --save # yarn add vuex@next --save
```