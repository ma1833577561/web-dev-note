<template>
    <el-dialog title="修改" :visible.sync="params.show" width="535px" @close="onClose">
        <el-form ref="form" label-width="140px"
            :model="form" class="good-form"
            size="small" hide-required-asterisk
        >
            <el-form-item label="姓名:" prop="name"
                :rules="[ { require:true,message:'姓名不能为空', trigger:'blur' }]"
            >
                <el-input v-model="form.name" class="form-item" />
            </el-form-item>
            <el-form-item label="年龄:" prop="age"
                :rules="[ { require:true,message:'年龄不能为空', trigger:'blur' } ]"
            >
                <el-input v-model="form.age" class="form-item" />
            </el-form-item>
        </el-form>
        <template slot="footer">
            <el-button @click="onClose"> 取消 </el-button>
            <el-button type="primary" @click="onConfirm"> 确 定 </el-button>
        </template>
    </el-dialog>
</template>
<script>
    import API from '@/services/index';

    export default {
        props: {
            params: Object
        },
        data() {
            return {
                form: {
                    name: '',
                    age: ''
                },
                ruleMax: {}
            };
        },
        computed: {
            currentRow() {
                return this.params.currentRow;
            }
        },
        mounted() {
            if (this.params.editId) {
                this.getDetail();
            }
        },
        methods: {
            async getDetail() {
                const { data } = await API.getDetail();
                this.form = data;
            },
            async onConfirm() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.params.callback(this.form);
                    }
                });
            },
            onClose() {
                this.params.show = false;
            }
        }
    };
</script>
<style lang="scss" scoped>
    .form-item {
        width: 145px;
    }
</style>