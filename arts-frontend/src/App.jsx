import { ConfigProvider } from "antd";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AdminArea from "./pages/Admin-area";
import Store from "./pages/store";

import theme from "./theme/index";

function App() {

  return (
    <>
      <ConfigProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/store" element={<Store />} />
            <Route path="/admin-area" element={<AdminArea />} />
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </>
  )
}

export default App
