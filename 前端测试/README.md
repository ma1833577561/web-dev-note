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
  
  注意 ：这里的test 是不能被随意更改的，不然程序会不识别的
  expect：是调用demo.js中自定义的方法
  toBe：括号中是你设定的输出结果，如果toBe括号中结果与程序执行结果不一致会报错，只有程序输出结果与设定结果一致才会返回成功
 ```
 [test](https://github.com/ma1833577561/web-development-notebook/blob/master/%E5%89%8D%E7%AB%AF%E6%B5%8B%E8%AF%95/images/%E6%B5%8B%E8%AF%95%E5%87%BD%E6%95%B0%E5%BF%85%E9%A1%BB%E6%98%AFtest.png)
 [一致](https://github.com/ma1833577561/web-development-notebook/tree/master/%E5%89%8D%E7%AB%AF%E6%B5%8B%E8%AF%95/images/)
 [success](https://github.com/ma1833577561/web-development-notebook/tree/master/%E5%89%8D%E7%AB%AF%E6%B5%8B%E8%AF%95/images/)
 
