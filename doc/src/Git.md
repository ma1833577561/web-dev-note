# Git



## 4、总结

### 1.疑难杂症
* 1、安装问题

(1)、no matching host key type found

```bash
$ git clone xxx.git

# Unable to negotiate with xxx.xxx.xxx.xxx port xxx: no matching host key type found. Their offer: ssh-rsa
# fatal: Could not read from remote repository.
# Please make sure you have the correct access rights
# and the repository exists.

```

 * 问题原因

	没有匹配到类型为ssh-rsa的主机秘钥；也有一些报错的类型是Their offer: ssh-dss
	
 * 解决方案（以下两种方法已验证）

	1、卸载高版本，使用低版本git（最简单）；
	2、在.ssh目录中新建config配置文件，在文件中添加如下代码：（如果是dss则将rsa更换为dss即可
	
   
   ```config
    Host *
    HostkeyAlgorithms +ssh-rsa
    PubkeyAcceptedKeyTypes +ssh-rsa
   ```



(2)、Updates were rejected because the tip of your current branch is behind
```bash
   # 场景：自己本地分支与远程分支版本不一致
   > git push
   error: failed to push some refs to 'gitlab.alibaba-inc.com:ustore/ustore-b.git'
   hint: Updates were rejected because the tip of your current branch is behind
   hint: its remote counterpart. Integrate the remote changes (e.g.
   hint: 'git pull ...') before pushing again.
   hint: See the 'Note about fast-forwards' in 'git push --help' for details.
```

* 问题原因

	没有自己的提交信息，需要手动填写一下
	
* 解决方案（以下两种方法已验证）

	1、执行git commit -m 'merge';添加自定义merge信息


### 2.扩展工具

* 2.1、gitlab

(1)、**`merge_requests[合并分支]`**

```js
merge_requests // 合并分支
1. 点击 【+New Merge Request】按钮---》 
2. 左边 点击【select Source branch】，选择需要合并的分支b；右边`Target branch`点击【master】选择合并之后的分支a；---》
3. 点击下边的【Compare branches and continue】按钮

// 好了到此为止你的b分支已经合并到a分支上了
```


## 3、开发

```bash
   # 克隆项目
   $ git clone url 

   # 本地暂存
   $ git add .  

   # 本地提交
   $ git commit '具体的业务进度' 

   # 推送远程
   $ git push 
   # 强制提交推送 git push -f origin 分支名

   # 切到 develop 分支，更新 develop 最新代码
   $ git checkout develop

   # 新建 feature 分支，开发新功能
   $ git checkout -b 分支名称

   # 切换分支
   $ git checkout 分支名称 

   # 合并分支
   $ git merge 分支名称 
   # git merge 分支名称 --no-ff

   # 查看分支
   $ git branch -a  
   # git branch -r
   
   # 删除分支
   $ git branch -d 分支名称

   # 查看分支版本
   $ git log 

   # 暴力推向指定分支，关联远程分支
   $ git push --set-upstream origin  分支名称

   # 回退到指定提交commit节点
   $ git reset --hard f71391fa7ad2d5932a61902c13ddd8e6ec27ea93


   # 冻结暂存分支[不想提交代码又想切换分支]
   $ git stash

   # 查看冻结暂存分支列表
   $ git stash list

   # 解冻暂存分支
   $ git stash pop

   # 再来查下冻结暂存分支列表
   $ git stash list

   # 关联远程仓库
   $ git init
   $ git remote add orign #项目ssh#
   $ git add .
   $ git commit -m '注释'
   $ git push -u origin main 
   $ 

   # 移除关联远程仓库
   $ git remote rm origin
   # 关联远程仓库
   $ git remote add origin git@github.com:ma1833577561/react-cli.git
   $ git branch -M main
   $ git push -u origin main

```

## 2、使用

* 1.配置个人信息及生成ssh(秘钥)

```bash

   # 设置用户名
   $ git config --global user.name 'name'

   # 设置用户邮箱
   $ git config --global user.email 'email'

   # 查看个人配置信息
   $ git config --list

   # 生成ssh密钥
   $ ssh-keygen -t rsa -C 'email' 

   # 密钥生成的文件目录 C:用户\用户名\.ssh

   # 查看ssh
   $ cat ~/.ssh/id_rsa.pub

   # ssh-rsa   .....=邮箱...

   # id_rsa是私钥文件,id_rsa.pub是公钥文件;

```

* 2.常用命令

```bash

   # 克隆项目
   $ git clone url 

   # 本地暂存
   $ git add .  

   # 本地提交
   $ git commit '具体的业务进度' 

   # 推送远程
   $ git push 

   # 拉取远程
   $ git pull

   # 切换分支
   $ git checkout 分支名称 

   # 合并分支
   $ git merge 分支名称 

   # 查看分支
   $ git branch -a  

   # 查看分支版本
   $ git log 

```

## 1、安装

```
   [Git 64位软件地址](https://git-scm.com/download/win)

```
