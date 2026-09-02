import { Card, Col, Row } from 'antd';

import './index.less'

const { Meta } = Card;

const works = [
  {
    title: 'Europe Street beat',
    description: 'www.instagram.com',
    image: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
  },
  {
    title: 'Europe Street beat',
    description: 'www.instagram.com',
    image: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
  },
  {
    title: 'Europe Street beat',
    description: 'www.instagram.com',
    image: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
  },
  {
    title: 'Europe Street beat',
    description: 'www.instagram.com',
    image: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
  },
];

function Gallery() {
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
        {works.map((work, index) => (
          <Col key={index} xs={24} sm={12} xl={8} xxl={6}>
            <Card
              hoverable
              variant="borderless"
              style={{ width: '100%' }}
              cover={
                <img
                  draggable={false}
                  alt={work.title}
                  src={work.image}
                />
              }
            >
              <Meta title={work.title} description={work.description} />
            </Card>
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