import React from 'react'
import { Link } from 'react-router-dom'
import classes from './Header.module.css'
import { FaHome } from 'react-icons/fa'
import Authentication from '../../features/user/Authentication'
import { FaAddressBook, FaCircleInfo, FaEnvelope } from 'react-icons/fa6'
import { useSession } from '../../context/SessionContext'

const Header = ({ onLogin, onLogout }) => {
  const { isLoggedIn, userInformation } = useSession()

  return (
    <>
      <h1 className={classes.element}>HEADER </h1>
      {/* purple bar 100vw */}
      <div className={classes.navContainer} />

      {/* Always visible no condition Home Navigation 30vw left side */}
      <div className={classes.mainNav}>
        <ul className={classes.list}>
          <li className={classes.element}>
            <Link to="/" className={classes.element}>
              <FaHome />
              <p className={classes.label}>Home</p>
            </Link>
          </li>
          <li className={classes.element}>
            <FaAddressBook />
            <p className={classes.label}>Contact</p>
          </li>
          <li className={classes.element}>
            <FaCircleInfo />
            <p className={classes.label}>About</p>
          </li>
        </ul>
      </div>

      {/* Customer/Admin login, App navigation, 65vw center */}

      <div className={classes.appNav}>
        {isLoggedIn && (
          <>
            <ul className={classes.list}>
              <li className={classes.element}>
                <Link
                  to="dashboard/files"
                  className={classes.element}
                  onClick={() => localStorage.setItem('subFolder', '')}
                >
                  <FaEnvelope />
                  <p className={classes.label}>Files</p>
                </Link>
              </li>

              {/* Admin logged in*/}

              {userInformation?.role?.includes('Admin') && (
                <li className={classes.element}>
                  <Link to="dashboard/customers" className={classes.element}>
                    <FaEnvelope />
                    <p className={classes.label}>Customers</p>
                  </Link>
                </li>
              )}
            </ul>
          </>
        )}
      </div>
      <ul className={classes.list}>
        <li>
          <Authentication onLogin={onLogin} onLogout={onLogout} />
        </li>
      </ul>
    </>
  )
}

export default Header
