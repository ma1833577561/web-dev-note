 * 三角形
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

![image](https://github.com/ma1833577561/web-development-notebook/tree/master/CSS/images/1.png)
