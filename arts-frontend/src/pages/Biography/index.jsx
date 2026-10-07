import { useContext, useState } from 'react';
import authContext from '../../context/authContext';
import useAxios from '../../hook/user-axios';
import instance from '../../helper/axios-instance';

import { Button, Form } from 'antd'

import './index.less'
import ArtModal from '../../components/ArtModal';

function Biography() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const auth = useContext(authContext)
  const [form] = Form.useForm();

  const [data, loading, setLoading, , reloadBiography] = useAxios({
    instance,
    method: 'GET',
    url: '/biography'
  })

  const normFile = e => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const handleEdit = async (values) => {
    const formData = new FormData();
    if (values.image?.length) {
      formData.append('image', values.image[0].originFileObj);
    }
    formData.append('biography', values.description);
    setLoading(true)

    try {
      await instance.put('/biography/1', formData, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      form.resetFields();
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
    reloadBiography()
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <section className='container-biography'>
      <div className="page-inner">
        <header className="page-inner container-biography__heading">
          <h2 className="container-biography__title">
            Biografia
          </h2>
        </header>

        <div className='container-biography__data-artist'>
          {
            data.map(item => (
              <>
                <h3 className='container-biography__name-artist'>
                  SPACE • {item.name}
                  <div>
                    <p className='container-biography__description'>{item.biography}</p>
                  </div>
                </h3>
                <img className='container-biography__image' src={item.image_url} />
              </>
            ))
          }
        </div>
        <div className='container-biography__btn'>
          {
            auth.isAuthentication &&
            <>
              <Button onClick={showModal}>Alterar dados</Button>
              <ArtModal
                  title="Editar Biografia"
                  open={isModalOpen}
                  onOk={() => form.submit()}
                  cancelButtonProps={loading}
                  okButtonProps={loading}
                  confirmLoading={loading}
                  disabled={loading}
                  onCancel={handleCancel}
                  onFinish={handleEdit}
                  onFinishFailed={onFinishFailed}
                  form={form}
                  work={data}
                  normFile={normFile}
                  mode='edit-biography'
              />
            </>
          }
        </div>
      </div>
    </section>
  )
}
export default Biography;