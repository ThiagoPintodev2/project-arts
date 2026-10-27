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

function ModalPostImage({ workLength = null, onPosted, endPoint }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
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
    if (values.date) {
      formData.append('date', values.date.format('YYYY-MM-DD'));
    }
    formData.append('description', values.description);
    if (file) {
      formData.append('image', file);
    }

    setSubmitting(true)
    try {
      const { data: created } = await instance.post(postUrl(endPoint), formData, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });

      form.resetFields();
      setIsModalOpen(false);
      onPosted?.(created);
      message.open({
        type:'success',
        content: 'Informações adicionadas com sucesso'
      })
    } catch (error) {
      message.open({
        type: 'error',
        content: error.response?.data?.error || error.response?.data?.message || 'Não foi possível enviar'
      })
    }
    setSubmitting(false);
  };
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const limitReached = workLength === 8 || workLength >= 8;
  const isCarousel = endPoint === '/carousel';
  return (
    <>
      <Button
        className="btn-send-art"
        disabled={endPoint === '/' ? limitReached : null}
        onClick={showModal}
      >
        {endPoint === '/' && limitReached ? 'Limite máximo de Fotos Atingido' : isCarousel ? 'Enviar ao Carrossel' : 'Enviar Obra'}
      </Button>

      <ArtModal
        title={isCarousel ? 'Informações do Carrossel' : 'Informações da Obra'}
        open={isModalOpen}
        onOk={() => form.submit()}
        onCancel={handleCancel}
        cancelButtonProps={submitting}
        okButtonProps={submitting}
        confirmLoading={submitting}
        disabled={submitting}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        form={form}
        normFile={normFile}
        mode={isCarousel ? 'create-carousel' : 'create'}
      />
    </>
  );
};
export default ModalPostImage;