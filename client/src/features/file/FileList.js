import { FaTrash, FaFolder, FaFileInvoice } from "react-icons/fa6";
import { handleDownload } from "../../helpers/files/handleDownload.js";
import { handleChangeFolder } from "../../helpers/files/handleChangeFolder.js";
import { handleRemove } from "../../helpers/files/handleRemove.js";
import { useNavigate } from "react-router-dom";
import { useSession } from "../../context/SessionContext";
import classes from "./FileList.module.css";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

const FileList = ({ folderPathHandler, folderPath, rawFolders, rawFiles }) => {
  const navigate = useNavigate();
  const { isLoggedIn, userInformation } = useSession();
  const [files, setFiles] = useState("");
  const [folders, setFolders] = useState("");

  const role = userInformation.role;

  const timeout = 200;

  const handleRemoveFunction = async (file) => {
    toast.loading("Waiting...", { duration: 3000 });

    await handleRemove(file);
    setTimeout(() => {
      toast.dismiss();
      toast.success("File deleted successfully", { duration: 3000 });
      navigate("/dashboard/files");
    }, timeout);
  };

  const handleChangeFolderRefresh = (e, folder) => {
    e.preventDefault();
    handleChangeFolder(e, folder, folderPathHandler);
    setTimeout(() => {
      navigate("/dashboard/files");
    }, timeout);
  };

  // const foldersMap = data.folders.map((folder, index) => {
  useEffect(() => {
    setFiles(filesMap);
    setFolders(foldersMap);
  }, [rawFiles, rawFolders]);

  const foldersMap = rawFolders.map((folder, index) => {
    const folderName = folder.split("/").pop();
    return (
      <div
        key={index}
        className={classes.folderContainer}
        onClick={(e) => handleChangeFolderRefresh(e, folder, folderPathHandler)}
      >
        <FaFolder className={classes.iconFolder} />

        <h4 className={classes.fileName}>{folderName}</h4>
      </div>
    );
  });

  // const filesMap = data.files.map((file, index) => {
  const filesMap = rawFiles.map((file, index) => {
    const fileName = file.split("/").pop();

    return (
      <div key={index} className={classes.fileContainer}>
        <h4 className={classes.fileName}>{fileName}</h4>
        <div className={classes.icons}>
          {" "}
          <FaFileInvoice
            className={classes.iconFile}
            onClick={(e) => handleDownload(file)}
          />
          <FaTrash
            className={classes.iconRemove}
            onClick={() => handleRemoveFunction(file)}
          />
        </div>
      </div>
    );
  });
  return (
    <>
      <div className={classes.mainContainer}>
        {folders.length < 1 && files.length < 1 && (
          <p>No folders or files found</p>
        )}
        {folders}
        {files}
      </div>
    </>
  );
};

export default FileList;
