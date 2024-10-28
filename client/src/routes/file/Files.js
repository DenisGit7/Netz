import axios from "axios";
import classes from "./Files.module.css";
import FileList from "../../features/file/FileList";
import { useEffect, useState } from "react";

import { Link, Outlet } from "react-router-dom";
import { useSession } from "../../context/SessionContext";

const Files = () => {
  const { isLoggedIn, userInformation, folderPathProvider } = useSession();

  const [folderPath, setFolderPath] = useState({
    customerFolder: "",
    subFolder: "",
  });

  const folderPathHandler = (customerFolder, subFolder = "") => {
    setFolderPath({ customerFolder: customerFolder, subFolder: subFolder });
    localStorage.setItem("customerFolder", customerFolder);
    localStorage.setItem("subFolder", subFolder);
  };
  useEffect(() => {}, [folderPath]);
  useEffect(() => {
    folderPathHandler(userInformation.username, "");
  }, [userInformation]);

  return (
    <>
      <Outlet />

      <div className={classes.container}>
        <p className={classes.text}>Your files get organised here by Month</p>
        <div className={classes.navigation}>
          <p className={classes.navText}>
            Current Folder :
            {folderPath.customerFolder ? (
              <span className={classes.span}> {folderPath.customerFolder}</span>
            ) : (
              userInformation?.username
            )}
            {folderPath.subFolder && (
              <span className={classes.span}> / {folderPath.subFolder}</span>
            )}
          </p>
          <Link to="/dashboard/files/upload" type="button">
            <button>Upload</button>
          </Link>
        </div>

        <FileList
          folderPathHandler={folderPathHandler}
          folderPath={folderPath}
        />
      </div>
    </>
  );
};

export default Files;

export const loader = async () => {
  const data = {
    customerFolder: localStorage.getItem("customerFolder"),
    subFolder: localStorage.getItem("subFolder"),
  };

  try {
    const response = await axios.post(
      "http://localhost:3500/files/getlist",
      data
    );
    return response.data.result;
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};
