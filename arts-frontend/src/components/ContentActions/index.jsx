import { useContext, useState } from 'react';
import authContext from '../../context/authContext';
import instance from '../../helper/axios-instance';
import ArtModal from '../ArtModal';

import { EditOutlined, DeleteOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Dropdown, Space, Button, Form, Popconfirm, message } from 'antd';
import axios from 'axios';

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
  const cancel = e => {
    messageApi.error('Click on No');
  };

  let updateEndPoint = ''
  const handleEdit = async (values) => {
    try {
      if(endPoint === 'safira-collection') {
        updateEndPoint = 'safira-collection/'
      } 
      const response = await instance.put(`/${updateEndPoint}${selectedArtwork.id}`, {
        title: values.title,
        description: values.description,
        date: values.date.format('YYYY-MM-DD'),
      });
      message.open({
        type: 'success',
        content: 'Arte Editada com Sucesso',
      });
      setLoading(true)
      handleOk()
    } catch (error) {
      console.error('Erro ao atualizar obra:', error);
    }
    setLoading(false)
    reloadGallery()
  };

  const handleDelete = async (work) => {
    if(endPoint === 'safira-collection') {
      updateEndPoint = 'safira-collection/'
    }
    try {
      const response = await instance.delete(`/${updateEndPoint}${work.id}`)
      message.open({
        type: 'success',
        content: 'Arte Deletada com Sucesso',
      })
    } catch (error) {
      console.log('Erro ao deletar obra', error)
    }
    reloadGallery()
  }

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
          onCancel={cancel}
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
            mode='edit-gallery'
          />
        </>
      }
    </div>
  )
}
export default ContentActions;