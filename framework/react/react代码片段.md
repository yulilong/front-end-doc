# 二、react代码片段

## 1. setState异步执行，中立即使用的方法

```jsx
this.setState({
    businessLine: [{name: '-'},...res.data.data],
},()=>{
    // 这里可以立即使用
});
```

## 2. jsx中HTML三木运算

```jsx
{this.state.businessLine ? (
    this.state.businessLine.map((item, i) => (
        <Option key={i.toString()} value={item.id}>{item.name}</Option>
    ))
) : (
    <Option key='1' value=''></Option>
)}
```

