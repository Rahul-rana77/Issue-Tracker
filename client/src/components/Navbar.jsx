import { Link } from 'react-router-dom'
import '../styles/navbar.css'
import Logout from './Logout.jsx'
import logo from '../assets/UrbanFix_logo.png'

function Navbar({ variant = 'user' }) {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="navbar-brand">
          <div className="navbar-logo">
          <img
            src={logo}
            alt="UrbanFix"
            className="navbar-logo"
          /></div>

          {variant === 'admin' && <span className="admin-badge">Admin</span>}
        </div>
        <div className="navbar-links">
          {variant === 'user' ? (
            <>
              <Link to="/submit" className="nav-link">Submit Issue</Link>
              <Logout role="user" />
            </>
          ) : (
            <>
              <Link to="/admin" className="nav-link">Dashboard</Link>
              <Logout role="admin" />
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
