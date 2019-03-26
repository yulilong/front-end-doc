# 五、Element

## 1. Element元素说明

element元素继承关系：`element -> Node -> EventTarget`

Element类型用于表现XML或HTML元素，提供对元素标签名，子节点及特性的访问。原型链的继承关系为:` 某节点元素.__proto__` ->（HTML某元素Element.prototype）->HTMLElement.prototype->Element.prototype->Node.prototype->EventTarget.prototype。

```javascript
Object.getOwnPropertyNames(HTMLHtmlElement.prototype)
// (2) ["version", "constructor"]
Object.getOwnPropertyNames(HTMLElement.prototype)
// (95) ["title", "lang", "translate", "dir", "dataset", "hidden", "tabIndex", "accessKey", "draggable", "spellcheck", "contentEditable", "isContentEditable", "offsetParent", "offsetTop", "offsetLeft", "offsetWidth", "offsetHeight", "style", "innerText", "outerText", "onabort", "onblur", "oncancel", "oncanplay", "oncanplaythrough", "onchange", "onclick", "onclose", "oncontextmenu", "oncuechange", "ondblclick", "ondrag", "ondragend", "ondragenter", "ondragleave", "ondragover", "ondragstart", "ondrop", "ondurationchange", "onemptied", "onended", "onerror", "onfocus", "oninput", "oninvalid", "onkeydown", "onkeypress", "onkeyup", "onload", "onloadeddata", "onloadedmetadata", "onloadstart", "onmousedown", "onmouseenter", "onmouseleave", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "onmousewheel", "onpause", "onplay", "onplaying", "onprogress", "onratechange", "onreset", "onresize", "onscroll", "onseeked", "onseeking", "onselect", "onstalled", "onsubmit", "onsuspend", "ontimeupdate", "ontoggle", "onvolumechange", "onwaiting", "onwheel", "onauxclick", "ongotpointercapture", "onlostpointercapture", "onpointerdown", "onpointermove", "onpointerup", "onpointercancel", "onpointerover", "onpointerout", "onpointerenter", "onpointerleave", "nonce", "click", "focus", "blur", "constructor"]

Object.getOwnPropertyNames(Element.prototype)
// (87) ["namespaceURI", "prefix", "localName", "tagName", "id", "className", "classList", "slot", "attributes", "shadowRoot", "assignedSlot", "innerHTML", "outerHTML", "scrollTop", "scrollLeft", "scrollWidth", "scrollHeight", "clientTop", "clientLeft", "clientWidth", "clientHeight", "onbeforecopy", "onbeforecut", "onbeforepaste", "oncopy", "oncut", "onpaste", "onsearch", "onselectstart", "previousElementSibling", "nextElementSibling", "children", "firstElementChild", "lastElementChild", "childElementCount", "onwebkitfullscreenchange", "onwebkitfullscreenerror", "setPointerCapture", "releasePointerCapture", "hasPointerCapture", "hasAttributes", "getAttributeNames", "getAttribute", "getAttributeNS", "setAttribute", "setAttributeNS", "removeAttribute", "removeAttributeNS", "hasAttribute", "hasAttributeNS", "getAttributeNode", "getAttributeNodeNS", "setAttributeNode", "setAttributeNodeNS", "removeAttributeNode", "closest", "matches", "webkitMatchesSelector", "attachShadow", "getElementsByTagName", "getElementsByTagNameNS", "getElementsByClassName", "insertAdjacentElement", "insertAdjacentText", "insertAdjacentHTML", "requestPointerLock", "getClientRects", "getBoundingClientRect", "scrollIntoView", "scrollIntoViewIfNeeded", "animate", "before", "after", "replaceWith", "remove", "prepend", "append", "querySelector", "querySelectorAll", "webkitRequestFullScreen", "webkitRequestFullscreen", "scroll", "scrollTo", "scrollBy", "createShadowRoot", "getDestinationInsertionPoints", "constructor"]

Object.getOwnPropertyNames(Node.prototype)
// (48) ["ELEMENT_NODE", "ATTRIBUTE_NODE", "TEXT_NODE", "CDATA_SECTION_NODE", "ENTITY_REFERENCE_NODE", "ENTITY_NODE", "PROCESSING_INSTRUCTION_NODE", "COMMENT_NODE", "DOCUMENT_NODE", "DOCUMENT_TYPE_NODE", "DOCUMENT_FRAGMENT_NODE", "NOTATION_NODE", "DOCUMENT_POSITION_DISCONNECTED", "DOCUMENT_POSITION_PRECEDING", "DOCUMENT_POSITION_FOLLOWING", "DOCUMENT_POSITION_CONTAINS", "DOCUMENT_POSITION_CONTAINED_BY", "DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC", "nodeType", "nodeName", "baseURI", "isConnected", "ownerDocument", "parentNode", "parentElement", "childNodes", "firstChild", "lastChild", "previousSibling", "nextSibling", "nodeValue", "textContent", "hasChildNodes", "getRootNode", "normalize", "cloneNode", "isEqualNode", "isSameNode", "compareDocumentPosition", "contains", "lookupPrefix", "lookupNamespaceURI", "isDefaultNamespace", "insertBefore", "appendChild", "replaceChild", "removeChild", "constructor"]
```

