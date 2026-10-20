import { useContext, useState } from 'react';
import authContext from '../../context/authContext';
import instance from '../../helper/axios-instance';
import ArtModal from '../ArtModal';

import { EditOutlined, DeleteOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Dropdown, Space, Button, Form, Popconfirm, message } from 'antd';

function artworkUrl(endPoint, id) {
  if (endPoint === 'safira-collection') {
    return `/artworks/safira-collection/${id}`;
  }
  if (endPoint === '/carousel') {
    return `/carousel/${id}`;
  }
  return `/artworks/${id}`;
}

function ContentActions({ work, onFinishFailed, endPoint = '', reloadGallery }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false)
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  const auth = useContext(authContext)
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
    setSelectedArtwork(work)
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleEdit = async (values) => {
    const payload = {
      title: values.title,
      description: values.description,
    };
    if (endPoint !== '/carousel') {
      payload.date = values.date.format('YYYY-MM-DD');
    }

    setLoading(true);
    try {
      await instance.put(artworkUrl(endPoint, selectedArtwork.id), payload);
      message.open({
        type: 'success',
        content: 'Arte Editada com Sucesso',
      });
      handleOk();
      reloadGallery();
    } catch (error) {
      console.error('Erro ao atualizar obra:', error);
      message.open({
        type: 'error',
        content: 'Não foi possível editar a obra',
      });
    }
    setLoading(false);
  };

  const handleDelete = async (item) => {
    setLoading(true);
    try {
      await instance.delete(artworkUrl(endPoint, item.id));
      message.open({
        type: 'success',
        content: 'Arte Deletada com Sucesso',
      });
      reloadGallery();
    } catch (error) {
      console.log('Erro ao deletar obra', error);
      message.open({
        type: 'error',
        content: 'Não foi possível deletar a obra',
      });
    }
    setLoading(false);
  };

  const items = [
    {
      label: <div>
        <Button onClick={showModal}>
          <EditOutlined />
          Editar
        </Button>
      </div>,
      key: '0',
    },
    {
      label: <div>
        <Popconfirm
          title="Deletar Obra"
          description="Deseja realmente deletar esta obra?"
          onConfirm={() => handleDelete(work)}
          loading={loading}
          okText="Sim"
          cancelText="Não"
        >
          <Button>
            <DeleteOutlined />
            Deletar
          </Button>
        </Popconfirm>
      </div>,
      key: '1',
    }
  ];

  return (
    <div>
      {
        auth.isAuthentication &&
        <>
          <Dropdown menu={{ items }} trigger={['click']}>
            <a onClick={e => e.preventDefault()}>
              <Space>
                <EllipsisOutlined style={{ fontSize: 30, color: "#fff" }} />
              </Space>
            </a>
          </Dropdown>
          <ArtModal
            title="Editar Obra"
            open={isModalOpen}
            onOk={() => form.submit()}
            cancelButtonProps={loading}
            okButtonProps={loading}
            confirmLoading={loading}
            disabled={loading}
            onCancel={handleCancel}
            onFinish={handleEdit}
            onFinishFailed={onFinishFailed}
            work={selectedArtwork}
            form={form}
            mode={endPoint === '/carousel' ? 'edit-carousel' : 'edit-gallery'}
          />
        </>
      }
    </div>
  )
}
export default ContentActions;