<template>
    <el-dialog
        title="重命名"
        :visible.sync="visible"
        width="400px"
        append-to-body
    >
        <el-form ref="form" :model="form" hide-required-asterisk>
            <el-form-item
                label="请输入新名称"
                prop="name"
                :rules="[
                    { required: true, message: '请输入新名称', trigger: 'blur' },
                    { max: 38, message: '名称最多可输入38个字符', trigger: 'blur' }
                ]"
            >
                <el-input v-model="form.name" maxlength="38" show-word-limit />
            </el-form-item>
        </el-form>
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
    import API from '@/services';

    export default {
        data() {
            return {
                visible: false,
                form: {
                    id: '',
                    name: ''
                }
            };
        },
        methods: {
            show(id) {
                this.form.id = id;
                this.visible = true;
            },
            async onConfirm() {
                await this.$refs.form.validate();
                await API.goods.copy(this.form);
                this.$message.success('复制商品成功');
                this.$emit('confirm');
                this.visible = false;
            }
        }
    };
</script>