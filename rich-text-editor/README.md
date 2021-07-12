

### Vue-Quill-Editor

~ [Vue-Quill-Editor](https://github.com/surmon-china/vue-quill-editor)

~ [Vue-Quill-Editor图片上传](https://www.jianshu.com/p/36b144b4cef8)

~ [Vue-Quill-Editor视频上传](https://zhuanlan.zhihu.com/p/108705388)

~[[Vue-Quill-Editor中video标签替换iframe](https://blog.csdn.net/qq_41833439/article/details/110078790)


* 基础版
```
<!-- html -->

<!-- 图片上传 -->
<quill-editor
  class="editor"
  ref="myTextEditor"
 :value="content"
 :options="editorOption"
 @change="onEditorChange"
@blur="onEditorBlur($event)"
@focus="onEditorFocus($event)"
@ready="onEditorReady($event)"
/>

<!--js -->
import dedent from 'dedent'
import hljs from 'highlight.js'
import debounce from 'lodash/debounce'
import Quill from 'quill'
import { quillEditor } from 'vue-quill-editor'
  // highlight.js style
import 'highlight.js/styles/tomorrow.css'
 // import theme style
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import quillConfig from './quill-config.js'

export default {
  components: {
    // 注册组件
    quillEditor
  },
  data(){
    return{
      searchEmployName:'',
      editorOption: {
        modules: {
        // 声明功能
          toolbar: [
              [{ 'size': ['small', false, 'large', 'huge'] }],
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{ 'header': 1 }, { 'header': 2 }],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              [{ 'indent': '-1' }, { 'indent': '+1' }],
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              [{ 'font': [] }],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'align': [] }],
              ['clean'],
              ['link', 'image', 'video']
          ],
          // 高亮展示
          syntax: {
            highlight: text => hljs.highlightAuto(text).value
          }
        }
      },
      activeName:"0",
      videoLink:'',
      
      // 向后端携带的参数
      datas:{},
      
      // 自定义视频弹出窗体
      videoUploadTag:false,
      // 附件参数
      acceptType:'.jpg,.jpeg,.png,.xls,.xlsx,.pdf,.ppt,.pptx,.docx,.dox,.txt,.zip,.rar,',
      
      // 后台给的图片上传地址
      action:`${baseUrl.m3}/file/uploadFileAction.do`,
      
       // 图片sec数组
      fileList:[],
      uniqueId:'inputUpload',
      imageLoading:false,
      
      // 富文本内容
      content: dedent`
        <h1 class="ql-align-center"><span class="ql-font-serif" style="background-color: rgb(240, 102, 102); color: rgb(255, 255, 255);"> I am snow example! </span></h1><p><br></p><p><span class="ql-font-serif">W Can a man still be brave if he's afraid? That is the only time a man can be brave. </span></p><p><br></p><p><strong class="ql-font-serif ql-size-large">Courage and folly is </strong><strong class="ql-font-serif ql-size-large" style="color: rgb(230, 0, 0);">always</strong><strong class="ql-font-serif ql-size-large"> just a fine line.</strong></p><p><br></p><p><u class="ql-font-serif">There is only one God, and his name is Death. And there is only one thing we say to Death: "Not today."</u></p><p><br></p><p><em class="ql-font-serif">Fear cuts deeper than swords.</em></p><p><br></p><pre class="ql-syntax" spellcheck="false"><span class="hljs-keyword">const</span> a = <span class="hljs-number">10</span>;
        <span class="hljs-keyword">const</span> editorOption = { <span class="hljs-attr">highlight</span>: <span class="hljs-function"><span class="hljs-params">text</span> =&gt;</span> hljs.highlightAuto(text).value };</pre><p><br></p><p><span class="ql-font-serif">Every flight begins with a fall.</span></p><p><br></p><p><a href="https://surmon.me/" rel="noopener noreferrer" target="_blank" class="ql-font-serif ql-size-small" style="color: rgb(230, 0, 0);"><u>A ruler who hides behind paid executioners soon forgets what death is. </u></a></p><p><br></p><iframe class="ql-video ql-align-center" frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/QHH3iSeDBLo?showinfo=0" height="238" width="560"></iframe><p><br></p><p><span class="ql-font-serif">Hear my words, and bear witness to my vow. Night gathers, and now my watch begins. It shall not end until my death. I shall take no wife, hold no lands, father no children. I shall wear no crowns and win no glory. I shall live and die at my post. I am the sword in the darkness. I am the watcher on the walls. I am the fire that burns against the cold, the light that brings the dawn, the horn that wakes the sleepers, the shield that guards the realms of men. I pledge my life and honor to the Night’s Watch, for this night and all the nights to come.</span></p><p><br></p><p><span class="ql-font-serif">We are born to suffer, to suffer can make us strong.</span></p><p><br></p><p><span class="ql-font-serif">The things we love destroy us every time.</span></p>
      `,
    }
  },
  methods:{
    
    onEditorChange: debounce(function(value) {
      this.content = value.html
    }, 466),
    
    // 富文本失焦钩子函数
    onEditorBlur(editor) {
      console.log('editor blur!', editor)
    },
    
    // 富文本获焦钩子函数
    onEditorFocus(editor) {
      console.log('editor focus!', editor)
    },
    //
    onEditorReady(editor) {
      console.log('editor ready!', editor)
    },
  },
  computed: {
    editor() {
      return this.$refs.myTextEditor.quill
    },
    contentCode() {
      return hljs.highlightAuto(this.content).value
    }
  },
}
```
// 到此为止你可以实现本地版的富文本编辑器了


* 自定义图片上传，这里使用的是element ui 文件上传
```
<!-- html -->
<div class="help-body">
   <div v-loading="imageLoading" element-loading-text="请稍等，图片上传中">
      
     <quill-editor
       class="editor"
       ref="myTextEditor"
       :value="content"
       :options="editorOption"
       @change="onEditorChange"
       @blur="onEditorBlur($event)"
       @focus="onEditorFocus($event)"
       @ready="onEditorReady($event)"
     />
      <el-upload
          v-show="false"
          ref="upload"
          class="upload-demo"
          :action="action"
          :data="datas"
          :before-upload="beforeUpload"
          :accept="acceptType"
          :on-success="successinfoList"
          multiple
          :file-list="fileList">
          <el-button size="small" type="primary">点击上传</el-button>
          <!-- :on-exceed="handleExceed" -->
          <!-- :limit="3" -->
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </div>
  </div>
 <div class="output code">
   <code class="hljs" v-html="contentCode"></code>
</div>
<!--js -->
import dedent from 'dedent'
  import hljs from 'highlight.js'
  import debounce from 'lodash/debounce'
  import Quill from 'quill'
  import { quillEditor } from 'vue-quill-editor'
  // highlight.js style
  import 'highlight.js/styles/tomorrow.css'
  // import theme style
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import quillConfig from './quill-config.js'
  import baseUrl from '@/api/base'
  import {timeForm} from '@/lhhc/utils/date-time'

export default {
  components: {
  // 注册组件
    quillEditor
  },
  data(){
    return{
      searchEmployName:'',
      editorOption: {
        modules: {
         // 声明功能
          toolbar: [
              [{ 'size': ['small', false, 'large', 'huge'] }],
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{ 'header': 1 }, { 'header': 2 }],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              [{ 'indent': '-1' }, { 'indent': '+1' }],
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              [{ 'font': [] }],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'align': [] }],
              ['clean'],
              ['link', 'image', 'video']
          ],
          // 高亮展示
          syntax: {
            highlight: text => hljs.highlightAuto(text).value
          }
        }
      },
      
      // 向后端携带的参数
      datas:{},
      
      // 自定义视频弹出窗体
      videoUploadTag:false,
      
      // 附件参数
      acceptType:'.jpg,.jpeg,.png,.xls,.xlsx,.pdf,.ppt,.pptx,.docx,.dox,.txt,.zip,.rar,',
      
      // 后台给的图片上传地址
      action:`${baseUrl.m3}/file/uploadFileAction.do`,
      
      // 图片sec数组
      fileList:[],
      uniqueId:'inputUpload',
      imageLoading:false,
      
      // 富文本内容
      content: dedent`
        <h1 class="ql-align-center"><span class="ql-font-serif" style="background-color: rgb(240, 102, 102); color: rgb(255, 255, 255);"> I am snow example! </span></h1><p><br></p><p><span class="ql-font-serif">W Can a man still be brave if he's afraid? That is the only time a man can be brave. </span></p><p><br></p><p><strong class="ql-font-serif ql-size-large">Courage and folly is </strong><strong class="ql-font-serif ql-size-large" style="color: rgb(230, 0, 0);">always</strong><strong class="ql-font-serif ql-size-large"> just a fine line.</strong></p><p><br></p><p><u class="ql-font-serif">There is only one God, and his name is Death. And there is only one thing we say to Death: "Not today."</u></p><p><br></p><p><em class="ql-font-serif">Fear cuts deeper than swords.</em></p><p><br></p><pre class="ql-syntax" spellcheck="false"><span class="hljs-keyword">const</span> a = <span class="hljs-number">10</span>;
        <span class="hljs-keyword">const</span> editorOption = { <span class="hljs-attr">highlight</span>: <span class="hljs-function"><span class="hljs-params">text</span> =&gt;</span> hljs.highlightAuto(text).value };</pre><p><br></p><p><span class="ql-font-serif">Every flight begins with a fall.</span></p><p><br></p><p><a href="https://surmon.me/" rel="noopener noreferrer" target="_blank" class="ql-font-serif ql-size-small" style="color: rgb(230, 0, 0);"><u>A ruler who hides behind paid executioners soon forgets what death is. </u></a></p><p><br></p><iframe class="ql-video ql-align-center" frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/QHH3iSeDBLo?showinfo=0" height="238" width="560"></iframe><p><br></p><p><span class="ql-font-serif">Hear my words, and bear witness to my vow. Night gathers, and now my watch begins. It shall not end until my death. I shall take no wife, hold no lands, father no children. I shall wear no crowns and win no glory. I shall live and die at my post. I am the sword in the darkness. I am the watcher on the walls. I am the fire that burns against the cold, the light that brings the dawn, the horn that wakes the sleepers, the shield that guards the realms of men. I pledge my life and honor to the Night’s Watch, for this night and all the nights to come.</span></p><p><br></p><p><span class="ql-font-serif">We are born to suffer, to suffer can make us strong.</span></p><p><br></p><p><span class="ql-font-serif">The things we love destroy us every time.</span></p>
      `,
    }
  },
   mounted(){
   
    // 参数上传图后台需要的参数
    let companyUuid = sessionStorage.getItem('companyUuid')
    let destPath = `/oa/doc/${timeForm(new Date())}/`
    this.datas = {
      destPath: destPath,
      companyUuid: companyUuid,
      resultType: 'json',
      timestamp: new Date(),
    }
    var vm =this
    
    // 声明图片自定义钩子函数
    var imgHandler = async function(state) {
      if (state) {
        document.querySelector('.el-upload').click()
      }
    }
    // 这是关键的操作
    vm.$refs.myTextEditor.quill.getModule("toolbar").addHandler("image", imgHandler)
    
   }，
   methods:{
   
      // 图片上传前钩子函数
      beforeUpload(file){
        console.log(file,'file----------------')
      },
      
      // 图片上传成功钩子函数
      successinfoList(response,file,fileList){
         console.log(response,'response',file,'files, fileList',fileList,)
        var vm = this
        var value = response.data[0].path
        vm.addImgRange = vm.$refs.myTextEditor.quill.getSelection()
        value = baseUrl.m3 +'/'+ value
        vm.$refs.myTextEditor.quill.insertEmbed(vm.addImgRange != null ? vm.addImgRange.index : 0, 'image', value, Quill.sources.USER)
      },
      
       // 超图上传图片处理
      handleExceed(files, fileList){
        console.log(files,'files, fileList',fileList)
      },
      // 
      onEditorChange: debounce(function(value) {
      this.content = value.html
    }, 466),
    
    // 富文本失焦钩子函数
    onEditorBlur(editor) {
      console.log('editor blur!', editor)
    },
    // 富文本获焦钩子函数
    onEditorFocus(editor) {
      console.log('editor focus!', editor)
    },
    
    onEditorReady(editor) {
      console.log('editor ready!', editor)
    },
    
    // 保存到后台
    saveHAndle(){
      //this.content 就是你填写的内容，包含标签文本的内容，
      this.content
    },

   }，
 }

```

* 再加上视频自定义
```
<!-- html -->
<div class="help-body">
  <div v-loading="imageLoading" element-loading-text="请稍等，图片上传中">
  
    <quill-editor
      class="editor"
      ref="myTextEditor"
      :value="content"
      :options="editorOption"
      @change="onEditorChange"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)"
    />
          
    <!-- 图片上传 -->
    <el-upload
      v-show="false"
      ref="upload"
      class="upload-demo"
      :action="action"
      :data="datas"
      :before-upload="beforeUpload"
      :accept="acceptType"
      :on-success="successinfoList"
      multiple
      :file-list="fileList">
      <el-button size="small" type="primary">点击上传</el-button>
      <!-- :on-exceed="handleExceed" -->
      <!-- :limit="3" -->
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
     </el-upload>
          
     <!-- 视频上传 -->
     <el-dialog
       width="350px"
       id="video_upload"
       style="margin-top: 1px"
       title="视频上传"
       :visible.sync="videoUploadTag"
        append-to-body>
         <div style="display:flex;margin-bottom: 20px;">
           <span style="width:85px;line-height: 28px;">视频地址:</span><el-input v-model="videoLink" size="mini" width="260px"/>
         </div>
         <div style="display:flex;justify-content: flex-end;">
           <el-button @click="videoUploadTag = false" size="mini">取 消</el-button>
            <el-button type="primary" size="mini" @click="addVideoLink">确定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
      
   <!-- 富文本内容展示  -->
   <div class="output code">
     <code class="hljs" v-html="contentCode"></code>
    </div>
      
<!--js -->
  import dedent from 'dedent'
  import hljs from 'highlight.js'
  import debounce from 'lodash/debounce'
  import Quill from 'quill'
  import { quillEditor } from 'vue-quill-editor'
  // highlight.js style
  import 'highlight.js/styles/tomorrow.css'
  // import theme style
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import quillConfig from './quill-config.js'
  import baseUrl from '@/api/base'
  import {timeForm} from '@/lhhc/utils/date-time'

export default {
  components: {
    // 注册组件
    quillEditor
  },
  data(){
    return{
      searchEmployName:'',
      editorOption: {
        modules: {
        // 声明功能
          toolbar: [
              [{ 'size': ['small', false, 'large', 'huge'] }],
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{ 'header': 1 }, { 'header': 2 }],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              [{ 'indent': '-1' }, { 'indent': '+1' }],
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              [{ 'font': [] }],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'align': [] }],
              ['clean'],
              ['link', 'image', 'video']
          ],
          // 高亮展示
          syntax: {
            highlight: text => hljs.highlightAuto(text).value
          }
        }
      },
      // 向后端携带的参数
      datas:{}, 
      
      // 自定义视频弹出窗体
      videoUploadTag:false,
      
      // 附件参数
      acceptType:'.jpg,.jpeg,.png,.xls,.xlsx,.pdf,.ppt,.pptx,.docx,.dox,.txt,.zip,.rar,',
      
      // 后台给的图片上传地址
      action:`${baseUrl.m3}/file/uploadFileAction.do`,
      // 图片sec数组
      fileList:[],
      
      videoLink:'',
      uniqueId:'inputUpload',
      imageLoading:false,
      
      // 富文本内容
      content: dedent`
        <h1 class="ql-align-center"><span class="ql-font-serif" style="background-color: rgb(240, 102, 102); color: rgb(255, 255, 255);"> I am snow example! </span></h1><p><br></p><p><span class="ql-font-serif">W Can a man still be brave if he's afraid? That is the only time a man can be brave. </span></p><p><br></p><p><strong class="ql-font-serif ql-size-large">Courage and folly is </strong><strong class="ql-font-serif ql-size-large" style="color: rgb(230, 0, 0);">always</strong><strong class="ql-font-serif ql-size-large"> just a fine line.</strong></p><p><br></p><p><u class="ql-font-serif">There is only one God, and his name is Death. And there is only one thing we say to Death: "Not today."</u></p><p><br></p><p><em class="ql-font-serif">Fear cuts deeper than swords.</em></p><p><br></p><pre class="ql-syntax" spellcheck="false"><span class="hljs-keyword">const</span> a = <span class="hljs-number">10</span>;
        <span class="hljs-keyword">const</span> editorOption = { <span class="hljs-attr">highlight</span>: <span class="hljs-function"><span class="hljs-params">text</span> =&gt;</span> hljs.highlightAuto(text).value };</pre><p><br></p><p><span class="ql-font-serif">Every flight begins with a fall.</span></p><p><br></p><p><a href="https://surmon.me/" rel="noopener noreferrer" target="_blank" class="ql-font-serif ql-size-small" style="color: rgb(230, 0, 0);"><u>A ruler who hides behind paid executioners soon forgets what death is. </u></a></p><p><br></p><iframe class="ql-video ql-align-center" frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/QHH3iSeDBLo?showinfo=0" height="238" width="560"></iframe><p><br></p><p><span class="ql-font-serif">Hear my words, and bear witness to my vow. Night gathers, and now my watch begins. It shall not end until my death. I shall take no wife, hold no lands, father no children. I shall wear no crowns and win no glory. I shall live and die at my post. I am the sword in the darkness. I am the watcher on the walls. I am the fire that burns against the cold, the light that brings the dawn, the horn that wakes the sleepers, the shield that guards the realms of men. I pledge my life and honor to the Night’s Watch, for this night and all the nights to come.</span></p><p><br></p><p><span class="ql-font-serif">We are born to suffer, to suffer can make us strong.</span></p><p><br></p><p><span class="ql-font-serif">The things we love destroy us every time.</span></p>
      `,
    }
  },
  mounted(){
  // 参数上传图后台需要的参数
    let companyUuid = sessionStorage.getItem('companyUuid')
    let destPath = `/oa/doc/${timeForm(new Date())}/`
    this.datas = {
      destPath: destPath,
      companyUuid: companyUuid,
      resultType: 'json',
      timestamp: new Date(),
    }
    var vm =this
    
    // 声明图片自定义钩子函数
    var imgHandler = async function(state) {
      if (state) {
        document.querySelector('.el-upload').click()
      }
    }
    
    // 声明自定义视频钩子
    var videoHandler=async function(state){
      if (state) {
        console.log('videoHandler')
        vm.videoUploadTag=true
      }
    }
    // 这是关键的操作
    // 绑定到image上
    vm.$refs.myTextEditor.quill.getModule("toolbar").addHandler("image", imgHandler)
    // 绑定到video上
    vm.$refs.myTextEditor.quill.getModule("toolbar").addHandler("video", videoHandler)
    
  }，
  methods:{
    // 图片上传前钩子函数
    beforeUpload(file){
     console.log(file,'file----------------')
    },
   // 图片上传成功钩子函数
   successinfoList(response,file,fileList){
        console.log(response,'response',file,'files, fileList',fileList,)
        var vm = this
        var value = response.data[0].path
        vm.addImgRange = vm.$refs.myTextEditor.quill.getSelection()
        value = baseUrl.m3 +'/'+ value
        
         // 把结果插入到富文本编辑器中
        vm.$refs.myTextEditor.quill.insertEmbed(vm.addImgRange != null ? vm.addImgRange.index : 0, 'image', value, Quill.sources.USER)
   },
   
   // 超图上传图片处理
   handleExceed(files, fileList){
    console.log(files,'files, fileList',fileList)
  },
  
  // 添加视频
  addVideoLink(){
     var vm = this
     var value;
     // 判断视频路径中是否包含https、http，包含不做处理
     // 不包含添加https头
     if(vm.videoLink.indexOf('https')!='-1'){
        value = vm.videoLink 
     }else{
        if(vm.videoLink.indexOf('http')!='-1'){
          value = vm.videoLink 
        }else{
          value= 'https:'+  vm.videoLink
        }
     }
     
      // 判断视频路径中是否包含https、http，包含不做处理
     // 不包含添加https头
     if(vm.videoLink.indexOf('http')!='-1'){
        value = vm.videoLink 
     }else{
        if(vm.videoLink.indexOf('https')!='-1'){
          value = vm.videoLink 
        }else{
          value= 'https:'+  vm.videoLink
        }
     }
     
      vm.addImgRange = vm.$refs.myTextEditor.quill.getSelection()
      
      // 把结果插入到富文本编辑器中
      vm.$refs.myTextEditor.quill.insertEmbed(vm.addImgRange != null?vm.addImgRange.index:0, 'video', value, Quill.sources.USER)
      vm.videoUploadTag=false
      vm.videoLink=''
    },
    
    onEditorChange: debounce(function(value) {
      this.content = value.html
    }, 466),
    
    onEditorBlur(editor) {
      console.log('editor blur!', editor)
    },
    
    onEditorFocus(editor) {
      console.log('editor focus!', editor)
    },
    
    onEditorReady(editor) {
      console.log('editor ready!', editor)
    },
    
    // 保存到后台
    saveHAndle(){
      //this.content 就是你填写的内容，包含标签文本的内容，
      this.content
    },
    
   }，
 }

```

// 如果你是谷歌80+版本的视频保存成功会闪一下就没了。是因为Vue-Quill-Editor渲染视频使用的iframe,而谷歌已不再建议使用iframe。
 谷歌宣布将从7月14日发布的Chrome 84稳定版开始，重新恢复SameSite cookie策略，并且会逐步部署到Chrome 80以及以上的版本中。Chrome 80于今年2月份上线，谷歌就开始滚动推出SameSite更新，通过cookies的发送机制进行了一系列新的调整更好的维护用户隐私和安全。今年4月份鉴于全球疫情的爆发，谷歌宣布暂时中止该更新，以便在疫情大流行期间保持重要网站的正常运行。

 也就是说chrome从7月14号开始推行这个设置，但是因为所有用户不是同时更新或安装，所以先更新的人就先表现出问题来了。

从Chrome 51开始，浏览器的Cookie新增加了一个SameSite属性，用来防止CSRF攻击和用户追踪。该设置当前默认是关闭的，但在Chrome 80之后，该功能默认已开启。

CSRF攻击和用户追踪是怎么回事？看看大神阮一峰的说明：http://www.ruanyifeng.com/blog/2019/09/cookie-samesite.html




-------------------------------


* 解决方案 

```

<div class="help-body">
  <div v-loading="imageLoading" element-loading-text="请稍等，图片上传中">
  
     <quill-editor
      class="editor"
      ref="myTextEditor"
      :value="content"
      :options="editorOption"
      @change="onEditorChange"
     @blur="onEditorBlur($event)"
     @focus="onEditorFocus($event)"
     @ready="onEditorReady($event)"
     />
     
     <!--上传图片 -->
      <el-upload
        v-show="false"
        ref="upload"
        class="upload-demo"
        :action="action"
        :data="datas"
        :before-upload="beforeUpload"
        :accept="acceptType"
        :on-success="successinfoList"
         multiple
         :file-list="fileList">
       <el-button size="small" type="primary">点击上传</el-button>
        <!-- :on-exceed="handleExceed" -->
        <!-- :limit="3" -->
       <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
     </el-upload>
          
     <!--视频上传 -->
     <el-dialog
       width="350px"
       id="video_upload"
       style="margin-top: 1px"
       title="视频上传"
       :visible.sync="videoUploadTag"
       append-to-body>
     <div style="display:flex;margin-bottom: 20px;">
        <span style="width:85px;line-height: 28px;">视频地址:</span><el-input v-model="videoLink" size="mini" width="260px"/>
      </div>
     <div style="display:flex;justify-content: flex-end;">
       <el-button @click="videoUploadTag = false" size="mini">取 消</el-button>
        <el-button type="primary" size="mini" @click="addVideoLink">确定</el-button>
      </div>
     </el-dialog>
    </div>
  </div>
  
  <div class="output code">
    <!--生产环境方便查看生成的code -->
     <code class="hljs" v-html="contentCode"></code>
  </div>
<!--js -->
  import dedent from 'dedent'
  import hljs from 'highlight.js'
  import debounce from 'lodash/debounce'
  import Quill from 'quill'
  import { quillEditor } from 'vue-quill-editor'
  // highlight.js style
  import 'highlight.js/styles/tomorrow.css'
  // import theme style
  import Video from './video'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import quillConfig from './quill-config.js'
  import baseUrl from '@/api/base'
  import {timeForm} from '@/lhhc/utils/date-time'
  Quill.register(Video,true)

export default {
  // 注册组件
  components: {
    quillEditor
  },
  data(){
    return{
      searchEmployName:'',
      editorOption: {
        modules: {
        // 声明功能
          toolbar: [
              [{ 'size': ['small', false, 'large', 'huge'] }],
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{ 'header': 1 }, { 'header': 2 }],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              [{ 'indent': '-1' }, { 'indent': '+1' }],
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              [{ 'font': [] }],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'align': [] }],
              ['clean'],
              ['link', 'image', 'video']
          ],
          // 代码高亮展示
          syntax: {
            highlight: text => hljs.highlightAuto(text).value
          }
        }
      },
      
      // 向后端携带的参数
      datas:{},
      
      // 自定义视频弹出窗体
      videoUploadTag:false,
      // 附件参数
      acceptType:'.jpg,.jpeg,.png,.xls,.xlsx,.pdf,.ppt,.pptx,.docx,.dox,.txt,.zip,.rar,',
      
      // 后台给的图片上传地址
      action:`${baseUrl.m3}/file/uploadFileAction.do`,
      
      // 上图片路径数组
      fileList:[],
      
      videoLink:'',
      uniqueId:'inputUpload',
      imageLoading:false,
      
      // 富文本内容
      content: dedent`
        <h1 class="ql-align-center"><span class="ql-font-serif" style="background-color: rgb(240, 102, 102); color: rgb(255, 255, 255);"> I am snow example! </span></h1><p><br></p><p><span class="ql-font-serif">W Can a man still be brave if he's afraid? That is the only time a man can be brave. </span></p><p><br></p><p><strong class="ql-font-serif ql-size-large">Courage and folly is </strong><strong class="ql-font-serif ql-size-large" style="color: rgb(230, 0, 0);">always</strong><strong class="ql-font-serif ql-size-large"> just a fine line.</strong></p><p><br></p><p><u class="ql-font-serif">There is only one God, and his name is Death. And there is only one thing we say to Death: "Not today."</u></p><p><br></p><p><em class="ql-font-serif">Fear cuts deeper than swords.</em></p><p><br></p><pre class="ql-syntax" spellcheck="false"><span class="hljs-keyword">const</span> a = <span class="hljs-number">10</span>;
        <span class="hljs-keyword">const</span> editorOption = { <span class="hljs-attr">highlight</span>: <span class="hljs-function"><span class="hljs-params">text</span> =&gt;</span> hljs.highlightAuto(text).value };</pre><p><br></p><p><span class="ql-font-serif">Every flight begins with a fall.</span></p><p><br></p><p><a href="https://surmon.me/" rel="noopener noreferrer" target="_blank" class="ql-font-serif ql-size-small" style="color: rgb(230, 0, 0);"><u>A ruler who hides behind paid executioners soon forgets what death is. </u></a></p><p><br></p><iframe class="ql-video ql-align-center" frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/QHH3iSeDBLo?showinfo=0" height="238" width="560"></iframe><p><br></p><p><span class="ql-font-serif">Hear my words, and bear witness to my vow. Night gathers, and now my watch begins. It shall not end until my death. I shall take no wife, hold no lands, father no children. I shall wear no crowns and win no glory. I shall live and die at my post. I am the sword in the darkness. I am the watcher on the walls. I am the fire that burns against the cold, the light that brings the dawn, the horn that wakes the sleepers, the shield that guards the realms of men. I pledge my life and honor to the Night’s Watch, for this night and all the nights to come.</span></p><p><br></p><p><span class="ql-font-serif">We are born to suffer, to suffer can make us strong.</span></p><p><br></p><p><span class="ql-font-serif">The things we love destroy us every time.</span></p>
      `,
    }
  },
  mounted(){
   // 参数上传图后台需要的参数
    let companyUuid = sessionStorage.getItem('companyUuid')
    let destPath = `/oa/doc/${timeForm(new Date())}/`
    this.datas = {
      destPath: destPath,
      companyUuid: companyUuid,
      resultType: 'json',
      timestamp: new Date(),
    }
    var vm =this
    
    // 声明图片自定义钩子函数
    var imgHandler = async function(state) {
      if (state) {
        document.querySelector('.el-upload').click()
      }
    }
    
    // 声明自定义视频钩子
    var videoHandler=async function(state){
       if (state) {
        console.log('videoHandler')
        vm.videoUploadTag=true
      }else{
        vm.$refs.myTextEditor.quill.format("video",false)
      }
    }
    // 这是关键的操作
    // 绑定到image上
    vm.$refs.myTextEditor.quill.getModule("toolbar").addHandler("image", imgHandler)
    
    // 绑定到video上
    vm.$refs.myTextEditor.quill.getModule("toolbar").addHandler("video", videoHandler)
    
  }，
  methods:{
  
    // 图片上传前钩子函数
    beforeUpload(file){
     console.log(file,'file----------------')
    },
    
   // 图片上传成功钩子函数
   successinfoList(response,file,fileList){
        console.log(response,'response',file,'files, fileList',fileList,)
        var vm = this
        var value = response.data[0].path
        vm.addImgRange = vm.$refs.myTextEditor.quill.getSelection()
        value = baseUrl.m3 +'/'+ value
        
        // 把结果插入到富文本编辑器中
        vm.$refs.myTextEditor.quill.insertEmbed(vm.addImgRange != null ? vm.addImgRange.index : 0, 'image', value, Quill.sources.USER)
   },
   
   // 超过图上传数量图片处理钩子
   handleExceed(files, fileList){
    console.log(files,'files, fileList',fileList)
  },
  
  // 添加视频
  addVideoLink(){
     var vm = this
     var value;
     
      // 判断视频路径中是否包含https、http，包含不做处理
     // 不包含添加https头
     if(vm.videoLink.indexOf('https')!='-1'){
        value = vm.videoLink 
     }else{
        if(vm.videoLink.indexOf('http')!='-1'){
          value = vm.videoLink 
        }else{
          value= 'https:'+  vm.videoLink
        }
     }
     
      // 判断视频路径中是否包含https、http，包含不做处理
     // 不包含添加https头
     if(vm.videoLink.indexOf('http')!='-1'){
        value = vm.videoLink 
     }else{
        if(vm.videoLink.indexOf('https')!='-1'){
          value = vm.videoLink 
        }else{
          value= 'https:'+  vm.videoLink
        }
     }
      vm.addImgRange = vm.$refs.myTextEditor.quill.getSelection()
      
      // 把结果插入到富文本编辑器中
      vm.$refs.myTextEditor.quill.insertEmbed(vm.addImgRange != null?vm.addImgRange.index:0, 'video', value, Quill.sources.USER)
      vm.videoUploadTag=false
      vm.videoLink=''
    },
    
    onEditorChange: debounce(function(value) {
      this.content = value.html
    }, 466),
    
    // 富文本失焦钩子
    onEditorBlur(editor) {
      console.log('editor blur!', editor)
    },
    
    // 富文本获焦钩子
    onEditorFocus(editor) {
      console.log('editor focus!', editor)
    },
    
    onEditorReady(editor) {
      console.log('editor ready!', editor)
    },
    
    // 保存到后台
    saveHAndle(){
      //this.content 就是你填写的内容，包含标签文本的内容，
      this.content
    },
    
   }，
 }

```


* Video.js
* 
```
import { Quill } from "vue-quill-editor";
// 源码中是import直接倒入，这里要用Quill.import引入
const BlockEmbed = Quill.import('blots/block/embed')
const Link = Quill.import('formats/link')

const ATTRIBUTES = ['height', 'width']

class Video extends BlockEmbed {
  static create(value) {
    const node = super.create(value)
    // 添加video标签所需的属性
    node.setAttribute('controls', 'controls')
    node.setAttribute('type', 'video/mp4')
    node.setAttribute('src', this.sanitize(value))
    return node
  }

  static formats(domNode) {
    return ATTRIBUTES.reduce((formats, attribute) => {
      if (domNode.hasAttribute(attribute)) {
        formats[attribute] = domNode.getAttribute(attribute)
      }
      return formats
    }, {})
  }

  static sanitize(url) {
    return Link.sanitize(url) // eslint-disable-line import/no-named-as-default-member
  }

  static value(domNode) {
    return domNode.getAttribute('src')
  }

  format(name, value) {
    if (ATTRIBUTES.indexOf(name) > -1) {
      if (value) {
        this.domNode.setAttribute(name, value)
      } else {
        this.domNode.removeAttribute(name)
      }
    } else {
      super.format(name, value)
    }
  }

  html() {
    const { video } = this.value()
    return `<a href="${video}">${video}</a>`
  }
}
Video.blotName = 'video' // 这里不用改，楼主不用iframe，直接替换掉原来，如果需要也可以保留原来的，这里用个新的blot
Video.className = 'ql-video'
Video.tagName = 'video' // 用video标签替换iframe

export default Video

```
