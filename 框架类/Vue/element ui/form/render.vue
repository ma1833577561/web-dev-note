<script>

    export default {

        name: 'FormItemDemo',

        props: {
            obj: {

                type: Object,

                require: true

            },

            formConfig: Object // 接收配置，外部传入

        },

        data() {

            return {

                size: 'small',

                labelWidth: '115px',

                inline: true,

                items1: [

                    { label: '主播id：', value: 'authorId', className: 'w-input', type: 'el-input' },

                    { label: '主播名称：', value: 'fuzzyAuthorName', className: 'w-input', type: 'el-input' },

                    { label: '计划id：', value: 'campaignId', className: 'w-input', type: 'el-input' },

                    { label: '计划类型：', value: 'fuzzyCampaignTypeName', className: 'w-input', type: 'el-input' },

                    { label: '最近更新状态：', value: 'campaignFilter', className: 'w-input', place: '请选择', type: 'el-select' },

                ],

                option1: {

                    campaignFilter: [

                        { value: 0, label: '成功' },

                        { value: 1, label: '失败' }

                    ]

                },

                obj1: {

                    authorId: '',

                    fuzzyAuthorName: '',

                    campaignId: '',

                    fuzzyCampaignTypeName: '',

                    campaignFilter: '',

                },

            };

        },

        computed: {

            items() {

                return this.formConfig.items || [];

            },

            option() {

                return this.formConfig.option || {};

            }

        },

        render(createElement) {

            return createElement('el-form',

                                 { props: { size: this.size, model: this.obj, labelWidth: this.labelWidth, inline: this.inline } },

                                 [...this.items && this.items.map(item => {

                                     return createElement('el-form-item', { props: { label: item.label, prop: item.value } }, [

                                         createElement(item.type, {

                                             props: { value: this.obj[item.value], class: item.className, placeholder: item.place },

                                             on: {

                                                 change: (nVal) => { // 这里是自己实现一个 v-model

                                                     this.obj[item.value] = nVal;

                                                     //  this.obj[item.value] = JSON.parse(JSON.stringify(nVal));

                                                     //  obj = {} 需要强制刷新

                                                     //  this.$forceUpdate();

                                                 },

                                                 input: (nVal) => {

                                                     this.obj[item.value] = nVal;

                                                 }

                                             }

                                         }, this.option[item.value] && this.option[item.value].map(option => {

                                             return createElement('el-option', { props: { label: option.label, value: option.value } });

                                         }))

                                     ]);

                                 }), createElement('el-form-item', {}, [

                                     createElement('el-button', {

                                         props: { size: 'small', type: 'primary', style: { marginLeft: '15px' } },

                                         on: {

                                             click: () => {

                                                 this.$emit('onSearch');

                                             }

                                         }

                                     }, ['查询'])

                                 ])]);

        },

            };

</script>