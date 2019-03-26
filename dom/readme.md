# 零、DOM

## 1. 什么是DOM？

文档对象模型:**Document Object Model (DOM)**是HTML和XML文档的编程接口。

它将web页面和脚本或程序语言链接起来。

它描述了文档的结构化，使程序能够对该结构进行访问，从而改变文档的结构、样式、内容。

它会将文档解析为由节点和对象(对应属性和方法)组成的结构集合。

**文档：**一个web页面是一个文档。这个文档可以在浏览器窗口或作为HTML源码显示出来。





## 2. document对象常用方法



### 2.1 属性

| 属性                  | 描述                                                         |
| --------------------- | ------------------------------------------------------------ |
| document.doctype      | 文档的 Document Type Definition。只读                        |
| document.title        | 设置或获取文档的标题                                         |
| document.characterSet | 文档使用的字符集。 只读                                      |
| document.head         | 文档的`<head>`元素。只读                                     |
| document.body         | 文档的` <body>` 元素。                                       |
| document.images       | 文档的图像列表。只读                                         |
| document.readyState   | 文档的加载状态。只读                                         |
| document.compatMode   | 浏览器处理文档的模式。只读                                   |
| document.location     | 文档的URL信息: document.location === location ===  window.location |

document.readyState的返回值：

> loading：加载HTML代码阶段，尚未完成解析
>
> interactive：加载外部资源阶段
>
> complete：全部加载完成

document.compatMode的返回值：

> BackCompat：向后兼容模式，也就是没有添加DOCTYPE
>
> CSS1Compat：严格模式，添加了DOCTYPE

### 2.2 方法

#### 2.2.1 open、write、close

| 方法             | 描述                                               |
| ---------------- | -------------------------------------------------- |
| document.open()  | 打开文档写入流.它会清除当前文档，等待重新写入内容. |
| document.write() | 向文档写入内容，写入的内容会追加在后面             |
| document.close() | 关闭open()打开的文档。使用后无法再使用write()      |



#### 2.2.2 查找元素

##### 1 使用CSS选择器方式查找：querySelector、querySelectorAll

```
var content = document.querySelector(".content");
```

##### 2 使用元素ID查找：getElementById

```
var one = document.getElementById("one");
```

##### 3.使用一个CSS类名查找：getElementsByClassName

```javascript
var tt = document.getElementsByClassName('tt');	
// HTMLCollection(2) [div.tt, div.tt]
```

##### 4. 使用标签名来查找：getElementsByTagName

```
var div = document.getElementsByTagName('div')
// HTMLCollection(7) [div#one, div.tt, div.tt, ......
```

##### 5. 使用标签中name属性的值来查找: getElementsByName

```javascript
// <div class="tt" name="my">ttt</div> <div class="f" data-tt="my">123</div>
var tt = document.getElementsByName('my')
// NodeList [div.t]
```



| 方法(document.function)       | 说明                                                     |
| ----------------------------- | -------------------------------------------------------- |
| querySelector(".myclass")     | 匹配第一个指定的CSS选择器的元素节点,没有返回null         |
| querySelectorAll(selectors)   | 匹配指定的CSS选择器的所有节点,( NodeList类型),           |
| getElementById("test")        | 匹配指定ID属性的元素节点,没有返回null                    |
| getElementsByClassName('tab') | 所有class名字符合指定条件的元素,(HTMLCollection类型)     |
| getElementsByTagName("p");    | 所有指定标签的元素, HTMLCollection                       |
| getElementsByName("x")        | 选择有name属性的HTML元素，如form、img等，( NodeList格式) |

#### 2.2.3 创建元素


| createElement("div")     | 生成HTML元素节点，参数： 元素的标签名 |
| ------------------------ | ------------------------------------- |
| createTextNode("Hello")  | 生成文本节点， 参数： 文本节点的内容  |
| createDocumentFragment() | 生成一个DocumentFragment对象          |

#### 2.2.4 修改、删除、clone元素

