import { useContext, useState } from 'react';
import authContext from '../../context/authContext';
import useAxios from '../../hook/user-axios';
import instance from '../../helper/axios-instance';

import { Button, Form, Divider } from 'antd'

import './index.less'
import ArtModal from '../../components/ArtModal';
import FooterCredits from '../../components/FooterCredits';

function Biography() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const auth = useContext(authContext)
  const [form] = Form.useForm();

  const [data, loading, setLoading, , reloadBiography] = useAxios({
    instance,
    method: 'GET',
    url: '/artworks/biography'
  })

  const normFile = e => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const handleEdit = async (values) => {
    const formData = new FormData();
    if (values.image_url?.length) {
      formData.append('image', values.image_url[0].originFileObj);
    }
    if (values.title) {
      formData.append('name', values.title);
    }
    formData.append('biography', values.description);
    setLoading(true)
    try {
      const biographyId = Array.isArray(data) && data[0]?.id ? data[0].id : 1;
      await instance.put(`/artworks/biography/${biographyId}`, formData, {
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
    <div>
      <section className='container-biography'>
        <div className="page-inner">
          <header className="page-inner container-biography__heading">
            <h2 className="container-biography__title">
              Biografia
            </h2>
          </header>

          <div>
            {
              data.map(item => (
                <div className='container-biography__data-artist' key={item.id} style={{display: 'flex', gap: 30}}>
                  <h3 className='container-biography__name-artist'>
                    SPACE • {item.name}
                    <div>
                      <p className='container-biography__description'>{item.biography}</p>
                    </div>
                  </h3>
                  <img className='container-biography__image' src={item.image_url} />
                </div>
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
      <Divider className='biography-divider'/>
      <div><FooterCredits/></div>
    </div>
  )
}
export default Biography;