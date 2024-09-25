import React from "react";
import classes from "./Nav.module.css";

//controls of show / hide

const Nav = ({
  showUpload,
  setShowUpload,
  showFolders,
  setShowFolders,
  role,
  user,
}) => {
  console.log(role);
  return (
    <>
      {role != "" ? (
        <div className={classes.container}>
          <ul className={classes.ul}>
            <li
              className={classes.li}
              onClick={() => setShowUpload(!showUpload)}
            >
              Upload a file
            </li>
            <li
              className={classes.li}
              onClick={() => setShowFolders(!showFolders)}
            >
              Navigate your folders
            </li>
          </ul>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Nav;
