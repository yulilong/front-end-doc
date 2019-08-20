[[TOC]]
[TOC]

# 二、字符实体

## 1. ASCII 部分实体字符列表

```
字符		实体名称	  实体编号
 	　　　　&nbsp;		&#32;	// 空格
<	　　　　&lt;		&#60;	// 小于号
>	　　　　&gt;		&#62;	// 大于号	
&	　　　　&amp;		&#38;	// 和号
!	　　　　&excl;		&#33;
"	　　　　&quot;		&#34;
#	　　　　&num;		&#35;
$	　　　　&dollar;	&#36;
%	　　　　&percnt;	&#37;
'	　　　　&apos;		&#39;
(	　　　　&lpar;		&#40;
)	　　　　&rpar;		&#41;
*	　　　　&ast;		&#42;
+	　　　　&plus;		&#43;
,	　　　　&comma; 	&#44;
-	　　　　&hyphen; 	&#45;
.	　　　　&period;	&#46;
/	　　　　&sol; 		&#47;
:	　　　　&colon;		&#58;
;	　　　　&semi;		&#59;
=	　　　　&equals;	&#61;
?	　　　　&quest;		&#63;
@	　　　　&commat; 	&#64;
[	　　　　&lsqb; 		&#91;
\	　　　　&bsol; 		&#92;
]	　　　　&rsqb;		&#93;
^	　　　　&circ;		&#94;
_	　　　　&lowbar;	&#95;
`	　　　　&grave;		&#96;
{	　　　　&lcub;		&#123;
|	　　　　&verbar;	&#124;
}	　　　　&rcub;		&#125;
~	　　　　&tilde;		&#126;
```

更多参考：https://www.freeformatter.com/html-entities.html#ascii-characters



## 2. HTML Entity介绍

在HTML中有的字符是预留的，比如小于号（<）和大于号（>），如果直接写，浏览器会把他们当成标签，如果想要正确的显示预留字符，就必须要在HTML的源代码中使用字符实体(character entities)。

字符实体类似于这样：

```
&entity_name;
或者
&#entity_number;
<p>字符 ：<</p>
<p>Entity Name ：&lt;</p>
<p>Entity Number(十进制) ：&#60;</p>
<p>Entity Number(十六进制) ：&#x3c;</p>
```

### 2.1 Entity Name 实体名称

**格式**： `&entityName; `

**说明**："**&**"开头，"**;**"结尾，以**语义**的形式描述字符。如字符"<"，英文名称为"less than"，Entity Name为"&lt;"，取自"less than"2个单词的首字母。

### 2.2 Entity Number 实体编号

**格式**： `&#entityNumber; `

**说明**："**&#**"开头，"**;**"结尾，以**编号**的形式描述字符。此编号可以为十进制或十六进制(以"**&#x**"开头)等数字格式。



## 3. 字符与实体编号互转

### 3.1 字符转实体编号

String的实例方法 charCodeAt() 可把指定字符转换为编码：

```javascript
var charCode = '<'.charCodeAt(0); 			// => 40
var entityNumber = '&#' + charCode + ';'; 	// => (
```

### 3.2 实体编号转字符

String的静态方法 fromCharCode() 可把指定编码转换为字符，而Entity Number的编码可以为十进制或16进制，所以转换时进行分别处理：

```javascript
var getChar = function(entityNumber) {
    var num = entityNumber.replace('&#', '').replace(';', '');
    if (num.indexOf('x') == 0 || num.indexOf('X') == 0) {
        num = Number.parseInt(num, 16); // 16进制转换为10进制
    } else {
        num = Number.parseInt(num); 	// 10进制
    }
    var char = String.fromCharCode(num);
    return char;
}

// e.g.
var oldStr = '&#40;中文&#41;';
var newStr = oldStr.replace(/(&#\d+;)/g, function(matched) {
    return getChar(matched);
});
console.log(newStr); // => (中文)
```



## 参考资料

[HTML Entity 字符实体(字符转义)](http://www.cnblogs.com/polk6/p/html-entity.html)

[更多字符实体](https://www.freeformatter.com/html-entities.html#iso88591-characters)

[HTML 字符实体 W3C](http://www.w3school.com.cn/html/html_entities.asp)

