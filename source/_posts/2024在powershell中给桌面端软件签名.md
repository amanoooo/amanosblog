---
title: 2024在powershell中给桌面端软件签名
date: 2025-03-03 13:41:52
tags:
---


## 背景
使用Electron 打的包直接安装会有提醒
![reason](/images/sign.png)

## 解决步骤
1. 在服务商买 **代码签名证书**, 注意不是常见的 **SSL证书**哈

这里我先使用自签名证书了


### 设置环境变量
```POWERSHELL
# 密码
$certPassword = ConvertTo-SecureString -String "123456" -Force -AsPlainText
# 文件
$fileToSign= "D:\niumag\niumagfiber\NiumagSeed-linux-4.1.3-beta.610-x64.exe"
# 执行文件入口
$signtoolPath = "C:\Program Files (x86)\Windows Kits\10\bin\10.0.26100.0\x64\signtool.exe"
# 时间服务器
$timestampServer = "http://timestamp.digicert.com"

```

### 创建根证书并导出
 
```powershell
# 创建
$cert = New-SelfSignedCertificate -Type CodeSigningCert -Subject "CN=AmanoCert" -KeyUsage DigitalSignature -KeyAlgorithm RSA -KeyLength 2048 -CertStoreLocation "Cert:\CurrentUser\My"
# 导出
Export-PfxCertificate -Cert $cert -FilePath "AmanoCert4.pfx" -Password $certPassword
```



### 签名  
```POWERSHELL
& "$signtoolPath" sign /debug -f AmanoCert4.pfx  -p 123456 /fd SHA256 /tr $timestampServer /td SHA256 -a $fileToSign
```

## 效果

### 签名效果
![alt text](/images/sign2.png)
### 属性效果
![alt text](/images/sign3.png)

