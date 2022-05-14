import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const logoutButton = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <ul className="header-container">
      <Link to="/">
        <li>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </li>
      </Link>
      <div className="link-container">
        <Link to="/" className="link">
          <li className="home">Home</li>
        </Link>
        <Link to="/jobs" className="link">
          <li className="home">Jobs</li>
        </Link>
      </div>
      <button type="button" className="logout-button" onClick={logoutButton}>
        Logout
      </button>
    </ul>
  )
}
export default withRouter(Header)
