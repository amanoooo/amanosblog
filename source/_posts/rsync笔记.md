---
layout: blog
title: rsync笔记
date: 2025-03-07 13:17:48
tags:
    - linux
---


## 背景

之前尝试在openwrt上上启动anything, 实际体验是会把设置直接弄崩，现象是ssh都连不进去，所以也没法debug， 只能手动同步了， ssh 又不支持增量传，所以使用了rsync

```bash
rsync -avz -e ssh /mnt/share-media/ pi:/mnt/share-media
```

```bash
rsync -avz -e ssh /www/luci-static/argon/background/ pi:/www/luci-static/argon/background/
```