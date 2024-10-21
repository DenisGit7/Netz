import React from "react";
import { Link } from "react-router-dom";
import classes from "./Header.module.css";
import { FaHome } from "react-icons/fa";
import Authentication from "../../features/user/Authentication";
import { FaAddressBook, FaCircleInfo, FaEnvelope } from "react-icons/fa6";

const Header = ({ user, role, setUser, setRole }) => {
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

      {/* Admin logged in, App navigation, 65vw center */}

      <div className={classes.appNav}>
        {role !== "" && (
          <>
            <ul className={classes.list}>
              <li className={classes.element}>
                <Link
                  to="files"
                  className={classes.element}
                  onClick={() => localStorage.setItem("subFolder", "")}
                >
                  <FaEnvelope />
                  <p className={classes.label}>Files</p>
                </Link>
              </li>

              {role.includes("Admin") && (
                <li className={classes.element}>
                  <Link to="customers" className={classes.element}>
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
          <Authentication
            user={user}
            role={role}
            setUser={setUser}
            setRole={setRole}
          />
        </li>
      </ul>
    </>
  );
};

export default Header;
