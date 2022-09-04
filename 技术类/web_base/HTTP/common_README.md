`跨域的四种常见方式`
```
 - jsonp是一种借助于 script 标签发送跨域请求的方式
   - CORS 跨域资源共享：只需要在被请求的服务端响应的时候添加一个 Access-Control-Allow-Origin 的响应头，表示这个资源是否允许指定域请求。
   - nginx反向代理：他可以不用目标服务器配合，不过需要你搭建一个中转nginx服务器，用于转发请求。
   - nodejs中间件代理跨域：node中间件实现跨域代理，原理大致与nginx相同，都是通过启一个代理服务器，实现数据的转发，也可以通过设置cookieDomainRewrite参数修改响应头中cookie中域名，实现当前域的cookie写入，方便接口登录认证。

```
