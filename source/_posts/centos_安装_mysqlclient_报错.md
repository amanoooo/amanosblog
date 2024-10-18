---
layout: test
title: centos 安装 mysqlclient 报错
date: 2024-09-18 09:38:24
tags: bug,python
---


## 问题
1. 使用django的框架时， 发现服务端安装 mysqlclient 报错
2. 使用 mysql-connector-python 代替 mysqlclient， 但会发现 USE_TZ 相关的配置不支持，导致数据的时间变成UTC格式，直观上有时差

## 解决 TLNR
切换sql-connector-python会导致上面的问题2，所以直接降级 mysqlclient 就好
```bash
    pip install mysqlclient==2.0.0
```

