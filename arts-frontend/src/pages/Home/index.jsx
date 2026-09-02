import Gallery from '../../components/Gallery';

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
                <p className='home-carousel__eyebrow'>Série profundidade</p>
                <h2 className='home-carousel__title'>Feixes submersos</h2>
                <p className='home-carousel__description'>
                  Pintura digital em camadas: verde-mata e azul-âncora
                  se dissolvem em uma única respiração de luz.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='home-carousel__slide'>
          <div className='home-carousel__content'>
            <div className='home-carousel__row'>
              <img className='home-carousel__image' src={carousel2} alt="" />
              <div className='home-carousel__text'>
                <p className='home-carousel__eyebrow'>Série órbita</p>
                <h2 className='home-carousel__title'>Portais em suspensão</h2>
                <p className='home-carousel__description'>
                  Anéis de luz que atravessam horizontes sintéticos. Uma investigação
                  sobre o que acontece quando a geometria encontra a névoa.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='home-carousel__slide'>
          <div className='home-carousel__content'>
            <div className='home-carousel__row'>
              <img className='home-carousel__image' src={carousel3} alt="" />
              <div className='home-carousel__text'>
                <p className='home-carousel__eyebrow'>Série corrente</p>
                <h2 className='home-carousel__title'>Topografia da onda</h2>
                <p className='home-carousel__description'>
                  Pintura digital em camadas: azul-serenidade e branco-luz
                  se dobram numa única onda contínua.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Carousel>
      <Gallery />
    </div>
  )
}
export default Home;
