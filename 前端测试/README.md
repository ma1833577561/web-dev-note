# 前端测试


* `Jest`
1. 准备工作
 ```
  // 创建 在电脑上创建JestTest文件夹
  win+R 输入回车键(enter)
  输入 cd E： 回车
  输入 mkdir JestTest 回车
 ```
 2. 安装
 ```
 把JestTest拖到vscode中
 编辑器 vscode  打开工作台ctrl + ~ 键
 输入node -V 查看是否安装node环境
 输入npm  -V 查看npm环境
 输入 npm init 初始化package.json包
 输入 npm install jest@24.8.0 -D
 配置文件保存到开发配置项中
 
 ```
 3. 新建测试demo
 ```
 在JestTest下新建demo.js并输入以下例子
 // 自定义方法根据实际需要
 function drinkFn(money){
      return money > 2000 ? '喝红酒' : '喝奶茶'
  }
  
  // 自定义方法根据实际需要
  function doFn(money){
      return money < 500 ? '自己做饭' : '点外卖'
  }

  // 暴漏接口
  module.exports={
      drinkFn,doFn
  }
  再在JestTest下新建demo.test.js并输入以下例子
  
  // 引入文件
  const  demo = require('./demo.js')
  // 解构赋值
  const  {drinkFn,doFn}=demo

  // 测试函数1 根据需要
  
  test('喝点什么-5000',()=>{
      expect(drinkFn(5000)).toBe('喝红酒')
  })

  // 测试函数1 根据需要
  test('做点什么-1000',()=>{
      expect(doFn(100)).toBe('自己做饭')
  })
  
  开启测试模式，package.json文件中的script-test:值调整为jest
  {
    "name": "jesttest",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
      "test": "jest"
    },
    "author": "",
    "license": "ISC",
    "devDependencies": {
      "jest": "^24.8.0"
    }
  }

好了 在控制台上输入 npm run test
  
 
  
 ```
 * 注意 ：这里的test 是不能被随意更改的，不然程序会不识别的
 * 
 ![test](https://github.com/ma1833577561/web-development-notebook/blob/master/images/web_test/test.png)
 *  `expect：是调用demo.js中自定义的方法`
  toBe：括号中是你设定的输出结果，如果toBe括号中结果与程序执行结果不一致会报错，
  
 ![一致](https://github.com/ma1833577561/web-development-notebook/blob/master/images/web_test/1.png)
 
 
 * 只有程序输出结果与设定结果一致才会返回成功
 
 ![success](https://github.com/ma1833577561/web-development-notebook/blob/master/images/web_test/success.png)
 
 
 * 基本配置和测试覆盖率生成

```
 jest初始化
 打开之前的jestTest文件夹打开控制台ctrl + ~
 输入 npx jest --init 按回车键
 完成之后 输入  npx jest --coverage 回车键
 
```
* 就会看到 

![result](https://github.com/ma1833577561/web-development-notebook/blob/master/images/web_test/json.png)

![result](https://github.com/ma1833577561/web-development-notebook/blob/master/images/web_test/jestTest.png)

 
 * `扩展`
```
输入 npx jest --init 按回车键
在jest.config.js文件中含有
coverageDirectory : "coverage"   //打开测试覆盖率选项


// coverage--生成测试覆盖率文件夹的名字 可以修改
在/coverage/lcov-reporrt/index.html文件时给其他人看的（领导，同事等）

  开启测试模式，package.json文件中的coverage:值为jest --coverage，这样我们就可以使用npm run coverage来输出测试覆盖率文件夹了。
  {
    "name": "jesttest",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
      "test": "jest",
      "coverage":"jest --coverage"
    },
    "author": "",
    "license": "ISC",
    "devDependencies": {
      "jest": "^24.8.0"
    }
  }

```
* 就会看到 

![result](https://github.com/ma1833577561/web-development-notebook/blob/master/images/web_test/npmRunCoverage.png)



 
 
