import { useState, useEffect } from 'react'
import { Form, Input, Button, Radio, InputNumber } from 'antd'

import { fetchUpdate, fetchAdd } from './api'
const FormLayout = (props) => {
  const [form] = Form.useForm()
  const [submiting, setSubmiting] = useState(false)
  const onFinish = async (values) => {
    setSubmiting(true)
    if (Object.keys(props.rowData).length) {
      await fetchUpdate({ id: props.rowData.id, ...values })
    } else {
      await fetchAdd(values)
    }
    setSubmiting(false)
    props.updated()
  }
  useEffect(() => {
    form.setFieldsValue(props.rowData)
  }, [props.rowData])
  return (
    <Form onFinish={onFinish} layout="vertical" form={form}>
      <Form.Item label="姓名" name="name">
        <Input placeholder="请输入" />
      </Form.Item>
      <Form.Item label="年龄" name="age">
        <Input placeholder="请输入" />
      </Form.Item>
      <Form.Item label="地址" name="city">
        <Input placeholder="请输入" />
      </Form.Item>
      <Form.Item label="性别" name="gender">
        <Radio.Group>
          <Radio.Button value="男">男</Radio.Button>
          <Radio.Button value="女">女</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="身高" name="height">
        <InputNumber placeholder="请输入" />
      </Form.Item>
      <Form.Item label="体重" name="weight">
        <InputNumber placeholder="请输入" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={submiting}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default FormLayout
