### 1. for循环的元素key值尽量不要是用数组的索引

### 2. HTML元素的点击事件不要是用箭头函数，如果有参数使用data-props

```jsx
<div
  data-levelcode={data.levelCode}
  onClick={event => {
    this.onShowMoreQueryBtn(levelCode);
  }}
 >
  <span></span>
</div>
{/* 改成如下形式 */}
<div
  data-levelcode={data.levelCode}
  onClick={this.onShowMoreQueryBtn}
 >
  <span></span>
</div>
```

