## use

* xxx.vue
```vue
<template>
<div>
<el-buttton @click="open">上传</el-button>
 <uploadComponent :config="uploadParams" ref="upload"> </uploadComponent>
</div>
</template>
<script>
  import uploadComponent from '@/components/upload';
  
  export default {
    components: {
        uploadComponent
    },
    computed: {
        uploadParams() {
            const params = { url: 'www.baidu.com', type: 'png,jpg', isShop:true}
            return params;
        },
    },
    methods: {
          open(){
            this.$refs.upload.show()
          }
    }
  }

</script>
```