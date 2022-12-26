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
            // 自定义内容
            otherContent() {
                return this.configs.otherContent;
            },
            // 操作内容
            operateContent() {
                return this.configs.operateContent;
            }
        },
        methods: {
            renderInput(item) {
                const { obj } = this;
                return (
                    <el-input
                        v-model={obj[item.value]}
                        clearable
                        class={item.className}
                    >
                    </el-input>
                );
            },
            renderSelect(item) {
                const { formOption, obj } = this;

                return (
                    <el-select
                        v-model={obj[item.value]}
                        placeholder={item.place || '请选择'}
                        clearable
                    >
                      {
                        formOption[item.value] && formOption[item.value]
                        .map(option => <el-option key={option.value} label={option.label} value={option.value}> </el-option>)
                      }
                    </el-select>
                );
            },
            renderSelects(item) {
                const { formOption, obj } = this;

                return (
                    <el-select
                        v-model={obj[item.value]}
                        placeholder={item.place || '请选择'}
                        multiple
                        collapse-tags
                        clearable
                    >
                      {
                        formOption[item.value] && formOption[item.value]
                        .map(option => <el-option key={option.value} label={option.label} value={option.value}> </el-option>)
                      }
                    </el-select>
                );
            },
            renderDaterange(item) {
                const { formOption, obj } = this;
                return (
                    <el-date-picker
                        v-model={obj[item.value]}
                        type="daterange"
                        class={item.className}
                        start-placeholder={item.config.startPlaceholder}
                        end-placeholder={item.config.endPlaceholder}
                        value-format={item.config.format}
                        picker-options={formOption[item.value]}
                    >
                    </el-date-picker>
                );
            },
            renderDatetimerange(item) {
                const { formOption, obj } = this;
                return (
                    <el-date-picker
                        v-model={obj[item.value]}
                        type="datetimerange"
                        class={item.className}
                        start-placeholder={item.config.startPlaceholder}
                        end-placeholder={item.config.endPlaceholder}
                        value-format={item.config.format}
                        picker-options={formOption[item.value]}
                    >
                    </el-date-picker>
                );
            },
            renderCascader(item) {
                const { formOption, obj } = this;
                return (
                    <Cascader
                        v-model={obj[item.value]}
                        filterable
                        class={item.className}
                        clearable
                        options={formOption[item.value]}
                        props={item.config.props}
                    >
                    </Cascader>
                );
            },
            renderContent(item) {
                const { type } = item;
                const {
                    renderInput,
                    renderSelect,
                    renderSelects,
                    renderDaterange,
                    renderDatetimerange,
                    renderCascader
                } = this;
                switch (type) {
                    case 'input':
                        return renderInput(item);
                    case 'select':
                        return renderSelect(item);
                    case 'selects':
                        return renderSelects(item);
                    case 'daterange':
                        return renderDaterange(item);
                    case 'datetimerange':
                        return renderDatetimerange(item);
                    case 'Cascader':
                        return renderCascader(item);
                    default:
                        return null;
                }
            },
            renderItem(item) {
                const { value, label } = item;
                return (
                  <el-form-item
                    key={value}
                    label={label}
                  >
                    { this.renderContent(item) }
                    { item.slot && <div class={item.slotClassName}>{ item.slot }</div> }
                  </el-form-item>
                );
            }
        },
        render() {
            const {
                Items,
                renderItem,
                otherContent,
                operateContent,
                size,
                inline,
                labelWidth
            } = this;
            return (
              <div class="form-template">
                <el-form
                  size={size}
                  inline={inline}
                  label-width={labelWidth}
                >
                  { Items && Items.map(item => renderItem(item)) }
                  { otherContent && otherContent }
                  { operateContent && operateContent }
                </el-form>
              </div>
            );
        }
    };
</script>