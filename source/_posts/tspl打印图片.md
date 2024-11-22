---
title: tspl打印图片
date: 2024-11-22 15:10:34
tags:
    - nodejs
    - client
---

## 背景

上一篇文章聊了 [nodejs 打印标签](/2024/10/18/nodejs打印标签/)， 现在需要增加难度，把图片打印上去


## 解决方案

参考[这篇文章](https://hackernoon.com/how-to-print-images-with-tspl-and-javascript)， 作者已经实现了， 但是他的写法已经不支持最新的版本了， 我来翻新一下


### 新代码

```js
const usb = require('usb');
const { Jimp, intToRGBA } = require('jimp');
console.log('Jimp is ', Jimp);
const fs = require('fs')
let iconv = require('iconv-lite');

const json = JSON.parse(fs.readFileSync('logo.json', { encoding: 'utf-8' }))
const imgWidthInBytes = json[0].length;
const imgHeightInDots = json.length;


const cmds = [
    'SIZE 48 mm, 10 mm',
    'CLS',
    'TEXT 1,1,"TSS24.BF2",0,1,1,"你好"',
    'PRINT 1',
    'END'
]
// const cmds = [
//   'SIZE 48 mm,25 mm',
//   'CLS',
//   'TEXT 10,10,"4",0,1,1,"HackerNoon"',
//   'TEXT 10,40,"4",0,1,1,"amano"',
//   'BARCODE 10,100,"128",90,1,0,2,2,"altospos.com"',
//   'PRINT 1',
//   'END',
// ];



async function getImageData(path) {
    const img = await Jimp.read(path)
    const bitmap = img.bitmap
    const widthInBytes = Math.ceil(bitmap.width / 8);
    const data = new Array(bitmap.height);
    for (let y = 0; y < bitmap.height; y++) {
        const row = new Array(widthInBytes);
        for (let b = 0; b < widthInBytes; b++) {
            let byte = 0;
            let mask = 128;
            for (let x = b * 8; x < (b + 1) * 8; x++) {
                const color = intToRGBA(img.getPixelColor(x, y));
                if (color.a < 65) byte = byte ^ mask;
                mask = mask >> 1;
            }
            row[b] = byte;
        }
        data[y] = row;
    }
    return data;
}



function print(cmds) {
    let device = usb.findByIds(1137, 85)

    console.log('cmds is ', cmds);

    device.open();
    device.interfaces[0].claim();
    const outEndpoint = device.interfaces[0].endpoints.find(e => e.direction === 'out');
    outEndpoint.transferType = 2;

    const processedCmds = cmds.map(cmd => {
        if (cmd.startsWith('BITMAP')) {
            return Buffer.from(cmd);
        }
        else if (cmd.startsWith('RAW ')) {
            // 去掉 'HEX ' 前缀并将十六进制字符串转换为 Buffer
            const jsonData = JSON.parse(cmd.slice(4).trim());
            console.log('jsonData is ', jsonData);
            return Buffer.from(jsonData.flat());
        } else {
            // 普通命令按原样处理
            return iconv.encode(cmd + '\r\n', 'gbk');
        }
    });

    outEndpoint.transfer(Buffer.concat(processedCmds), (err) => {
        if (err) {
            console.error('Transfer error:', err);
        }
        device.close();
    })
}


const main = async () => {

    const list = usb.getDeviceList()
    list.forEach(device => {
        console.log(`Device: ${device.deviceDescriptor.idVendor}:${device.deviceDescriptor.idProduct}`);
    });



    print(cmds)

};



async function generateImg() {

    const res = await getImageData('logo-niumag.png')
    console.log('res is ', res);
    fs.writeFileSync('./logo.json', JSON.stringify(res))
}

// generateImg()
main()
```



### 老代码

```js
const usb = require('usb');
const Jimp = require('jimp');

function getImageData(path, cb) {
  Jimp.read(path, (err, img) => {
    const widthInBytes = Math.ceil(img.getWidth() / 8);
    const data = new Array(img.getHeight());
    for (let y = 0; y < img.getHeight(); y++) {
      const row = new Array(widthInBytes);
      for (let b = 0; b < widthInBytes; b++) {
        let byte = 0;
        let mask = 128;
        for (let x = b*8; x < (b+1)*8; x++) {
          const color = Jimp.intToRGBA(img.getPixelColor(x, y));
          if (color.a < 65) byte = byte ^ mask; // empty dot (1)
          mask = mask >> 1;
        }
        row[b] = byte;
      }
      data[y] = row;
    }
    cb(data);
  });
}

function print(buffer) {
  // you can get all available devices with usb.getDeviceList()
  let device = usb.findByIds(/*vid*/8137, /*pid*/8214);
  device.open();
  device.interfaces[0].claim();
  const outEndpoint = device.interfaces[0].endpoints.find(e => e.direction === 'out');
  outEndpoint.transferType = 2;
  outEndpoint.transfer(buffer, (err) => {
    device.close();
  });
}

getImageData('hn-logo.png', (data) => {
  const widthInBytes = data[0].length;
  const heightInDots = data.length;

  const buffer = Buffer.concat([
    Buffer.from('SIZE 48 mm,25 mm\r\n'),
    Buffer.from('CLS\r\n'),
    Buffer.from(`BITMAP 10,20,${widthInBytes},${heightInDots},0,`),
    Buffer.from(data.flat()),
    Buffer.from('BARCODE 10,100,"128",50,1,0,2,2,"altospos.com"\r\n'),
    Buffer.from('PRINT 1\r\n'),
    Buffer.from('END\r\n'),
  ]);
  
  print(buffer);
});
```

### 参考图片
1. 
[hn-logo.png](/images/hn-logo.png)

2. 
[logo-niumag.png](/images/logo-niumag.png)