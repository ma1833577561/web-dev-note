import { Table, Pagination } from 'antd'
import Card from '../card'
import React, { useState, useEffect } from 'react'
import type { TableRowSelection } from 'antd/lib/table/interface'

import stl from './index.less'

interface Column {
  title: string;
  dataIndex: string;
  key: string;
  align: string;
  render?: undefined;
  width?: undefined;
}

interface PageProps {
  total?: number;
  pageNo?: number;
  current?: number;
  pageSize?: number;
  defaultPageSize?: number;
  changePage?: (page: number, pageSize: number) => void;
  onChange?: (page: number, pageSize: number) => void;
  showTotal?: ((total: number, range: [number, number]) => React.ReactNode) | undefined;
  showSizeChanger?: boolean | undefined;
  showQuickJumper?: boolean | undefined;

}

interface TableProps {
  tableLayout?: 'fixed' | any;
  rowSelection?: TableRowSelection<any[]> | undefined;
  rowKey?: any;
  dataSource?: any[];
  list?: any[];
  columns?: any[];
  loading?: boolean;
  style?: React.CSSProperties | any ;
}

interface Props {
  menuArea: JSX.Element|any;
  rowSelection?:TableRowSelection<any>;
  pageConfig: PageProps;
  tableConfig: TableProps;
}



const Page: React.FC<Props> = (props) => {
  const {menuArea, rowSelection, pageConfig, tableConfig } = props

  const pageParams: PageProps = {
    current: pageConfig?.pageNo || 1,
    defaultPageSize: pageConfig?.pageSize || 20,
    onChange: pageConfig?.changePage,
    showTotal: (total: number) => `共 ${pageConfig?.total||0} 条`,
    showSizeChanger: true,
    showQuickJumper: true,
    total:pageConfig?.total,
  }

  const tableParams: TableProps = {
    tableLayout: tableConfig?.tableLayout || 'fixed',
    rowSelection,
    rowKey: (item:any) => item[tableConfig?.rowKey],
    dataSource: tableConfig?.list,
    columns: tableConfig?.columns,
    loading: tableConfig?.loading,
    style: tableConfig?.style,
  }

  return (
    <>
      <Card>
        {menuArea}
        <Table { ...tableParams } pagination={false} />
        <div className={stl.pagination}>
          {
            <Pagination { ...pageParams } />
          }
        </div>
      </Card>
    </>
  )
}

export default Page