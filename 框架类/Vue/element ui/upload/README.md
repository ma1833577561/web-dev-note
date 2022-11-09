# upload上传组件


* use

```vue

<template>
    <div class="goods">
        <el-button size="small" type="primary" @click="onBatchAdd"> 批量操作 </el-button>
        <UploadFileDialog ref="uploadGoodRef" :config="config" @confirm="onConfirmDialog" />
    </div>
</template>
<script>
    import UploadFileDialog from '@/components/UploadFileDialog';

    export default {
        components: {
            UploadFileDialog,
        },
        data() {
            return {
                list: [],
            };
        },
        created() {
            this.getList();
        },
        methods: {
            async getList() {
              // code
            },
            onBatchAdd() {
                this.$refs.uploadGoodRef.show();
            },
            onConfirmDialog() {
                this.getList();
            },
        }
    };
</script>
<style lang="scss" scoped>
    .goods {
        margin: 20px 0;
    }
</style>

```