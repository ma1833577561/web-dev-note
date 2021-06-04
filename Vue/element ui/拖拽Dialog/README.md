
### 实现在vue中element-ui的el-dialog弹框拖拽



* 1、在 utils 中新建 directives.js 文件

* 2、main.js中导入：import '@/utils/directives.js'


* 3、使用 el-dialog 的地方加入 v-dialogDrag

```
<el-dialog
   :visible.sync="dialogVisible"
    v-dialogDrag>
    // ...
</el-dialog>
```
