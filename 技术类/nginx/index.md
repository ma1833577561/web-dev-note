# Nginx


## 4、总结

```
```

## 3、开发

* 阿里云服务器Ubuntu(有道云笔记AntdPro项目部署上线.md)
```
  云服务器ECS-[按量收费](筛选2vCPU+2GB量少,其他默认配置即可，系统Ubuntu，最低账户100RMB)
  带宽计费模式：使用流量：100M
  登录凭证：新手自定义密码，密钥对，
  登录名：root(默认)
  密码：大写字母、小写字母、数字、符号
  主机名：服务器名称
  使用时限：设置自动释放服务时间(根据需要设置)
  购买成功-》控制台


```
```bash
  # 登录远程服务器
  # 两种方式ssh(系统自带)、控制台链接登录，
  $ ssh root@服务器地址
  root@服务器地址 password:
  # 密码是密文看不到输入情况。
  
  # 登录成功看到是这个样子
  $ root@服务器名称：~#  
```
* 确认开放端口

  ·阿里云-实例/服务器-》更多/网络和安全组/安全组配置/配置规则-》所有端口开发ssh/https/http

* 安装服务器环境

```bash
  # 更新系统软件源
  $ root@服务器名称：~# apt update

  # 安装git
  $ root@服务器名称：~# apt install git

  # 安装node 14+版本
  $ root@服务器名称：~# curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -

  # 安装nodejs
  $ root@服务器名称：~# apt install nodejs

  # 安装yarn
  $ root@服务器名称：~# npm install yarn -g 
  # 或者 apt install yarn 
  # 卸载yarn apt remove cmdtest 
  #  apt remove yarn 

  # 安装nginx
  $ root@服务器名称：~# npm install nginx 

  # 查看安装情况-V、version  
  $ root@服务器名称：~# node -V
```

* 本地代码上传服务器

方案：ftp、sftp、scp、git
```bash
  # nginx默认目录
  $ root@服务器名称：~# cd /var/www/

  # 建议使用ssh,在服务器中配置密钥,这里https 
  $ root@服务器名称：/var/www/# git clone xxxx.git
  
  # 进入项目文件夹 
  # 安装依赖文件yarn或者yarn install
  $ root@服务器名称：/var/www/<项目文件夹># yarn 
  
  # 打包文件
  $ root@服务器名称：/var/www/<项目文件夹># yarn build
  
  # 解析项目
  
```
* 使用nginx解析


```bash
# 正式项目可以通过虚拟机配置，测试暂时不用
# default.config // 默认的配置这里可以根据需要建立多个文件
# 8001.config // 默认的配置这里可以根据需要建立多个文件8001虚拟机
# 8002.config // 默认的配置这里可以根据需要建立多个文件8002虚拟机
# 8003.config // 默认的配置这里可以根据需要建立多个文件8003虚拟机
# 等等
$ root@服务器名称：/var/www/<项目文件夹># cd /etc/nginx/sites-available/default
```

`vim default`：进入编辑模式
i:编辑模式
esc键：退出
wq: 保存并退出
```
server {
  listen 80 default_server;
  listen [::]80 default_server;

  root /var/www/<项目文件夹>/dist;

  index index.html index.htm index.nginx-debian.html;

  server_name <配置的域名(xxx.xxx.com)>

  location / {
    try_files $uri $uri/ /index.html;
  }

  location ^~/api/ {
    # 后端接口地址(域名之后不要带斜杠)
    proxy_pass 接口域名(http://xxx.xxx.com);

    # 根据需要使用, 解决跨域
    # add_header 'Access-Control-Allow-Orgin' '*'; 

    # 删除配置前缀,根据需要使用
    # rewrite ^/api/(.*)$ $1 break; 
  }
}
```

* 重启nginx

```bash 
  $ root@服务器名称：/etc/nginx/sites-available/# nginx -s reload
```


* 域名

  · 控制台/云解析 DNS/解析设置/添加记录-》

    记录值：[服务器地址]；

    主机地址：域名(eg:www、shop等)

