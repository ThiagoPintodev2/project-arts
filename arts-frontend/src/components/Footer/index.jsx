import FooterCredits from '../../components/FooterCredits'
import arteDigital from '../../assets/arte-digital.jpg'
import { Divider } from 'antd'
import { EditOutlined, CopyOutlined, StarOutlined } from '@ant-design/icons'

import './index.less'

const steps = [
  {
    index: '01',
    icon: <EditOutlined aria-hidden />,
    title: 'Traço no tablet',
    text: 'Toda obra começa como desenho feito à mão em tablet gráfico: linhas soltas que definem composição e ritmo.',
  },
  {
    index: '02',
    icon: <CopyOutlined aria-hidden />,
    title: 'Camadas de cor',
    text: 'Sobre o traço, dezenas de camadas de pintura digital constroem profundidade, névoa e os degradês da paleta.',
  },
  {
    index: '03',
    icon: <StarOutlined aria-hidden />,
    title: 'Luz e acabamento',
    text: 'No fim, a luz é esculpida pixel a pixel até a obra ficar pronta para impressão em grande formato.',
  },
]

function Footer() {
  return (
    <section className="container-arts-styles" aria-label="O processo">
      <div className="page-inner container-arts-styles__inner">
        <img
          className="container-arts-styles__img-footer"
          src={arteDigital}
          alt="Mão desenhando em um tablet gráfico"
        />
        <div className="container-arts-styles__content-right">
          <p className="container-arts-styles__eyebrow">O processo</p>
          <h3>Arte digital, do tablet para a tela</h3>
          <p className="container-arts-styles__lead">
            Cada peça nasce desenhada à mão em tablet gráfico e cresce em camadas
            de pintura digital — o mesmo gesto do papel, com possibilidades
            infinitas de cor e luz.
          </p>
          <ol className="container-arts-styles__steps">
            {steps.map((step) => (
              <li key={step.index} className="container-arts-styles__step">
                <span className="container-arts-styles__step-index">{step.index}</span>
                <span className="container-arts-styles__step-icon">{step.icon}</span>
                <div className="container-arts-styles__step-body">
                  <h4>{step.title}</h4>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <Divider className='container-arts-styles__divider' />
      <FooterCredits />
    </section>
  )
}

export default Footer;
