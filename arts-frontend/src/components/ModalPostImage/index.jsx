import { useState, useContext } from 'react';
import instance from '../../helper/axios-instance';
import authContext from '../../context/authContext';
import ArtModal from '../ArtModal';
import { Button, Form, message } from 'antd';

import './index.less'

function postUrl(endPoint) {
  if (endPoint === 'safira-collection') {
    return '/artworks/safira-collection';
  }
  if (endPoint === '/carousel') {
    return '/carousel';
  }
  return '/artworks';
}

function ModalPostImage({ workLength = null, onPosted, loading, setLoading, endPoint }) {
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
      const teste = await instance.post(postUrl(endPoint), formData, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      console.log(teste)
      form.resetFields();
      setIsModalOpen(false);
      onPosted?.();
    } catch (error) {
      message.open({
        type: 'error',
        content: `${error.response?.data?.error}`
      })

    }

    setLoading(false);
  };
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const limitReached = workLength === 8 || workLength >= 8;
  return (
    <>
      <Button
        className="btn-send-art"
        disabled={endPoint === '/' ? limitReached : null}
        onClick={showModal}
      >
        {endPoint === '/' && limitReached ? 'Limite máximo de Fotos Atingido' : endPoint === '/carousel' ? 'Editar Carousel' : 'Enviar Obra'}
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