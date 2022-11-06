<template>
    <el-dialog
        :title="dialogTitle"
        :visible.sync="visible"
        width="500px"
        append-to-body
    >
        <el-upload
            ref="upload"
            :action="upload_url"
            accept=".xlsx, .xls"
            :on-success="uploadSuccess"
            :headers="headers"
            :data="uploadData"
            :before-upload="beforeUpload"
            :show-file-list="false"
        >
            <el-button size="small" type="primary" :disabled="loadding">
                {{ loadding ? '上传中...' : '点击上传' }}
            </el-button>
            <div slot="tip" class="el-upload__tip">
                <div style="margin-top: 20px; font-size: 12px; color: #999;">
                    可<a href=" " target="_blank">下载Excel模版<i class="el-icon-upload el-icon--right">
                    </i></a >，按照模版的格式上传{{ config.label }}
                </div>
            </div>
        </el-upload>
        <p v-if="config.isShop" class="tip">
            注：必须在允许的范畴下，配置的才可生效功能
        </p >
        <template slot="footer">
            <el-button @click="visible = false">
                取 消
            </el-button>
            <el-button type="primary" @click="onConfirm">
                确 定
            </el-button>
        </template>
    </el-dialog>
</template>
<script>
    import Cookie from '@/utils/cookie';

    export default {
        props: {
            config: Object,
        },
        data() {
            return {
                visible: false,
                loadding: false,
                upload_url: '/web/list/upload',
                headers: { 'UC-CSRF-TOKEN': Cookie.get('UC-CSRF-TOKEN') }
            };
        },
        computed: {
            accept() {
                return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
            },
            maxSize() {
                return 1024 * 1024 * 50;
            },
            maxSizeStr() {
                return '50MB';
            },
            dialogTitle() {
                return `批量添加${!this.config.isShop ? '商品类目' : '店铺竞价功能'}`;
            },
            uploadData() {
                return {
                    type: this.config.type,
                };
            }
        },
        methods: {
            show() {
                this.visible = true;
            },
            beforeUpload(file) {
                const isLt = file.size < this.maxSize;
                const isAcceptType = this.accept.includes(file.type);
                if (!isLt) {
                    const { maxSizeStr } = this;
                    this.$message.error(`添加文件大小最大${maxSizeStr}，请调整好重试。`);
                    return false;
                }
                if (!isAcceptType) {
                    this.$message.error('批量上传excel格式不对，请调整后重试。');
                    return false;
                }

                this.headers['UC-CSRF-TOKEN'] = Cookie.get('UC-CSRF-TOKEN');
                this.loadding = true;
                return isLt && isAcceptType;
            },
            uploadSuccess(res) {
                this.loadding = false;
                if (res.status === 0) {
                    this.$message.success(`${this.config.label}添加成功。`);
                    this.$refs.upload.clearFiles();
                    this.onConfirm();
                } else {
                    this.$message({
                        message: res.message,
                        type: 'error',
                        showClose: true,
                        duration: '0',
                        customClass: 'message-style'
                    });
                }
            },
            async onConfirm() {
                this.$emit('confirm');
                this.visible = false;
            },
        }
    };
</script>

<style lang="scss" scoped>
    .good-form {
        padding-top: 30px;
        box-sizing: border-box;

        ::v-deep &-item {
            width: 280px;
        }
    }

    .tip {
        color: #e56d50;
        font-size: 12px;
        line-height: 20px;
    }

</style>
<style>
    .el-message.message-style {
        width: 45%;
    }

    .el-message.message-style .el-message__content {
        line-height: 1.25;
        padding: 0 15px;
        word-break: break-word;
        max-height: 60vh;
        overflow: auto;
    }
</style>