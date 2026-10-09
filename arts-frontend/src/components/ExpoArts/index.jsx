import { useContext } from 'react';

import ModalPostImage from '../ModalPostImage';
import ContentActions from '../ContentActions';

import authContext from '../../context/authContext';

import { LoadingOutlined } from '@ant-design/icons';
import { Card, Col, Row, Spin, Image, Masonry } from 'antd';

import './index.less'

function ExpoArts({
  title,
  loading,
  works,
  masonryItems,
  setLoading,
  onFinishFailed,
  onFinish,
  reloadGallery,
  endPoint,
  artworkYear }) {
  const auth = useContext(authContext)

  return (
    <section className="container-gallery">
      <div className="page-inner">
        <header className="container-gallery__heading">
          <h2 className="container-gallery__title">
            {title}
          </h2>
          {!loading && endPoint === '/' ? (
            <p className="container-gallery__count">
              {works.length} / 8 {works.length === 1 ? 'obra' : 'obras'}
            </p>
          ) : 
          <p className="container-gallery__count">
            {works.length} {works.length === 1 ? 'obra' : 'obras'}
          </p>}
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
                          endPoint={endPoint}
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
            <ModalPostImage endPoint={endPoint} workLength={works.length} onPosted={reloadGallery} loading={loading} setLoading={setLoading} />
          </div>
        )}
      </div>
    </section>
  )
}
export default ExpoArts;