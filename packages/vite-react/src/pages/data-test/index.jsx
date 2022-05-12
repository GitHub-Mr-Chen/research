import { useEffect, useRef, useState } from 'react'
import { Button, Table, Tag, Space, Drawer, Empty } from 'antd'
import { debounce } from 'lodash'
import { fetchDelete, fetchList } from './api'
import Update from './update'
export default function () {
  const [rowData, setRowData] = useState({})
  const [data, setData] = useState([])
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'city',
    },
    {
      title: '性别',
      dataIndex: 'gender',
      render: (text) => (
        <Tag color={text === '男' ? 'geekblue' : 'red'} key={text}>
          {text}
        </Tag>
      )
    },
    {
      title: '身高（cm）',
      dataIndex: 'height',
    },
    {
      title: '体重（kg）',
      dataIndex: 'weight',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a
            onClick={() => {
              setRowData(text)
              setVisible(true)
            }}
          >
            修改
          </a>
          <a onClick={() => deleteData(text.id)}>删除</a>
        </Space>
      )
    }
  ]

  useEffect(() => {
    query.current()
  }, [])

  const deleteData = async (id) => {
    await fetchDelete(id)
    query.current()
  }
  /*  防抖的实现需要function不随render更新，
      不然每次更新渲染都是一个新的闭包，
      无法做到缓存变量的作用 */
  const query = useRef(
    debounce(
      async () => {
        const res = await fetchList()
        setData(res.data.data)
      },
      2000,
      { leading: true }
    )
  )

  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (visible === false) {
      const empty = {}
      Object.keys(rowData).forEach((key) => {
        empty[key] = undefined
      })
      setRowData(empty)
    }
  }, [visible])
  return (
    <div>
      <Drawer
        title="Basic Drawer"
        placement="left"
        closable={false}
        onClose={() => setVisible(false)}
        visible={visible}
        key="left"
      >
        <Update
          updated={() => {
            query.current()
            setVisible(false)
          }}
          rowData={rowData}
        ></Update>
      </Drawer>
      <Button onClick={() => setVisible(true)} type="primary">
        新增
      </Button>
      <Button onClick={query.current} type="primary">
        查
      </Button>
      {/* rowKey设置不重复主键一般为id */}
      <Table columns={columns} dataSource={data} rowKey="id"/>
    </div>
  )
}
