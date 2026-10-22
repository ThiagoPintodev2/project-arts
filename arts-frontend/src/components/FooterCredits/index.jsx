import { InstagramOutlined, TikTokOutlined, MailOutlined } from '@ant-design/icons'
import './index.less'

function FooterCredits() {
  return (
    <div className='page-inner container-arts-styles__footer-content'>
      <div className="container-arts-styles__artist-name">
        <p>CSPACE_ART</p>
        <p>Arte digital, órbitas e paisagens sintéticas. © 2026</p>
      </div>
      <div className='container-arts-styles__contact'>
        <ul className='container-arts-styles__list'>
          <li className='container-arts-styles__social-media'>
            <a className='container-arts-styles__link' target='_blank' href="https://www.instagram.com/cspace_art/"><InstagramOutlined />&nbsp;cspace_art</a>
            <a className='container-arts-styles__link' target='_blank' href="https://www.tiktok.com/@cspace_art"><TikTokOutlined />&nbsp;cspace_art</a>
            <div>
            <MailOutlined />&nbsp;sspaceart@gmail.com
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}
export default FooterCredits;