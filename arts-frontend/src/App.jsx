import { useState } from "react";
import { ConfigProvider } from "antd";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AdminArea from "./pages/Admin-area";
import Store from "./pages/store";
import authContext from '../src/context/authContext'

import theme from "./theme/index";

function App() {

  const [isAutentication, setIsAutentication] = useState(false)

  return (
    <>
      <authContext.Provider value={{ isAutentication, setIsAutentication }}>
        <ConfigProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/store" element={<Store />} />
              <Route path="/admin-area" element={<AdminArea />} />
            </Routes>
          </BrowserRouter>
        </ConfigProvider>
      </authContext.Provider>
    </>
  )
}

export default App
