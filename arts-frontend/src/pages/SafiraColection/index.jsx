import safira from '../../assets/safira.png'

import './index.less'

function SafiraColection() {
  return (
    <section className="container-safira">
      <div className="page-inner">
        <header className="container-safira__heading">
          <h2 className="container-safira__title">
            Coleção Safira
          </h2>
        </header>

        <div className="container-safira__content">
          <h3 className="container-safira__name">
          SAFIRA , 2026
            <div>
              <p className="container-safira__description">
                É uma coleção sobre cura e autoconhecimento, inspirada na trajetória pessoal do artista após vivenciar períodos emocionalmente intensos. Na coleção, Space explora uma narrativa que percorre ambientes naturais, convidando o público a mergulhar profundamente nessa jornada por meio de ilustrações, fotografias e textos autorais. Paralelamente, reivindica a presença e a beleza negra na natureza através da arte e da estética que desenvolveu, denominada AFROECO. A coleção representa o ato de se lançar ao mundo e reconhecer o tesouro que habita dentro de si.
              </p>
            </div>
          </h3>
          <img className="container-safira__img" src={safira} alt="Coleção Safira: Conforto e Liberdade" />
        </div>
      </div>
    </section>
  )
}
export default SafiraColection;
