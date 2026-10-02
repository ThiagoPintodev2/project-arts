import { useContext, useState } from 'react';
import authContext from '../../context/authContext';
import ModalPostImage from '../Gallery/ModalPostImage';

import { EditOutlined, DeleteOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Dropdown, Space, Button, Modal } from 'antd';


function ContentActions({ listGallery, editGalleryImage }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const auth = useContext(authContext)

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
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
                <EllipsisOutlined />
              </Space>
            </a>
          </Dropdown>
          <Modal
            title="Basic Modal"
            closable={{ 'aria-label': 'Custom Close Button' }}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >

          </Modal>
        </>
      }
    </div>
  )
}
export default ContentActions;