import { useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'

import authContext from '../../context/authContext';

import { Button, Checkbox, Form, Input } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons'

import './index.less'

const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};

function AdminArea() {
  const auth = useContext(authContext)
  const navigate = useNavigate()

  const loginArtist = async (values) => {
    try {
      const response = await axios({
        method: 'POST',
        url: 'http://localhost:8081/auth/login',
        data: {
          email: values.email,
          password: values.password,
        },
      });
      auth.setIsAuthentication(true);
      auth.setToken(response.data.token);
      localStorage.setItem('token', response.data.token);
      navigate('/')
    } catch (error) {
      console.error(error);
    }
  }
  const onFinish = (values) => {
    loginArtist(values)
  }

  return (
    <div className='container-login'>
      <>
        <h3 className='container-login__title'>Área Reservada</h3>
        <p className='container-login__description'>O painel só pode ser acessado exclusivamente pelo o artista.</p>
        <Form
          layout="vertical"
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Insira seu Email!' }]}
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
      </>
    </div>
  )
};
export default AdminArea;