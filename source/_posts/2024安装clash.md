---
title: 2024安装clash
date: 2024-10-21 16:12:31
tags: linux

categories: 
    - 时效性
---


## 背景

https://github.com/Dreamacro/clash 因为晒车牌被抓住了，很多脚本都失效了，这里提供一个解决方案


## 方式
1. 下载 

```bash
wget https://archlinux.org/packages/extra/x86_64/clash/download
mv download clash.tar
tar -xvf clash.tar
```

2. 运行

```bash
clash ./usr/bin/clash
# INFO[0000] Can't find MMDB, start download
# FATA[0000] Initial configuration directory error: can't initial MMDB: can't download MMDB: Get "https://cdn.jsdelivr.net/gh/Dreamacro/maxmind-geoip@release/Country.mmdb": read tcp 172.24.35.37:39168->8.7.198.46:443: read: connection reset by peer
```

3. [可选]补充

如果第一步 archlinux 下载不了， 可以手动下载安装包， 然后 scp 到服务器上
如果第二步 Country.mmdb 下载不了， 可以手动下载， 然后 scp 到服务器的 ~/.config/clash 文件夹

4. 更新配置

默认的配置文件是 ~/.config/clash 这里， 参考我的
```bash
➜  clash pwd
/root/.config/clash
➜  clash ls
cache.db  config.yaml  config.yaml.bak  Country.mmdb
```


5. 类unix命令行使用

```bash
export https_proxy=http://127.0.0.1:7890;export http_proxy=http://127.0.0.1:7890;export all_proxy=socks5://127.0.0.1:7890
```