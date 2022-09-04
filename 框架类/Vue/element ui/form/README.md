## use



* xxx.vue
    
    * support template ：input、select(单选)、daterange、Cascader

* template    
```vue
<template>
    <formComponent
        :obj="form"
        :size="'small'"
        :label-width="'115px'"
        :inline="true"
        :configs="formConfig"
    >
        <template slot="operate">
            <el-form-item>
      
      <el-button style="margin-left: 15px;" size="small" type="primary" @click="onSearch">
                    查询
                </el-button>
            </el-form-item>
        </template>
    </formComponent>
</template>
<script>
  import formComponent from '@/components/form';
  import { FROM_CONFIG } from './file/file.js';
  
  export default {
    components: {
        formComponent
    },
    data() {
        return {
            form: {
                [key1]: '',
                [key2]: '',
                [key3]: '',
                [key4]: '',
            },
        };
    },
    computed: {
        formConfig() {
            return FROM_CONFIG;
        },
    },
    methods: {
        onSearch() {
            this.pageNo = 1;
            // this.pageConf.pageNo = 1;
            this.getList();
        },
    }
  }

</script>
```


* render

```vue
<template>
    <FormRender :form-config="formConfig" :obj="form" @onSearch="onSearch" />
</template>
<script>
import FormRender from '@/components/form/render.vue';
export default {
    components:{
        FormRender
    },
    data(){
        return {
            form: {
                [key1]: '',
                [key2]: '',
                [key3]: '',
                [key4]: '',
            },
        }
    },
    computed: {
        formConfig() {
            return FROM_CONFIG;
        },
    },
    methods: {
        onSearch() {
            this.pageNo = 1;
            // this.pageConf.pageNo = 1;
            this.getList();
        },
    }
}
</script>

```