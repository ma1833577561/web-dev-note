### i18n国际化配置

`安装i18n`
```
npm install vue-i18n
```
* `创建i18n文件夹`

 ![创建i18n文件夹](https://github.com/ma1833577561/web-development-notebook/blob/master/Npm/images/i18nFile.webp)
 ***
* `创建翻译的文本对象`
 ![创建翻译的文本对象](https://github.com/ma1833577561/web-development-notebook/blob/master/Npm/images/fileObject.png)
`在index文件中引入国际化配置文件（也可以直接挂载到下一步）`
```
import en from './en'
import cn from './zh-cn'
import mo from './zh-mo'
// import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
// import elementCnLocale from 'element-ui/lib/locale/lang/zh-CN'// element-ui lang
// import elementMoLocale from 'element-ui/lib/locale/lang/zh-TW'// element-ui lang

export default {
  en: {
    ...en,
    // ...elementEnLocale
  },
  cn: {
    ...cn,
    // ...elementCnLocale
  },
  mo: {
    ...mo,
    // ...elementMoLocale
  }
}
```
`在i18n.js中配置`
```
// 引入插件和语言包
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from './langs'
import locale from 'element-ui/lib/locale'

Vue.use(VueI18n)// 通过插件的形式挂载
const i18n = new VueI18n({//实例化vue-i18n
  // 从本地存储中取，如果没有默认为中文，
  // 这样可以解决切换语言后，没记住选择的语言，刷新页面后还是默认的语言
  locale: localStorage.lang || 'cn',
  messages
})

//locale.i18n((key, value) => i18n.t(key, value))//实现element插件的多语言切换
export default i18n
```

`在main.js中引入`
```
import i18n from './i18n/i18n'
// element ui
//import ElementUI from 'element-ui';
//import 'element-ui/lib/theme-chalk/index.css';
//Vue.use(ElementUI);


var vue =  new Vue({
  el: '#app',
  i18n,
  // ElementUI,
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
export default vue
```
`在页面中使用`
```
<h3>{{$t('message.usersLogin')}}</h3>
```
`切换语言`
```
<!-- 语言选择框 -->
   <template>
     <el-select
       v-model="value"
       placeholder="中文"
       size="mini"
       width='20px'
       @change="language"
       class="language"
     >
       <el-option
         v-for="item in options"
         :key="item.value"
         :label="item.label"
         :value="item.value"
       >
       </el-option>
     </el-select>
   </template>



 data () {
    return {
      options: [{
        value: 'cn',
        label: '中文'
      }, {
        value: 'en',
        label: '英语'
      }, {
        value: 'mo',
        label: '繁体中文'
      }],
      value: ''
}


 language (value) {
      this.$i18n.locale = value
      localStorage.setItem('lang', value)
}
```





