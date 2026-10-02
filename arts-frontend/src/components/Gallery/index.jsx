import { useContext } from 'react';
import useAxios from '../../hook/user-axios'
import instance from '../../helper/axios-instance';

import authContext from '../../context/authContext';
import ModalPostImage from './ModalPostImage';
import ContentActions from '../ContentActions';

import { LoadingOutlined } from '@ant-design/icons';
import { Card, Col, Row, Spin, Image, Masonry } from 'antd';

import './index.less'

function artworkYear(date) {
  if (!date) {
    return ''
  };
  const [year, month, day] = date.split("T")[0].split("-");

  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate
}

function Gallery() {
  const auth = useContext(authContext)
  const [listGallery, loading, setLoading, , reloadGallery] = useAxios({
    instance,
    method: 'GET',
    url: '/'
  })

  const works = Array.isArray(listGallery) ? listGallery : [];
  const masonryItems = works.map((work, index) => ({
    key: work.id ?? `${work.title}-${index}`,
    data: work,
  }));

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  const onFinish = (values) => {
    console.log('Valores editados:', values);
  };

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
            <Col span={24}>
              <Masonry
                className="container-gallery__masonry"
                columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
                gutter={{ xs: 8, sm: 12, md: 16 }}
                items={masonryItems}
                fresh
                itemRender={({ data: work }) => (
                  <Card
                    size="small"
                    hoverable
                    variant="borderless"
                    className="container-gallery__card"
                    cover={
                      <div className="container-gallery__cover">
                        <Image alt={work.title} src={work.image_url} />
                      </div>
                    }
                  >
                    <h3 className="container-gallery__card-title">{work.title}</h3>
                    <p className="container-gallery__card-description">
                      {work.description}
                    </p>
                    <div className="container-gallery__footer">
                      <p className="container-gallery__card-year">
                        {artworkYear(work.date)}
                      </p>
                      <div>
                        <ContentActions
                          work={work}
                          loading={loading}
                          setLoading={setLoading}
                          onFinishFailed={onFinishFailed}
                          onFinish={onFinish}
                          reloadGallery={reloadGallery}
                        />
                      </div>
                    </div>
                  </Card>
                )}
              />
            </Col>
          )}
        </Row>
        {auth.isAuthentication && (
          <div className='container-gallery__post-image'>
            <ModalPostImage workLength={works.length} onPosted={reloadGallery} loading={loading} setLoading={setLoading} />
          </div>
        )}
      </div>
    </section>
  )
}

export default Gallery;
