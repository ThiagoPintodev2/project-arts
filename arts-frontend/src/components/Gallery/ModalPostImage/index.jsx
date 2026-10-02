import React, { useEffect, useState } from 'react';
import instance from '../../../helper/axios-instance';
import { Button, Modal, Form, Input, DatePicker, Upload } from 'antd';

import { UploadOutlined } from '@ant-design/icons';

const { TextArea } = Input;

import './index.less'

function ModalPostImage({ workLength, onPosted, loading, setLoading }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(workLength)
  const [form] = Form.useForm();

  const normFile = e => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields()
  };

  const onFinish = async (values) => {
    const file = values.image_url?.[0]?.originFileObj;

    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('date', values.date.format('YYYY-MM-DD'));
    formData.append('description', values.description);
    formData.append('image', file);

    setLoading(true)

    try {
      await instance.post('/', formData);
      form.resetFields();
      setIsModalOpen(false);
      onPosted?.();
    } catch (error) {
      console.error(error);
    }
  };
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const limitReached = workLength >= 8;

  return (
    <>
      <Button
        className="btn-send-art"
        disabled={limitReached}
        onClick={showModal}
      >
        {limitReached ? 'Limite máximo de Fotos Atingido' : 'Enviar Obra'}
      </Button>
      <Modal
        title="Informações da Obra"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={() => form.submit()}
        onCancel={handleCancel}
        cancelButtonProps={{
          loading,
          disabled: loading,
        }}
        okButtonProps={{ disabled: loading }}
        confirmLoading={loading}
        disabled={loading}
      >
        <Form
          className='container-form-modal'
          form={form}
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Título:"
            name="title"
            rules={[{ required: true, message: 'Por favor, inserir um título.' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Data de Criação:"
            name="date"
            rules={[{ required: true, message: 'Por favor, inserir uma data.' }]}
          >
            <DatePicker format="DD/MM/YYYY" />
          </Form.Item>

          <Form.Item
            label="Descrição:"
            name="description"
            rules={[{ required: true, message: 'Por favor, inserir uma descrição.' }]}
          >
            <TextArea style={{ resize: 'none' }} rows={4} />
          </Form.Item>

          <Form.Item
            name="image_url"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[{ required: true, message: 'Por favor, selecionar uma obra.' }]}
          >
            <Upload
              name="image"
              listType="picture"
              maxCount={1}
              beforeUpload={() => false}
            >
              <Button icon={<UploadOutlined />}>Selecionar Obra</Button>
            </Upload>
          </Form.Item>

        </Form>
      </Modal>
    </>
  );
};
export default ModalPostImage;