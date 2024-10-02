import React from "react";
import classes from "./Nav.module.css";
import { FaHome } from "react-icons/fa";

import Authentication from "../features/user/Authentication.js";

//controls of show / hide

const Nav = ({
  setUser,
  setRole,
  user,
  role,
  shUp,
  setShUp,
  shNv,
  setShNv,
  shPst,
  setShPst,
  shNws,
  setShNws,
  showCustomers,
  setShowCustomers,
  shCrtUsr,
  setShCrtUsr,
  shCrtPst,
  setShCrtPst,
  shCrtNws,
  setShCrtNws,
}) => {
  return (
    <>
      {/* <div className={classes.navigation}> */}
      <div className={classes.mainNav}>
        <ul className={classes.list}>
          <li
            className={classes.element}
            onClick={() => setShowCustomers(!showCustomers)}
          >
            <FaHome />
            <p className={classes.label}>Home</p>
          </li>
          <li
            className={classes.element}
            onClick={() => setShowCustomers(!showCustomers)}
          >
            <FaHome />
            <p className={classes.label}>Contact</p>
          </li>
          <li
            className={classes.element}
            onClick={() => setShowCustomers(!showCustomers)}
          >
            <FaHome />
            <p className={classes.label}>About</p>
          </li>
        </ul>
      </div>
      {/* </div> */}

      {role === "Admin" && (
        <div className={classes.navigation}>
          <ul className={classes.list}>
            <li
              className={classes.element}
              onClick={() => setShowCustomers(!showCustomers)}
            >
              <svg
                className="lucide lucide-trash-2"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                stroke="#7e8590"
                fill="none"
                viewBox="0 0 24 24"
                height="24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M3 6h18"></path>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                <line y2="17" y1="11" x2="10" x1="10"></line>
                <line y2="17" y1="11" x2="14" x1="14"></line>
              </svg>
              <p className={classes.label}>Customers</p>
            </li>

            <li
              className={classes.element}
              onClick={() => setShCrtUsr(!shCrtUsr)}
            >
              <svg
                className="lucide lucide-user-round-plus"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                stroke="#7e8590"
                fill="none"
                viewBox="0 0 24 24"
                height="24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 21a8 8 0 0 1 13.292-6"></path>
                <circle r="5" cy="8" cx="10"></circle>
                <path d="M19 16v6"></path>
                <path d="M22 19h-6"></path>
              </svg>
              <p className={classes.label}>Create User</p>
            </li>

            <li
              className={classes.element}
              onClick={() => setShCrtPst(!shCrtPst)}
            >
              <svg
                className="lucide lucide-settings"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                stroke="#7e8590"
                fill="none"
                viewBox="0 0 24 24"
                height="24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                <circle r="3" cy="12" cx="12"></circle>
              </svg>
              <p className={classes.label}>Create Post</p>
            </li>

            <li
              className={classes.element}
              onClick={() => setShCrtNws(!shCrtNws)}
            >
              <svg
                className="lucide lucide-users-round"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                stroke="#7e8590"
                fill="none"
                viewBox="0 0 24 24"
                height="24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M18 21a8 8 0 0 0-16 0"></path>
                <circle r="5" cy="8" cx="10"></circle>
                <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"></path>
              </svg>
              <p className={classes.label}>Create News</p>
            </li>
          </ul>

          <ul className={classes.list}>
            <li className={classes.element} onClick={() => setShUp(!shUp)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#7e8590"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-pencil"
              >
                <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path>
                <path d="m15 5 4 4"></path>
              </svg>
              <p className={classes.label}>Upload a File</p>
            </li>

            <li className={classes.element} onClick={() => setShNv(!shNv)}>
              <svg
                className="lucide lucide-users-round"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                stroke="#7e8590"
                fill="none"
                viewBox="0 0 24 24"
                height="24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M18 21a8 8 0 0 0-16 0"></path>
                <circle r="5" cy="8" cx="10"></circle>
                <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"></path>
              </svg>
              <p className={classes.label}>Navigate Files</p>
            </li>
            {/* 
            <li className={classes.element} onClick={() => setShPst(!shPst)}>
              <svg
                className="lucide lucide-users-round"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                stroke="#7e8590"
                fill="none"
                viewBox="0 0 24 24"
                height="24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M18 21a8 8 0 0 0-16 0"></path>
                <circle r="5" cy="8" cx="10"></circle>
                <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"></path>
              </svg>
              <p className={classes.label}>Posts</p>
            </li> */}

            {/* <li className={classes.element} onClick={() => setShNws(!shNws)}>
              <svg
                className="lucide lucide-users-round"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                stroke="#7e8590"
                fill="none"
                viewBox="0 0 24 24"
                height="24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M18 21a8 8 0 0 0-16 0"></path>
                <circle r="5" cy="8" cx="10"></circle>
                <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"></path>
              </svg>
              <p className={classes.label}>Notifications</p>
            </li> */}
          </ul>
        </div>
      )}

      {role === "Customer" && (
        <div className={classes.navigation}>
          <ul className={classes.list}>
            <li className={classes.element} onClick={() => setShUp(!shUp)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#7e8590"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-pencil"
              >
                <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path>
                <path d="m15 5 4 4"></path>
              </svg>
              <p className={classes.label}>Upload a File</p>
            </li>

            <li className={classes.element} onClick={() => setShNv(!shNv)}>
              <svg
                className="lucide lucide-users-round"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                stroke="#7e8590"
                fill="none"
                viewBox="0 0 24 24"
                height="24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M18 21a8 8 0 0 0-16 0"></path>
                <circle r="5" cy="8" cx="10"></circle>
                <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"></path>
              </svg>
              <p className={classes.label}>Navigate Files</p>
            </li>

            {/* <li className={classes.element} onClick={() => setShPst(!shPst)}>
              <svg
                className="lucide lucide-users-round"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                stroke="#7e8590"
                fill="none"
                viewBox="0 0 24 24"
                height="24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M18 21a8 8 0 0 0-16 0"></path>
                <circle r="5" cy="8" cx="10"></circle>
                <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"></path>
              </svg>
              <p className={classes.label}>Posts</p>
            </li> */}

            {/* <li className={classes.element} onClick={() => setShNws(!shNws)}>
              <svg
                className="lucide lucide-users-round"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                stroke="#7e8590"
                fill="none"
                viewBox="0 0 24 24"
                height="24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M18 21a8 8 0 0 0-16 0"></path>
                <circle r="5" cy="8" cx="10"></circle>
                <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"></path>
              </svg>
              <p className={classes.label}>Notifications</p>
            </li> */}
          </ul>
        </div>
      )}

      {/* <button className={classes.mainNavBtn} onClick={(e) => logout(e)}>
          Logout
        </button> */}
      <Authentication
        user={user}
        setUser={setUser}
        role={role}
        setRole={setRole}
      />
    </>
  );
};

export default Nav;
