import { useState } from "react";
import { ConfigProvider } from "antd";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Biography from './pages/Biography'
import AdminArea from "./pages/Admin-area";
import Store from "./pages/store";
import Header from "./components/Layout/Header";
import authContext from '../src/context/authContext'

import theme from "./theme/index";

function App() {
  const savedToken = localStorage.getItem('token');
  const [isAuthentication, setIsAuthentication] = useState(Boolean(savedToken))
  const [token, setToken] = useState(null);

  return (
    <>
      <authContext.Provider value={{ isAuthentication, setIsAuthentication, token, setToken }}>
        <ConfigProvider theme={theme}>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/biography" element={<Biography />} />
              <Route path="/store" element={<Store />} />
              <Route path="/auth/login" element={<AdminArea />} />
            </Routes>
          </BrowserRouter>
        </ConfigProvider>
      </authContext.Provider>
    </>
  )
}

export default App
