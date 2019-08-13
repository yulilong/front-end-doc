# 四、动态集合NodeLIst-HTMLCollection等

## 1. NodeList

`NodeList` 对象是一个节点的集合，是由 `Node.childNodes` 和 document.querySelectorAl返回的.

- 属性

  > length： NodeList 对象中包含的节点个数.

- 方法

  > item ( idx ):返回NodeList对象中指定索引的节点,如果索引越界,则`返回null`.等价的写法是`nodeList[idx], 不过这种情况下越界访问将返回undefined.`
  >
  > NodeList.prototype.forEach()：`forEach`方法用于遍历 NodeList 的所有成员。它接受一个回调函数作为参数，每一轮遍历就执行一次这个回调函数，用法与数组实例的`forEach`方法完全一致。
  >
  > NodeList.prototype.keys()，NodeList.prototype.values()，NodeList.prototype.entries()：这三个方法都返回一个 ES6 的遍历器对象，可以通过`for...of`循环遍历获取每一个成员的信息。区别在于，`keys()`返回键名的遍历器，`values()`返回键值的遍历器，`entries()`返回的遍历器同时包含键名和键值的信息。

```html
<div id="one"><span>1</span></div>
<script>
    childNodes = one.childNodes
    console.log(childNodes.length)	// 1
    console.log(childNodes.item(0))	// <span>1</span>
    console.log(childNodes[0])		// <span>1</span>
    // 回调函数f的三个参数依次是当前成员、位置和当前 NodeList 实例。
    // forEach方法的第二个参数，用于绑定回调函数内部的this，该参数可省略。
    childNodes.forEach(function f(item, i, list) {
        // ...
    }, this);
    
    for (var key of childNodes.keys()) {
        console.log(key);
    }
    // 0
    
    for (var value of childNodes.values()) {
        console.log(value);
    }
    // <span>1</span>
    for (var entry of childNodes.entries()) {
        console.log(entry);
    }
    // (2) [0, span]
</script>
```



### 1.1 Node.childNodes返回动态集合 

Node.childNodes返回的`NodeList `对象是个`实时集合`。也就是说文档中的节点树发生变化，则已经存在的 NodeList 对象也会变化。

下面的例子中，在添加一个节点后，NodeList 对象也实时的增加了：

```html
<div id="one"><span>1</span></div>
<script>
    var child_nodes = one.childNodes;
    console.log(child_nodes.length);	// 1
    one.appendChild(document.createElement('div'));
    console.log(child_nodes.length); 	// 2
</script>
```

### 1.2 document.querySelectorAll()返回静态集合 

document.querySelectorAll()返回的`NodeList `对象是个静态的。也就是说文档中节点树发生变化，已存在的NodeList 对象不会变化。

下面的例子中添加了一个节点，但是NodeList 对象没有变化:

```html
<div class="one"><span>1</span></div>
<script>
  var one = document.querySelector(".one")
  var child_nodes = one.querySelectorAll("span");// NodeList [span]
  console.log(child_nodes.length)						// 1
  one.appendChild(document.createElement('span'));		// 添加了一个节点
  console.log(child_nodes.length); 						// 1
  console.log(one.querySelectorAll("span").length);		// 2
</script>
```

### 1.3 NodeList是类数组对象

NodeList是类数组对象,不是数组,除了`forEach`方法，NodeList 没有这些类似数组的方法。

注意：forEach方法有的浏览器不支持(QQ浏览器老版本、IE8以前)。

JavaScript 的继承机制是基于原型的。数组元素之所以有一些数组方法（比如` forEach `和 `map）`，是因为它的原型链上有这些方法，如下:

`myArray --> Array.prototype --> Object.prototype --> null (想要获取一个对象的原型链，可以连续的调用 Object.getPrototypeOf，直到原型链尽头).`

`forEach`, `map`这些方式其实是` Array.prototype` 这个对象的方法。

和数组不一样`，NodeList`的原型链是这样的：

`myNodeList --> NodeList.prototype --> Object.prototype --> null`

NodeList的原型上除了类似数组的`forEach`方法之外，还有`item`，`entries`，`keys`和`values`方法。

### 1.4 遍历NodeList对象方法 

