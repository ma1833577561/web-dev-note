### cookie, localStorage 与sessionStorage

`cookie`

特点:
* 可以设置cookie的过期时间， 在过期时间之前一直有效，即使窗口或浏览器关闭
* 存放数据大小为4K左右
* 有个数限制（各浏览器不同），一般不能超过20个
* 每次都会携带在HTTP请求的header中
设置
```
// username:cookie的name 
// cookieValue为cookie的value
// expires 过期时间
// path 域名下的哪些路径设置
// domain 在哪个域名设置，不设置默认是当前域名，不包含子域名，设置后则会包含子域名 domain如果跟当前域名不一样，则设置不会成功
document.cookie="username=cookieValue; expires=Thu, 18 Dec 2043 12:00:00 GMT; path=/abc; domain=abc.com";

```
获取
```
// 获取cookie
  function getCookie (name) {
    let arr
    const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    if ((arr = document.cookie.match(reg))) {
      return decodeURIComponent(arr[2])  // 最好用decodeURIComponent解义
    } else {
      return null
    }
  }
  getCookie('username') // cookieValue

```
`localStorage`
本地存储特点：

  * 没有过期时间，如果没有手动删除，则永久存储在浏览器端
  * 只要ip/端口/协议三者一样（也就是同源）,即可共享localStorage，即使是不同tab(同个浏览器)
  * 不同浏览器不能共享
  * 最多能存储5M
  * 键值对，以字符串的形式存储
  
  用法
```
// 设置
localStorage.setItem("key", "keyVal")
// 获取
localStorage.getItem("key") // keyVal
// 删除key
localStorage.removeItem("key") 
// 删除所有
localStorage.clear()

```

`sessionStorage`
会话存储，特点：

 * 关闭浏览器或者关闭tab标签页后sessionStorage即被清除
 * 不同tab页sessionStorage不可共享， 除非同个tab下iframe是同源的
 * 最多能存储5M
 * 键值对，以字符串的形式存储
 
 使用
```
// 设置
sessionStorage.setItem("key", "keyVal")
// 获取
sessionStorage.getItem("key") // keyVal
// 删除key
sessionStorage.removeItem("key")
// 删除所有
sessionStorage.clear()

```
### 兼容性
  cookie：基本上都兼容
  localStorage/sessionStorage：主流浏览器，ie8及以上都兼容

### 安全性
  前端存储是不安全的，XSS攻击 和CSRF攻击都有可能泄露数据，所以一般是不建议存储密码等等之类重要的信息
