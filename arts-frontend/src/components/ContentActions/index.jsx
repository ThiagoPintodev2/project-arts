import { useContext, useState } from 'react';
import authContext from '../../context/authContext';
import instance from '../../helper/axios-instance';
import ArtModal from '../ArtModal';

import { EditOutlined, DeleteOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Dropdown, Space, Button, Form } from 'antd';

function ContentActions({ work, onFinishFailed, reloadGallery }) {
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
    setLoading(true)
    try {
      const response = await instance.put(`/${selectedArtwork.id}`, {
        title: values.title,
        description: values.description,
        date: values.date.format('YYYY-MM-DD'),
      });
      handleOk()
      console.log('Obra atualizada:', response.data);
    } catch (error) {
      console.error('Erro ao atualizar obra:', error);
    }
    setLoading(false)
    reloadGallery()
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
        <Button>
          <DeleteOutlined />
          Deletar
        </Button>
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
                <EllipsisOutlined style={{fontSize: 30, color: "#fff"}} />
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
            mode='edit'
          />
        </>
      }
    </div>
  )
}
export default ContentActions;