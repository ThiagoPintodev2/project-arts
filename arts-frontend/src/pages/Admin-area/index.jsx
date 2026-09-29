import React from 'react';
import { Link, useNavigate } from 'react-router-dom'

import { Button, Checkbox, Form, Input } from 'antd';
import {ArrowLeftOutlined} from '@ant-design/icons'

import './index.less'

const onFinish = values => {
  console.log('Success:', values);
};
const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};
function AdminArea() {
  const navigate = useNavigate()
  return (
    <div className='container-login'>
      <h3 className='container-login__title'>Área Reservada</h3>
      <p className='container-login__description'>O painel só pode ser acessado exclusivamente pelo o artista.</p>
      <Form
        layout="vertical"
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Nome"
          name="username"
          rules={[{ required: true, message: 'Insira seu Nome!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Senha"
          name="password"
          rules={[{ required: true, message: 'Insira Sua Senha!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" label={null}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Enviar
          </Button>
        </Form.Item>
      </Form>
      <Link>
        <Button onClick={navigate(-1)}><ArrowLeftOutlined />voltar</Button>
      </Link>
    </div>
  )
};
export default AdminArea;