**Element节点实例有以下特征**：以下特征均继承自Node.prototype

- nodeType值为1
- nodeName值为元素标签名
- nodeValue值为null
- parentNode可能是Document或Element
- 其子节点可能是Element，Text，Comment，ProcessingInstruction，CDATASection，EntityReference

要访问元素标签名，可以用nodeName（继承自Node.prototype）属性也可用tagName（继承自Element.prototype）属性，这两个属性会返回相同的值。但注意返回的字符串是大写。在HTML中标签名始终以全部大写表示，而在XML中（有时也包括XHTML）标签名则始终会与源码中的保持一致。假如你不确定自己的脚本将会在HTML还是XML中执行，最好在比较之前进行大小写转化。

```javascript
document.documentElement.tagName;// "HTML"
document.documentElement.nodeName;// "HTML"
document.documentElement.nodeName.toLowerCase();// "html"
document.documentElement.nodeType	// 1
document.documentElement.nodeValue	// null
document.documentElement.parentNode	// #document
```



## 2. HTMLElement元素

 所有 HTML 元素都由 HTMLElement 类型表示，不是直接通过这个类型，也是通过它的子类型来表示。 HTMLElement 类型直接继承自 Element 并添加了一些属性。**每个 HTML 元素中都存在下列标准属性：**

1. `id` 元素在文档中的唯一标识符,继承自Element.prototype

2. `title` 有关元素的附加说明信息，一般通过工具提示条显示出来,继承自HTMLElement.prototype

3. `lang` 元素内容的语言代码，很少使用,继承自HTMLElement.prototype

4. `dir` 语言的方向，值为 `ltr` 或者 `rtl`，也很少使用,继承自HTMLElement.prototype

5. `className` 与元素的 `class` 特性对应,继承自Element.prototype

6. `attributes`: 继承自Element.prototype。返回一个NamedNodeMap的实例对象。

    

