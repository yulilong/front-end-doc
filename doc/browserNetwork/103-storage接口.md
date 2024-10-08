[[TOC]]

[TOC]



# Storage 接口

转载整理自：https://wangdoc.com/javascript/bom/storage.html

## 1. 概述

Storage 接口用于脚本在浏览器保存数据。两个对象部署了这个接口：`window.sessionStorage`和`window.localStorage`。

`sessionStorage`保存的数据用于浏览器的一次会话（session），当会话结束（通常是窗口关闭），数据被清空；`localStorage`保存的数据长期存在，下一次访问该网站的时候，网页可以直接读取以前保存的数据。除了保存期限的长短不同，这两个对象的其他方面都一致。

保存的数据都以“键值对”的形式存在。也就是说，每一项数据都有一个键名和对应的值。所有的数据都是以文本格式保存。

这个接口很像 Cookie 的强化版，能够使用大得多的存储空间。目前，每个域名的存储上限视浏览器而定，Chrome 是 2.5MB，Firefox 和 Opera 是 5MB，IE 是 10MB。其中，Firefox 的存储空间由一级域名决定，而其他浏览器没有这个限制。也就是说，Firefox 中，`a.example.com`和`b.example.com`共享 5MB 的存储空间。另外，与 Cookie 一样，它们也受同域限制。某个网页存入的数据，只有同域下的网页才能读取，如果跨域操作会报错。

## 2. 属性和方法

### 2.1 Storage.length：获取存储数据量

```js
window.localStorage.setItem('foo', 'a');
window.localStorage.setItem('bar', 'b');
window.localStorage.setItem('baz', 'c');

window.localStorage.length // 3
```

### 2.2 Storage.setItem()：存入数据

`Storage.setItem()`方法用于存入数据。它接受两个参数，第一个是键名，第二个是保存的数据。如果键名已经存在，该方法会更新已有的键值。该方法没有返回值。

注意，`Storage.setItem()`两个参数都是字符串。如果不是字符串，会自动转成字符串，再存入浏览器。

如果储存空间已满，该方法会抛错。

写入不一定要用这个方法，直接赋值也是可以的。

```js
window.sessionStorage.setItem('key', 'value');
window.localStorage.setItem('key', 'value');

// 两个参数都不是字符串，但是存入的值都是字符串
window.sessionStorage.setItem(3, { foo: 1 });
window.sessionStorage.getItem('3') // "[object Object]"

// 下面三种写法等价
window.localStorage.foo = '123';
window.localStorage['foo'] = '123';
window.localStorage.setItem('foo', '123');
```

### 2.3 Storage.getItem()：读取数据

`Storage.getItem()`方法用于读取数据。它只有一个参数，就是键名。如果键名不存在，该方法返回`null`。

```js
window.sessionStorage.getItem('key')
window.localStorage.getItem('key')

// 也可以直接使用对象方式读取
window.sessionStorage.key
window.localStorage['key']
```

键名应该是一个字符串，否则会被自动转为字符串。

### 2.4 Storage.removeItem()：清除数据

`Storage.removeItem()`方法用于清除某个键名对应的键值。它接受键名作为参数，如果键名不存在，该方法不会做任何事情。

```js
sessionStorage.removeItem('key');
localStorage.removeItem('key');
```

### 2.5 Storage.clear()：清除所有数据

`Storage.clear()`方法用于清除所有保存的数据。该方法的返回值是`undefined`。

```js
window.sessionStorage.clear()
window.localStorage.clear()
```

### 2.6 Storage.key()：整数作为参数，返回该位置对应的键值

`Storage.key()`接受一个整数作为参数（从零开始），返回该位置对应的键值。

```js
window.sessionStorage.setItem('key', 'value');
window.sessionStorage.key(0) // "key"
```

结合使用`Storage.length`属性和`Storage.key()`方法，可以遍历所有的键。

```js
for (var i = 0; i < window.localStorage.length; i++) {
  console.log(localStorage.key(i));
}
```

