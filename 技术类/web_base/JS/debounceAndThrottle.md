
### debounce and throttle(防抖和节流)

* 防抖：让触发的多次事件只执行一次。
* 使用场景：搜索框
```
function debounce (fn,delay) {
  let timer = null;
  return function () {
    let context = this;
    let args = arguments;
    let firstTime = !timer;
    if(timer) {
      clearTimeout(timer);
    }
    if(firstTime) {
      fn.apply(constext,args);
    }
    timer = setTimeout(function () {
      timer = null;
    },delay) 
  }
}
```
* 节流：让触发的多次事件每隔一段时间执行一次。
* 适用场景：拖拽事件（dom拖拽或滚动条），缩放窗口大小，动画场景（避免短时间内多次触发动画引起性能问题）
```
/防抖：时间戳版本
function throttle (fn,delay) {
  let preTime = 0;
  return function () {
    let context = this;
    let args = arguments;
    let curTime = new Date().getTime();
    if(curTime - perTime >= delay) {
      fn.apply(context,args);
      preTime = curTime;
    }
  }
}

//定时器版本
function throttle (fn,delay) {
  let timer = null;
  return funcion () {
    let firstTime = !timer;
    if(firstTime) {
      timer = setTimeout(() => {
        fn.apply(this,arguments);
        clearTimeout(timer);
         timer = null;
      },delay)
    }
  }
}
```