| appendChild()                                                | 元素子节点末尾添加元素 |
| ------------------------------------------------------------ | ---------------------- |
| insertBefore( createTextNode("Hello"),  createElement("div").firstChild) | 在某个元素之前插入元素 |
| newDiv.replaceChild(newElement, oldElement)                  | 替换元素               |
| parentNode.removeChild(childNode)                            | 删除元素               |
| node.cloneNode(true)                                         | 克隆元素               |

#### 2.2.5 属性操作

| node.getAttribute('id')                  | 获取元素的attribute值              |
| ---------------------------------------- | ---------------------------------- |
| document.createAttribute(name)           | 生成一个新的属性对象节点           |
| node.setAttribute("my_attrib", "newVal") | 设置元素属性                       |
| node.removeAttribute('id')               | 删除元素属性                       |
| innerText                                | 可写属性，返回元素内包含的文本内容 |
| innerHTML                                | 可写属性，返回元素的HTML结构       |

```html
// id、style就是标签的属性， cont是属性的值
<div id="cont" style="border: 1px solid;">
```



## 3. Element

除了document对象，在DOM中最常用的就是Element对象了，Element对象表示HTML元素。

Element 对象可以拥有类型为元素节点、文本节点、注释节点的子节点，DOM提供了一系列的方法可以进行元素的增、删、改、查操作

Element有几个重要属性

1. nodeName：元素标签名，还有个类似的tagName
2. nodeType：元素类型
3. className：类名
4. id：元素id
5. children：子元素列表（HTMLCollection）
6. childNodes：子元素列表（NodeList）
7. firstChild：第一个子元素
8. lastChild：最后一个子元素
9. nextSibling：下一个兄弟元素
10. previousSibling：上一个兄弟元素
11. parentNode、parentElement：父元素



## 4. HTML DOM 对象

### 4.1 style对象

Style 对象代表一个单独的样式声明。可从应用样式的文档或元素访问 Style 对象。

```javascript
<div class="one">one</div>
  <script>
    var one = document.querySelector(".one");
    one.style.border = "1px solid red";
    one.style.height = "300px";
  </script>
```

详情查看：http://www.w3school.com.cn/jsref/dom_obj_style.asp

## 3. dom使用方式

### 3.1 修改元素样式

| document.querySelector('p').style.color = 'red' | 修改元素 style 属性              |
| ----------------------------------------------- | -------------------------------- |
| window.getComputedStyle(node).color             | 获取元素计算后的样式             |
| nodeBox = document.querySelector('.box')        |                                  |
| nodeBox.classList.add('active')                 | 新增 class                       |
| nodeBox.classList.remove('active')              | 删除 class                       |
| nodeBox.classList.toggle('active')              | 切换 class(有就删除，没有就添加) |

### 3.2 获取页面宽高

| document.body.clientHeight      | 获取body元素的高度：内容区域 减去滚动条                 |
| ------------------------------- | ------------------------------------------------------- |
| document.body.clientWidth       | 获取body元素的宽度： content + padding 减去滚动条       |
| document.body.offsetHeight      | 获取body元素的高度：content+padding+boder，(IE盒模型)   |
| document.body.offsetWidth       | 获取body元素的宽度：content+padding+boder               |
| document.body.scrollHeight      | 元素滚动内容的总长度,如果没有滚动条： 等于 clientHeight |
| document.body.scrollTop         | 滚动的高度                                              |
| window.innerHeight              | 浏览器可见窗口的高度                                    |
| element.getBoundingClientRect() | 获取元素在视窗中的位置                                  |

