import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FiLogOut} from 'react-icons/fi'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token') // Ensure correct token key
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="navbar-Header">
      <div className="navbar-sm">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
        </Link>
        <ul className="nav-item-list-sm">
          <li>
            <Link to="/" className="nav-link">
              <AiFillHome className="home" />
            </Link>
          </li>
          <li>
            <Link to="/jobs" className="nav-link">
              <BsFillBriefcaseFill className="home" />
            </Link>
          </li>
          <li>
            <button className="btn-sm" type="button" onClick={onClickLogout}>
              <FiLogOut className="home" />
            </button>
          </li>
        </ul>
      </div>
      <div className="navbar-lg">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
        </Link>
        <ul className="nav-item-list-lg">
          <li>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/jobs" className="nav-link">
              Jobs
            </Link>
          </li>
        </ul>
        <div className="button-container">
          <button className="button" type="button" onClick={onClickLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Header)
