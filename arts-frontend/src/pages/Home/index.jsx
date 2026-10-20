import { useContext } from 'react';
import Gallery from '../../components/Gallery';
import authContext from '../../context/authContext';
import Footer from '../../components/Footer';
import instance from '../../helper/axios-instance';
import useAxios from '../../hook/user-axios';

import ContentActions from '../../components/ContentActions';
import { Carousel, Image } from 'antd';

import './index.less'

function Home() {
  const auth = useContext(authContext)

  const [data, loading, setLoading, , reloadCarousel] = useAxios({
    instance,
    method: 'GET',
    url: '/carousel'
  })

  const slides = Array.isArray(data) ? data : [];

  return (
    <main>
      <Carousel arrows autoplay autoplaySpeed={5000}>
        {
          slides.map((item) => (
            <div className='home-carousel__slide' key={item.id}>
              <div className='home-carousel__content'>
                <div className='home-carousel__row'>
                  <div className='home-carousel__media'>
                    <Image className='home-carousel__image' src={item.image_url} alt={item.title || ''} />
                    {auth.isAuthentication &&
                      <div className='home-carousel__button'>
                        <ContentActions
                          work={item}
                          endPoint={'/carousel'}
                          loading={loading}
                          setLoading={setLoading}
                          reloadGallery={reloadCarousel}
                        />
                      </div>
                    }
                  </div>

                  <div className='home-carousel__text'>
                    <h2 className='home-carousel__title'>{item.title}</h2>
                    <p className='home-carousel__description'>
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </Carousel>
      <Gallery />
      <Footer />
    </main>
  )
}
export default Home;
