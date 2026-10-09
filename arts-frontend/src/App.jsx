import { useEffect, useState } from "react";
import { ConfigProvider } from "antd";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Biography from './pages/Biography'
import AdminArea from "./pages/Admin-area";
import SafiraCollection from "./pages/SafiraCollection";
import Header from "./components/Layout/Header";
import authContext from '../src/context/authContext'
import { readSession } from "./helper/session";

import theme from "./theme/index";

function App() {
  const [session] = useState(readSession);
  const [isAuthentication, setIsAuthentication] = useState(session.isAuthentication);
  const [token, setToken] = useState(session.token);

  useEffect(() => {
    const handleLogout = () => {
      setIsAuthentication(false);
      setToken(null);
    };

    window.addEventListener('auth:logout', handleLogout);
    return () => window.removeEventListener('auth:logout', handleLogout);
  }, []);

  return (
    <>
      <authContext.Provider value={{ isAuthentication, setIsAuthentication, token, setToken }}>
        <ConfigProvider theme={theme}>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/biography" element={<Biography />} />
              <Route path="/safira-collection" element={<SafiraCollection />} />
              <Route path="/auth/login" element={<AdminArea />} />
            </Routes>
          </BrowserRouter>
        </ConfigProvider>
      </authContext.Provider>
    </>
  )
}

export default App