![](http://ww1.sinaimg.cn/large/005M7QYPly1fj8v93smtqj30bf06vgm6.jpg)

![](http://ww1.sinaimg.cn/large/005M7QYPly1fj8v8kad8yj30bf06vaan.jpg)



## 4. HTMLCollection 和 NodeList

NodeList 对象代表一个有顺序的节点列表，HTMLCollection 是一个接口，表示 HTML 元素的集合，它提供了可以遍历列表的方法和属性



## 5. 使用例子

### 5.1 属性

```javascript
// 以https://www.baidu.com/网站为例,  打开浏览器开发者工具，在Console里面测试。
document.doctype		// <!DOCTYPE html>
document.title			// "百度一下，你就知道"
document.characterSet	// "UTF-8"
document.head			// <head>…</head>
document.images			// HTMLCollection(5) [img#s_lg_img....
document.readyState		// "complete"
document.compatMode		// "CSS1Compat"
document.location		// Location {replace: ƒ, assign: ƒ, href: "https://www.baid...
```

### 5.2 open、write、close方法


```javascript
// 自己创建一个页面，在浏览器中打开，调出开发者工具，在Console里面测试
// 或者在这个网站测试: http://js.jirengu.com/norav
document.open();		// #document , 此时页面会清空所有。
document.write("hello");// undefined , 此时页面：hello
document.write("world");// undefined , 此时页面：helloworld
document.close();		// undefined
document.write("测试");  // undefined , 此时页面之前的内容清空， 变为新内容： 测试
```


### 5.3 用于测试的页面代码

```html
<style>
  .client { height: 100px; width: 100px; border: 5px solid; overflow: scroll; }
</style>
<div class="test" data-my="custom">test1</div>
<div class="test clear">test2
  <div class="son">son</div>
  <div class="son2">son2</div>
</div>
<div id="only">Id唯一</div>
<img name="map" src="" alt="">
<div>
  <span>hello</span>
  <span>world</span>
</div>
<div class="client">
  <p>1233213132133213</p>
  <p>123</p>
  <p>123</p>
  <p>123</p>   
</div>
```



### 5.4 查找元素

```javascript
document.querySelector(".test")			// <div class="test">test1</div>
document.querySelectorAll(".test")		// NodeList(2) [div.test, div.test.clear]
document.querySelectorAll(".test.clear")// NodeList [div.test.clear]
document.getElementById("only")			// <div id="only">Id唯一</div>
document.getElementsByClassName('test') // HTMLCollection(2) [div.test, div.test.clear]
document.getElementsByClassName('test clear') // HTMLCollection [div.test.clear]
document.getElementsByTagName("div")	// HTMLCollection(7) [div.test, div.test.clear,...
document.getElementsByName("map")		// NodeList [img]

tmp = document.querySelectorAll(".test")[1].querySelector('.son')
// <div class="son">son</div>
```

### 5.5 创建元素

```javascript
// 创建一个节点,这个节点还在内存中，还没有应用到页面上
var newDiv = document.createElement('div')	
// newDiv => <div></div>  (typeof newDiv === 'Object')
// 创建一个文本节点
var newContent = document.createTextNode("Hello");	// newContent => "Hello"
// 把文本节点添加到 newDiv中
var only = document.getElementById("only")	// only => <div id="only">Id唯一</div>
newDiv.appendChild(newContent)	// newDiv => <div>Hello</div>
// 下面语句执行完毕就能在页面上看见 hello了
only.appendChild(newDiv)		// only => <div id="only">Id唯一<div>Hello</div></div>
only.insertBefore(newDiv, only.firstChild)	
// only => <div id="only"><div>Hello</div>Id唯一</div>

// 替换元素: 把 hello 替换成 world
world = document.createElement('div')
world.appendChild(document.createTextNode('world'))
only.replaceChild(world, only.firstChild)

// 删除子节点 ， 执行后，页面上的world就没有
only.removeChild(world)	

// 克隆一个节点，并应用， 下面语句执行完毕后，页面会多出一行：Id唯一
var clone = only.cloneNode(true)
only.append(clone)
// 注意使用 cloneNode(false) 在应用无效，下面代码无效
cl = only.cloneNode(false)
only.append(cl)
```

### 5.5 JS动态添加元素

- **innerHTML**

  ```html
  <style>
      .co { color: red; }
  </style>
  <div id="box"></div>
  <script>
      var box = document.getElementById("box");
      box.innerHTML = "<p class=co>这是p标签</p>";
  </script>
  ```

  生成30条数据

  ```html
  <style>.one {color: red} .tt{margin-top: 50px;}</style>
  <div id="container"></div>
  <script>
      window.onload = function () {
          var str='';
          for(var i=0; i<30 ;i++){
              var r = parseInt(Math.random()*100); //随机生成一个数字
              str += '<div class="one">'+r+'</div>'; //拼接str
              // 特殊的需求
              if (10 === i) { str += '<div class="one tt">'+r+'特殊的</div>'; }
          }
          document.getElementById('container').innerHTML=str;
      }
  </script>
  ```


- **document.createElement()**

  ```html
  <div id="box"></div>
  <script>
    var box = document.getElementById("box");
    var li = document.createElement("li"); //创建一个li标签
    li.innerHTML = "123";  //给li标签赋值
    box.appendChild(li);  //将创建好的li标签追加到box标签中
  </script>
  ```




### 5.5 在标签的子标签中指定位置插入新标签

```javascript
var $imgCt = document.querySelector(".img-ct");
var item = $imgCt.children;
$imgCt.insertBefore(item[0].cloneNode(), $imgCt.childNodes[0]);
$imgCt.appendChild(item[1].cloneNode());
```



### 5.6 属性操作



```javascript
// <div class="test" data-my="custom">test1</div>
// getAttribute()获取属性的值
var t1 = document.querySelector('.test')
t1.getAttribute('data-my')		// "custom"

// 创建一个属性：createAttribute() 
var att = document.createAttribute('data-oh')	
att.value = 'oh'			// 设置属性的值
t1.setAttributeNode(att)	// 把属性应用到元素上

// 给元素设置一个属性：setAttribute()
t1.setAttribute('data-page', 'first')
// <div class="test" data-my="custom" data-oh="oh" data-page="first">test1</div>

// 删除一个属性 romoveAttribute()
t1.removeAttribute('data-oh')
// <div class="test" data-my="custom" data-page="first">test1</div>

// 查看一个元素的所有属性：attributes
t1.attributes
// NamedNodeMap {0: class, 1: data-my, 2: data-page.....

```



### 5.7 innerText、innerHTML

```javascript
var inner = document.getElementById('inner')
// 获取文本内容： innerText
inner.innerText		// "hello world"

// 返回元素的HTML结构: innerHTML
inner.innerHTML		// " <span>hello</span> <span>world</span> "

http://js.jirengu.com/norav/2/edit?html,css,output
```





## 6. 兼容性

append()是Chrome新出来的属性， 兼容性不好



## 7. 开发中遇到的问题

### 7.1 xxx.forEach is not a function（DOM集合--类数组对象转化为数组）

当使用`document.querySelectorAll`来获取一组dom然后操作的时候，当使用forEach的时候有的浏览器会出现(QQ浏览器)：

```
Uncaught TypeError: hdList.forEach is not a function
```

在其他浏览器中没有报错，经过查找：

原生js获取的DOM集合是一个类数组对象，所以不能直接利用数组的方法（例如：forEach，map等），需要进行转换为数组后，才能用数组的方法！

可把自己转换一下：

1. 使用Array.from()方法：`let list = Array.from(hdList); `
2. 用[ ...elems ]方法转化为数组:`let list = [...hdList];`

参考资料： https://blog.csdn.net/m0_38082783/article/details/78131036

## 8. 参考资料

[所有DOM接口 MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model)

[Element MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Element)

[Node MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Node)

[DOM概述 MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model/Introduction)

[Document MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Document)

[饥人谷课件 DOM](http://book.jirengu.com/fe/%E5%89%8D%E7%AB%AF%E5%9F%BA%E7%A1%80/Javascript/dom.html)

[DOM 节点层次 CSND](https://blog.csdn.net/crystal6918/article/details/52832540)

[深入理解DOM节点类型第一篇——12种DOM节点类型概述](http://www.cnblogs.com/xiaohuochai/p/5785189.html)

[深入理解DOM节点关系](http://www.cnblogs.com/xiaohuochai/p/5785297.html)

[深入理解DOM节点操作](http://www.cnblogs.com/xiaohuochai/p/5787459.html)