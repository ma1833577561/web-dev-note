



# qiankun







# 4、总结

  **乾坤**

  ```

    优点 解决巨池应用

    瑕疵 支持vite主应用，子/微应用支持待完善

  ```

# 3、开发

  ## 1、手写乾坤

  ### 1.主应用

  * 1、注释乾坤依赖

  * 2、main/index.js导入自己的目录src/micro-fe

  ```js

    // import { registerMicroApps, start } from 'qiankun'

    import { registerMicroApps, start } from './micro-fe'

    // 注册子应用

    // 微前端运行原理与SPA非常相似



    registerMicroApps([

      // 匹配当前activeRule 的时候，请求获取entry资源，渲染到container

      {

        name: 'vueApp',

        entry: '//localhost:8080', // 子应用的html入口

        container: '#container',// 渲染

        activeRule: '/app-vue',// 路由匹配

      },

      {

        name: 'reactApp',

        entry: '//localhost:3001',

        container: '#container',

        activeRule: '/app-react',

      },

    ]);



    // 启动 qiankun

    start();

  ```

    新建目录src/micro-fe



  * 对外暴露start、registerMicroApps钩子函数

  src/micro-fe/index.js

  ```js

    import { rewriteRouter } from './rewrite-router'

    import { handleRouter } from './handle-router'



    // { entry, container, activeRule, unmount, mount, bootstrap }

    let _apps=[]



    // 供外部获取apps

    export const getApps = () => _apps 



    export const registerMicroApps = (apps) => {

      _apps = apps

      // console.log(apps)

    }

    /**

    * 怎么实现路由切换

    *  hash ：#/a/c

    *  使用window.onhashchange可以检测到页面变动

    *  history路由 

    *  pushState：进行重写添加；replaceState：进行替换删减；go:页面前进,back：页面后退

    *  */ 



    export const start = () =>{

      //  微前端运行原理

      //  1、监视路由变化

      rewriteRouter()



      // 初始执行匹配

      handleRouter()

      

    }

 

  ```

  

  * 接口封装

  src/micro-fe/fetch-resource.js

  ```js

    export const fetchResource = url => fetch(url).then(res=>res.text())



  ```



  * 钩子函数声明

  src/micro-fe/handle-router.js

  ```js

  

    import { getApps } from './index'

    import { importHtml } from './import-html'

    import { getPreRoute, getNextRoute } from './rewrite-router'



    /**

     * 处理路由变化的

    */

    export const handleRouter = async () => {

      const apps = getApps()



      // 卸载上一个应用

      const prevApp = apps.find(item => {

        return getPreRoute().startsWith(item.activeRule)

      })

      // 加载下一个应用

      const app = apps.find(item => getNextRoute().startsWith(item.activeRule))





      if(prevApp){

        await unmount(prevApp)

      }



      // console.log('handleRouter')

      //  2、匹配子应用

      /**

       * 匹配子应用

      * 1、获取当前的路由路径

      * 2、去apps里去查找

      * 

      */

      // console.log(window.location.pathname)

      

      

      // console.log(app,'app')



      if(!app) {

        return

      }



      //  3、加载子应用

      // /**

      //  * 加载子应用

      //  * 请求获取子应用资源js、css、html

      //  */

      // const html = await fetch(app.entry).then(res=>res.text())

      const container = document.querySelector(app.container)

      // /**

      //  * 客户端渲染需要通过执行 javascript 生产内容

      //  * 浏览器中处于安全考虑innerHTML中的 script 不会进行请求资源/不会进行加载

      //  */
