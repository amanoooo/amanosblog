---
title: 2024windows_powershell_乱码
date: 2024-11-18 15:02:02
tags: windows
---

## 背景 
1. 最近一些桌面端的项目启动的输出怎么乱码
2. git 的一些操作也出现乱码


## 问题测试
可以复制这些到一个文件里面， 然后直接在powershell 里面执行
```bash
@echo off
echo test chinese character view  测试中文字符显示
pause
```

## 解决方案

### 方案1

1. windows上我通过 **chcp 65001 && npm run start**  可以解决

### 方案2

1. 参考这个 [文章](https://ganzhixiong.com/p/f1b9f4fc/), 第一步查看powershell 配置位置

```bash
$PROFILE
```

2. 在该配置文件中添加如下配置：

```bash
$OutputEncoding = [console]::InputEncoding = [console]::OutputEncoding = New-Object System.Text.UTF8Encoding
```

3. 验证

```test
./test.bat
```
![](/images/check_encoding.png)


