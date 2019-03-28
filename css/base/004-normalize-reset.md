# 四、Reset CSS和Normalize.css

## 1. Reset CSS

CSS重置旨在删除所有内置的浏览器样式。像H1-6，p，strong，em等标准元素看起来完全一样，完全没有装饰。那么你应该自己添加所有的装饰。


## 2. Normalize.css

标准化CSS旨在使浏览器内置的浏览器样式保持一致。像H1-6这样的元素将会在浏览器中以一致的方式显示为粗体，大小等等。那么你应该只添加你的设计所需的装饰差异。


## 3. 区别

1. Normalize.css保留有用的默认值，而不是“不重叠”的一切。例如，在包含normalize.css（实际上变得更健壮）之后，像“ supor subwork” 这样的元素，而在包含reset.css之后，它们在视觉上与普通文本没有区别。所以，normalize.css并没有强加给你一个视觉的起点（homogeny）。这可能不是每个人的口味。要做的最好的事情就是对两者进行试验，并根据自己的喜好看看是哪种凝胶。
2. Normalize.css更正了reset.css超出范围的一些常见错误。它具有比reset.css更广泛的范围，并且还提供了常见问题的错误修复：HTML5元素的显示设置，缺少font窗体元素的继承，更正font-size渲染pre，IE9中的SVG溢出以及buttoniOS中的样式错误。
3. Normalize.css不会混乱你的开发工具。使用reset.css时常见的问题是浏览器CSS调试工具中显示的大型继承链。这不是normalize.css的问题，因为有针对性的风格。
4. Normalize.css更加模块化。该项目被分解为相对独立的部分，如果您知道您的网站永远不需要该部分，则可以轻松地删除部分（如表单规范化）。
5. Normalize.css有更好的文档。normalize.css代码在GitHub Wiki中以内联和更全面的形式记录。这意味着你可以找出每行代码在做什么，为什么被包含在内，浏览器之间有什么区别，更容易运行你自己的测试。该项目旨在帮助教育人们如何默认浏览器呈现元素，并使他们更容易参与提交改进。


## 4. 参考资料

[Normalize.css和Reset CSS有什么区别？](https://cloud.tencent.com/developer/ask/26961)

[浅谈Normalize.css](https://www.jianshu.com/p/3d21d1932aa0)

