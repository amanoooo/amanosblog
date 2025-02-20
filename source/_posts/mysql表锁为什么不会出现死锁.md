---
title: MySQL表锁为什么不会出现死锁
date: 2025-02-20 10:53:46
tags:
 - MySQL

toc: true
---


截止 2025-02-20, 大语言模型还有进步空间哈

## 我的回答

首先固定一下上下文，不讨论表锁和行锁形成的死锁， 只讨论表锁与表锁之间。
目前的答案是不会形成死锁，原因官方已经说了 [解锁](https://dev.mysql.com/doc/refman/8.4/en/lock-tables.html)
**简单的说就是lock表A并想lock表B的时候会隐式的触发表A的解锁，所以不会存在死锁**， 如果想同时锁住A和B, 需要这样
```sql
LOCK TABLES job WRITE, user WRITE;
```
![快照](/images/mysql3.png)


## 证明1 X表确实时互斥的
1. 创建User 和Job 表， 每个表有 id 和name 字段
![效果](/images/mysql4.png)

2. 锁住 user 并查询锁的情况
![会话1](/images/mysql5.png)

3. 给 user 表 增加列 age， 发现存在锁竞争， 这个DDL pending 住了
![会话2](/images/mysql6.png)

4. 解锁 user 表， 发现age 修改好了
![会话1](/images/mysql7.png)

![会话2](/images/mysql8.png)

![结果](/images/mysql9.png)

## 证明2 隐式解锁
1. 锁住 user
![会话1](/images/mysql10.png)

2. 给user 增加 gender， 发现卡住
![会话2](/images/mysql11.png)

3. 锁住 job 表
![会话1](/images/mysql12.png)

4. 发现 user 的改动也结束了， 说明user表确实解锁了
![会话2](/images/mysql13.png)

![效果](/images/mysql14.png)


## 补充一下大模型的回答


### DeepSeek 回答的不正确
![alt text](/images/mysql1.png)


### OpenAI 通过引导可以回答正确
![alt text](/images/mysql2.png)

