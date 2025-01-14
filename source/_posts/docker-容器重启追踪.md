---
title: docker 容器重启追踪
date: 2025-01-14 13:39:09
tags:
    - docker
    - linux
---


## 背景

无意中看到 **docker ps** 显示容器重启了， 虽然服务正常，还是准备查询一下

## 步骤
### 确认到服务重启

![](/images/swarm1.png)

### 找到上一个停止的容器的日志

![](/images/swarm2.png)

### 查看日志
发现容器是正常停止的， 基本排除服务器重启

![](/images/swarm6.png)


### 确认机器没有重启
![](/images/swarm3.png)


### 查看docker日志
可以发现是node 的状态从new 变成了down
![](/images/swarm7.png)

### 查看系统日志
监控到软件oom 了
```bash
journalctl -e
```


![](/images/swarm9.png)
![](/images/swarm10.png)


### 可以在aliyun 的监控看到当时cpu有增加，但是只有75%
![](/images/swarm8.png)


## 结论

prometheus 的容器oom导致的docker node 节点的down， 但还不知道为什么会导致我的traefik 的容器重启，暂时的解决方式是给 prometheus 加上资源限制