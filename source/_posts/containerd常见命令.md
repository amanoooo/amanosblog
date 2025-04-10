---
title: containerd常见命令
date: 2024-10-19 16:51:09
tags: 
 - docker
---


## 背景
自docker hub以及各种源被墙之后， 阿里云的ack服务就拉取不到docker镜像啦， ack服务底层又是使用containerd, 所以手动使用docker 命令拉取镜像也不可以，需要使用 containerd 对应的命令， 比如 [**crictl**](https://github.com/kubernetes-sigs/cri-tools/blob/master/docs/crictl.md).

但是 **crictl** 不支持 http_proxy， 所以使用 ctr

```bash
# 使用代理
export https_proxy=http://127.0.0.1:7890;export http_proxy=http://127.0.0.1:7890;export all_proxy=socks5://127.0.0.1:7890

# 查看命名空间
ctr namespaces list

# 查看镜像列表
ctr -n k8s.io images list

# 拉取获取推送
ctr -n k8s.io images pull -u username:pass registry.niumag.com/namespace/image:snap
ctr -n k8s.io images push -u username:pass registry.niumag.com/namespace/image:snap

# 删除
ctr -n k8s.io images rm registry.niumag.com/namespace/image:snap
```


