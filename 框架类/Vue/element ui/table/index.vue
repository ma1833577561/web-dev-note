<template>
    <div>
        <el-table
            ref="multipleTable"
            :data="list"
            style="width: 100%;"
            size="small"
            stripe
            @selection-change="handleSelectionChange"
        >
            <slot name="multiple"></slot>
            <el-table-column
                v-for="th in curThead"
                :key="th.key"
                :label="th.name"
                :prop="th.key"
                :width="th.width"
                :min-width="th.minWidth"
                :render-header="th.renderHeader"
                :fixed="th.fixed"
                :formatter="th.formatter"
                :show-overflow-tooltip="th.tooltip"
            />
            <slot name="column"></slot>
        </el-table>
        <div class="page">
            <el-pagination
                v-if="!closePage"
                :current-page="pageConf.pageNo"
                :page-sizes="pageConf.pageSizes"
                :page-size="pageConf.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pageConf.total"
                @size-change="onSizeChange"
                @current-change="onCurrentChange"
            >
            </el-pagination>
            <slot v-else name="page"></slot>
        </div>
    </div>
</template>

<script type="text/javascript">

    export default {
        components: {},
        props: {
            total: Number || String,
            list: Array,
            curThead: Array,
            pageConf: {
                type: Object,
                default: () => ({ pageSize: 20, total: 0, pageNo: 1, pageSizes: [10, 20, 50, 100, 150] })
            },
            closePage: {
                type: Boolean,
                default: false
            },
        },
        data() {
            return {
                dealIds: [],
            };
        },
        methods: {
            handleSelectionChange(val) {
                this.$emit('selectCurrent', val);
                this.dealIds = val.map(item => item.dealId);
            },
            // 页面改变
            onCurrentChange(pageNo) {
                this.$parent.$parent.pageConf = {
                    ...this.pageConf,
                    pageNo,
                };
                this.$parent.$parent.getList();
            },
            // 显示多少页改变
            onSizeChange(size) {
                this.$parent.$parent.pageConf = {
                    ...this.pageConf,
                    pageSize: size,
                    pageNo: 1,
                };
                this.$parent.$parent.getList();
            },
        }
    };
</script>


<style scoped lang="scss">
    .fr {
        float: right;
        margin-bottom: 10px;
    }

    .custom-th {
        position: absolute;
        top: 5px;
        right: 0;
        color: #999;
    }

    .page {
        margin-top: 10px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }
</style>