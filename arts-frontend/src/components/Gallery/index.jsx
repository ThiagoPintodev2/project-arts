import useAxios from '../../hook/user-axios'
import instance from '../../helper/axios-instance';
import { LoadingOutlined } from '@ant-design/icons';
import { Card, Col, Row, Spin } from 'antd';

import './index.less'

function artworkSrc(imageUrl) {
  if (!imageUrl) {
    return ''
  };
  return `http://localhost:8081/${imageUrl.replace(/^\/uploads\//, "")}`;
}

function artworkYear(date) {
  if (!date) {
    return ''
  };
  const year = new Date(date).getFullYear();
  return Number.isNaN(year) ? '' : year;
}

function Gallery() {
  const [listGallery, loading] = useAxios({
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
              {works.length} {works.length === 1 ? 'obra' : 'obras'}
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
              <Col key={work.id ?? work.title} xs={24} sm={12} lg={8} xl={8}>
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
      </div>
    </section>
  )
}

export default Gallery;
