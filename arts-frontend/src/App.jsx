import { ConfigProvider } from "antd";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

import theme from "./theme/index";

function App() {

  return (
    <>
      <ConfigProvider theme={theme}>
        <BrowserRouter>
          <Routes>
          <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </>
  )
}

export default App
