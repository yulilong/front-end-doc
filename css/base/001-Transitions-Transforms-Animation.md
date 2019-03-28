# 一、过度、旋转、动画

## 1. Transitions

- transition-property：用于指定过渡的性质，比如 transition-property:backgrond 就是指 backgound 参与这个过渡
- transition-duration：用于指定这个过渡的持续时间
- transition-delay：用于制定延迟过渡的时间
- transition-timing-function：用于指定过渡类型，有 ease | linear | ease-in | ease-out | ease-in-out | cubic-bezier

**transition-property**（过渡的属性的名称）。  

**transition-duration**（定义过渡效果花费的时间,默认是 0）。 

 **transition-timing-function**:linear(匀速) ease(慢速开始，然后变快，然后慢速结束)（规定过渡效果的时间曲线，最常用的是这两个）。 

 **transition-delay**（规定过渡效果何时开始。默认是 0）。  当然，一般情况下，我们都是写一起的，比如：transition： width 2s ease 1s 。



## 2. Transforms

指拉伸，压缩，旋转，偏移等等一些图形学里面的基本变换。

### 2.1 旋转:rotate



```html
<style>
    .one {
        width: 200px;
        height: 200px;
        background-color: red;
        transition: transform 1s linear;
    }
    .one:hover {
        transform: rotate(-180deg);
    }
</style>
<div class="one"></div>
```



## 3. Animation





## 参考资料



1. [CSS3动画相关属性详解 CSDN](