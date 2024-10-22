---
title: nodejs 打印标签
date: 2024-10-18 09:38:24
tags:
    - nodejs
    - client
---


## 背景

公司有需求， 打印一些小票
1. 直接搜索 **node-printer** 或者 **node-thermal-printer** 都太古老了。
2. windows 自带的打印[命令](https://answers.microsoft.com/en-us/windows/forum/all/how-do-you-print-via-command-line/25df4963-5072-4def-91d4-39af5e6780bb) 不好调试
3. 这里分享下使用 **TSPL指令** 在 **条码打印机** 的一些解决方案


## TSPL 

### 示例
```bash
SIZE 60 mm,40 mm\r\n
GAP 2 mm\r\n
CLS\r\n
TEXT 50,50,\"4\",0,1,1,\"DEMO FOR TEXT\"\r\n
PRINT 1,1\r\n
```

### 文档
https://open.jolimark.com/files/tspl.pdf

## 步骤

1. 找到设备端口

```js
const usb = require('usb');

const list = usb.getDeviceList()
list.forEach(device => {
    console.log(`Device: ${device.deviceDescriptor.idVendor}:${device.deviceDescriptor.idProduct}`);
});
```

2. 连接设备

```js
let device = usb.findByIds(1137, 85)
console.log('device is ', device);

device.open();
device.interfaces[0].claim();
const outEndpoint = device.interfaces[0].endpoints.find(e => e.direction === 'out');
outEndpoint.transferType = 2;
outEndpoint.transfer(Buffer.from(cmds.join('\r\n')), (err) => {
  device.close();
});
```

3. [选填] windows 需要刷新设备的驱动，可以参考 [usb](https://www.npmjs.com/package/usb) 的文档
{% blockquote %}

On Windows, if you get LIBUSB_ERROR_NOT_SUPPORTED when attempting to open your device, it's possible your device doesn't have a WinUSB driver for libusb to use.

You can install one using Zadig or another approach is to use the UsbDK Backend of libusb by immediately calling usb.useUsbDkBackend().

Note that you cannot use multiple drivers on Windows as they get exclusive access to the device. So if you want to switch between drivers (e.g. using a printer with this software or the system), you will need to uninstall/install drivers as required.

For further info, check How to use libusb on Windows in the libusb's wiki.
{% endblockquote %}

刷后的效果 ![如图](/images/zadig.png)



## 完整代码
```
const usb = require('usb');

const cmds = [
  'SIZE 48 mm,25 mm',
  'CLS',
  'TEXT 10,10,"4",0,1,1,"HackerNoon"',
  'TEXT 10,40,"4",0,1,1,"amano"',
  'BARCODE 10,100,"128",90,1,0,2,2,"altospos.com"',
  'PRINT 1',
  'END',
];

// you can get all available devices with usb.getDeviceList()
const list = usb.getDeviceList()
console.log('list is ', list);
list.forEach(device => {
  console.log(`Device: ${device.deviceDescriptor.idVendor}:${device.deviceDescriptor.idProduct}`);
});
// let device = list[0]
let device = usb.findByIds(1137, 85)
console.log('device is ', device);

device.open();
device.interfaces[0].claim();
const outEndpoint = device.interfaces[0].endpoints.find(e => e.direction === 'out');
outEndpoint.transferType = 2;
outEndpoint.transfer(Buffer.from(cmds.join('\r\n')), (err) => {
  device.close();
});
```