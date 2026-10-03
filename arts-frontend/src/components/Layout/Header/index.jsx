import { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import authContext from '../../../context/authContext';

import { GiPadlock } from "react-icons/gi";

import { Tabs, Drawer, Button } from 'antd';

import './index.less';

const items = [
  {
    key: '/',
    label: 'Home'
  },
  {
    key: '/biography',
    label: 'Biografia'
  },
  {
    key: '/store',
    label: 'Loja'
  },
  {
    key: 'contato',
    label: 'Contato'
  },
  {
    key: '/auth/login',
    label: <span className="container-header__admin"><GiPadlock />Área administrativa</span>,
  },
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const auth = useContext(authContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const activeKey = items.some((item) => item.key === pathname) ? pathname : '';

  const handleLogout = () => {
    auth.setIsAuthentication(false);
    auth.setToken(null);
    localStorage.removeItem('token');
    setMenuOpen(false);
    navigate('/auth/login');
  };

  const selectItem = (key) => {
    setMenuOpen(false);

    if (key === 'logout') {
      handleLogout();
      return;
    }

    if (!key.startsWith('/')) return;

    navigate(key);
  };

  return (
    <header className='container-header'>
      <div className='page-inner container-header__menu-nav'>
        <div className='container-header__logo'>CESAR ART</div>
        <Tabs
          className='container-header__tabs'
          activeKey={activeKey}
          onChange={selectItem}
          items={[...items, ...(auth.isAuthentication ? [{
            key: "logout", label: (
              <Button onClick={handleLogout}>
                Sair
              </Button>
            )
          }] : [])]}
        >
        </Tabs>
        <button
          type='button'
          className='container-header__toggle'
          aria-label='Abrir menu'
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
        >

          <span />
          <span />
          <span />
        </button>
      </div>
      <Drawer
        title='CESAR ART'
        placement='right'
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        rootClassName='container-header__drawer'
      >
        <nav className='container-header__mobile-nav'>
          {items.map((item) => (
            <button
              key={item.key}
              type='button'
              className={activeKey === item.key ? 'is-active' : ''}
              onClick={() => selectItem(item.key)}
            >
              {item.label}
            </button>
          ))}
          {
            auth.isAuthentication && <Button onClick={handleLogout}>Sair</Button>
          }
        </nav>
      </Drawer>
    </header>
  )
}
export default Header;
