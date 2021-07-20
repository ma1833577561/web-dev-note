


### 1 、CSS 炫酷效果

[CSS 奇技淫巧之CSS/Web动画](https://github.com/chokcoco/iCSS)

[CSS Inspiration，在这里找到写 CSS 的灵感](https://github.com/chokcoco/CSS-Inspiration)

[CSS3奇思妙想，单标签实现各类图形](https://github.com/chokcoco/magicCss)



 

### 2、常用样式


`一行文本超出隐藏`
```
overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
```

` 多行文本溢出隐藏`
```
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 3;
overflow: hidden;
```

`IOS 手机容器滚动条滑动不顺畅`
```
overflow: auto;
-webkit-overflow-scrolling: touch;
```

`修改滚动条样式`
 *隐藏 div 元素的滚动条
```
div::-webkit-scrollbar {
    display: none;
}
```


`去除图片底边3像素的问题`
```
img { 
    vertical-align:middle
}
```

`contenteditable标签变成可编`
```
contenteditable="true" 可以将标签变成可编辑状态。

<div contenteditable="true"></div>
```

`CSS 中 calc() 方法`
  *这个属性能适应自适应的布局。
```
div {
    width: calc(50% - 20px);
}
```

`隐藏页面元素`
```
display-none: 元素不存在，从 dom 中删除
opacity-0: 元素透明度将为 0，但元素仍然存在，绑定的事件仍旧有效仍可触发执行。
visibility-hidden：元素隐藏，但元素仍旧存在，页面中无法触发该元素的事件。
```
### 3、特殊的样式
```
// chrome中文界面下默认将小于12px的文本强制按照12px显示
// 加入-webkit-text-size-adjust可以解决
-webkit-text-size-adjust:none
```




