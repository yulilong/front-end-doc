[[TOC]]

[TOC]

# html常用标签说明

## 1. meta标签相关说明

### 1.1 格式检测：name="format-detection"

format-detection —— 格式检测，用来检测html里的一些格式，主要有以下几个设置：

```html
<meta name="format-detection" content="telephone=no">
<meta name="format-detection" content="email=no">
<meta name="format-detection" content="address=no">
<meta name="format-detection" content="telephone=no,email=no,address=no">
```

1、telephone   
主要作用是是否设置自动将你的数字转化为拨号连接   
telephone=no 禁止把数字转化为拨号链接   
telephone=yes 开启把数字转化为拨号链接，默认开启   

2、email  
告诉设备不识别邮箱，点击之后不自动发送  
email=no 禁止作为邮箱地址  
email=yes 开启把文字默认为邮箱地址，默认情况开启  

3、address  
address=no 禁止跳转至地图  
address=yes 开启点击地址直接跳转至地图的功能, 默认开启  

https://www.jianshu.com/p/1ab5dfd96759
