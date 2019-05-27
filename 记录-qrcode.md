## jquery.qrcode.min.js //二维码生成器
    使用此插件前先引入jquery页面或组件中
* 简单的使用
    ``````html
    <div id="qrcode"></div>
    ````````````
    ```````javascript
    jQuery(function(){
        jQuery("#qrcode").qrcode("https://www.baidu.com")
                })
     `````````
* 进阶使用
    * 指定二维码生成方式
        ```````javascript
                //使用table生成
                jQuery('#qrcode').qrcode({
                    render: "table",
                    text: "http://www.jq22.com"
                });
 
                //使用canvas生成
                jQuery('#qrcode').qrcode({
                    render: "canvas",
                    text: "http://www.jq22.com"
             });
         ````````````
* 指定生成二维码的大小
     `````javascript
        //生成100*100(宽度100，高度100)的二维码
            jQuery('#qrcode').qrcode({
                render: "canvas", //也可以替换为table
                width: 100,
                height: 100,
                text: "http://www.jq22.com"
            });
     ```````
* 指定生成二维码的色彩样式
    `````javascript
        //生成前景色为红色背景色为白色的二维码
            jQuery('#qrcode').qrcode({
                render: "canvas", //也可以替换为table
                foreground: "#C00",
                background: "#FFF",
                text: "http://www.jq22.com"
            });
    ```````
* 中文ULR生成方法:
    `````javascript
            jQuery("#output").qrcode(encodeURI("http://中文中文"));//使用encodeURI进行转码
    ```````



