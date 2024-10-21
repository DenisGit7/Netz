import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { getList } from "../../helpers/files/getList.js";
import classes from "./FileList.module.css";
import { Link, useLoaderData } from "react-router-dom";
import { FaTrash, FaFolder, FaFileInvoice } from "react-icons/fa6";
import { handleDownload } from "../../helpers/files/handleDownload.js";
import { handleChangeFolder } from "../../helpers/files/handleChangeFolder.js";
import { handleRemove } from "../../helpers/files/handleRemove.js";
import { useNavigate } from "react-router-dom";

const FileList = ({ folderPathHandler, folderPath }) => {
  const navigate = useNavigate();
  const rawData = useLoaderData();
  const data = rawData.files;
  const role = rawData.state.role;
  const user = rawData.state.user;

  useEffect(() => {}, [data]);
  const timeout = 50;
  const handleRemoveFunction = async (file) => {
    await handleRemove(file);
    setTimeout(() => {
      navigate("/files");
    }, timeout);
  };

  const handleBack = (e) => {
    e.preventDefault();
    handleChangeFolder(e, folderPath.customerFolder, folderPathHandler);
    setTimeout(() => {
      navigate("/files");
    }, timeout);
  };
  const handleBackAdmin = (e) => {
    e.preventDefault();
    handleChangeFolder(e, "", folderPathHandler);
    setTimeout(() => {
      navigate("/files");
    }, timeout);
  };

  const handleChangeFolderRefresh = (e, folder) => {
    e.preventDefault();
    handleChangeFolder(e, folder, folderPathHandler);
    setTimeout(() => {
      navigate("/files");
    }, timeout);
  };

  const foldersMap = data.folders.map((folder, index) => {
    const folderName = folder.split("/").pop();
    return (
      <div key={index} className="folder-container">
        <FaFolder
          className="icon-file"
          onClick={(e) =>
            handleChangeFolderRefresh(e, folder, folderPathHandler)
          }
        />

        <h4 className="file-name">{folderName}</h4>
      </div>
    );
  });

  const filesMap = data.files.map((file, index) => {
    const fileName = file.split("/").pop();

    return (
      <div key={index} className="file-container">
        <FaFileInvoice
          className="icon-file"
          onClick={(e) => handleDownload(file)}
        />
        <h4 className="file-name">{fileName}</h4>

        <FaTrash
          className="icon-remove"
          onClick={() => handleRemoveFunction(file)}
        />
      </div>
    );
  });
  return (
    <>
      <div>
        {foldersMap}
        {filesMap}
      </div>
      {
        <div className={classes.arrowContainer}>
          <>
            {folderPath.subFolder ? (
              <>
                {" "}
                <FaArrowLeft onClick={(e) => handleBack(e)} />
                Back to {folderPath.customerFolder}
              </>
            ) : (
              ""
            )}
          </>
          {role === "Admin" && folderPath.customerFolder != "" ? (
            <>
              <FaArrowLeft onClick={(e) => handleBackAdmin(e)} />
              Back Admin
            </>
          ) : (
            ""
          )}
        </div>
      }
    </>
  );
};

export default FileList;
