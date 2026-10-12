import Gallery from '../../components/Gallery';
import Footer from '../../components/Footer';
import instance from '../../helper/axios-instance';
import useAxios from '../../hook/user-axios';

import { Carousel } from 'antd';

import './index.less'

function Home() {

  const [data, loading, setLoading, , reloadCarousel] = useAxios({
    instance,
    method: 'GET',
    url: '/carousel'
  })

  return (
    <div>
      <Carousel arrows autoplay autoplaySpeed={5000}>
        {
          data.map((item) => (
            <div className='home-carousel__slide'>
              <div className='home-carousel__content'>
                <div className='home-carousel__row'>
                  <img className='home-carousel__image' src={item.image_url} alt="" />
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
    </div>
  )
}
export default Home;
