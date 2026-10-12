import { useEffect, useState } from 'react'
import instance from '../../helper/axios-instance'

import ExpoArts from '../../components/ExpoArts'
import safira from '../../assets/safira.png'

import { Button, Divider } from 'antd'
import { ArrowDownOutlined } from '@ant-design/icons'

import './index.less'
import FooterCredits from '../../components/FooterCredits'

const PAGE_SIZE = 5

function artworkYear(date) {
  if (!date) return ''
  const [year, month, day] = date.split('T')[0].split('-')
  return `${day}/${month}/${year}`
}

function SafiraCollection() {
  const [works, setWorks] = useState([])
  const [nextCursor, setNextCursor] = useState(null)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)

  const fetchPage = async (cursor = null) => {
    const { data } = await instance.get('/artworks/safira-collection', {
      params: { limit: PAGE_SIZE, ...(cursor && { cursor }) },
    })
    setWorks(prev => (cursor ? [...prev, ...data.items] : data.items))
    setNextCursor(data.nextCursor)
  }

  const reloadGallery = async () => {
    setLoading(true)
    try {
      await fetchPage()
    } catch (error) {
      console.log('Erro ao carregar a coleção:', error)
    }
    setLoading(false)
  }

  const loadMore = async () => {
    if (loadingMore || !nextCursor) {
      return
    }
    setLoadingMore(true)
    try {
      await fetchPage(nextCursor)
    } catch (error) {
      console.log('Erro ao carregar mais imagens:', error)
    }
    setLoadingMore(false)
  }

  useEffect(() => {
    reloadGallery()
  }, [])

  const masonryItems = works.map((work, index) => ({
    key: work.id ?? `${work.title}-${index}`,
    data: work,
  }))

  const onFinishFailed = errorInfo => console.log('Failed:', errorInfo)
  const onFinish = values => console.log('Valores editados:', values)

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
              <p className='container-safira__footer'>
                CONFIRA A COLEÇÃO ABAIXO
                <ArrowDownOutlined />
              </p>
            </div>
          </h3>
          <img className="container-safira__img" src={safira} alt="Coleção Safira: Conforto e Liberdade" />
        </div>
      </div>
      <main>
        <ExpoArts
          title={'Coleção Safira'}
          loading={loading}
          works={works}
          masonryItems={masonryItems}
          setLoading={setLoading}
          onFinishFailed={onFinishFailed}
          onFinish={onFinish}
          reloadGallery={reloadGallery}
          artworkYear={artworkYear}
          endPoint={'safira-collection'}
        />
        {nextCursor && (
          <div style={{ display: 'flex', justifyContent: 'center', margin: '32px 0' }}>
            <Button onClick={loadMore} loading={loadingMore} icon={<ArrowDownOutlined />}>
              Carregar mais
            </Button>
          </div>
        )}
      </main>
      <Divider className='container-arts-styles__divider' />
      <FooterCredits />
    </section>
  )
}
export default SafiraCollection;
