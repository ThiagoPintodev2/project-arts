import { useNavigate } from "react-router-dom";

import { Button } from 'antd'
import { HiOutlinePaintBrush } from "react-icons/hi2";
import {ArrowLeftOutlined} from '@ant-design/icons'

import './index.less'

function store() {
  const navigate = useNavigate()
  return (
    <div className="container-store">
      <div className="container-store__content">
        <p className="container-store__title">
          Em breve
        </p>
        <HiOutlinePaintBrush />
      </div>
      <Button onClick={() => navigate(-1)}> <ArrowLeftOutlined />Voltar</Button>
    </div>
  )
}
export default store;