- 将NodeList对象转为数组

  ```javascript
  var div_list = document.querySelectorAll('div'); // 返回 NodeList
  
  var div_array = Array.prototype.slice.call(div_list); // 将 NodeList 转换为数组
  
  //ES6 - Array.from();
  var div_array_from = Array.from(div_list); //将 NodeList 转换为数组
  ```

  由于IE8-浏览器将NodeList实现为一个COM对象，不能使用Array.prototype.slice()方法，必须手动枚举所有成员

- 直接使用Array的forEach方法

  ```javascript
  var forEach = Array.prototype.forEach;
  
  var divs = document.getElementsByTagName( 'div' );
  var firstDiv = divs[ 0 ];
  
  forEach.call(firstDiv.childNodes, function( divChild ){
    divChild.parentNode.style.color = '#0F0';
  });
  ```

  请注意，在上面的代码中，将某个宿主对象 （如` NodeList`） 作为 `this` 传递给原生方法 （如 forEach） 不能保证在所有浏览器中工作，已知在一些浏览器中会失败。

- 使用for循环

  ```javascript
  for (var i = 0; i < myNodeList.length; ++i) {
    var item = myNodeList[i];  // 调用 myNodeList.item(i) 是没有必要的
  }
  ```



## 2. HTMLCollection

**HTMLCollection** 接口表示一个包含了元素（元素顺序为文档流中的顺序）的通用集合（generic collection），还提供了用来从该集合中选择元素的方法和属性。

- 属性

  > length： 只读，返回集合当中子元素的数目。

- 方法

  > item ( idx ): 
  >
  > 根据给定的索引（从0开始），返回具体的节点。如果索引超出了范围，则返回 `null`。
  >
  > namedItem(): 
  >
  > 根据 Id 返回指定节点，或者作为备用，根据字符串所表示的 `name` 属性来匹配。根据 name 匹配只能作为最后的依赖，并且只有当被引用的元素支持 `name` 属性时才能被匹配。如果不存在符合给定 name 的节点，则返回 `null`。

```html
<input type="text" name="mac" id="mm">
<script>
  cc = document.getElementsByTagName("input");	
  // HTMLCollection [input#mm, mm: input#mm, mac: input#mm]
  cc.namedItem("mac")	// <input type="text" name="mac" id="mm">
  console.log(cc.namedItem('mm'));	// <input type="text" name="mac" id="mm">
  console.log(cc.length);	// 1
  console.log(cc.item(0))	// <input type="text" name="mac" id="mm">
</script>
```

HTMLCollection对象与NodeList对象类似，也是节点的集合，返回一个类数组对象。

NodeList集合主要是Node节点的集合，而HTMLCollection集合主要是Element元素节点的集合。Node节点共有12种，Element元素节点只是其中一种。

HTMLCollection集合包括getElementsByTagName()、getElementsByClassName()、getElementsByName()等方法的返回值，以及children、document.links、document.forms等元素集合



HTML DOM 中的 `HTMLCollection` 是即时更新的（live）；当其所包含的文档结构发生改变时，它会自动更新。

```html
<div id="test"></div>
<script>
    var childN = test.children;
    var tags =test.getElementsByTagName('div');
    console.log(childN,tags);//[]、[]
    test.innerHTML = '<div></div>';
    console.log(childN,tags);//[div]、[div]
</script>   
```

[注意]与NodeList对象类似，要想变成真正的数组Array对象，需要使用slice()方法，在IE8-浏览器中，则必须手动枚举所有成员

## 3. NamedNodeMap

