### CSS


`CSS 奇技淫巧之CSS/Web动画 `

[https://github.com/chokcoco/iCSS](CSS 奇技淫巧之CSS/Web动画 )


> 画三角形

 * 三角形
 ```
 <!-- 第一组 start -->
        <div id = "demo"></div>
    <!-- 第一组 end -->
    <!-- 第二组 start -->
        <div id = "demo2">
                <span>◆</span>
                <span>◆</span>
        </div>
    <!-- 第二组 end -->
    <!-- 第三组 start -->
    <div class="up"></div> <!--向上的三角形-->
	<div class="down"></div> <!--向下的三角形-->
	<div class="left"></div> <!--向左的三角形-->
    <div class="right"></div> <!--向右的三角形-->
    <!-- 第三组 end -->
    <!-- 第四组 start -->
    <!--向上的三角形-->
	    <div class="border-up">
            <span></span>
        </div>
        <!--向下的三角形-->
        <div class="border-down">
            <span></span>
        </div>
        <!--向左的三角形-->
        <div class="border-left">
            <span></span>
        </div>
        <!--向右的三角形-->
        <div class="border-right">
            <span></span>
        </div>
    <!-- 四组 end -->
 
 ```
 ![1.png](https://github.com/ma1833577561/web-development-notebook/blob/master/CSS/images/1.png)

 ```
 div{
        display: inline-block;
    }
    /* 第一个空心三角形 start */
        #demo {
            width: 100px;
            height: 100px;
            background: #fff;
            position: relative;
            margin-bottom: 10pt;
            border: 2px solid #000;
        }
        #demo:after, #demo:before {
            width: 0;
            height: 0;
            content: "";
            border: solid transparent;
            position: absolute;
            left: 100%;
        }
        #demo:after {
            border-width: 10px;
            border-left-color: #fff;
            top: 20px;
        }
        #demo:before {
            border-width: 12px;
            border-left-color: #000;
            top: 18px;
        }
    /*第一个空心三角形 end*/
```
 ![2.png](https://github.com/ma1833577561/web-development-notebook/blob/master/CSS/images/2.png)
 ```
 /*第二个空心三角形 start*/
        #demo2 {
            width: 100px;
            height: 100px;
            background: #fff;
            position: relative;
            border: 2px solid #000;
        }
        span{
            width: 24px;
            line-height: 24px;
            font-size: 40px;
            position: absolute;
            top:20px;
        }
        span:nth-of-type(1){
            color: #000;
            right:-13px;
        }
        span:nth-of-type(2){
            color: #fff;
            right:-11px;
        }   
    /*第二个空心三角形 end*/
 ```
 ![3.png](https://github.com/ma1833577561/web-development-notebook/blob/master/CSS/images/3.png)
 ![4.png](https://github.com/ma1833577561/web-development-notebook/blob/master/CSS/images/4.png)
 ![5.png](https://github.com/ma1833577561/web-development-notebook/blob/master/CSS/images/5.png)
 ![6.png](https://github.com/ma1833577561/web-development-notebook/blob/master/CSS/images/6.png)
  ```
  /*第三个空心三角形 start*/
        /*想获取朝那边三角形,给相反的一边设置颜色,font-size: 0;line-height: 0;可以兼容ie6*/
    	div{margin: 10pt;}
        .up{width: 0;height: 0;border-left: 20px solid transparent;border-right: 20px solid transparent;border-bottom: 20px solid #f00;font-size: 0;line-height: 0;}
    	.down{width: 0;height: 0;border-left: 20px solid transparent;border-right: 20px solid transparent;border-top: 20px solid #f00;font-size: 0;line-height: 0;}
    	.left{width: 0;height: 0;border-top: 20px solid transparent;border-right: 20px solid #f00;border-bottom: 20px solid transparent;font-size: 0;line-height: 0;}
    	.right{width: 0;height: 0;border-top: 20px solid transparent;border-left: 20px solid #f00;border-bottom: 20px solid transparent;font-size: 0;line-height: 0;}
    /*第三个空心三角形 end*/
 ```
 ![7.png](https://github.com/ma1833577561/web-development-notebook/blob/master/CSS/images/7.png)
 ![8.png](https://github.com/ma1833577561/web-development-notebook/blob/master/CSS/images/8.png)
 ![9.png](https://github.com/ma1833577561/web-development-notebook/blob/master/CSS/images/9.png)
 ![10.png](https://github.com/ma1833577561/web-development-notebook/blob/master/CSS/images/10.png)
  ```
 /*第四个空心三角形 start*/
    .border-up{width: 0;height: 0;border-left: 30px solid transparent;border-right: 30px solid transparent;border-bottom: 30px solid #333;position: relative;margin: 50px auto;}
    	.border-up span{display: block;width: 0;height: 0;border-left: 28px solid transparent;border-right: 28px solid transparent;border-bottom: 28px solid #F0981C;position: absolute;left: -28px;top: 1px;}
    	.border-down{width: 0;height: 0;border-left: 30px solid transparent;border-right: 30px solid transparent;border-top: 30px solid #333;position: relative;margin: 50px auto;}
    	.border-down span{display: block;width: 0;height: 0;border-left: 28px solid transparent;border-right: 28px solid transparent;border-top: 28px solid #F0981C;position: absolute;left: -28px;top: -29px;}
    	.border-left{width: 0;height: 0;border-bottom: 30px solid transparent;border-right: 30px solid #333;border-top: 30px solid transparent;position: relative;margin: 50px auto;}
    	.border-left span{display: block;width: 0;height: 0;border-bottom: 28px solid transparent;border-right: 28px solid #F0981C;border-top: 28px solid transparent;position: absolute;left: 1px;top: -28px;}
    	.border-right{width: 0;height: 0;border-left: 30px solid #333;border-bottom: 30px solid transparent;border-top: 30px solid transparent;position: relative;margin: 50px auto;}
    	.border-right span{display: block;width: 0;height: 0;border-left: 28px solid #F0981C;border-bottom: 28px solid transparent;border-top: 28px solid transparent;position: absolute;left: -29px;top: -28px;}
    /*第四个空心三角形 end*/
 ```



> 常用样式


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




