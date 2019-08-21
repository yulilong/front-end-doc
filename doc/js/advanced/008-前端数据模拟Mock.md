[TOC]

# 前端数据模拟Mock

## 1. 说明

`mock.js`可以模拟`ajax`数据，拦截`ajax`请求，返回模拟数据。在数据格式已经确定的情况下，无需后端返回就可以测试前端程序。

与传统的在代码中写死返回数据的方式不同，使用`mock.js`可以简单地生成大量随机数据，且数据格式可通过一些规则进行指定。另外，使用`mock.js`时可完全独立，不与原先的业务逻辑代码耦合，之后需要真实接口数据或发布线上生产环境时可以方便地从业务中移除。

[官网链接](http://mockjs.com/)



## 2. 拦截说明

mock在引入mock.js就开始拦截请求了

```
import Mock from 'mockjs'
```

### 2.1 拦截ajax请求

`mock.js`默认是支持拦截页面`ajax`请求的，直接按照官方文档说的来就可以了：

> #### Mock.mock( rurl, template )
>
> 记录数据模板。当拦截到匹配 rurl 的 Ajax 请求时，将根据数据模板 template 生成模拟数据，并作为响应数据返回。

```javascript
Mock.mock('/api/getName', { name: 'Jack', 'age|10-20': 10 });

function makeRequest(cb) {
  $.ajax({
    type: 'GET',
    url: '/api/getName',
    dataType: 'json',
    success: function(data) {
      cb && cb(data);
    }
  });
}
makeRequest(function(data) {
  console.log(data); // { name: "Jack", age: 14 }
});
makeRequest(function(data) {
  con
```

### 2.2 拦截fetch请求

`React`的开发中多用`fetch`来代替`ajax`，而`mock.js`默认是不支持拦截页面`fetch`请求的，需要搭配`fetch-mock`库来实现。在使用`fetch-mock`库的时候，发现了一个大坑……

在`import`了`fetch-mock`之后，整个页面的所有`fetch`请求都被拦截了，如果没有对这个地址设定规则，`fetch-mock`就会报错，然后页面就挂了，挂了！！！！！！！！

查了文档，查了`Google`，没发现什么好的解决办法，最终自己只能曲线救国了:

```javascript
import Mock, {Random} from 'mockjs';
import FetchMock from 'fetch-mock';

// 配置需要mock的路由
FetchMock.once('/path/to/api1', Mock.mock({...}));
FetchMock.once('/path/to/api2', Mock.mock({...}));
FetchMock.once('/path/to/api3', Mock.mock({...}));
FetchMock.once('/path/to/api4', Mock.mock({...}));

// 其他路由使用原生fetch，这段代码必须放最后
FetchMock.once('*', (url, options) => {
  FetchMock.restore();
  return fetch(url, options);
});
```

参考资料：https://juejin.im/entry/58ecc0415c497d0062c8223d





## 参考资料

mock官网： http://mockjs.com/

官网模拟生成数据示例：http://mockjs.com/examples.html

[Mock.JS拦截HTTP请求的问题](https://blog.csdn.net/u011481543/article/details/79444188)

[Mock.js 模拟数据，拦截 ajax&fetch](https://juejin.im/entry/58ecc0415c497d0062c8223d)