* 配置HTTPS

  [免费证书](https://freessl.cn/) 

```
  域名+免费的/输入邮箱(用于验证)-》验证类型：DNS(解析DNS)、文件验证(文件放在服务器)、CSR生成：choose浏览器生成
  验证 text记录-》主机地址
  记录值-》记录值
  异步验证
  download本地
  然后把解压后的文件上传到服务器
```
* 本地
```bash
 $ scp 本地download下载文件路径 root@<服务器地址>:/tmp(服务器存放证书目录/xx.pem) -》 回车键，暗码输入网站密码

 $ scp 本地download下载文件路径 root@<服务器地址>:/tmp(服务器存放证书目录/xxx.key) -》 回车键，暗码输入网站密码

```
* 服务器
```bash
# 查看目录
$ root@服务器名称：/tmp/# ls
$ root@服务器名称：/tmp# cd /etc/nginx/

# 新建文件夹
$ root@服务器名称：/etc/nginx/# mkdir ssl

# 移动文件到etc/nginx下
$ root@服务器名称：/etc/nginx/# mv /tmp/xxx.pem /etc/nginx/ssl
$ root@服务器名称：/etc/nginx/# mv /tmp/xxx.key /etc/nginx/ssl

$ root@服务器名称：/etc/nginx/# vim etc/nginx/sites-available/default

```

`default`
```
## 集群配置(防止一台服务停了另外一台还在运行)
# upstream inter { 
#  server xx.xx.xx:xx weight=5;
#  server xx.xx.xx:xx weight=3;
## server 192.168.25.45:8080 weight=5; 集群192.168.25.45:8080机子权重为5（权重越大处理资源越多）
# }

server {
  listen 80 default_server;
  server_name <配置的域名(xxx.xxx.com)>;
  rewrite ^(.*) https://$server_name$1 permanent;
}

server {
  listen 443 ssl default_server;
  ssl_certificate  /etc/nginx/ssl/full_chain.pem;
  ssl_certificate_key  /etc/nginx/ssl/private.key;
  ssl_session_timeout 5m;
  ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
  ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
  ssl_prefer_server_ciphers on;

  root /var/www/<项目文件夹>/dist;

  index index.html index.htm index.nginx-debian.html;

  location / {
    try_files $uri $uri/ /index.html;
  }
  # 配置后端API代理
  location ^~/api/ {
    # 后端接口地址(域名之后不要带斜杠)
    proxy_pass 接口域名(http://xxx.xxx.com);

    # 根据需要使用, 解决跨域
    # add_header 'Access-Control-Allow-Orgin' '*'; 

    # 删除配置前缀,根据需要使用
    # rewrite ^/api/(.*)$ $1 break; 

    # --------------------------------
    # proxy_set_header Host $http_host;
    # proxy_set_header X-Real-IP $remote_addr;
    # proxy_set_header REMOTE-HOST $remote_addr;
    # proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    # ----------- 防止head请求的时候会丢失包----------------------
    # proxy_pass http://inter;
  }
}
```


* 阿里云服务器Ubuntu
```
  云服务器ECS-[包年包月](地区香港,筛选1vCPU+0.5GB,系统CentOS+8.8 x64位(最新版本)，其他默认)
  登录凭证：自定义密码，
  登录名：root(默认)
  密码：大写字母、小写字母、数字、符号
  主机名：服务器名称
  购买成功-》控制台

  安装xShell
  open ->xShell->创建新会话->名称：服务名称(百度xxx广州)，主机：服务器公网IP，用户名:root,密码：设置的密码，xShell出现#代表连接到服务器了。
  安装宝塔 选择第一个复制（Centos安装）->回到xShell粘贴->按下回车键->复制外网面板地址，到浏览器中打开，并把username+password->进行登录->(会有手机注册)->选择LNMP安装

  上传服务
  1、网站->添加站点->域名可以是IP/解析过的域名,save
  2、文件->www/wwwroot/http/,删除http下所有文件，把打包后的前端文件上到此目录下->把dist下的所有文件平移一级到http下，网站就ok了。复制IP/解析过的域名，就可以访问了

```
## 2、使用

```
```

## 1、安装

```
```