<template>
    <div class="form-template">
        <el-form
            :size="size"
            :inline="inline"
            :label-width="labelWidth"
        >
            <el-form-item v-for="item in Items" :key="item.value" :label="item.label">
                <template v-if="item.type === 'input'">
                    <el-input
                        v-model="obj[item.value]"
                        clearable
                        :class="item.className"
                    >
                    </el-input>
                    <template v-if="item.slot">
                        <div :class="item.slotClassName" v-html="item.slot"></div>
                    </template>
                </template>
                <template v-else-if="item.type === 'select'">
                    <el-select v-model="obj[item.value]" :placeholder="item.place ||'请选择'" clearable>
                        <el-option
                            v-for="option in formOption[item.value]"
                            :key="option.value"
                            :label="option.label"
                            :value="option.value"
                        >
                        </el-option>
                    </el-select>
                    <template v-if="item.slot">
                        <div :class="item.slotClassName" v-html="item.slot"></div>
                    </template>
                </template>
                <template v-if="item.type === 'daterange'">
                    <el-date-picker
                        v-model="obj[item.value]"
                        type="daterange"
                        :class="item.className"
                        :start-placeholder="item.config.startPlaceholder"
                        :end-placeholder="item.config.endPlaceholder"
                        :value-format="item.config.format"
                        :picker-options="formOption[item.value]"
                    >
                    </el-date-picker>
                    <template v-if="item.slot">
                        <div :class="item.slotClassName" v-html="item.slot"></div>
                    </template>
                </template>
                <template v-if="item.type === 'Cascader'">
                    <Cascader
                        v-model="obj[item.value]"
                        filterable
                        :class="item.className"
                        clearable
                        :options="formOption[item.value]"
                        :props="item.config.props"
                    >
                    </Cascader>
                    <template v-if="item.slot">
                        <div :class="item.slotClassName" v-html="item.slot"></div>
                    </template>
                </template>
            </el-form-item>
            <slot name="item"></slot>
            <slot name="operate"></slot>
        </el-form>
    </div>
</template>
<script>
    import Cascader from '@/components/cascader/Cascader.vue';

    export default {
        components: {
            Cascader
        },
        props: {
            size: {
                type: String,
                default: 'small',
                required: true
            },
            labelWidth: {
                type: String,
                default: '115px',
                required: true
            },
            inline: {
                type: Boolean,
                default: false,
                required: true
            },
            obj: {
                type: Object,
                required: true,
            },
            configs: {
                type: Object,
                required: true
            },
        },
        computed: {
            formOption() {
                return this.configs.option;
            },
            Items() {
                return this.configs.items;
            },
        },
    };
</script>