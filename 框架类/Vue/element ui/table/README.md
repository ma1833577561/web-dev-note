## use

* xxx.vue
```vue
<template>
<table-component 
    :list="list" 
    :page-conf="pageConf" 
    :cur-thead="tableConfig" 
    @selectCurrent="onSelectCurrent"
>
    <template slot="multiple">
        <el-table-column
            type="selection"
            width="55"
        >
        </el-table-column>
        // other code
    </template>
</table-component>
</template>
<script>
  import tableComponent from '@/components/table';
  import { PLAN_CONFIG } from './file/file.js';
  
  export default {
    components: {
        tableComponent
    },
    data() {
        return {
            list: [],
            pageConf: {
                total: 0,
                pageSize: 10,
                pageNo: 1,
                pageSizes: [10, 20, 50, 100, 150]
            },
            currentList: []
        };
    },
    computed: {
        tableConfig() {
            return PLAN_CONFIG;
        },
    },
    methods: {
          onSelectCurrent(list) {
              this.currentList = list;
          },
    }
  }

</script>
```