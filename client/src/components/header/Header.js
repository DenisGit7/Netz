import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classes from "./Header.module.css";
import { FaHome } from "react-icons/fa";
import Authentication from "../../features/user/Authentication";
import {
  FaAddressBook,
  FaCircleInfo,
  FaEnvelope,
  FaBars,
} from "react-icons/fa6";
import { AiFillCloseSquare } from "react-icons/ai";
import { useSession } from "../../context/SessionContext";
import logo from "../../images/logo.mp4";

const Header = ({ onLogin, onLogout }) => {
  const { isLoggedIn, userInformation } = useSession();
  const [width, setWidth] = useState("");
  const [smallNav, setSmallNav] = useState(false);
  const [menu, setMenu] = useState(false);

  const handleMenu = (e) => {
    setMenu(!menu);
    console.log(menu);
  };

  const handleRootFolder = () => {
    sessionStorage.setItem("subFolder", "");

    if (userInformation.role.includes("Admin")) {
      sessionStorage.setItem("customerFolder", "");
    } else {
      sessionStorage.setItem("customerFolder", userInformation.username);
    }
  };

  function getWindowDimensions() {
    const { innerWidth: width } = window;

    return {
      width,
    };
  }
  function handleResize() {
    setWidth(getWindowDimensions());
    console.log(width.width);
  }

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (width.width < 788) {
      setSmallNav(true);
    } else {
      setSmallNav(false);
    }
  }, [width]);
  useEffect(() => {
    if (width.width < 788) {
      setSmallNav(true);
    } else {
      setSmallNav(false);
    }
  }, []);

  return (
    <div className={classes.mainContainer}>
      {/* <h1 className={classes.element}> HEADER </h1> */}
      <div className={classes.navContainer} />

      <div className={classes.mainNav}>
        {!smallNav ? (
          <ul className={classes.list}>
            <li>
              <Link to="/" className={classes.element}>
                <FaHome />
                <p className={classes.label}>Home</p>
              </Link>
            </li>
            <li>
              <Link to="/contact" className={classes.element}>
                {" "}
                <FaAddressBook />
                <p className={classes.label}>Contact</p>
              </Link>
            </li>
            <li>
              <Link to="/about" className={classes.element}>
                <FaCircleInfo />
                <p className={classes.label}>About</p>
              </Link>
            </li>
            {isLoggedIn && (
              <>
                <li>
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
                  <li>
                    <Link to="dashboard/customers" className={classes.element}>
                      <FaEnvelope />
                      <p className={classes.label}>Customers</p>
                    </Link>
                  </li>
                )}
              </>
            )}
          </ul>
        ) : (
          <ul className={classes.list}>
            <li className={classes.element} onClick={(e) => handleMenu(e)}>
              <FaBars className={classes.barsIcon} />
              <p className={classes.label}>Menu</p>
            </li>
            {menu ? (
              <ul className={classes.listCol}>
                <li className={classes.element} onClick={(e) => handleMenu(e)}>
                  <AiFillCloseSquare />
                  <p className={classes.label}>Close</p>
                </li>

                <li onClick={(e) => handleMenu(e)}>
                  <Link to="/" className={classes.element}>
                    <FaHome />
                    <p className={classes.label}>Home</p>
                  </Link>
                </li>

                <li onClick={(e) => handleMenu(e)}>
                  <Link to="/contact" className={classes.element}>
                    {" "}
                    <FaAddressBook />
                    <p className={classes.label}>Contact</p>
                  </Link>
                </li>

                <li onClick={(e) => handleMenu(e)}>
                  <Link to="/about" className={classes.element}>
                    <FaCircleInfo />
                    <p className={classes.label}>About</p>
                  </Link>
                </li>
                {isLoggedIn && (
                  <>
                    <li onClick={(e) => handleMenu(e)}>
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
                      <li onClick={(e) => handleMenu(e)}>
                        <Link
                          to="dashboard/customers"
                          className={classes.element}
                        >
                          <FaEnvelope />
                          <p className={classes.label}>Customers</p>
                        </Link>
                      </li>
                    )}
                  </>
                )}
              </ul>
            ) : (
              ""
            )}
          </ul>
        )}

        <li>
          <Authentication onLogin={onLogin} onLogout={onLogout} />
        </li>
      </div>
    </div>
  );
};

// return (
//   <div className={classes.mainContainer}>
//     {/* <h1 className={classes.element}> HEADER </h1> */}
//     <div className={classes.navContainer} />

//     <div className={classes.mainNav}>
//       <ul className={classes.list}>
//         <li>{/* <video src={logo} autoPlay /> */}</li>
//         <li>
//           <Link to="/" className={classes.element}>
//             <FaHome />
//             <p className={classes.label}>Home</p>
//           </Link>
//         </li>
//         <li>
//           <Link to="/contact" className={classes.element}>
//             {" "}
//             <FaAddressBook />
//             <p className={classes.label}>Contact</p>
//           </Link>
//         </li>
//         <li>
//           <Link to="/about" className={classes.element}>
//             <FaCircleInfo />
//             <p className={classes.label}>About</p>
//           </Link>
//         </li>
//         {isLoggedIn && (
//           <>
//             <li>
//               <Link
//                 to="dashboard/files"
//                 className={classes.element}
//                 onClick={() => handleRootFolder()}
//               >
//                 <FaEnvelope />
//                 <p className={classes.label}>Files</p>
//               </Link>
//             </li>

//             {/* Admin logged in*/}

//             {userInformation?.role?.includes("Admin") && (
//               <li>
//                 <Link to="dashboard/customers" className={classes.element}>
//                   <FaEnvelope />
//                   <p className={classes.label}>Customers</p>
//                 </Link>
//               </li>
//             )}
//           </>
//         )}
//       </ul>
//       <li>
//         <Authentication onLogin={onLogin} onLogout={onLogout} />
//       </li>
//     </div>
//   </div>
// );
// };

export default Header;
