---
title: openwrt上面克隆git仓库
date: 2025-01-07 10:02:25
tags:
    - openwrt
    - openssh
    - git
---


## 问题与背景

为了进一步升级openwrt的能力范畴，很多服务又没有docker镜像， 所以只能在wrt上面跑代码，这样就涉及到了git克隆仓库，但是openwrt默认的ssh client是dropbear 的实现方式，这是一个针对小内存设备的特别版本，使用 git clone git@github.com:amanoooo/amanosblog.git 就会报错


### 现象

```bash
root@amanoswrt:~/amano# git clone git@github.com:amanoooo/amanosblog.git
Cloning into 'amanosblog'...
Connection closed by 20.205.243.166 port 22
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
```


## 解决

1. 第一步安装openssh-client
![](/images/openssh.png)


2. 检查可以发现ssh已经链接到openssh 了
```bash
root@amanospi:~# which ssh
/usr/bin/ssh
root@amanospi:~# ls -al /usr/bin/ssh
lrwxr-xr-x    1 root     root            24 Jan  6 16:57 /usr/bin/ssh -> /usr/libexec/ssh-openssh
```


3. 更新 ~/.ssh/config 文件, 增加下面的配置
```
Host github.com
    Hostname ssh.github.com
    Port 443
```