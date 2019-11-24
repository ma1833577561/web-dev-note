```bash
方法1、先将仓库clone到本地，修改后再push到码云的仓库仓库
    $ git clone https://gitee.com/用户个性地址/HelloGitee.git #将远程仓库克隆到本地
    $ git config --global user.name "你的名字或昵称"
    $ git config --global user.email "你的邮箱"
生成/添加SSH公钥
 	 ssh-keygen -t rsa -C "xxxxx@xxxxx.com"  
 	 # Generating public/private rsa key pair...
按照提示完成三次回车，即可生成 ssh key。通过查看 ~/.ssh/id_rsa.pub 文件内容，获取到你的 public key
	$ cat ~/.ssh/id_rsa.pub
 	 # ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC6eNtGpNGwstc....
添加后，在终端（Terminal）中输入
  	$ ssh -T git@gitee.com
首次使用需要确认并添加主机到本机SSH可信列表。若返回 Hi XXX! You've successfully authenticated, but Gitee.com does not provide shell access. 内容，则证明添加成功。
	$ git add . #将当前目录所有文件添加到git暂存区
添加成功后，就可以使用SSH协议对仓库进行操作了。
	$ git commit -m "my first commit" #提交并备注提交信息
	$ git push origin master #将本地提交推送到远程仓库
	$ git remote add origin git@github.com:ma1833577561/WeApp-Demo-master.git #仓库地址
	$ git push -u origin master
	# Counting objects: 100% (358/358), done.
	# Delta compression using up to 4 threads
	# Compressing objects: 100% (300/300), done.
	# Writing objects: 100% (358/358), 167.72 KiB | 235.00 KiB/s, done.
	# Total 358 (delta 35), reused 0 (delta 0)
	# remote: Resolving deltas: 100% (35/35), done.
推送成功

```

