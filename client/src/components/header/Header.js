import React from "react";
import { Link } from "react-router-dom";
import classes from "./Header.module.css";
import { FaHome } from "react-icons/fa";
import Authentication from "../../features/user/Authentication";
import { FaAddressBook, FaCircleInfo, FaEnvelope } from "react-icons/fa6";
import { useSession } from "../../context/SessionContext";

const Header = ({ onLogin, onLogout }) => {
  const { isLoggedIn, userInformation } = useSession();

  const handleRootFolder = () => {
    sessionStorage.setItem("subFolder", "");

    if (userInformation.role.includes("Admin")) {
      sessionStorage.setItem("customerFolder", "");
    } else {
      sessionStorage.setItem("customerFolder", userInformation.username);
    }
  };

  return (
    <>
      <h1 className={classes.element}>HEADER </h1>
      <div className={classes.navContainer} />
      <div className={classes.mainNav}>
        <ul className={classes.list}>
          <li className={classes.element}>
            <Link to="/" className={classes.element}>
              <FaHome />
              <p className={classes.label}>Home</p>
            </Link>
          </li>
          <li className={classes.element}>
            <Link to="/contact" className={classes.element}>
              {" "}
              <FaAddressBook />
              <p className={classes.label}>Contact</p>
            </Link>
          </li>
          <li className={classes.element}>
            <Link to="/about" className={classes.element}>
              <FaCircleInfo />
              <p className={classes.label}>About</p>
            </Link>
          </li>
          {isLoggedIn && (
            <>
              <li className={classes.element}>
                <Link
                  to="dashboard/files"
                  className={classes.element}
                  onClick={() => handleRootFolder()}
                >
                  <FaEnvelope />
                  <p className={classes.label}>Files</p>
                </Link>
              </li>

              {/* Admin logged in*/}

              {userInformation?.role?.includes("Admin") && (
                <li className={classes.element}>
                  <Link to="dashboard/customers" className={classes.element}>
                    <FaEnvelope />
                    <p className={classes.label}>Customers</p>
                  </Link>
                </li>
              )}
            </>
          )}
          <li>
            <Authentication onLogin={onLogin} onLogout={onLogout} />
          </li>
        </ul>
      </div>
    </>
  );
};

export default Header;
