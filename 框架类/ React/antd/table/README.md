## use



* xxx.vue
    
    * support template ：input、select(单选)、rangePicker

    * To be expanded Customize content

* template    
```tsx
import { Space, Button, Popover, Row, Col, message, Modal, Form } from 'antd'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'umi'
import TableTemplate from '@/component/table'
import { STATE_ENUM, BASE_UNIT } from './modules/partner'

import { getPackageList, getPackageStatus } from '@/services'
import stl from './index.less'

const Page: React.FC = () => {
  const navigate = useNavigate()
  const [dataSource, setDataSource] = useState([])
  const [searchInfo, setSearchInfo] = useState<any>({})
  const [total, setTotal] = useState(100)
  const [pageNo, setPageNo] = useState(1)
  const [loading, setLoading] = useState(false)
  const [pageSize, setPageSize] = useState(20)

  const onCreate = () => {
    navigate('/manage/partner/add')
  }

  const getList = async () => {
    if((searchInfo.categoryName && !searchInfo.categoryEffectLevel) || (searchInfo.category&& !searchInfo.categoryEffectLevel)){
      message.error('请先选择类目级别')
      return false
    }
    setLoading(true)
    const params = {
      pageNo,
      pageSize,
      ...searchInfo,
    }
    try {
      const result = await getPackageList(params)
      const {
        data: { list, totalCount },
      } = result
      setDataSource(list)
      setTotal(totalCount)
    } catch (error) {
      setDataSource([])
      setTotal(0)
    }
    setLoading(false)
  }

  const changePage = (page: number, pageSize: number) => {
    setPageNo(page)
    setPageSize(pageSize)
  }

  const onDel = async (record: any, index: number) => {
    const params = {
      id: record.id,
      status: 3,
    }
    await getPackageStatus(params)
    message.success('删除成功!')
    getList()
  }

  const onCopy = async (record: any, index: number) => {
    setCurrentRow(record)
    getList()
  }

  const columns = [
    {
      title: '活动id',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      align: 'center',
    },
    {
      title: '创建人',
      dataIndex: 'createUserName',
      width: 160,
      ellipsis: true, // 文本过长展示...
      showOverflowTooltip: true, // 溢出部分hover展示
      key: 'createUserName',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: 100,
      ellipsis: true, // 文本过长展示...
      showOverflowTooltip: true, // 溢出部分hover展示
      key: 'createTime',
    },
    {
      title: '套餐状态',
      dataIndex: 'state',
      key: 'state',
      width: 100,
      render: (text: any, record: any) => {
        const state: any = {
          0: '未上线',
          1: '生效中',
          2: '已下线',
          3: '已删除',
        }
        return state[record.state]
      },
    },
    {
      title: '套餐生效时间',
      dataIndex: 'effectTime',
      ellipsis: true,
      width: 100, // 文本过长展示...
      showOverflowTooltip: true, // 溢出部分hover展示
      key: 'effectTime',
    },
    {
      title: '操作',
      key: 'action',
      width: 260,
      align: 'center',
      render: (text: any, record: any, index: number) => {
        const hasDel = record.state === STATE_ENUM.OFF_LINE

        return (
          <Space size="small">
            {hasDel && (
              <Button type="link" onClick={() => onDel(record, index)}>
                删除
              </Button>
            )}
            <Button type="link" onClick={() => onCopy(record, index)}>
              复制
            </Button>
          </Space>
        )
      },
    },
  ]

  const menuArea = (
    <Space className={stl.menu}>
      <div>
        <Button
          type="primary"
          loading={loading}
          className={stl.createBtn}
          onClick={onCreate}
        >
          新建流量套餐
        </Button>
      </div>
      <div></div>
    </Space>
  )

  useEffect(() => {
    getList()
  }, [pageSize, pageNo])

  const tableConfig = {
    tableLayout: 'fixed',
    rowKey: 'id',
    list: dataSource,
    columns: columns,
    loading: loading,
    pagination: false,
    style: { height:'75%', overflowY: 'scroll'},
  }

  const pageConfig = {
    pagination: false,
    pageNo,
    pageSize,
    changePage,
    total,
  }

  return (
    <div className={stl.partnerWapper}>
      <TableTemplate
        menuArea={menuArea}
        tableConfig={tableConfig}
        pageConfig={pageConfig}
      />
    </div>
  )
}

export default Page




```