---
title: 2024docker使用代理
date: 2024-10-22 10:04:40
tags:
    - docker
    - proxy
---


# 背景
和上一篇文章类似，墙内世界自己推送了image之后， 服务器(我的环境是centos)上拉取也得使用代理。
但是最近很多伙伴反馈只简单的更新环境变量没有效果，通过文档上面更新docker daemon.json 也没有效果


# 解决

还是参考官方文档， 使用 [systemd unit file ](https://docs.docker.com/engine/daemon/proxy/#systemd-unit-file)

1. Create a systemd drop-in directory for the docker service:

```bash
 sudo mkdir -p /etc/systemd/system/docker.service.d
 ```

2. Create a file named /etc/systemd/system/docker.service.d/http-proxy.conf that adds the HTTP_PROXY environment variable:

```bash
[Service]
Environment="HTTP_PROXY=http://127.0.0.1:7890"
Environment="HTTPS_PROXY=http://127.0.0.1:7890"
Environment="NO_PROXY=localhost,127.0.0.1,docker-registry.example.com,.corp"

```

3. Flush changes and restart Docker

```bash
sudo systemctl daemon-reload
sudo systemctl restart docker
```

4. Verify that the configuration has been loaded and matches the changes you made, for example:

```bash
sudo systemctl show --property=Environment docker

Environment=HTTP_PROXY=http://127.0.0.1:7890 HTTPS_PROXY=http://127.0.0.1:7890 NO_PROXY=localhost,127.0.0.1,docker-registry.example.com,.corp
```


# 注意
我偷懒只写了http_proxy， 结果发现没有效果， 请一定不能省略https_proxy