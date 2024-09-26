import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { getList } from "../helpers/getList.js";
import classes from "./FileList.module.css";

const FileList = ({
  files,
  setFiles,
  folders,
  setFolders,
  folderPath,
  setFolderPath,
  role,
}) => {
  const [downloadURL, setDownloadURL] = useState("");

  useEffect(() => {
    getList(
      setFiles,
      setFolders,
      folderPath.customerFolder,
      folderPath.subFolder,
      setFolderPath
    );
  }, [folderPath]);

  const handleChangeAdminBack = (e) => {
    e.preventDefault();
    setFolderPath({
      customerFolder: "",
      subFolder: "",
    });
  };
  return (
    <>
      <div>
        {folders}

        {/* should be mapped, li created, key per item */}
        {files}
        {/* Add option to view file in new tab when clicking, using useRef hook */}
      </div>
      {role === "Admin" && (
        <div className={classes.arrowContainer}>
          <FaArrowLeft onClick={(e) => handleChangeAdminBack(e)} />
          Back to Root
        </div>
      )}
    </>
  );
};

export default FileList;
