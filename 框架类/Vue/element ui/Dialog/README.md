

## use

 
* index`xxx.vue`    
```vue
<template>
    <el-button size="small" type="primary" @click="onEdit">
        编辑
    </el-button>
    <dialog-component v-if="dialogParams.show" :params="dialogParams" />
</template>
<script>
    // dialog/index.vue
  import dialogComponent from '@/components/dialog';
  export default {
    components: {
        dialogComponent
    },
    data() {
        return {
            dialogParams: {
                show: false,
                form: {}
            },
        };
    },
    methods: {
        onEdit() {
            this.dialogParams = {
                show: true,
                callback: async (params) => {
                    await API.edit(params);
                    this.$message.success('修改成功');
                    this.dialogParams.show = false;
                    this.getList();
                }
            };
        },
    }
  }

</script>
```

* 2、template2`xxx.vue`    
```vue
<template>
    <el-button size="small" type="primary" @click="show">
        复制
    </el-button>
    <dialog-component ref="copy" @confirm="onConfirm" />
</template>
<script>
    // dialog/template2.vue
  import dialogComponent from '@/components/dialog';
  export default {
    components: {
        dialogComponent
    },
    methods: {
        show(id) {
            this.$refs.copy.show(id);
        },
        onConfirm() {
            this.getList();
        }
    }
  }

</script>
```

* 3、template3`xxx.vue`    
```vue
<template>
    <el-button size="small" type="primary" @click="onEdit(row)">
        编辑
    </el-button>
    <dialog-component v-if="dialogParams.show" :params="dialogParams" />
</template>
<script>
    // dialog/template3.vue
  import dialogComponent from '@/components/dialog';
  export default {
    components: {
        dialogComponent
    },
    data() {
        return {
            dialogParams: {
                show: false,
                form: {}
            },
        };
    },
    methods: {
        async onEdit(item) {
            this.dialogParams = {
                show: true,
                mode: 'create',
                dealId: item.dealId,
                callback: async (params) => {
                    const { dealId } = item;
                    await API.order.update({...params, dealId});
                    this.$message.success('修改成功');
                    this.dialogParams.show = false;
                    this.getList();
                }
            };
        },
    }
  }

</script>
```

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