## 3. storage 事件

Storage 接口储存的数据发生变化时，会触发 storage 事件，可以指定这个事件的监听函数。

```js
window.addEventListener('storage', onStorageChange);
```

监听函数接受一个`event`实例对象作为参数。这个实例对象继承了 StorageEvent 接口，有几个特有的属性，都是只读属性。

-   `key`：字符串，表示发生变动的键名。如果 storage 事件是由`clear()`方法引起，该属性返回`null`。
-   `newValue`：字符串，表示新的键值。如果 storage 事件是由`clear()`方法或删除该键值对引发的，该属性返回`null`。
-   `oldValue`：字符串，表示旧的键值。如果该键值对是新增的，该属性返回`null`。
-   `storageArea`：对象，返回键值对所在的整个对象。也说是说，可以从这个属性上面拿到当前域名储存的所有键值对。
-   `url`：字符串，表示原始触发 storage 事件的那个网页的网址。

下面是`StorageEvent.key`属性的例子。

```js
function onStorageChange(e) {
  console.log(e.key);
}
window.addEventListener('storage', onStorageChange);
```

注意，该事件有一个很特别的地方，就是它不在导致数据变化的当前页面触发，而是在同一个域名的其他窗口触发。也就是说，如果浏览器只打开一个窗口，可能观察不到这个事件。比如同时打开多个窗口，当其中的一个窗口导致储存的数据发生改变时，只有在其他窗口才能观察到监听函数的执行。可以通过这种机制，实现多个窗口之间的通信。



## 4. sessionStorage 多 Tab 标签页数据共享问题

在 A 页面设置一些 `sessionStorage` 数据，然后`a` 标签 `_blank` 方式打开另一个 tab B 页面，发现 B 页面有A 页面的 `sessionStorage` 数据。此时两个页面的sessionStorage相互独立，修改不会影响对方，所以称为复制更为准确。

为什么会共享呢？下面看下 sessionStorage 的官方 MDN 介绍：

1. 页面会话在浏览器打开期间一直保持，并且重新加载或恢复页面仍会保持原来的页面会话。
2. **在新标签或窗口打开一个页面时会复制顶级浏览会话的上下文作为新会话的上下文，这点和 session cookie 的运行方式不同。**
3. 打开多个相同的 URL 的 Tabs 页面，会创建各自的 `sessionStorage`。
4. 关闭对应浏览器标签或窗口，会清除对应的 `sessionStorage`。

> - 存储在 sessionStorage 中的数据**特定于页面的协议**。意思就是：`http://example.com` 与 `https://example.com` 的 sessionStorage 相互隔离。
> - 被存储的键值对总是以 UTF-16 [DOMString](https://link.segmentfault.com/?enc=vKErOO8gKC1AUgsh2xKV3w%3D%3D.klfqwJIngtWGoFB98fe2TQvic1QjmTlYpw29%2FEkeFzDdB7vmiMjmqSo66WvduqrmHotVzWwhByD2MR%2FLi58AVhwmyNUorJ5NXrYCW6WNVIrSF3WeZLbN9ujmEP2pFHCC) 的格式所存储，其使用两个字节来表示一个字符。对于对象、整数 key 值会自动转换成字符串形式。

根据第二点，简单尝试后发现：

- 通过新建标签页打开相同的页面（属于第三条）创建独立 sessionStorage。
- 通过 window.open 打开新标签页，共享了原 tab 页中的 sessionStorage。
- 通过 a 标签 _blank 方式打开新 tab 页，Chrome 86 浏览器共享了 sessionStorage，Chrome 113 和 Firefox 浏览器并没有共享。

**所以对于 a 标签打开的页面，是否“共享”sessionStorage 属于浏览器兼容性问题。**

在 Chrome 89 版本前，a 标签跳转会共享 sessionStorage。而在 2021年 3月 Chrome 89 版本后，通过 a 标签 target="_blank" 跳转到新页面时 sessionStorage 就会丢失。



