import { useContext } from 'react';
import useAxios from '../../hook/user-axios'
import instance from '../../helper/axios-instance';

import authContext from '../../context/authContext';
import ModalPostImage from './ModalPostImage';

import { LoadingOutlined } from '@ant-design/icons';
import { Card, Col, Row, Spin } from 'antd';

import './index.less'

function artworkYear(date) {
  if (!date) {
    return ''
  };
  const formatedDate = new Date(date);
  const dataSimples = formatedDate.toLocaleDateString('pt-BR');
  return dataSimples
}
function Gallery() {
  const auth = useContext(authContext)
  const [listGallery, loading, setLoading, , reloadGallery] = useAxios({
    instance,
    method: 'GET',
    url: '/'
  })

  const works = Array.isArray(listGallery) ? listGallery : [];

  return (
    <section className="container-gallery">
      <div className="page-inner">
        <header className="container-gallery__heading">
          <h2 className="container-gallery__title">
            Exposição de artes digitais
          </h2>
          {!loading && (
            <p className="container-gallery__count">
              {works.length} / 8 {works.length === 1 ? 'obra' : 'obras'}
            </p>
          )}
        </header>

        <Row
          wrap
          gutter={[
            { xs: 12, sm: 16, md: 20, lg: 24 },
            { xs: 12, sm: 16, md: 20, lg: 24 },
          ]}
        >
          {loading ? (
            <Col span={24}>
              <div className="container-gallery__loading">
                <Spin indicator={<LoadingOutlined spin />} size="large" />
              </div>
            </Col>
          ) : (
            works.map((work) => (
              <Col key={work.id ?? work.title} xs={24} sm={12} lg={8} xl={6}>
                <Card
                  hoverable
                  variant="borderless"
                  className="container-gallery__card"
                  cover={
                    <div className="container-gallery__cover">
                      <img
                        draggable={false}
                        alt={work.title}
                        src={work.image_url}
                      />
                    </div>
                  }
                >
                  <h3 className="container-gallery__card-title">{work.title}</h3>
                  <p className="container-gallery__card-description">
                    {work.description}
                  </p>
                  <p className="container-gallery__card-year">
                    {artworkYear(work.date)}
                  </p>
                </Card>
              </Col>
            ))
          )}
        </Row>
        {!auth.isAutentication && (
          <div className='container-gallery__post-image'>
            <ModalPostImage workLength={works.length} onPosted={reloadGallery} loading={loading} setLoading={setLoading} />
          </div>
        )}
      </div>
    </section>
  )
}

export default Gallery;