具体这里查询： [HTML DOM 元素对象 菜鸟教程](http://www.runoob.com/jsref/dom-obj-all.html)

```html
<div class="tt" title="测试" id="ii">123</div>
<script>
    var tt =  document.getElementById('ii')
    tt.id;			// 'ii'
    tt.title;		// "测试"
    document.documentElement.lang;// "zh-cn"
    tt.dir;			// ""
    tt.className	// "tt"
    tt.attributes
    // NamedNodeMap {0: class, 1: title, 2: id, class: class, title: title, id: id, length: 3}
</script>

```

并不是对所有属性的修改都能直观在页面上表现出来。 

对id或lang的修改对用户而言是透明不可见的；

 对title的修改只会在鼠标移动到这个元素上时才显示出来；

 对dir的修改会在属性被重写的那一刻立即影响页面中文本左右对齐方式；

 修改className时，如果新类关联了与此前不同的CSS样式那么就会立即应用该样式；



## 3. 获得特性

每个元素都有一个或多个特性，这些特性的用途是给相应元素或其内容附加信息。元素继承自Element.prototype上的三个属性，它们的功能是**操作特性（不是属性）**的方法：

- setAttribute('attr','value')：设置一个特性，如果已存在则替换
- getAttribute('attr')： 获取一个特性的值
- removeAttribute('attr')： 彻底删除元素的特性

```html
<div class="tt" title="测试" id="ii">123</div>
<script>
    var tt =  document.getElementById('ii')
    tt.getAttribute('id');	// "ii"
    tt.setAttribute('title', 'some other text');// 此时title已经改变了
    tt.removeAttribute('class');	// 此时已经删除了 class类样式
</script>
```

- 元素还能通过继承HTML某元素Element.prototype上的一些特性，比如input元素的disabled属性继承自HTMLInputElement.prototype上的disabled，可以通过`.disabled`取得或设置值:

  ```html
  输入<input id="inp" type="text">
  <input disabled> <!-- 也可以在标签里写-->
  <script>
      var input = document.getElementById('inp');
      // <input id="inp" type="text">
      input.disabled;	// false
      input.disabled = true;	// 此时输入框禁止输入了
  </script>
  ```

- HTML5规范对自定义特性做了增强，只要自定义特性以'data-attrName'形式写到html标签中（setAttribute或直接html代码存在均可），在DOM属性中就可通过ele.dataset.attrName形式访问自定义特性。

  dataset属性继自HTMLElement.prototype，它的值是DOMStringMap的实例集合，原型链继承关系为：ele.dataset.__proto__->DOMStringMap.prototype->Object.prototype。

  ```html
  <div id="one" data-aa="a" data-bb="b" data-cc="c">自定义的属性</div>
  <script>
      var one = document.getElementById('one');
      one.dataset;	// DOMStringMap {aa: "a", bb: "b", cc: "c"}
      one.dataset.aa;	// "a"
  </script>
  ```

- 特姓名不区分大小写，getAttribute('id')和getAttribute('ID')都代表同一个特性。

  ```html
  <div id="one" data-aa="a" data-bb="b" data-cc="c">自定义的属性</div>
  <script>
      var one = document.getElementById('one');
      one.getAttribute('id');	// "one"
      one.getAttribute('iD');	// "one"
      one.getAttribute('ID');	// "one"
  </script>
  ```

### 3.1 两个特殊的特性

虽然有对应的属性名，但属性的值与通过getAttribute()返回的值并不相同。

#### 3.1.1 style：用于通过css为元素指定样式

style属性继承自HTMLElement.prototype

- 通过getAttribute()访问返回的**style特性值（在标签中定义的）**中包含CSS文本
- 通过style属性访问返回一个CSSStyleDeclaration类型集合对象，由于style属性是用于以编程方式访问访问元素样式的因此并没有直接映射到style特性,获得的集合中的属性只有已设置的才有值，其余的属性为空字符串即使它们都有默认值。

```html
<style> #one { border: 1px solid; background: green; } </style>
 <div id="one" style="color:red">style</div>
<script>
    var one = document.getElementById('one');
    one.getAttribute('style');	// "color:red"
    one.style;
    // CSSStyleDeclaration {0: "color", alignContent: "", alignItems: "", alignSelf: "", alignmentBaseline: "", all: "", …}
</script>
```

从上面的结果可以看出，只有在标签上设置了style特性的值才会出现在结果中。

通过`.style`属性返回的结果是CSSStyleDeclaration类型实例集合，原型链继承关系为：div.style.__proto__->CSSStyleDeclaration.prototype->Object.prototype

```javascript
Object.getOwnPropertyNames(CSSStyleDeclaration)
// (5) ["length", "name", "arguments", "caller", "prototype"]
Object.getOwnPropertyNames(CSSStyleDeclaration.prototype)
// (10) ["cssText", "length", "parentRule", "cssFloat", "item", "getPropertyValue", "getPropertyPriority", "setProperty", "removeProperty", "constructor"]
```







## 4. 参考资料

[DOM Element节点类型详解](http://web.jobbole.com/83585/)

[从原型链看DOM－－Element类型](https://www.cnblogs.com/venoral/p/5338795.html)

[返本求源——DOM元素的特性与属性](http://web.jobbole.com/83441/)

[HTML DOM 元素对象 菜鸟教程](http://www.runoob.com/jsref/dom-obj-all.html)

[Element  MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Element)

[JS魔法堂：属性、特性，傻傻分不清楚](https://www.cnblogs.com/fsjohnhuang/p/3840263.html)

[window.getComputedStyle()方法的使用 CSDN](https://blog.csdn.net/s110902/article/details/73312802?locationNum=12&fps=1)

[Window.getComputedStyle()  MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/getComputedStyle)

[Element对象  阮一峰](http://javascript.ruanyifeng.com/dom/element.html)

