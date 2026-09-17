import { useEffect, useState } from 'react';
import useAxios from '../../hook/user-axios'
import instance from '../../helper/axios-instance';
import { Card, Col, Row } from 'antd';

import './index.less'
function Gallery() {
  const [listGallery, loading, error] = useAxios({
    instance,
    method: 'GET',
    url: '/'
  })

  console.log(listGallery)
  return (
    <div className="container-gallery page-inner">
      <p className='container-galery__title'>
        Exposição de artes digitais
      </p>
      <Row
        wrap
        gutter={[
          { xs: 8, sm: 16, md: 24, lg: 32 },
          { xs: 8, sm: 16, md: 24, lg: 32 },
        ]}
      >
        {listGallery.map((work, index) => (
          <Col key={index} xs={24} sm={8} xl={6} xxl={6}>
            <Card
              hoverable
              variant="borderless"
              style={{ width: '100%' }}
              cover={
                <img
                draggable={false}
                alt={work.title}
                src={`http://localhost:8081/${work.image_url.replace(/^\/uploads\//, "")}`}
                />
              }
              >
            </Card>
            <div>{work.title}</div>
            <div>description={work.description}</div>
          </Col>
        ))}
      </Row>
    </div>
  )
}
export default Gallery;


// xs: < 576px (extra small, portrait phones)
// sm: ≥ 576px (small, landscape phones)
// md: ≥ 768px (medium, tablets)
// lg: ≥ 992px
// xl: ≥ 1200px (extra large, wide desktops)
// xxl: ≥ 1600px (extra extra large)