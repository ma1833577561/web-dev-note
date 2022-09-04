
### vue、webpack配置项

` 配置相对路径`

1. webpack构建

   ```js
   在build/webpack.base.conf里找到如下
   resolve: {
       extensions: ['.js', '.vue', '.json'],//取消后缀  引入文件路径就不用加文件后缀了
       alias: {
         'vue$': 'vue/dist/vue.esm.js', //引入vue
         '@': resolve('src'),
         'asd': resolve('src/components/children'), //自己新建 要从src开始写文件路径
       }
     },
   ```

   

2. vue cl3

   
   
   ```js
   在根目录下添加'vue.config.js'(有的话就不需要添加，直接打开就行)
   const path = require('path')
   function resolve(dir) {
    return path.join(__dirname, dir)
   }
   module.exports = {
    lintOnSave: true,
    chainWebpack: config => {
     config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('layout', resolve('src/layout'))
    }
   }
   ```
   

`配置启动端口和启动方式`

1. webpack构建

   ```js
   在build/webpack.config.conf里找到如下
   module.exports = {
       cache: false,// 缓存生成的 webpack 模块和 chunk，来改善构建速度 关闭缓存或者配置成
       /**
       **  webpack 配置中设置 cache.buildDependencies.config: [__filename] 来获取最新配置以及所有依赖项。
       ** cache: {
       **  buildDependencies: {
       **  This makes all dependencies of this file - build dependencies
       **  config: [__filename], //默认情况下 webpack 与 loader 是构建依赖。
       ** },
       ** },
       */
       devServer: {
           compress: true,// 开启静态文件压缩 gzip compression
           host:'0.0.0.0',// 默认配置  可以从外部打开
           // host: '192.168.0.104',
           inline: true, // 默认情况下，应用程序将启用 inline 模式，在 bundle中插入脚本以进行实时重新加载，并且构建消息将出现在浏览器控制台中
           port: 8090,//打开端口
           lazy: true,//“懒惰模式(lazy mode)” ：服务器仅在收到请求时才编译捆绑软件。也就是 webpack 将不会监视任何文件更改。 
           proxy:: {
           '/api': {
               target: 'http://localhost:3000',  // 启用代理在 localhost:3000 上
               changeOrigin: true, //代理保留主机头的来源，changeOrigin 设置为 true 以覆盖此行为
             },
           },
        open: true, // 设置为 true 以打开默认浏览器
        /**
        ** open: 'Chrome', 提供要使用的浏览器名称
        ** 浏览器应用程序名称取决于平台。 不要在可重用模块中对其进行硬编码。 
        ** 例如，'Chrome' 在 macOS 上是 'Google Chrome' ，在 Linux 上是 'Google Chrome' 在 Windows 上是 'Chrome'
        */
           colors: true,
       },
   },
   ```

   

2. vue cl3

   ```js
   在根目录下添加'vue.config.js'(有的话就不需要添加，直接打开就行)
   module.exports = {
       devServer:{
           port:3333, // 启动端口
           open:true  // 启动后是否自动打开网页
       }
   }
   ```

   
