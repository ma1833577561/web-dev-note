<style scoped>
    .label {
        width: 90px;
        text-align: right;
        display: inline-block;
        margin-bottom: 15px;
    }
    .form-item { width: 500px; }
    .form-item-value { padding-left: 15px; }
    .goods {
        font-size: 12px;
        margin-left: 20px;
        padding-top: 18px;
        border-top: 1px solid #eee;
        border-bottom: 1px solid #eee;
        margin-bottom: 22px;
    }
    .good-item { margin-bottom: 15px; font-size: 14px; }
    .good-item .name {
        width: 80px;
        display: inline-block;
        text-align: right;
    }
</style>
<template>
    <el-dialog
        :title="title"
        :visible.sync="params.show"
        append-to-body
        custom-class="order-dialog"
        :width="dialogWidth"
    >
        <div style="max-height: 60vh; overflow: scroll;">
            <el-form ref="form" :model="form" :label-width="formWidth" size="small" :rules="rules">
                <el-form-item v-if="hasFormItem('dealId')" label="ID">
                    {{ form.dealId }}
                </el-form-item>
                <el-form-item v-if="hasFormItem('name')" label="姓名" :rules="rules.goodsId" prop="name">
                    <el-input v-model.trim="form.name" class="form-item"></el-input>
                </el-form-item>
                <el-form-item v-if="hasFormItem('age')" label="年龄">
                    <el-input-number
                        v-model="form.age"
                        :precision="0"
                        :max="100"
                        class="form-item"
                        :min="0"
                    ></el-input-number>
                </el-form-item>
                <el-form-item v-if="hasFormItem('tel')" label="电话">
                    <el-input v-model.trim="form.tel" class="form-item"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="hide">
                取 消
            </el-button>
            <el-button type="primary" @click="confirm">
                确 定
            </el-button>
        </div>
    </el-dialog>
</template>
<script type="text/javascript">
    import API from '@/services/index';

    export default {
        name: 'AddDialog',
        props: { params: Object },
        data() {
            return {
                form: { dealId: '', name: '', age: 0, tel: '' }
            };
        },
        computed: {
            dialogWidth() {
                const { width } = this.params;
                return width || '700px';
            },
            mode() {
                return this.params.mode;
            },
            disabledProps() {
                return this.params.disabledProps;
            },
            status() {
                return this.params.status;
            },
            title() {
                const { mode } = this;
                const itemTitle = { edit: '编辑订单' };
                return itemTitle[mode] || '新建订单';
            },
            formWidth() {
                const { mode } = this;
                const labelWidthListMap = { edit: '140px' };
                return labelWidthListMap[mode] || '110px';
            },
            rules() {
                const rules = {
                    name: [{ required: true, message: '请填写姓名', trigger: ['blur'] }],
                    age: [{ required: true, message: '请填写年龄', trigger: ['blur', 'change'] }],
                    tel: [{ required: true, message: '请填写手机号', trigger: ['blur'] }]
                };
                return rules;
            },
        },
        async mounted() {
            if (this.params.dealId) {
                await this.getDetail();
            }
        },
        methods: {
            async getDetail() {
                const { dealId } = this.params;
                const { data } = await API.order.getDetail({ dealId });
                this.form = data;
            },
            hide() {
                this.params.show = false;
            },
            confirm() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.params.callback(this.form);
                    }
                });
            },
            hasFormItem(prop) {
                const { mode } = this;
                const itemListMap = {
                    create: ['name', 'age', 'tel'],
                    edit: ['dealId', 'name', 'age', 'tel'],
                };
                const whiteList = itemListMap[mode] || [];
                return whiteList.includes(prop);
            },
            isDisabledProp(prop) {
                return this.disabledProps && this.disabledProps.includes(prop);
            }
        }
    };
</script>