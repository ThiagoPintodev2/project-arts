
import { Tabs } from 'antd';

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
    <header className='container-header'>
      <div className='page-inner container-header__menu-nav'>
        <div className='container-header__logo'>CESAR ART</div>
        <Tabs defaultActiveKey="1" items={items} />
      </div>
    </header>
  )
}
export default Home;
