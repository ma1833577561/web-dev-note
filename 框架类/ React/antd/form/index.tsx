import { Form, Input, DatePicker, Button, Select } from 'antd'
import React from 'react'


import type { FormInstance } from 'antd/lib/form/hooks/useForm'

import Card from '../card'

import stl from './index.less'


interface ItemProps {
  label: string;
  name: string;
  type?: 'rangePicker' | 'select' | any;
  config: object|any;
}

interface FormProps {
  form: any;
  layout: 'horizontal' | 'vertical' | 'inline' | any;
  size: 'middle' | 'middle' | 'large' | any;
}

interface Props {
  onFinish: (values: any) => void;
  loading: boolean;
  formConfig: FormProps;
  FormList: ItemProps[];
}


const Page: React.FC<Props> = (props) => {
  const { loading, formConfig, onFinish, FormList } = props
  const { RangePicker } = DatePicker
  const { Option } = Select

  const renderType = (item: ItemProps) => {
    if(item.type === 'rangePicker') {return <RangePicker format={item.config.format || 'YYYY-MM-DD' } className={stl.wInput} />}
    if(item.type === 'select') {return  <Select placeholder={item.config.placeholder} className={stl.wInput}>
    {
      item.config.options && item.config.options.map((opEl:any)=><Option key={opEl.label} value={opEl.value}>{opEl.label}</Option>)
    }
  </Select>}
    return <Input placeholder={item.config.placeholder} className={stl.wInput} />
  }
  
  return (
    <Card>
      <Form { ...formConfig } onFinish={onFinish}>
        {
          FormList.map((item: ItemProps) => 
          <Form.Item label={ item.label } key={ item.name } name={ item.name } className={stl.Item}  >
            { renderType( item )}
          </Form.Item>)
        }
        <Form.Item>
          <Button htmlType="submit" type="primary" loading={loading} className={stl.search}>查询</Button>
        </Form.Item> 
      </Form>
    </Card>
  )
}

export default Page