---
title: Python面试记录
date: 2025-03-21 15:27:41
tags:
---


## 某一次


1. Python 的 __init__ 和 __new__ 的区别
2. Python 的内存重用机制
3. Python 的协程是什么
4. Python 的基本类型有哪些
5. Python 的上下文是怎么实现的

6. WSGI/ASGI 是什么

7. MySQL 的索引原理是什么
8. MySQL 的四种隔离级别
9. MySQL 的事务原理是什么
    Atomicity（原子性）：事务是一个不可分割的操作单元，要么全部成功，要么全部失败。
    Consistency（一致性）：事务执行后，数据库从一个一致状态转换到另一个一致状态。
    Isolation（隔离性）：多个事务并发执行时，彼此隔离，互不干扰。
    Durability（持久性）：事务提交后，对数据库的修改是永久性的，即使系统崩溃也不会丢失。


## 某一次

1. MySQL 的关键字的执行顺序是什么
    1. FROM 和 JOIN
    首先确定查询的数据来源，包括表和连接操作。

    2. WHERE
    过滤符合条件的行。

    3. GROUP BY
    按指定列分组。

    4. HAVING
    对分组后的结果进行过滤。

    5. SELECT
    选择要返回的列，并可以应用聚合函数或表达式。

    6. ORDER BY
    对结果进行排序。

    7. LIMIT 和 OFFSET
    限制返回的行数或跳过指定行。

2. /login 符合RESTful 规范嘛
3. Oauth 的四种模式
    隐式
    密码
    客户端
    授权码


## 某一次

1. Python 的异步原理
2. Python 的GC， Java 的GC
3. 怎么查询中位数
4. ExecuteService 的处理请求是 maxPoolSize 和 queue 逻辑
5. 反向传播的原理


## 某一次

1. 生成器和迭代器的区别