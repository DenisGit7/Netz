import axios from "axios";
import classes from "./Files.module.css";
import FileList from "../../features/file/FileList";
import BackArrow from "../../components/BackArrow";
import { useEffect, useState } from "react";
import { getList } from "../../helpers/files/getList";
import { Link, useLoaderData } from "react-router-dom";

const Files = () => {
  const data = useLoaderData();
  console.log(data);

  const [folderPath, setFolderPath] = useState({
    customerFolder: localStorage.getItem("customerFolder"),
    subFolder: localStorage.getItem("subFolder"),
  });

  const folderPathHandler = (customerFolder, subFolder = "") => {
    setFolderPath({ customerFolder: customerFolder, subFolder: subFolder });
    localStorage.setItem("customerFolder", customerFolder);
    localStorage.setItem("subFolder", subFolder);
  };

  useEffect(() => {
    folderPathHandler(
      localStorage.getItem("customerFolder"),
      localStorage.getItem("subFolder")
    );
  }, [data]);

  return (
    <div className={classes.container}>
      <p className={classes.text}>Your files get organised here by Month</p>
      <div className={classes.navigation}>
        {/* <p className={classes.navText}>
          Current Folder :
          {folderPath.customerFolder ? (
            <span className={classes.span}> {folderPath.customerFolder}</span>
          ) : (
            ' Root'
          )}
          {folderPath.subFolder && (
            <span className={classes.span}> / {folderPath.subFolder}</span>
          )}
        </p>
        {folderPath.subFolder && (
          <BackArrow folderPath={folderPath} setFolderPath={setFolderPath} />
        )} */}
      </div>

      <FileList folderPathHandler={folderPathHandler} folderPath={folderPath} />
    </div>
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

// export const loader = async () => {
//   const filesData = localStorage.getItem("filesData");
//   return { filesData };
// };