NamedNodeMap 接口表示属性节点 [`Attr`](https://developer.mozilla.org/zh-CN/docs/Web/API/Attr) 对象的集合。尽管在 `NamedNodeMap` 里面的对象可以像数组一样通过索引来访问，但是它和 [`NodeList`](https://developer.mozilla.org/zh-CN/docs/Web/API/NodeList) 不一样，对象的顺序没有指定。

`NamedNodeMap` 对象是即时的(*live*)，因此，如果它内部包含的对象发生改变的话，该对象会自动更新到最新的状态。

- 属性: *该接口没有继承任何属性。*

  > length: 只读， 返回映射(map)中对象的数量。

- 方法

  > getNamedItem() : 返回一个给定名字对应的属性节点
  >
  > setNamedItem(): 替换或添加一个属性节点到映射（map）中。
  >
  > removeNamedItem(): 移除一个属性节点
  >
  > item(): 返回指定索引处的属性节点，当索引超出或等于属性节点的数量时，返回 `null`

```html
<style type="text/css">
.democlass{ color:red; }
</style>
<div id="test" datat-tt="pp">123</div>
<script>
    var att = test.attributes;	
    // NamedNodeMap {0: id, 1: datat-tt, 2: class, id: id,
    console.log(att.length);	// 2
    
    console.log(att.getNamedItem('id'));	// id="test"
    var typ=document.createAttribute("class");
    typ.nodeValue="democlass";
    att.setNamedItem(typ);	// 此时页面上字体会变红
    att.removeNamedItem('class');// class="democlass" 此时类已经删除了，颜色恢复了
    att.item(0);	// id="test"
    
</script>   
```

该对象也是一个动态集合:

```html
<div id="test"></div>
<script>
    var attrs = test.attributes;
    console.log(attrs);//NamedNodeMap {0: id, length: 1}
    test.setAttribute('title','123');
    console.log(attrs);//NamedNodeMap {0: id, 1: title, length: 2}
</script>
```



## 4. CSSStyleDeclaration

CSSStyleDeclaration 类表示一组 CSS 样式规则。MXML 编译器在和 Flex 应用程序关联的 CSS 文件中为每个选择器自动生成一个 CSSStyleDeclaration 对象。

CSSStyleDeclaration 表示一个CSS属性键值对的集合。它被用于一些API中：

- 元素节点的`style`属性（`Element.style`）

  `Element.style`返回的只是行内样式，并不是该元素的全部样式。

  通过样式表设置的样式，或者从父元素继承的样式，无法通过这个属性得到。

- `CSSStyle`实例的`style`属性

- `window.getComputedStyle()`的返回值 

  返回的是元素的全部样式

CSSStyleDeclaration 接口可以直接读写 CSS 的样式属性，不过，连词号需要变成骆驼拼写法。

```html
<div></div>
<script>
    var divStyle = document.querySelector('div').style;
    // CSSStyleDeclaration {alignContent: "", alignItems: "", alignSelf: "", alignmentBaseline: "", all: "", …}
    divStyle.backgroundColor = 'red';
    divStyle.border = '1px solid black';
    divStyle.width = '100px';
    divStyle.fontSize = '10em';

    divStyle.backgroundColor // red
    divStyle.border // 1px solid black
    divStyle.width // 100px
</script>
```

上面代码中，`style`属性的值是一个 CSSStyleDeclaration 实例。这个对象所包含的属性与 CSS 规则一一对应，但是名字需要改写，比如`background-color`写成`backgroundColor`。改写的规则是将横杠从 CSS 属性名中去除，然后将横杠后的第一个字母大写。如果 CSS 属性名是 JavaScript 保留字，则规则名之前需要加上字符串`css`，比如`float`写成`cssFloat`。

注意，该对象的属性值都是字符串，设置时必须包括单位，但是不含规则结尾的分号。比如，`divStyle.width`不能写为`100`，而要写为`100px`。

### 4.1 CSSStyleDeclaration 实例属性

#### 4.1.1 CSSStyleDeclaration.cssText

cssText属性用来读写当前规则的所有样式声明文本

删除一个元素的所有行内样式，最简单方法就是设置cssText的值为空字符串

#### 4.1.2 CSSStyleDeclaration.length

length属性返回一个整数值，表示当前规则包含多少条样式声明。

#### 4.1.3 CSSStyleDeclaration.parentRule

parentRule属性返回当前规则所属的那个样式块（CSSRule 实例）。如果不存在所属的样式块，该属性返回`null`。

该属性只读，且只在使用 CSSRule 接口时有意义。

```html
<style>.one {font-size: 60px; border: 2px solid;}</style>
<div class="one" style="width: 300px;">one</div>
<script>
    // cssText
    var one = document.querySelector('.one').style;
    one.cssText;	// "width: 300px;" 仅显示行内样式
    one.cssText += "background-color: red; font-size:20px";// 此时背景色变红
    // "width: 300px;background-color: red; font-size:20px"
    tt = window.getComputedStyle(document.querySelector('.one'));
    tt.cssText;	// 会显示所有样式， 但是 只读。
    
    // length
    one.length;	// 3 "width: 300px;background-color: red; font-size:20px"
    tt.length;	// 283
    
    // parentRule
    var declaration = document.styleSheets[0].rules[0].style;
	declaration.parentRule === document.styleSheets[0].rules[0]
	// true
</script>
```

删除一个元素的所有行内样式：

```javascript
one.cssText = "";	// ""  此时会清空所有行内样式
```

### 4.2 CSSStyleDeclaration 实例方法

#### 4.2.1 getPropertyPriority()

getPropertyPriority()方法接受 CSS 样式的属性名作为参数，返回一个字符串，表示有没有设置`important`优先级。如果有就返回`important`，否则返回空字符串。

#### 4.2.2 getPropertyValue()

getPropertyValue()方法接受 CSS 样式属性名作为参数，返回一个字符串，表示该属性的属性值。

#### 4.2.3 item()

item()方法接受一个整数值作为参数，返回该位置的 CSS 属性名。

#### 4.2.4 removeProperty()

removeProperty()方法接受一个属性名作为参数，在 CSS 规则里面移除这个属性，返回这个属性原来的值。

#### 4.2.5 setProperty()

setProperty()方法用来设置新的 CSS 属性。该方法没有返回值。

 该方法可以接受三个参数:

> 第一个参数：属性名，该参数是必需的。
>
> 第二个参数：属性值，该参数可选。如果省略，则参数值默认为空字符串。在Google Chrome浏览器中，此参数是必需的。
>
> 第三个参数：优先级，该参数可选。如果设置，唯一的合法值是`important`，表示 CSS 规则里面的`!important`。

#### 4.2.6 方法使用例子

```html
<div class="one" style="margin: 10px!important; color: red;">one</div>
<script>
    // getPropertyPriority()
    var one = document.querySelector('.one').style;
    // CSSStyleDeclaration {0: "color", 1: "margin-top", 2: "margin-right", 3: "margin-bottom", 4: "margin-left"
    one.margin;		// "10px"
    one.getPropertyPriority('margin');	// "important"
    one.getPropertyPriority('color'); 	// ""
    
    // getPropertyValue()
    one.getPropertyValue("margin");	// "10px"
    one.getPropertyValue("color");	// "red"
    
    // item()
    one.item(0);	// "color"
    one.item(1);	// "margin-top"
    
    // removeProperty()
    one.removeProperty("color");// "red", 删除了红色，字体变成了黑色
    
    // setProperty()
    one.setProperty('border', '1px solid blue');// 样式会立即生效。
    one	; // CSSStyleDeclaration {0: "margin-top", ... 5: "border-right-width", 6: "border-bottom-width"
    one.setProperty("width", "300px", "important");// 样式会立即生效
    // 注意第三个参数是important，  不是 !important
    
</script>
```



## 5. 遍历动态集合注意事项

动态集合是个很实用的概念，但在使用循环时一定要千万小心。可能会因为忽略集合的动态性，造成死循环

```java
var divs = document.getElementsByTagName("div");
for(var i = 0 ; i < divs.length; i++){
    document.body.appendChild(document.createElement("div"));
}
```

在上面代码中，由于divs是一个HTMLElement集合，divs.length会随着appendChild()方法，而一直增加，于是变成一个死循环

　　为了避免此情况，一般地，可以写为下面形式

```javascript
var divs = document.getElementsByTagName("div");
for(var i = 0,len = divs.length; i < len; i++){
    document.body.appendChild(document.createElement("div"));
}
```

 　　一般地，要尽量减少访问NodeList、HTMLCollection、NamedNodeMap的次数。因为每次访问它们，都会运行一次基于文档的查询。所以，可以考虑将它们的值缓存起来





## 6. 参考资料

[Node.childNodes](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/childNodes) 

[document.querySelectorAll](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/querySelectorAll)

[NodeList MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/NodeList)

[HTMLCollection  MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCollection)

[Attr MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Attr)

[深入理解javascript中的动态集合——NodeList、HTMLCollection和NamedNodeMap](http://www.cnblogs.com/xiaohuochai/p/5827389.html)

[那些困扰你的DOM集合类型](https://blog.csdn.net/zjjbobo/article/details/44114027)

[Window.getComputedStyle()  MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/getComputedStyle)

[CSSStyleDeclaration 接口  阮一峰](http://javascript.ruanyifeng.com/dom/css.html#toc1)

[CSSStyleDeclaration  MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/CSSStyleDeclaration)