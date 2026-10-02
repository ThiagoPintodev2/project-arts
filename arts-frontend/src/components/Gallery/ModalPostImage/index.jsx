import React, { useEffect, useState, useContext } from 'react';
import instance from '../../../helper/axios-instance';
import authContext from '../../../context/authContext';
import ArtModal from '../../ArtModal';
import { Button, Form, Input } from 'antd';

import './index.less'

function ModalPostImage({ workLength, onPosted, loading, setLoading }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const auth = useContext(authContext);

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
      await instance.post('/', formData, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
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

  const limitReached = workLength === 8;

  return (
    <>
      <Button
        className="btn-send-art"
        disabled={limitReached}
        onClick={showModal}
      >
        {limitReached ? 'Limite máximo de Fotos Atingido' : 'Enviar Obra'}
      </Button>

      <ArtModal
        title="Informações da Obra"
        open={isModalOpen}
        onOk={() => form.submit()}
        onCancel={handleCancel}
        cancelButtonProps={loading}
        okButtonProps={loading}
        confirmLoading={loading}
        disabled={loading}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        form={form}
        normFile={normFile}
        mode='create'
      />
    </>
  );
};
export default ModalPostImage;