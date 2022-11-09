## use



* xxx.vue
    
    * support template ：input、select(单选)、rangePicker

    * To be expanded Customize content

* template    
```tsx
import { Form } from 'antd'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'umi'
import moment from 'moment'
import SearchTemplate from '@/component/form'
import stl from './index.less'


interface ItemProps {
  label: string;
  name: string;
  type?: 'rangePicker' | 'select' | any;
  config: object|any;
}

const Page: React.FC = () => {
  const [searchInfo, setSearchInfo] = useState<any>({})
  const [pageNo, setPageNo] = useState(1)
  const [loading, setLoading] = useState(false)
  const [pageSize, setPageSize] = useState(20)
  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    const { createTime } = values
    const params = {
      ...values,
      startTime: values.createTime
        ? `${moment(createTime[0]).format('YYYY-MM-DD')} 00:00:01`
        : '',
      endTime: values.createTime
        ? `${moment(createTime[1]).format('YYYY-MM-DD')} 23:59:59`
        : '',
    }
    delete params.createTime
    setSearchInfo(params)
  }

  const getList () => {
    // getList
  }

  const FormList: ItemProps[] = [
    { label:'创建时间：', name:'createTime', type: 'rangePicker', config: { dateFormat: 'YYYY-MM-DD' }, },
    { label:'店铺ID：', name:'shopId', config: { placeholder:'请输入店铺ID' }, },
    { label:'店铺名称：', name:'shopName', config: { placeholder:'请输入店铺名称' }, },
    { label:'类目级别：', name:'categoryEffectLevel', type: 'select', config: { placeholder:'请选择类目级别', options: [{value:1,label:'一级类目'},{value:2,label:'二级类目'},] }, },
    { label:'类目名称：', name:'categoryName', config: { placeholder:'请输入类目名称' }, },
    { label:'类目ID：', name:'category', config: { placeholder:'请输入类目ID' }, },
    { label:'套餐名称：', name:'name', config: { placeholder:'请输入套餐名称' }, },
    { label:'套餐状态：', name:'packageStatusEnum', type: 'select', 
    config: { placeholder:'请选择套餐状态', options: [{value:0,label:'未上线'},{value:1,label:'生效中'},{value:2,label:'已下线'},{value:3,label:'已删除'}]  }, },
  ]

  useEffect(() => {
    getList()
  }, [pageSize, pageNo, searchInfo])

  const formConfig = {
    form: form ,
    layout: 'inline',
    size: 'middle',
  }
  return (
    <div className={stl.partnerWapper}>
      <SearchTemplate formConfig={ formConfig } loading={ loading } onFinish={ onFinish } FormList={ FormList } />
    </div>
  )
}

export default Page


```