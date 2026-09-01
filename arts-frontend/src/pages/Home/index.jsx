import carousel1 from '../../assets/carousel1.jpg'
import carousel2 from '../../assets/carousel2.jpg'
import carousel3 from '../../assets/carousel3.jpg'

import { Tabs } from 'antd';
import { Carousel } from 'antd';

import './index.less'

const items = [
  {
    key: '1',
    label: 'Home'
  },
  {
    key: '2',
    label: 'Biografia'
  },
  {
    key: '3',
    label: 'Loja'
  },
  {
    key: '4',
    label: 'Contato'
  },
  {
    key: '5',
    label: 'Área administrativa'
  },
];

function Home() {

  return (
    <div>
      <header className='container-header'>
        <div className='page-inner container-header__menu-nav'>
          <div className='container-header__logo'>CESAR ART</div>
          <Tabs defaultActiveKey="1" items={items} />
        </div>
      </header>
      <Carousel>
        <div className='home-carousel__slide'>
          <div className='home-carousel__content'>
            <div className='home-carousel__row'>
              <img className='home-carousel__image' src={carousel1} alt="" />
              <div className='home-carousel__text'>
                <h3>
                  Série profundidade
                </h3>
                <div>
                  Série profundidade
                  Feixes submersos
                  Pintura digital em camadas: verde-mata e azul-âncora
                  se dissolvem em uma única respiração de luz.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h3 className='home-carousel__content'>
            <img className='home-carousel__image' src={carousel2} alt="" />
            </h3>
        </div>
        <div>
          <h3 className='home-carousel__content'><img className='home-carousel__image' src={carousel3} alt="" /></h3>
        </div>
      </Carousel>
    </div>
  )
}
export default Home;
