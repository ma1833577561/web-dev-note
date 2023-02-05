## nginx


### 一、安装

    * 常用命令

```bash

    # 项目根目录
    # build后将dist/ 上传⏫到root@139.9.219.136服务器的/home/www文件📃目录下⬇️
    $ scp -r dist/ root@139.9.219.136:/home/www

```
    * 安装 brew 全局指令
```bash

    # [相关文档 brew](https://gitee.com/cunkai/HomebrewCN)
    $ /bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"

    # 安装 nginx
    $ git clone https://github.com/nginx/nginx.git

```


    * 1、下载⏬源包
```bash

    # 下载⬇️那个版本都行
    # [nginx](http://nginx.org/en/download.html)
    # [pcre](https://sourceforge.net/projects/pcre/files/pcre/)
    
    # 解压nginx包 
    $ tar xvzf nginx-1.xx.tar.gz

    # 解压pcre包 
    $ tar xvzf pcre-8.xx.tar.gz

    # 进入到nginx解压后的目录
    $ cd /nginx-1.xx

    # 运行✅配置 并引入相对路径解压后pcre
    $ ./configure --with-pcre=../pcre-8.xx

    # 安装
    $ sudo make install

    # 进入nginx目录
    $ cd /usr/local/nginx

    # 启动 nginx
    $ sudo ./nginx

    # 浏览器访问http://127.0.0.1，出现“Welcome to nginx”则表示成功
```


    * 基础
```bash
    # 项目环境Centos系统

    # 是否安装nginx
    $ whereis nginx
    # 未配置nginx
    nginx:
    # nginx安装成功
    nginx: /usr/sbin/nginx /usr/lib64/nginx /xxx/xxx/xxx

```